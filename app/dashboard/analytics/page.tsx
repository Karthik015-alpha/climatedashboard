"use client";
import PageHeader from "@/components/climate/PageHeader";

const cards = [
  { label: "Heatwave Days", value: "18", note: "YTD vs 12 last year" },
  { label: "Rainfall Deviation", value: "-4.2%", note: "vs seasonal normal" },
  { label: "CO₂ Rise", value: "+2.4 ppm/yr", note: "Rolling 5y" },
  { label: "AQI Good Days", value: "142", note: "Delhi region" }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="KPIs and environmental intelligence." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-panel p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{c.label}</p>
            <p className="text-2xl font-black text-emerald-400">{c.value}</p>
            <p className="text-sm text-slate-400">{c.note}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel p-6 text-sm text-slate-300">Add charts (temperature anomaly, rainfall bars, AQI trends) here using your preferred chart lib.</div>
    </div>
  );
}
