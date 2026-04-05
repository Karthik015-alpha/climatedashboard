import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) return NextResponse.json({ error: "lat/lon required" }, { status: 400 });

  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,sulphur_dioxide,european_aqi&current=european_aqi,pm10,pm2_5,ozone,nitrogen_dioxide`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return NextResponse.json({ error: "upstream error" }, { status: 502 });
  const data = await res.json();
  return NextResponse.json(data);
}
