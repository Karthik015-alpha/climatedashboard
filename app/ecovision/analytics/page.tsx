// EcoVision Analytics Page migrated from analytics.html
import Link from "next/link";

export default function EcoVisionAnalytics() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">📊 Climate Analytics</h1>
          <p className="text-lg text-slate-200">Data-driven climate insights with interactive dashboards.</p>
        </div>
        {/* Sub-page nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="#" className="rounded-xl border-l-4 border-orange-400 bg-white/5 p-5 flex flex-col hover:bg-orange-500/10 transition">
            <span className="text-2xl mb-2">🌡️</span>
            <div className="font-bold text-orange-400">Temperature Comparison</div>
            <div className="text-xs text-slate-300 mb-2">City-wise monthly temperature line charts.</div>
            <div className="text-xs font-bold text-orange-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-blue-400 bg-white/5 p-5 flex flex-col hover:bg-blue-500/10 transition">
            <span className="text-2xl mb-2">🌧️</span>
            <div className="font-bold text-blue-400">Rainfall Analysis</div>
            <div className="text-xs text-slate-300 mb-2">Actual vs normal bar charts by city.</div>
            <div className="text-xs font-bold text-blue-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-cyan-400 bg-white/5 p-5 flex flex-col hover:bg-cyan-500/10 transition">
            <span className="text-2xl mb-2">💧</span>
            <div className="font-bold text-cyan-400">Humidity Trends</div>
            <div className="text-xs text-slate-300 mb-2">Monthly humidity percentage line charts.</div>
            <div className="text-xs font-bold text-cyan-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-red-400 bg-white/5 p-5 flex flex-col hover:bg-red-500/10 transition">
            <span className="text-2xl mb-2">⚠️</span>
            <div className="font-bold text-red-400">Extreme Weather</div>
            <div className="text-xs text-slate-300 mb-2">Heatwaves, floods, cyclone event analysis.</div>
            <div className="text-xs font-bold text-red-300">View →</div>
          </Link>
        </div>
        {/* Overview charts placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">🌡️ Monthly Temp — Delhi vs Mumbai vs Nellore (°C)</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">[Temperature Comparison Chart]</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">🌧️ Actual vs Normal Rainfall — India (mm)</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">[Rainfall Comparison Chart]</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">💧 Monthly Humidity (%) — 2024</h3>
            <div className="h-56 flex items-center justify-center text-slate-400">[Humidity Chart]</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">⚠️ Extreme Weather Events — 2024</h3>
            <div className="h-56 flex items-center justify-center text-slate-400">[Extreme Weather Chart]</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-2">🌧️ Annual Rainfall by City (mm) — 2024</h3>
          <div className="h-48 flex items-center justify-center text-slate-400">[Annual Rainfall Bar Chart]</div>
        </div>
      </div>
    </main>
  );
}
