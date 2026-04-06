import { NextResponse } from "next/server";

const CITIES = [
  { key: "Delhi, India", lat: 28.6139, lon: 77.2090 },
  { key: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
  { key: "Bengaluru, India", lat: 12.9716, lon: 77.5946 },
  { key: "Chennai, India", lat: 13.0827, lon: 80.2707 },
  { key: "Kolkata, India", lat: 22.5726, lon: 88.3639 }
] as const;

type AqiSnapshot = Record<string, number | null>;

async function fetchAqiSnapshot(): Promise<AqiSnapshot> {
  const settled = await Promise.allSettled(
    CITIES.map(async (city) => {
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=european_aqi`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("upstream error");
      const data = await res.json();
      const value = data?.current?.european_aqi;
      return [city.key, typeof value === "number" ? Math.round(value) : null] as const;
    })
  );

  const payload: AqiSnapshot = {};
  for (const item of settled) {
    if (item.status === "fulfilled") {
      const [name, value] = item.value;
      payload[name] = value;
    }
  }
  return payload;
}

export async function GET(req: Request) {
  const { readable, writable } = new TransformStream();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();

  const push = async () => {
    try {
      const snapshot = await fetchAqiSnapshot();
      await writer.write(encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`));
    } catch {
      await writer.write(encoder.encode(`data: ${JSON.stringify({ error: "aqi fetch failed" })}\n\n`));
    }
  };

  const interval = setInterval(() => {
    void push();
  }, 60000);
  void push();

  const abort = () => {
    clearInterval(interval);
    writer.close();
  };

  req.signal.addEventListener("abort", abort);

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
