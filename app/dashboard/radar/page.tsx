"use client";
import PageHeader from "@/components/climate/PageHeader";

export default function RadarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radar & Satellite" subtitle="Overlay precipitation, clouds, and wind fields." backTo="/dashboard" />
      <div className="glass-panel flex h-[420px] items-center justify-center text-slate-400">
        Map layers (leaflet + radar tiles) can be plugged in here.
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {["Precipitation", "Cloud Cover", "Wind Speed", "Temperature"].map((t) => (
          <div key={t} className="glass-panel p-4 text-sm text-slate-300">{t} layer slot</div>
        ))}
      </div>
    </div>
  );
}
