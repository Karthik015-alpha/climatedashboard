"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Droplets, Moon, Sun, Thermometer, Wind, Zap } from "lucide-react";

import { useClimate } from "@/context/ClimateContext";
import { fetchWeather, fetchAQI } from "@/lib/weather";

type LandingCity = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

const majorIndianCities: LandingCity[] = [
  { name: "New Delhi", country: "India", latitude: 28.6139, longitude: 77.2090 },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777 },
  { name: "Bengaluru", country: "India", latitude: 12.9716, longitude: 77.5946 },
  { name: "Chennai", country: "India", latitude: 13.0827, longitude: 80.2707 },
  { name: "Kolkata", country: "India", latitude: 22.5726, longitude: 88.3639 },
  { name: "Hyderabad", country: "India", latitude: 17.3850, longitude: 78.4867 },
  { name: "Pune", country: "India", latitude: 18.5204, longitude: 73.8567 },
  { name: "Ahmedabad", country: "India", latitude: 23.0225, longitude: 72.5714 }
];

type WeatherSnippet = {
  temp?: number;
  humidity?: number;
  wind?: number;
};

const phrases = [
  "Monitor real-time environmental data",
  "Track climate patterns globally",
  "Get instant AQI alerts",
  "Predict extreme weather events",
  "Analyze air quality trends"
];

