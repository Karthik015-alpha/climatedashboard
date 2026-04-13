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

const NELLORE_CENTER = { latitude: 14.4426, longitude: 79.9865 };

const NELLORE_FALLBACK_NAMES = [
  "Nellore", "Nellore Urban", "Nellore Rural", "Indukurpet", "T.P. Gudur", "Muthukur", "Venkatachalam", "Podalakur", "Rapur", "Kovur", "Buchireddypalem", "Manubolu", "Sydapuram",
  "Atmakur", "Kaluvoya", "Chejerla", "Ananthasagaram", "A.S. Peta", "Sangam", "S.R. Puram", "Udayagiri", "Marripadu", "Kavali", "Allur", "Kodavalur", "Vidavalur", "Vinjamur",
  "Dagadarthi", "Bogole", "Jaladanki", "Duttalur", "Kaligiri", "Gudur", "Sullurpeta", "Naidupeta", "Venkatagiri", "Tada", "Chittamur", "Vakadu", "Kondapuram", "Dakkili", "Doravarisatram",
  "Ojili", "Pellakur", "Balayapalle", "Varikuntapadu", "Stonehousepet", "Magunta Layout", "Balaji Nagar", "Vedayapalem", "Dargamitta", "Pogathota", "Nawabpet", "A.C. Nagar", "Ramji Nagar",
  "Harinathpuram", "VRC Centre", "Gandhi Bomma Centre", "Children's Park Area", "Mulapeta", "Fathekhanpet", "Chinna Bazaar", "Kothuru", "Bramhananda Reddy Nagar", "Ambedkar Nagar", "Navalak Gardens",
  "Saraswathi Nagar", "Isukathota", "Kondayapalem", "Somasekharapuram", "Chintareddypalem", "Allipuram", "Devarapalem", "Gudipallipadu", "Amancherla", "Trunk Road", "Mini Bypass Road", "R.R. Street",
  "Achari Street", "Kapu Street", "Mulapeta Main Road", "Podalakur Road", "Atmakur Road", "Muthukur Road", "Vedayapalem Road", "GNT Road", "NH-16 stretch",
  "Akkacheruvupadu", "Anumasamudrampeta", "Balayapalle", "Beeramgunta", "Bitragunta", "Chendodu", "Chillakur", "D. Velampalli", "Donthali", "Graddagunta", "Illukurupadu", "Karlapudi", "Kesavaram",
  "Kota", "Kothapatnam", "Krishnapatnam", "Mypadu", "Nelapattu", "North Rajupalem", "Pangili", "Pennepalli", "Rebala", "Saipeta", "Sarvepalli", "Seetharamapuram", "Siddana Konduru", "Thummalapenta",
  "Utukur", "Veguru", "Venadu", "Vendodu", "Viruvur", "Yellayapalem", "Yerradoddipalli"
];

function toNelloreFallbackResult(name: string): GeoResult {
  return {
    name,
    latitude: NELLORE_CENTER.latitude,
    longitude: NELLORE_CENTER.longitude,
    country: "India",
    admin1: "Andhra Pradesh",
    admin2: "SPSR Nellore",
    formatted_address: `${name}, SPSR Nellore, Andhra Pradesh, India`
  };
}

function searchNelloreFallback(query: string): GeoResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return NELLORE_FALLBACK_NAMES
    .filter((name) => name.toLowerCase().includes(q))
    .map(toNelloreFallbackResult);
}

function rankLocalResult(query: string, r: GeoResult) {
  const q = query.toLowerCase();
  const name = (r.name || "").toLowerCase();
  const address = (r.formatted_address || "").toLowerCase();
  const exact = name === q ? 100 : 0;
  const starts = name.startsWith(q) ? 30 : 0;
  const inAddress = address.includes("nellore") ? 25 : 0;
  const include = name.includes(q) ? 10 : 0;
  return exact + starts + inAddress + include;
}

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

  const nelloreLocalMatches = [...searchNelloreLocalities(query), ...searchNelloreFallback(query)].map((item) => ({
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    country: item.country,
    admin1: item.admin1,
    admin2: item.admin2,
    formatted_address: item.formatted_address
  }));

  const andhraLocalMatches = searchAndhraLocalities(query).map((item) => ({
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    country: item.country,
    admin1: item.admin1,
    admin2: item.admin2,
    formatted_address: item.formatted_address
  }));

  const dedupeLocal = (rows: GeoResult[]) => {
    const localSeen = new Set<string>();
    return rows.filter((item) => {
      const key = `${item.name.toLowerCase()}|${item.latitude.toFixed(4)}|${item.longitude.toFixed(4)}|${(item.formatted_address || "").toLowerCase()}`;
      if (localSeen.has(key)) return false;
      localSeen.add(key);
      return true;
    });
  };

  const uniqueNelloreLocal = dedupeLocal(nelloreLocalMatches)
    .sort((a, b) => rankLocalResult(query, b) - rankLocalResult(query, a));

  if (uniqueNelloreLocal.length > 0) {
    return NextResponse.json({ results: uniqueNelloreLocal.slice(0, 20) });
  }

  const uniqueAndhraLocal = dedupeLocal(andhraLocalMatches).filter((item) => {
    if (query.length < 3 && !item.name.toLowerCase().startsWith(query.toLowerCase())) return false;
    return true;
  }).sort((a, b) => rankLocalResult(query, b) - rankLocalResult(query, a));

  if (uniqueAndhraLocal.length > 0) {
    return NextResponse.json({ results: uniqueAndhraLocal.slice(0, 20) });
  }

  const localSeen = new Set<string>();
  const uniqueLocalMatches = [...nelloreLocalMatches, ...andhraLocalMatches].filter((item) => {
    const key = `${item.name.toLowerCase()}|${item.latitude.toFixed(4)}|${item.longitude.toFixed(4)}|${(item.formatted_address || "").toLowerCase()}`;
    if (localSeen.has(key)) return false;
    localSeen.add(key);
    return true;
  });

  if (uniqueLocalMatches.length > 0) {
    return NextResponse.json({ results: uniqueLocalMatches.slice(0, 20) });
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
