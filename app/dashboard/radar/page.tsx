"use client";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/climate/PageHeader";

export default function RadarPage() {
  const [tileTemplate, setTileTemplate] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setError(null);
        const res = await fetch("/api/radar/tiles", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load radar layer");
        const payload = await res.json();
        if (!active) return;
        setTileTemplate(payload.tileTemplate || null);
        setLastUpdated(typeof payload.latestTimestamp === "number" ? payload.latestTimestamp : null);
      } catch {
        if (!active) return;
        setError("Unable to load RainViewer radar metadata right now.");
      }
    };

    void load();
    const id = setInterval(() => {
      void load();
    }, 120000);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const sampleTile = useMemo(() => {
    if (!tileTemplate) return null;
    return tileTemplate.replace("{z}", "3").replace("{x}", "4").replace("{y}", "3");
  }, [tileTemplate]);

  return (
    <div className="space-y-6">
      <PageHeader title="Radar & Satellite" subtitle="Overlay precipitation, clouds, and wind fields." backTo="/dashboard" />
      <div className="glass-panel space-y-4 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Provider: RainViewer</p>
        <p className="text-sm text-slate-300">
          {lastUpdated
            ? `Last radar frame: ${new Date(lastUpdated * 1000).toLocaleString()}`
            : "Loading latest radar frame..."}
        </p>
        {tileTemplate && (
          <p className="break-all rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">{tileTemplate}</p>
        )}
        {sampleTile && (
          <img src={sampleTile} alt="RainViewer sample radar tile" className="h-52 w-full rounded-xl border border-white/10 object-cover" />
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {["Precipitation (Radar)", "Frame Refresh: 2 min", "Tile Size: 256", "Color Scheme: 1_1"].map((t) => (
          <div key={t} className="glass-panel p-4 text-sm text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  );
}
