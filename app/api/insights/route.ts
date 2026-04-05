import { NextResponse } from "next/server";

const INSIGHTS = [
  "Temperature shows a 1.2°C rise compared to pre-industrial levels. High risk in coastal areas.",
  "CO₂ emissions have reached record highs (421 ppm). Immediate policy interventions required.",
  "Delhi's AQI indicates severe pollution levels. Warning issued for sensitive groups.",
  "Heatwave frequency has tripled since the 1970s; urban heat islands amplify risk.",
  "Monsoon variability is widening; plan for both drought and flood contingencies."
];

export async function GET() {
  const insight = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];
  return NextResponse.json({ text: insight, severity: "high" });
}
