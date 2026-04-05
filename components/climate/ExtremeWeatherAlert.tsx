"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X, CloudLightning, Thermometer, Wind, Zap } from "lucide-react";
import { useClimate } from "@/context/ClimateContext";

const ALERTS = {
  thunderstorm: { title: "Extreme Thunderstorm Warning", message: "High risk of lightning strikes.", image: "/alerts/cyclone.svg", color: "from-purple-600 to-red-600", icon: <CloudLightning className="text-white" /> },
  heatwave: { title: "Critical Heatwave Alert", message: "Temperatures exceed safe thresholds.", image: "/alerts/heatwave.svg", color: "from-orange-600 to-red-700", icon: <Zap className="text-white" /> },
  flood: { title: "Flood Emergency Alert", message: "Heavy rainfall and rising water levels detected.", image: "/alerts/flood.svg", color: "from-blue-700 to-slate-900", icon: <Wind className="text-white" /> },
  blizzard: { title: "Severe Blizzard Warning", message: "Freezing temperatures and whiteout conditions.", image: "/alerts/blizzard.svg", color: "from-blue-400 to-blue-800", icon: <Thermometer className="text-white" /> }
} as const;

export default function ExtremeWeatherAlert() {
  const { temp, activeWeatherCode } = useClimate();
  const [alert, setAlert] = useState<(typeof ALERTS)[keyof typeof ALERTS] | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let type: keyof typeof ALERTS | null = null;
    if (activeWeatherCode >= 95) type = "thunderstorm";
    else if (temp >= 45) type = "heatwave";
    else if (activeWeatherCode >= 61 && activeWeatherCode <= 65) type = "flood";
    else if (temp < 0 && activeWeatherCode >= 71) type = "blizzard";
    setAlert(type ? ALERTS[type] : null);
  }, [temp, activeWeatherCode, dismissed]);

  if (!alert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed bottom-10 right-10 z-[1000] w-[450px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="relative h-56">
          <img src={alert.image} alt="Alert" className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${alert.color} opacity-60`} />
          <button onClick={() => { setAlert(null); setDismissed(true); }} className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-black/60">
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-8 flex items-center gap-3">
            <div className="rounded-2xl border border-white/30 bg-white/20 p-3 backdrop-blur-xl">{alert.icon}</div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white drop-shadow-md">Hazard Protocol</h1>
              <p className="text-[10px] font-bold uppercase text-white/70">Real-Time Detection</p>
            </div>
          </div>
        </div>
        <div className="p-8 pb-10">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="text-yellow-400" size={20} />
            <h2 className="text-xl font-black tracking-tight">{alert.title}</h2>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">{alert.message}</p>
          <div className="flex gap-4">
            <button className="flex-1 rounded-2xl bg-white py-3 text-sm font-bold tracking-wide text-black transition hover:bg-slate-200">Safety Protocol</button>
            <button className="flex-1 rounded-2xl border border-white/10 bg-white/10 py-3 text-sm font-bold tracking-wide transition hover:bg-white/20">Track Live</button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}
