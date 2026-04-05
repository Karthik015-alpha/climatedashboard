import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) return NextResponse.json({ error: "lat/lon required" }, { status: 400 });

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return NextResponse.json({ error: "upstream error" }, { status: 502 });
  const data = await res.json();
  return NextResponse.json(data);
}
