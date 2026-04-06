import { NextResponse } from "next/server";

const CITIES = [
  { name: "Delhi", lat: 28.6139, lon: 77.2090, baseline: 25.5 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, baseline: 27.2 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946, baseline: 23.9 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, baseline: 28.3 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639, baseline: 26.8 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867, baseline: 26.1 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, baseline: 27.1 },
  { name: "Pune", lat: 18.5204, lon: 73.8567, baseline: 24.6 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873, baseline: 26.3 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462, baseline: 25.7 }
];

export async function GET() {
  const settled = await Promise.allSettled(
    CITIES.map(async (city) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error("upstream error");
      const payload = await res.json();
      const temp = Number(payload?.current_weather?.temperature);
      const anomaly = Number.isFinite(temp) ? Number((temp - city.baseline).toFixed(2)) : null;
      return {
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        temp: Number.isFinite(temp) ? Number(temp.toFixed(1)) : null,
        anomaly
      };
    })
  );

  const data = settled
    .filter((item): item is PromiseFulfilledResult<{ name: string; lat: number; lon: number; temp: number | null; anomaly: number | null }> => item.status === "fulfilled")
    .map((item) => item.value);

  return NextResponse.json(data);
}
