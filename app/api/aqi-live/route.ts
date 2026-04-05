import { NextResponse } from "next/server";

const cities = {
  "Delhi, India": 185,
  "Mumbai, India": 112,
  "New York, USA": 45,
  "London, UK": 32,
  "Beijing, China": 156
};

function mutate() {
  for (const key of Object.keys(cities)) {
    const delta = Math.floor(Math.random() * 11) - 5;
    const next = Math.max(0, cities[key as keyof typeof cities] + delta);
    cities[key as keyof typeof cities] = next;
  }
  return { ...cities };
}

export async function GET(req: Request) {
  const { readable, writable } = new TransformStream();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();

  const push = () => writer.write(encoder.encode(`data: ${JSON.stringify(mutate())}\n\n`));
  const interval = setInterval(push, 5000);
  push();

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
