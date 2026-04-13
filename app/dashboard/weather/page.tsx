"use client";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/climate/PageHeader";
import WeatherCard from "@/components/climate/WeatherCard";
import ExtremeWeatherAlert from "@/components/climate/ExtremeWeatherAlert";
import { useClimate } from "@/context/ClimateContext";

type WeatherModuleResponse = {
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    sunrise?: string[];
    sunset?: string[];
    uv_index_max?: number[];
  };
};

function formatHourLabel(isoTime: string) {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: "numeric" });
}

function uvCategory(uv: number) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

export default function WeatherPage() {
  const { isWhiteTheme, selectedLocation } = useClimate();
  const [weatherModules, setWeatherModules] = useState<WeatherModuleResponse | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const weatherRes = await fetch(`/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}`, { cache: "no-store" });

        if (!active) return;

        if (weatherRes.ok) {
          const weatherPayload = await weatherRes.json();
          setWeatherModules(weatherPayload);
        } else {
          setWeatherModules(null);
        }
      } catch {
        if (!active) return;
        setWeatherModules(null);
      }
    };

    void load();
    const timer = setInterval(() => void load(), 120000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [selectedLocation.lat, selectedLocation.lon]);

  const hourlyTimeline = useMemo(() => {
    const time = weatherModules?.hourly?.time ?? [];
    const temp = weatherModules?.hourly?.temperature_2m ?? [];
    const humidity = weatherModules?.hourly?.relative_humidity_2m ?? [];
    const wind = weatherModules?.hourly?.wind_speed_10m ?? [];

    if (!time.length) return [];

    const currentHour = new Date().toISOString().slice(0, 13);
    const startIndex = Math.max(0, time.findIndex((t) => t.startsWith(currentHour)));

    return time.slice(startIndex, startIndex + 8).map((t, i) => ({
      time: t,
      temp: temp[startIndex + i],
      humidity: humidity[startIndex + i],
      wind: wind[startIndex + i]
    }));
  }, [weatherModules]);

  const weeklyRows = useMemo(() => {
    const days = weatherModules?.daily?.time ?? [];
    const highs = weatherModules?.daily?.temperature_2m_max ?? [];
    const lows = weatherModules?.daily?.temperature_2m_min ?? [];
    if (!days.length) return [];

    const baseline = highs.length ? highs.reduce((sum, v) => sum + v, 0) / highs.length : 0;

    return days.slice(0, 7).map((day, i) => {
      const anomaly = highs[i] - baseline;
      return {
        day,
        high: highs[i],
        low: lows[i],
        anomaly
      };
    });
  }, [weatherModules]);

  const todaySunrise = weatherModules?.daily?.sunrise?.[0];
  const todaySunset = weatherModules?.daily?.sunset?.[0];
  const uvMax = weatherModules?.daily?.uv_index_max?.[0] ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Weather Dashboard" subtitle="Live observations, humidity, and wind intelligence." backTo="/dashboard" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <WeatherCard />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="glass-panel p-5">
            <h3 className={`text-base font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>Hourly Forecast Timeline</h3>
            <p className={`mt-1 text-xs ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>Next 8 hours for {selectedLocation.shortName || selectedLocation.name}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {hourlyTimeline.length ? (
                hourlyTimeline.map((row) => (
                  <div key={row.time} className={`rounded-xl border p-3 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/20"}`}>
                    <p className={`text-xs font-bold ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>{formatHourLabel(row.time)}</p>
                    <p className={`mt-1 text-xl font-black ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{Math.round(row.temp ?? 0)}°</p>
                    <p className={`text-[11px] ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>RH {Math.round(row.humidity ?? 0)}%</p>
                    <p className={`text-[11px] ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>Wind {Math.round(row.wind ?? 0)} km/h</p>
                  </div>
                ))
              ) : (
                <p className={`col-span-full text-sm ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>Hourly timeline is loading.</p>
              )}
            </div>
          </section>

          <section className="glass-panel p-5">
            <h3 className={`text-base font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>7-Day Forecast and Anomalies</h3>
            <p className={`mt-1 text-xs ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>Daily highs/lows with weekly deviation from local baseline</p>
            <div className="mt-4 space-y-2">
              {weeklyRows.length ? (
                weeklyRows.map((row) => (
                  <div key={row.day} className={`flex items-center justify-between rounded-xl border px-3 py-2 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/20"}`}>
                    <p className={`text-sm font-semibold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>
                      {new Date(row.day).toLocaleDateString([], { weekday: "short" })}
                    </p>
                    <p className={`text-sm ${isWhiteTheme ? "text-slate-700" : "text-slate-300"}`}>{Math.round(row.high)}° / {Math.round(row.low)}°</p>
                    <p className={`text-xs font-bold ${row.anomaly >= 0 ? "text-rose-400" : "text-cyan-400"}`}>
                      {row.anomaly >= 0 ? "+" : ""}{row.anomaly.toFixed(1)}°
                    </p>
                  </div>
                ))
              ) : (
                <p className={`text-sm ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>7-day trend is loading.</p>
              )}
            </div>
          </section>

          <section className="glass-panel p-5">
            <h3 className={`text-base font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>Sunrise, Sunset, and UV Safety</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className={`rounded-xl border p-3 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/20"}`}>
                <p className={`text-xs ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>Sunrise</p>
                <p className={`text-sm font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{todaySunrise ? new Date(todaySunrise).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}</p>
              </div>
              <div className={`rounded-xl border p-3 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/20"}`}>
                <p className={`text-xs ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>Sunset</p>
                <p className={`text-sm font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{todaySunset ? new Date(todaySunset).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}</p>
              </div>
            </div>
            <div className={`mt-3 rounded-xl border p-3 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/20"}`}>
              <p className={`text-xs ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>UV Max Today</p>
              <p className={`text-2xl font-black ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{uvMax.toFixed(1)}</p>
              <p className={`text-xs ${uvMax >= 6 ? "text-rose-400" : uvMax >= 3 ? "text-amber-400" : "text-emerald-400"}`}>
                {uvCategory(uvMax)} - {uvMax >= 6 ? "Use SPF 30+, hat, and shade during midday." : uvMax >= 3 ? "Use sunscreen and sunglasses outdoors." : "Low UV risk for most people."}
              </p>
            </div>
          </section>
        </div>
      </div>
      <ExtremeWeatherAlert />
    </div>
  );
}