function LandingPage() {
  const { isWhiteTheme, toggleWhiteTheme } = useClimate();
  const defaultMainCity = majorIndianCities[0];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [snippets, setSnippets] = useState<Record<string, WeatherSnippet>>({});
  const [aqi, setAqi] = useState<number | null>(null);
  const [mainLocation, setMainLocation] = useState(defaultMainCity);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        setSubText(current.substring(0, subText.length + 1));
        if (subText.length === current.length) setTimeout(() => setIsDeleting(true), 1400);
      } else {
        setSubText(current.substring(0, subText.length - 1));
        if (subText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, isDeleting ? 40 : 90);
    return () => clearTimeout(timeout);
  }, [subText, isDeleting, phraseIndex]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMainLocation({
          name: "My Location",
          country: "Current",
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      },
      () => {},
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 600000 }
    );
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const hour = new Date().getHours();
        const citySettled = await Promise.allSettled(
          majorIndianCities.map(async (city) => {
            const weather = await fetchWeather(city.latitude, city.longitude);
            return [
              city.name,
              {
                temp: weather.current_weather?.temperature,
                humidity: weather.hourly?.relative_humidity_2m?.[hour],
                wind: weather.current_weather?.windspeed
              }
            ] as const;
          })
        );
        const nextSnippets: Record<string, WeatherSnippet> = {};
        for (const item of citySettled) {
          if (item.status === "fulfilled") {
            const [name, snippet] = item.value;
            nextSnippets[name] = snippet;
          }
        }

        const mainWeather = await fetchWeather(mainLocation.latitude, mainLocation.longitude);
        nextSnippets[mainLocation.name] = {
          temp: mainWeather.current_weather?.temperature,
          humidity: mainWeather.hourly?.relative_humidity_2m?.[hour],
          wind: mainWeather.current_weather?.windspeed
        };

        setSnippets(nextSnippets);

        const a = await fetchAQI(mainLocation.latitude, mainLocation.longitude);
        setAqi(a?.current?.european_aqi ?? null);
      } catch (_) {}
    };
    load();
  }, [mainLocation]);

  const mainCity = snippets[mainLocation.name];

  return (
    <div className={`relative min-h-screen overflow-hidden ${isWhiteTheme ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-white"}`}>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-12">
        <header className="flex items-center justify-between">
          <Link href={{ pathname: "/" }} className="text-lg font-black tracking-[0.2em] uppercase">EcoVision</Link>
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={toggleWhiteTheme}
              className={`rounded-full border px-3 py-2 transition ${isWhiteTheme ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}
              aria-label="Toggle theme"
            >
              {isWhiteTheme ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Link href={{ pathname: "/dashboard" }} className="rounded-full bg-white px-4 py-2 font-semibold text-black shadow-lg shadow-emerald-500/20">Open Dashboard</Link>
          </div>
        </header>
        <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center space-y-6">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur ${isWhiteTheme ? "border-slate-200 bg-white/80 text-slate-700" : "border-white/20 bg-white/10 text-white"}`}>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time Intelligence
            </div>
            <div>
              <p className={`mb-3 text-sm uppercase tracking-[0.3em] ${isWhiteTheme ? "text-slate-500" : "text-white/60"}`}>Welcome to</p>
              <h1 className="text-5xl font-black leading-tight md:text-7xl">EcoVision</h1>
            </div>
            <div className="h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p key={subText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xl font-semibold ${isWhiteTheme ? "text-slate-700" : "text-white/80"}`}>
                  {subText}
                  <span className="animate-pulse">|</span>
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat isWhiteTheme={isWhiteTheme} label="CO₂ ppm" value="421" icon={<Zap size={16} />} />
              <Stat isWhiteTheme={isWhiteTheme} label="Temp Anomaly" value="+1.25°C" icon={<Thermometer size={16} />} />
              <Stat isWhiteTheme={isWhiteTheme} label="Sea Rise" value="3.4 mm" icon={<Droplets size={16} />} />
              <Stat isWhiteTheme={isWhiteTheme} label="India AQI" value={aqi ? `${aqi}` : "--"} icon={<Wind size={16} />} />
            </div>
            <div className="flex flex-wrap gap-3">
              {["Weather", "Climate", "AQI", "Forecast", "Analytics", "Alerts"].map((p) => (
                <Link key={p} href={{ pathname: `/dashboard/${p.toLowerCase()}` }} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/20">
                  {p}
                </Link>
              ))}
            </div>
          </div>
          <div className={`space-y-4 rounded-3xl border p-6 backdrop-blur-xl ${isWhiteTheme ? "border-slate-200 bg-white/80 text-slate-900" : "border-white/20 bg-black/45 text-white"}`}>
            <header className={`flex items-center justify-between border-b pb-4 text-xs uppercase tracking-[0.25em] ${isWhiteTheme ? "border-slate-200" : "border-white/10"}`}>
              <span>Live India Weather</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300">Live</span>
            </header>
            <div className={`rounded-2xl border p-6 text-center ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-white/20 bg-black/40"}`}>
              <p className="text-5xl">☀️</p>
              <h3 className="text-2xl font-bold">{mainLocation.name}</h3>
              <p className={`text-sm ${isWhiteTheme ? "text-slate-600" : "text-white/80"}`}>{mainCity ? "Current" : "Fetching..."}</p>
              <div className="py-6 text-6xl font-black font-mono">{mainCity?.temp !== undefined ? Math.round(mainCity.temp) : "--"}°</div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <Mini isWhiteTheme={isWhiteTheme} label="Humidity" value={mainCity?.humidity !== undefined ? `${Math.round(mainCity.humidity)}%` : "--"} />
                <Mini isWhiteTheme={isWhiteTheme} label="Wind" value={mainCity?.wind !== undefined ? `${Math.round(mainCity.wind)} km/h` : "--"} />
                <Mini isWhiteTheme={isWhiteTheme} label="Feels" value={mainCity?.temp !== undefined ? `${Math.round(mainCity.temp - 2)}°` : "--"} />
              </div>
            </div>
            <div className={`space-y-2 text-xs uppercase tracking-[0.15em] ${isWhiteTheme ? "text-slate-500" : "text-white/75"}`}>Other Cities</div>
            <div className="space-y-2">
              {majorIndianCities.slice(1).map((c) => (
                <div key={c.name} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${isWhiteTheme ? "border-slate-200 bg-white" : "border-white/20 bg-black/40"}`}>
                  <span className="font-semibold">{c.name}</span>
                  <span className="font-mono text-lg font-black">{snippets[c.name]?.temp !== undefined ? Math.round(snippets[c.name].temp as number) : "--"}°</span>
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className={`mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm ${isWhiteTheme ? "border-slate-200 text-slate-600" : "border-white/10 text-white/70"}`}>
          <p>Ready to explore real-time climate intelligence?</p>
          <Link href={{ pathname: "/dashboard" }} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-bold text-black shadow-lg shadow-emerald-500/30">
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;

function Stat({ label, value, icon, isWhiteTheme }: { label: string; value: string; icon: React.ReactNode; isWhiteTheme: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 text-center backdrop-blur ${isWhiteTheme ? "border-slate-200 bg-white" : "border-white/10 bg-white/10"}`}>
      <div className={`mb-1 ${isWhiteTheme ? "text-emerald-600" : "text-emerald-300"}`}>{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isWhiteTheme ? "text-slate-500" : "text-white/60"}`}>{label}</div>
    </div>
  );
}

function Mini({ label, value, isWhiteTheme }: { label: string; value: string; isWhiteTheme: boolean }) {
  return (
    <div className={`rounded-xl border p-3 text-center ${isWhiteTheme ? "border-slate-200 bg-white" : "border-white/15 bg-black/35"}`}>
      <div className="text-lg font-black font-mono">{value}</div>
      <div className={`text-[10px] uppercase tracking-[0.2em] ${isWhiteTheme ? "text-slate-500" : "text-white/80"}`}>{label}</div>
    </div>
  );
}
