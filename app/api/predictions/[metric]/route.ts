import { NextResponse } from "next/server";

const ALLOWED = ["temperature", "co2"] as const;
type Metric = (typeof ALLOWED)[number];

type Row = { year: number; actual: number | null; predicted: number };

const LAT = 28.6139;
const LON = 77.2090;

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, n) => sum + n, 0) / values.length;
}

function linearRegression(points: Array<{ x: number; y: number }>) {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y ?? 0 };
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

async function buildTemperatureSeries(): Promise<Row[]> {
  const currentYear = new Date().getUTCFullYear();
  const historyStart = currentYear - 5;
  const historyEnd = currentYear - 1;
  const forecastEnd = currentYear + 5;

  const historicPoints: Array<{ x: number; y: number }> = [];
  const rows: Row[] = [];

  for (let year = historyStart; year <= historyEnd; year++) {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_mean`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      rows.push({ year, actual: null, predicted: 0 });
      continue;
    }
    const payload = await res.json();
    const values = (payload?.daily?.temperature_2m_mean || []).filter((n: unknown) => typeof n === "number") as number[];
    const avg = average(values);
    if (avg !== null) {
      historicPoints.push({ x: year, y: avg });
      rows.push({ year, actual: Number(avg.toFixed(2)), predicted: 0 });
    } else {
      rows.push({ year, actual: null, predicted: 0 });
    }
  }

  const { slope, intercept } = linearRegression(historicPoints);

  return rows
    .concat(
      Array.from({ length: forecastEnd - historyEnd }, (_, i) => {
        const year = historyEnd + i + 1;
        const predicted = intercept + slope * year;
        return { year, actual: null, predicted: Number(predicted.toFixed(2)) };
      })
    )
    .map((row) => {
      const fallbackPredicted = row.actual ?? intercept + slope * row.year;
      return { ...row, predicted: Number(fallbackPredicted.toFixed(2)) };
    });
}

export async function GET(_req: Request, context: { params: Promise<{ metric: string }> }) {
  const { metric } = await context.params;
  if (!ALLOWED.includes(metric as Metric)) {
    return NextResponse.json({ error: "Invalid metric type" }, { status: 400 });
  }
  if (metric === "co2") {
    return NextResponse.json(
      { error: "CO2 prediction is not available with the configured free providers. Use temperature metric or add a CO2 dataset provider." },
      { status: 400 }
    );
  }

  const data = await buildTemperatureSeries();
  return NextResponse.json(data);
}
