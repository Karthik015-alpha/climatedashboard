"use client";
import PageHeader from "@/components/climate/PageHeader";
import WeatherCard from "@/components/climate/WeatherCard";
import ExtremeWeatherAlert from "@/components/climate/ExtremeWeatherAlert";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Weather Dashboard" subtitle="Live observations, humidity, and wind intelligence." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <WeatherCard />
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-slate-100">Modules</h3>
          <p className="text-sm text-slate-400">Upcoming hourly, forecast, radar, and UV modules can live here.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Hourly forecast timeline</li>
            <li>• 7-day forecast and anomalies</li>
            <li>• Radar layers (precipitation/cloud)</li>
            <li>• Sunrise, sunset, and UV safety</li>
          </ul>
        </div>
      </div>
      <ExtremeWeatherAlert />
    </div>
  );
}
