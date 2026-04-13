"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/climate/PageHeader";
import WeatherCard from "@/components/climate/WeatherCard";
import LocationSearch from "@/components/climate/LocationSearch";
import Link from "next/link";
import { useClimate } from "@/context/ClimateContext";
import { fetchAQI, fetchWeather, weatherLabel } from "@/lib/weather";
import { generateWeatherReportPDF } from "@/utils/pdf";

const modules = [
  { title: "Weather", desc: "Live conditions, maps, and forecasts.", href: "/dashboard/weather" },
  { title: "Climate", desc: "Long-term trends and indicators.", href: "/dashboard/climate" },
  { title: "AQI", desc: "Air quality monitoring across regions.", href: "/dashboard/aqi" },
  { title: "Forecast", desc: "7-day projections and hourly views.", href: "/dashboard/forecast" },
  { title: "Analytics", desc: "Data stories and KPIs.", href: "/dashboard/analytics" },
  { title: "Alerts", desc: "Extreme weather notifications.", href: "/dashboard/alerts" }
];

export default function DashboardOverviewPage() {
  const { isWhiteTheme, selectedLocation, setSelectedLocation } = useClimate();
  const [loadingReport, setLoadingReport] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportPayload, setReportPayload] = useState<any>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoadingReport(true);
      setReportError(null);
      try {
        const [weather, aqi] = await Promise.all([
          fetchWeather(selectedLocation.lat, selectedLocation.lon),
          fetchAQI(selectedLocation.lat, selectedLocation.lon)
        ]);
        const hour = new Date().getHours();
        const forecast = (weather.daily?.time || []).map((d, i) => ({
          date: d,
          min: weather.daily?.temperature_2m_min?.[i],
          max: weather.daily?.temperature_2m_max?.[i],
          weatherCode: weather.daily?.weathercode?.[i]
        }));

        if (!active) return;
        setReportPayload({
          location: {
            name: selectedLocation.name,
            lat: selectedLocation.lat,
            lon: selectedLocation.lon,
            formatted_address: selectedLocation.formatted_address
          },
          weather: {
            temperature: weather.current_weather?.temperature,
            humidity: weather.hourly?.relative_humidity_2m?.[hour],
            windspeed: weather.current_weather?.windspeed,
            weatherCode: weather.current_weather?.weathercode,
            weatherLabel: weatherLabel(weather.current_weather?.weathercode ?? 0)
          },
          aqi: {
            europeanAqi: aqi?.current?.european_aqi,
            pm10: aqi?.current?.pm10,
            pm2_5: aqi?.current?.pm2_5,
            ozone: aqi?.current?.ozone,
            nitrogenDioxide: aqi?.current?.nitrogen_dioxide
          },
          forecast,
          generatedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
        });
      } catch {
        if (!active) return;
        setReportError("Could not load report data for the selected place.");
        setReportPayload(null);
      } finally {
        if (active) setLoadingReport(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [selectedLocation]);

  const safeFilename = useMemo(() => {
    const base = selectedLocation.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return `weather-report-${base || "location"}.pdf`;
  }, [selectedLocation.name]);

  const onDownloadReport = async () => {
    if (!reportPayload) return;
    setDownloading(true);
    try {
      generateWeatherReportPDF(reportPayload, safeFilename);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Control Center" subtitle="Unified weather, climate, AQI, and alert intelligence." backTo="/" backLabel="Home" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <WeatherCard />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="clean-card space-y-4 bg-white/5 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={`text-sm font-bold ${isWhiteTheme ? "text-emerald-700" : "text-emerald-300"}`}>Weather Report PDF</p>
                <p className={`mt-1 text-sm ${isWhiteTheme ? "text-slate-700" : "text-slate-300"}`}>
                  Download a full weather + AQI report for any selected place.
                </p>
              </div>
              <button
                onClick={onDownloadReport}
                disabled={!reportPayload || loadingReport || downloading}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  !reportPayload || loadingReport || downloading
                    ? "cursor-not-allowed bg-slate-300 text-slate-500"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
              >
                {downloading ? "Preparing PDF..." : "Download Report"}
              </button>
            </div>

            <LocationSearch
              compact
              showMap={false}
              autoLocateOnMount={false}
              selected={{
                name: selectedLocation.name,
                lat: selectedLocation.lat,
                lon: selectedLocation.lon,
                formatted_address: selectedLocation.formatted_address
              }}
              onSelect={(loc) =>
                setSelectedLocation({
                  name: loc.name,
                  lat: loc.lat,
                  lon: loc.lon,
                  shortName: loc.name,
                  formatted_address: loc.formatted_address,
                  city: loc.name,
                  state: "",
                  country: ""
                })
              }
            />

            <div className={`grid grid-cols-2 gap-3 text-sm ${isWhiteTheme ? "text-slate-700" : "text-slate-300"}`}>
              <div className="rounded-xl border border-white/15 bg-black/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Temperature</p>
                <p className="mt-1 text-lg font-black">{reportPayload?.weather?.temperature !== undefined ? `${Math.round(reportPayload.weather.temperature)}°C` : "--"}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Humidity</p>
                <p className="mt-1 text-lg font-black">{reportPayload?.weather?.humidity !== undefined ? `${Math.round(reportPayload.weather.humidity)}%` : "--"}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Wind</p>
                <p className="mt-1 text-lg font-black">{reportPayload?.weather?.windspeed !== undefined ? `${Math.round(reportPayload.weather.windspeed)} km/h` : "--"}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">AQI</p>
                <p className="mt-1 text-lg font-black">{reportPayload?.aqi?.europeanAqi !== undefined ? `${Math.round(reportPayload.aqi.europeanAqi)}` : "--"}</p>
              </div>
            </div>

            {loadingReport && <p className="text-xs text-slate-500">Loading report metrics...</p>}
            {reportError && <p className="text-xs text-rose-500">{reportError}</p>}
          </div>

          {modules.map((m) => (
            <Link key={m.href} href={{ pathname: m.href }} className="clean-card bg-white/5">
              <p className={`text-sm font-bold ${isWhiteTheme ? "text-emerald-700" : "text-emerald-300"}`}>{m.title}</p>
              <p className={`mt-2 text-sm ${isWhiteTheme ? "text-slate-700" : "text-slate-300"}`}>{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
