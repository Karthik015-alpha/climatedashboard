import { NextResponse } from "next/server";

const CITIES = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 }
];

export async function GET() {
  const data = CITIES.map((c) => {
    const base = 24 + Math.random() * 8;
    const anomaly = 0.5 + Math.random() * 2.5;
    return { ...c, temp: Number((base + anomaly).toFixed(1)), anomaly: Number(anomaly.toFixed(2)) };
  });
  return NextResponse.json(data);
}
