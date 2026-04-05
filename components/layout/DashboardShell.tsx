"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Wind, Moon, Sun } from "lucide-react";
import ExtremeWeatherAlert from "@/components/climate/ExtremeWeatherAlert";
import { useClimate } from "@/context/ClimateContext";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/weather", label: "Weather" },
  { href: "/dashboard/climate", label: "Climate" },
  { href: "/dashboard/aqi", label: "AQI" },
  { href: "/dashboard/radar", label: "Radar" },
  { href: "/dashboard/forecast", label: "Forecast" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/alerts", label: "Alerts" }
];

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isWhiteTheme, toggleWhiteTheme, temp, theme } = useClimate();

  return (
    <div className={`min-h-screen ${isWhiteTheme ? "bg-slate-50" : `bg-climate-dark bg-gradient-to-br ${theme.bg}`}`}>
      <header className={`sticky top-0 z-40 border-b backdrop-blur ${isWhiteTheme ? "border-slate-200 bg-white/80" : `${theme.border} bg-slate-900/70`}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-2 text-white shadow-lg shadow-emerald-500/20">
            <Wind size={18} />
            <span className="text-sm font-bold">EcoVision</span>
          </Link>
          <nav className="flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap text-sm font-semibold">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 transition ${active ? "bg-emerald-500/20 text-emerald-400" : isWhiteTheme ? "text-slate-500 hover:bg-slate-100" : "text-slate-300 hover:bg-white/5"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-mono font-black ${isWhiteTheme ? "border-slate-200 text-slate-700" : `${theme.border} text-emerald-300`}`}>{temp}°C</span>
            <button
              onClick={toggleWhiteTheme}
              className={`rounded-xl border p-2 transition ${isWhiteTheme ? "border-slate-200 bg-slate-100 text-slate-600 hover:bg-amber-50" : `${theme.border} bg-slate-800/60 text-slate-300 hover:bg-amber-500/10 hover:text-amber-200`}`}
              aria-label="Toggle theme"
            >
              {isWhiteTheme ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </header>
      <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        {children}
      </main>
      <ExtremeWeatherAlert />
    </div>
  );
}
