import { NextResponse } from "next/server";

const ALLOWED = ["temperature", "co2"] as const;
type Metric = (typeof ALLOWED)[number];

function generateSynthetic(metric: Metric, startYear = 2024, endYear = 2030) {
  const rows = [] as { year: number; actual: number | null; predicted: number }[];
  for (let y = 2020; y <= endYear; y++) {
    const base = metric === "co2" ? 410 : 1.0;
    const growth = metric === "co2" ? 1.6 : 0.03;
    const predicted = base + (y - 2020) * growth + Math.random() * (metric === "co2" ? 1 : 0.05);
    rows.push({ year: y, actual: y < startYear ? Number(predicted.toFixed(2)) : null, predicted: Number(predicted.toFixed(2)) });
  }
  return rows.filter((r) => r.year >= 2020 && r.year <= endYear);
}

export async function GET(_req: Request, { params }: { params: { metric: string } }) {
  const metric = params.metric as Metric;
  if (!ALLOWED.includes(metric)) {
    return NextResponse.json({ error: "Invalid metric type" }, { status: 400 });
  }
  const data = generateSynthetic(metric);
  return NextResponse.json(data);
}
