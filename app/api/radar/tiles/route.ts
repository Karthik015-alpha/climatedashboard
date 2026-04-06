import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.rainviewer.com/public/weather-maps.json", {
    next: { revalidate: 120 }
  });

  if (!res.ok) {
    return NextResponse.json({ error: "RainViewer upstream error" }, { status: 502 });
  }

  const data = await res.json();
  const host = data?.host || "https://tilecache.rainviewer.com";
  const past = Array.isArray(data?.radar?.past) ? data.radar.past : [];
  const nowcast = Array.isArray(data?.radar?.nowcast) ? data.radar.nowcast : [];
  const latest = nowcast.at(-1) || past.at(-1) || null;

  if (!latest?.path) {
    return NextResponse.json({ error: "No radar tile path available" }, { status: 502 });
  }

  return NextResponse.json({
    provider: "RainViewer",
    generated: data?.generated ?? null,
    latestTimestamp: latest.time ?? null,
    tileTemplate: `${host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`,
    colorScheme: 1,
    snow: 1
  });
}
