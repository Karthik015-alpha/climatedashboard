
"use client";
import PageHeader from "@/components/climate/PageHeader";
import { useClimate } from "@/context/ClimateContext";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ForecastPage() {
  const { isWhiteTheme } = useClimate();
  return (
    <div className="space-y-6">
      <PageHeader title="Forecast" subtitle="7-day projection with highs, lows, and conditions." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((d, i) => (
          <div key={d} className="glass-panel p-4">
            <div className="flex items-center justify-between">
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isWhiteTheme ? "text-slate-700" : "text-slate-500"}`}>{d}</p>
              <span className="text-xl">{["☀️", "⛅", "🌦️", "🌧️"][i % 4]}</span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className={`text-3xl font-black ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{25 + (i % 4)}°</span>
              <span className={`text-sm ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>{17 + (i % 3)}°</span>
            </div>
            <p className={`mt-2 text-sm ${isWhiteTheme ? "text-slate-700" : "text-slate-400"}`}>Feels like {24 + (i % 3)}°C • Humidity {(50 + i * 3)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
