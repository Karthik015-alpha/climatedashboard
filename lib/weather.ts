import { searchLocalities as searchNelloreLocalities } from "./nelloreLocalities";
import { searchAndhraLocalities } from "./andhraPradeshLocalities";
const BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export type WeatherResponse = {
  current_weather?: { temperature: number; windspeed: number; weathercode: number };
  hourly?: { relative_humidity_2m?: number[] };
  daily?: { temperature_2m_max: number[]; temperature_2m_min: number[]; weathercode: number[]; time: string[] };
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const res = await fetch(`${BASE}/api/weather?lat=${lat}&lon=${lon}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

export async function fetchAQI(lat: number, lon: number) {
  const res = await fetch(`${BASE}/api/aqi?lat=${lat}&lon=${lon}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("AQI fetch failed");
  return res.json();
}

export async function geocode(query: string) {
  const localMatches = [...searchNelloreLocalities(query), ...searchAndhraLocalities(query)].map((item) => ({
    name: item.name,
    shortName: item.name,
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
    return uniqueLocalMatches;
  }

  const res = await fetch(`${BASE}/api/geocode?query=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || [])
    .map((r: any) => {
      const latitude = Number(r.latitude ?? r.lat);
      const longitude = Number(r.longitude ?? r.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

      const name = r.name || r.shortName || (typeof r.display_name === "string" ? r.display_name.split(",")[0] : "Unknown");
      const formatted =
        r.formatted_address ||
        r.display_name ||
        [name, r.admin2 || r.admin1, r.country].filter(Boolean).join(", ");

      return {
        name,
        shortName: name,
        latitude,
        longitude,
        country: r.country,
        formatted_address: formatted
      };
    })
    .filter(Boolean);
}

export function weatherLabel(code: number) {
  const map: Record<number, string> = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    80: "Rain Showers",
    95: "Thunderstorm"
  };
  return map[code] || "Unknown";
}
