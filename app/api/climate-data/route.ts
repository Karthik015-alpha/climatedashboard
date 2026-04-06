import { NextResponse } from "next/server";

type ClimateRow = {
  year: number;
  temp_mean: number | null;
  temp_anomaly: number | null;
};

const LAT = 28.6139;
const LON = 77.2090;

function avg(values: number[]) {
  if (!values.length) return null;
  const total = values.reduce((sum, n) => sum + n, 0);
  return total / values.length;
}

export async function GET() {
  const nowYear = new Date().getUTCFullYear();
  const startYear = nowYear - 6;
  const endYear = nowYear - 1;

  const rows: ClimateRow[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_mean`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      rows.push({ year, temp_mean: null, temp_anomaly: null });
      continue;
    }
    const payload = await res.json();
    const values = (payload?.daily?.temperature_2m_mean || []).filter((n: unknown) => typeof n === "number") as number[];
    const mean = avg(values);
    rows.push({
      year,
      temp_mean: mean !== null ? Number(mean.toFixed(2)) : null,
      temp_anomaly: null
    });
  }

  const baseline = avg(rows.map((r) => r.temp_mean).filter((n): n is number => typeof n === "number"));
  const data = rows.map((r) => ({
    ...r,
    temp_anomaly:
      baseline !== null && r.temp_mean !== null ? Number((r.temp_mean - baseline).toFixed(2)) : null
  }));

  return NextResponse.json({
    location: { name: "Delhi", lat: LAT, lon: LON },
    baselineTemp: baseline !== null ? Number(baseline.toFixed(2)) : null,
    data
  });
}
