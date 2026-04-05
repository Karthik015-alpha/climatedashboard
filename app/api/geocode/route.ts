import { NextResponse } from "next/server";
import { searchLocalities as searchNelloreLocalities } from "@/lib/nelloreLocalities";
import { searchAndhraLocalities } from "@/lib/andhraPradeshLocalities";

type GeoResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  formatted_address?: string;
};

const NELLORE_VIEWBOX = "79.25,14.95,80.35,13.55";

function normalizeNominatim(item: any): GeoResult | null {
  const lat = Number(item?.lat);
  const lon = Number(item?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const address = item?.address || {};
  const name =
    item?.name ||
    address?.suburb ||
    address?.village ||
    address?.hamlet ||
    address?.town ||
    address?.city ||
    (typeof item?.display_name === "string" ? item.display_name.split(",")[0] : null) ||
    "Unknown";

  return {
    name,
    latitude: lat,
    longitude: lon,
    country: address?.country || "India",
    admin1: address?.state || "Andhra Pradesh",
    admin2: address?.state_district || address?.county,
    formatted_address: item?.display_name || name
  };
}

function normalizeOpenMeteo(item: any): GeoResult | null {
  const lat = Number(item?.latitude);
  const lon = Number(item?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const name = item?.name || "Unknown";
  return {
    name,
    latitude: lat,
    longitude: lon,
    country: item?.country || "India",
    admin1: item?.admin1 || "Andhra Pradesh",
    admin2: item?.admin2,
    formatted_address: [item?.name, item?.admin2 || item?.admin1, item?.country].filter(Boolean).join(", ")
  };
}

function dedupe(results: GeoResult[]): GeoResult[] {
  const seen = new Set<string>();
  const unique: GeoResult[] = [];

  for (const r of results) {
    const key = `${r.name.toLowerCase()}|${r.latitude.toFixed(4)}|${r.longitude.toFixed(4)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(r);
  }

  return unique;
}

function cleanQuery(value: string) {
  return value.replace(/[;|]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeNelloreTypos(value: string) {
  const compact = value.toLowerCase().replace(/[^a-z]/g, "");
  if (compact === "nellore" || compact === "nellor" || compact === "nelore") {
    return "nellore";
  }
  if (compact.includes("nellore") || compact.includes("nellor")) {
    return value.toLowerCase().replace(/nel+l?or?e?/g, "nellore");
  }
  return value;
}

function isNelloreResult(r: GeoResult) {
  const text = `${r.name} ${r.admin1 || ""} ${r.admin2 || ""} ${r.formatted_address || ""}`.toLowerCase();
  return text.includes("nellore");
}

async function fetchNominatimResults(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=14&countrycodes=in&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "EcoVision/1.0 (local-search)",
      Accept: "application/json"
    },
    next: { revalidate: 3600 }
  });
  if (!res.ok) return [] as GeoResult[];
  const data = await res.json();
  const list: GeoResult[] = [];
  for (const item of data || []) {
    const normalized = normalizeNominatim(item);
    if (normalized) list.push(normalized);
  }
  return list;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("query")?.trim();
  const cleaned = rawQuery ? cleanQuery(rawQuery) : "";
  const query = normalizeNelloreTypos(cleaned);

  const localMatches = [...searchNelloreLocalities(query), ...searchAndhraLocalities(query)].map((item) => ({
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    country: item.country,
    admin1: item.admin1,
    admin2: item.admin2,
    formatted_address: item.formatted_address
  }));

  const localSeen = new Set<string>();
  const uniqueLocalMatches = localMatches.filter((item) => {
    const key = `${item.name.toLowerCase()}|${item.latitude.toFixed(4)}|${item.longitude.toFixed(4)}|${item.formatted_address.toLowerCase()}`;
    if (localSeen.has(key)) return false;
    localSeen.add(key);
    return true;
  });

  if (uniqueLocalMatches.length > 0) {
    return NextResponse.json({ results: uniqueLocalMatches.slice(0, 14) });
  }

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const qNellore = query.toLowerCase().includes("nellore")
    ? `${query}, Andhra Pradesh, India`
    : `${query}, Nellore, Andhra Pradesh, India`;

  const nominatimBoundedUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=14&countrycodes=in&bounded=1&viewbox=${encodeURIComponent(NELLORE_VIEWBOX)}&q=${encodeURIComponent(qNellore)}`;
  const nominatimBroadUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=14&countrycodes=in&q=${encodeURIComponent(qNellore)}`;
  const openMeteoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(qNellore)}&count=10&language=en&format=json`;

  const [nomBoundedRes, nomBroadRes, openRes] = await Promise.allSettled([
    fetch(nominatimBoundedUrl, {
      headers: {
        "User-Agent": "EcoVision/1.0 (local-search)",
        Accept: "application/json"
      },
      next: { revalidate: 3600 }
    }),
    fetch(nominatimBroadUrl, {
      headers: {
        "User-Agent": "EcoVision/1.0 (local-search)",
        Accept: "application/json"
      },
      next: { revalidate: 3600 }
    }),
    fetch(openMeteoUrl, { next: { revalidate: 3600 } })
  ]);

  const merged: GeoResult[] = [];

  if (nomBoundedRes.status === "fulfilled" && nomBoundedRes.value.ok) {
    const data = await nomBoundedRes.value.json();
    for (const item of data || []) {
      const normalized = normalizeNominatim(item);
      if (normalized) merged.push(normalized);
    }
  }

  if (nomBroadRes.status === "fulfilled" && nomBroadRes.value.ok) {
    const data = await nomBroadRes.value.json();
    for (const item of data || []) {
      const normalized = normalizeNominatim(item);
      if (normalized) merged.push(normalized);
    }
  }

  if (openRes.status === "fulfilled" && openRes.value.ok) {
    const data = await openRes.value.json();
    for (const item of data?.results || []) {
      const normalized = normalizeOpenMeteo(item);
      if (normalized) merged.push(normalized);
    }
  }

  if (merged.length === 0 && /\bmandal\b/i.test(query)) {
    const mandalReduced = query.replace(/\bmandal\b/gi, " ").replace(/\s+/g, " ").trim();
    if (mandalReduced.length > 1) {
      const fallbackQuery = mandalReduced.toLowerCase().includes("nellore")
        ? mandalReduced
        : `${mandalReduced}, Nellore, Andhra Pradesh, India`;
      const fallback = await fetchNominatimResults(fallbackQuery);
      merged.push(...fallback);
    }
  }

  const unique = dedupe(merged);
  const nelloreFirst = [...unique].sort((a, b) => Number(isNelloreResult(b)) - Number(isNelloreResult(a)));

  return NextResponse.json({ results: nelloreFirst.slice(0, 14) });
}
