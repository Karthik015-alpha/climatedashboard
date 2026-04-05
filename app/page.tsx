"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Droplets, Thermometer, Wind, Zap } from "lucide-react";
import { fetchWeather, fetchAQI } from "@/lib/weather";

const cities = [
  { name: "New Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 }
];

const phrases = [
  "Real-Time Weather Monitoring",
  "Climate Change Analytics",
  "AQI Air Quality Monitoring",
  "Live Radar & Satellite Maps",
  "Predictive Climate Intelligence",
  "Extreme Weather Alerts"
];

type WeatherSnippet = { temp?: number; humidity?: number; wind?: number };

export default function LandingPage() {
  const defaultMainCity = cities[0];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [snippets, setSnippets] = useState<Record<string, WeatherSnippet>>({});
  const [aqi, setAqi] = useState<number | null>(null);
  const [mainLocation, setMainLocation] = useState(defaultMainCity);

  // Typing animation
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

  // Use browser geolocation when available for the main live card.
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMainLocation({
          name: "My Location",
          lat: coords.latitude,
          lon: coords.longitude
        });
      },
      () => {
        // Keep default city when location permission is denied/unavailable.
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 600000 }
    );
  }, []);

  // Lightweight data pull for hero and side list.
  useEffect(() => {
    const load = async () => {
      try {
        const hour = new Date().getHours();
        const citySettled = await Promise.allSettled(
          cities.map(async (city) => {
            const weather = await fetchWeather(city.lat, city.lon);
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

        const mainWeather = await fetchWeather(mainLocation.lat, mainLocation.lon);
        nextSnippets[mainLocation.name] = {
          temp: mainWeather.current_weather?.temperature,
          humidity: mainWeather.hourly?.relative_humidity_2m?.[hour],
          wind: mainWeather.current_weather?.windspeed
        };

        setSnippets(nextSnippets);

        const a = await fetchAQI(mainLocation.lat, mainLocation.lon);
        setAqi(a?.current?.european_aqi ?? null);
      } catch (_) { /* ignore for landing */ }
    };
    load();
  }, [mainLocation]);

  const mainCity = snippets[mainLocation.name];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-80" style={{ filter: "brightness(1.1) contrast(1.1) saturate(1.1)" }}>
          <source src="/cyclone.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-[0.2em] uppercase">EcoVision</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="rounded-full border border-white/20 px-4 py-2 font-semibold hover:bg-white/10">Login</Link>
            <Link href="/dashboard" className="rounded-full bg-white px-4 py-2 font-semibold text-black shadow-lg shadow-emerald-500/20">Open Dashboard</Link>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time Intelligence
            </div>

            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">Welcome to</p>
              <h1 className="text-5xl font-black leading-tight md:text-7xl">EcoVision</h1>
            </div>

            <div className="h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p key={subText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white/80">
                  {subText}
                  <span className="animate-pulse">|</span>
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="CO₂ ppm" value="421" icon={<Zap size={16} />} />
              <Stat label="Temp Anomaly" value="+1.25°C" icon={<Thermometer size={16} />} />
              <Stat label="Sea Rise" value="3.4 mm" icon={<Droplets size={16} />} />
              <Stat label="India AQI" value={aqi ? `${aqi}` : "--"} icon={<Wind size={16} />} />
            </div>

            <div className="flex flex-wrap gap-3">
              {["Weather", "Climate", "AQI", "Radar", "Forecast", "Analytics", "Alerts"].map((p) => (
                <Link key={p} href={`/dashboard/${p.toLowerCase()}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/20">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/20 bg-black/45 p-6 backdrop-blur-xl">
            <header className="flex items-center justify-between border-b border-white/10 pb-4 text-xs uppercase tracking-[0.25em]">
              <span>Live India Weather</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300">Live</span>
            </header>
            <div className="rounded-2xl border border-white/20 bg-black/40 p-6 text-center">
              <p className="text-5xl">☀️</p>
              <h3 className="text-2xl font-bold">{mainLocation.name}</h3>
              <p className="text-sm text-white/80">{mainCity ? "Current" : "Fetching..."}</p>
              <div className="py-6 text-6xl font-black font-mono">{mainCity?.temp !== undefined ? Math.round(mainCity.temp) : "--"}°</div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <Mini label="Humidity" value={mainCity?.humidity !== undefined ? `${Math.round(mainCity.humidity)}%` : "--"} />
                <Mini label="Wind" value={mainCity?.wind !== undefined ? `${Math.round(mainCity.wind)} km/h` : "--"} />
                <Mini label="Feels" value={mainCity?.temp !== undefined ? `${Math.round(mainCity.temp - 2)}°` : "--"} />
              </div>
            </div>
            <div className="space-y-2 text-xs uppercase tracking-[0.15em] text-white/75">Other Cities</div>
            <div className="space-y-2">
              {cities.slice(1).map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm">
                  <span className="font-semibold">{c.name}</span>
                  <span className="font-mono text-lg font-black">{snippets[c.name]?.temp !== undefined ? Math.round(snippets[c.name].temp as number) : "--"}°</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
          <p>Ready to explore real-time climate intelligence?</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-bold text-black shadow-lg shadow-emerald-500/30">
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </footer>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
      <div className="mb-1 text-emerald-300">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">{label}</div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/35 p-3 text-center">
      <div className="text-lg font-black font-mono">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">{label}</div>
    </div>
  );
}
