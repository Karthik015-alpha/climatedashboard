// EcoVision Forecast Page migrated from forecast.html
import Link from "next/link";

export default function EcoVisionForecast() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">📅 Forecast</h1>
          <p className="text-lg text-slate-200">7-day, 14-day, monthly & seasonal weather predictions.</p>
        </div>
        {/* Sub-page tabs (static links for now) */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="#" className="tab-btn bg-cyan-700/20 text-cyan-300 px-4 py-2 rounded-lg font-bold text-xs">📅 7-Day</Link>
          <Link href="#" className="tab-btn bg-blue-700/20 text-blue-300 px-4 py-2 rounded-lg font-bold text-xs">📆 14-Day</Link>
          <Link href="#" className="tab-btn bg-indigo-700/20 text-indigo-300 px-4 py-2 rounded-lg font-bold text-xs">📊 Monthly</Link>
          <Link href="#" className="tab-btn bg-green-700/20 text-green-300 px-4 py-2 rounded-lg font-bold text-xs">🌍 Seasonal</Link>
        </div>
        {/* 7-Day Forecast */}
        <div className="bg-white/5 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-2">📅 7-Day Forecast — New Delhi</h3>
          <div className="h-32 flex items-center justify-center text-slate-400 mb-4">[7-Day Forecast Cards]</div>
          <div className="h-56 flex items-center justify-center text-slate-400">[7-Day Forecast Chart]</div>
        </div>
        {/* 14-Day Chart */}
        <div className="bg-white/5 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-2">📆 14-Day Temperature Range (°C)</h3>
          <div className="h-56 flex items-center justify-center text-slate-400">[14-Day Temperature Chart]</div>
        </div>
        {/* Monthly + Seasonal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">📊 Monthly Outlook — March 2026</h3>
            <div className="h-56 flex items-center justify-center text-slate-400">[Monthly Outlook Chart]</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">🌍 Seasonal Summary</h3>
            <div className="h-56 flex items-center justify-center text-slate-400">[Seasonal Summary Chart]</div>
          </div>
        </div>
        {/* Sub-page nav cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="#" className="rounded-xl border-l-4 border-cyan-400 bg-white/5 p-5 flex flex-col hover:bg-cyan-500/10 transition">
            <span className="text-2xl mb-2">📅</span>
            <div className="font-bold text-cyan-400">7-Day Detailed Forecast</div>
            <div className="text-xs text-slate-300 mb-2">Full day-by-day conditions, charts & data.</div>
            <div className="text-xs font-bold text-cyan-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-blue-400 bg-white/5 p-5 flex flex-col hover:bg-blue-500/10 transition">
            <span className="text-2xl mb-2">📆</span>
            <div className="font-bold text-blue-400">14-Day Extended</div>
            <div className="text-xs text-slate-300 mb-2">Long-range temperature and rainfall outlook.</div>
            <div className="text-xs font-bold text-blue-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-indigo-400 bg-white/5 p-5 flex flex-col hover:bg-indigo-500/10 transition">
            <span className="text-2xl mb-2">📊</span>
            <div className="font-bold text-indigo-400">Monthly Outlook</div>
            <div className="text-xs text-slate-300 mb-2">Month-by-month projections and anomalies.</div>
            <div className="text-xs font-bold text-indigo-300">View →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-green-400 bg-white/5 p-5 flex flex-col hover:bg-green-500/10 transition">
            <span className="text-2xl mb-2">🌍</span>
            <div className="font-bold text-green-400">Seasonal Summary</div>
            <div className="text-xs text-slate-300 mb-2">Seasonal trends and climate drivers.</div>
            <div className="text-xs font-bold text-green-300">View →</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
