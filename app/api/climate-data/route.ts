import { NextResponse } from "next/server";

const mock = [
  { year: 2018, temp_anomaly: 0.85, co2: 408.5 },
  { year: 2019, temp_anomaly: 0.98, co2: 411.4 },
  { year: 2020, temp_anomaly: 1.02, co2: 414.2 },
  { year: 2021, temp_anomaly: 0.85, co2: 416.4 },
  { year: 2022, temp_anomaly: 0.89, co2: 418.5 },
  { year: 2023, temp_anomaly: 1.18, co2: 421.1 }
];

export async function GET() {
  return NextResponse.json({ data: mock });
}
