"use client";
import PageHeader from "@/components/climate/PageHeader";
import ExtremeWeatherAlert from "@/components/climate/ExtremeWeatherAlert";

const alerts = [
  { title: "Heatwave Warning", region: "Northern India", severity: "Extreme", color: "text-red-400" },
  { title: "Heavy Rain Advisory", region: "Konkan Coast", severity: "High", color: "text-blue-300" },
  { title: "Air Quality Alert", region: "Delhi NCR", severity: "Moderate", color: "text-amber-300" }
];

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Alerts" subtitle="Real-time extreme weather notices." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {alerts.map((a) => (
          <div key={a.title} className="glass-panel p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{a.region}</p>
            <p className="text-lg font-black text-slate-100">{a.title}</p>
            <p className={`text-sm font-semibold ${a.color}`}>{a.severity}</p>
          </div>
        ))}
      </div>
      <ExtremeWeatherAlert />
    </div>
  );
}
