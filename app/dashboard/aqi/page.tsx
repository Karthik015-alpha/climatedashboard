"use client";
import PageHeader from "@/components/climate/PageHeader";

const rows = [
  { city: "New Delhi", aqi: 72, pm25: 42, pm10: 88 },
  { city: "Mumbai", aqi: 44, pm25: 18, pm10: 38 },
  { city: "Bangalore", aqi: 28, pm25: 12, pm10: 26 }
];

export default function AQIPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Air Quality" subtitle="European AQI with particulate composition." backTo="/dashboard" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-4 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>City</span><span>AQI</span><span>PM2.5</span><span>PM10</span>
        </div>
        {rows.map((r) => (
          <div key={r.city} className="grid grid-cols-4 items-center px-4 py-3 text-sm text-slate-200 odd:bg-white/0 even:bg-white/5">
            <span className="font-semibold">{r.city}</span>
            <span className={r.aqi > 60 ? "text-orange-400" : "text-emerald-400"}>{r.aqi}</span>
            <span>{r.pm25} µg/m³</span>
            <span>{r.pm10} µg/m³</span>
          </div>
        ))}
      </div>
      <div className="glass-panel p-6 text-sm text-slate-300">Connect this view to the AQI API proxy for live scores and category badges.</div>
    </div>
  );
}
