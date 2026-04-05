// EcoVision Climate Page migrated from climate.html
import Link from "next/link";

export default function EcoVisionClimate() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">📈 Climate Monitoring</h1>
          <p className="text-lg text-slate-200">Long-term climate trend analysis with interactive charts.</p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🌡️</div>
            <div className="text-2xl font-black text-orange-400">+1.25°C</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Global Temp Anomaly</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">☁️</div>
            <div className="text-2xl font-black text-green-400">424 ppm</div>
            <div className="text-xs font-bold text-slate-300 mt-1">CO₂ Level</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🌊</div>
            <div className="text-2xl font-black text-blue-400">+101 mm</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Sea Level Rise</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🧊</div>
            <div className="text-2xl font-black text-cyan-400">-13%/dec</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Arctic Ice Loss</div>
          </div>
        </div>
        {/* Sub-page feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link href="#" className="rounded-xl border-l-4 border-orange-400 bg-white/5 p-5 flex flex-col hover:bg-orange-500/10 transition">
            <span className="text-2xl mb-2">🌡️</span>
            <div className="font-bold text-orange-400">Temperature Trends</div>
            <div className="text-xs text-slate-300 mb-2">Historical global & India temperature anomaly charts.</div>
            <div className="text-xs font-bold text-orange-300">View Charts →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-blue-400 bg-white/5 p-5 flex flex-col hover:bg-blue-500/10 transition">
            <span className="text-2xl mb-2">🌧️</span>
            <div className="font-bold text-blue-400">Rainfall Trends</div>
            <div className="text-xs text-slate-300 mb-2">Monthly actual vs normal rainfall bar charts.</div>
            <div className="text-xs font-bold text-blue-300">View Charts →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-green-400 bg-white/5 p-5 flex flex-col hover:bg-green-500/10 transition">
            <span className="text-2xl mb-2">☁️</span>
            <div className="font-bold text-green-400">CO₂ Levels</div>
            <div className="text-xs text-slate-300 mb-2">Atmospheric CO₂ concentration since 1990.</div>
            <div className="text-xs font-bold text-green-300">View Charts →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-cyan-400 bg-white/5 p-5 flex flex-col hover:bg-cyan-500/10 transition">
            <span className="text-2xl mb-2">🌊</span>
            <div className="font-bold text-cyan-400">Sea Level Rise</div>
            <div className="text-xs text-slate-300 mb-2">Ocean level rise from satellite altimetry data.</div>
            <div className="text-xs font-bold text-cyan-300">View Charts →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-red-400 bg-white/5 p-5 flex flex-col hover:bg-red-500/10 transition">
            <span className="text-2xl mb-2">🔥</span>
            <div className="font-bold text-red-400">Global Warming Indicators</div>
            <div className="text-xs text-slate-300 mb-2">Ice loss, coral bleaching, extreme event metrics.</div>
            <div className="text-xs font-bold text-red-300">View Charts →</div>
          </Link>
        </div>
        {/* Overview charts placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">🌡️ Global Temp Anomaly (°C)</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">[Global Temp Anomaly Chart]</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">🌧️ Rainfall — Actual vs Normal (mm)</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">[Rainfall Chart]</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-2">☁️ CO₂ Concentration Over Time (ppm)</h3>
          <div className="h-56 flex items-center justify-center text-slate-400">[CO₂ Chart]</div>
        </div>
      </div>
    </main>
  );
}
