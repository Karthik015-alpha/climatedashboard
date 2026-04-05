"use client";

import PageHeader from "@/components/climate/PageHeader";
import WeatherCard from "@/components/climate/WeatherCard";
import Link from "next/link";
import { useClimate } from "@/context/ClimateContext";

const modules = [
  { title: "Weather", desc: "Live conditions, maps, and forecasts.", href: "/dashboard/weather" },
  { title: "Climate", desc: "Long-term trends and indicators.", href: "/dashboard/climate" },
  { title: "AQI", desc: "Air quality monitoring across regions.", href: "/dashboard/aqi" },
  { title: "Radar", desc: "Interactive radar and satellite layers.", href: "/dashboard/radar" },
  { title: "Forecast", desc: "7-day projections and hourly views.", href: "/dashboard/forecast" },
  { title: "Analytics", desc: "Data stories and KPIs.", href: "/dashboard/analytics" },
  { title: "Alerts", desc: "Extreme weather notifications.", href: "/dashboard/alerts" }
];

export default function DashboardOverviewPage() {
  const { isWhiteTheme } = useClimate();
  return (
    <div className="space-y-6">
      <PageHeader title="Control Center" subtitle="Unified weather, climate, AQI, and alert intelligence." backTo="/" backLabel="Home" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <WeatherCard />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
