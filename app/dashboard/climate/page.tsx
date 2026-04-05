"use client";
import PageHeader from "@/components/climate/PageHeader";

const indicators = [
  { label: "CO₂ concentration", value: "424 ppm", accent: "text-emerald-400" },
  { label: "Temp anomaly", value: "+1.18°C", accent: "text-orange-400" },
  { label: "Sea level rise", value: "+3.7 mm/yr", accent: "text-blue-400" },
  { label: "Extreme events", value: "3x since 1970s", accent: "text-red-400" }
];

export default function ClimatePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Climate Monitoring" subtitle="Long-term climate indicators and scenario tracking." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {indicators.map((i) => (
          <div key={i.label} className="glass-panel p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{i.label}</p>
            <p className={`text-2xl font-black ${i.accent}`}>{i.value}</p>
            <p className="text-sm text-slate-400">Updated with latest observational datasets.</p>
          </div>
        ))}
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-slate-100">Scenarios</h3>
        <p className="text-sm text-slate-400">Overlay RCP/SSP scenarios, rainfall trends, cryosphere, and heatwave outlooks here.</p>
      </div>
    </div>
  );
}
