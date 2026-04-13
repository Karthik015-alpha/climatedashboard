import Link from "next/link";

export default function EcoVisionWeather() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">🌤️ Weather Dashboard</h1>
          <p className="text-lg text-slate-200">Comprehensive weather monitoring and forecasting hub.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🌡️</div>
            <div className="text-2xl font-black text-orange-400">23°C</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Current Temp</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">💧</div>
            <div className="text-2xl font-black text-blue-400">63%</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Humidity</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">💨</div>
            <div className="text-2xl font-black text-cyan-400">4.1 km/h</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Wind Speed</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">☀️</div>
            <div className="text-2xl font-black text-yellow-400">6</div>
            <div className="text-xs font-bold text-slate-300 mt-1">UV Index</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link href="#" className="rounded-xl border-l-4 border-orange-400 bg-white/5 p-5 flex flex-col hover:bg-orange-500/10 transition">
            <span className="text-2xl mb-2">🌡️</span>
            <div className="font-bold text-orange-400">Current Weather</div>
            <div className="text-xs text-slate-300 mb-2">Live temperature, humidity, wind & conditions.</div>
            <div className="text-xs font-bold text-orange-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-blue-400 bg-white/5 p-5 flex flex-col hover:bg-blue-500/10 transition">
            <span className="text-2xl mb-2">⏰</span>
            <div className="font-bold text-blue-400">Hourly Forecast</div>
            <div className="text-xs text-slate-300 mb-2">24-hour detailed weather breakdown chart.</div>
            <div className="text-xs font-bold text-blue-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-cyan-400 bg-white/5 p-5 flex flex-col hover:bg-cyan-500/10 transition">
            <span className="text-2xl mb-2">📅</span>
            <div className="font-bold text-cyan-400">7-Day Forecast</div>
            <div className="text-xs text-slate-300 mb-2">Weekly high/low temperature & rain chart.</div>
            <div className="text-xs font-bold text-cyan-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-green-400 bg-white/5 p-5 flex flex-col hover:bg-green-500/10 transition">
            <span className="text-2xl mb-2">🗺️</span>
            <div className="font-bold text-green-400">Weather Map</div>
            <div className="text-xs text-slate-300 mb-2">Interactive precipitation overlay.</div>
            <div className="text-xs font-bold text-green-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-red-400 bg-white/5 p-5 flex flex-col hover:bg-red-500/10 transition">
            <span className="text-2xl mb-2">⚡</span>
            <div className="font-bold text-red-400">Weather Alerts</div>
            <div className="text-xs text-slate-300 mb-2">Severe weather warnings & emergency alerts.</div>
            <div className="text-xs font-bold text-red-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-yellow-400 bg-white/5 p-5 flex flex-col hover:bg-yellow-500/10 transition">
            <span className="text-2xl mb-2">☀️</span>
            <div className="font-bold text-yellow-400">UV Index</div>
            <div className="text-xs text-slate-300 mb-2">Ultraviolet radiation levels & protections.</div>
            <div className="text-xs font-bold text-yellow-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-pink-400 bg-white/5 p-5 flex flex-col hover:bg-pink-500/10 transition">
            <span className="text-2xl mb-2">🌅</span>
            <div className="font-bold text-pink-400">Sunrise / Sunset</div>
            <div className="text-xs text-slate-300 mb-2">Golden hour, twilight & day-length info.</div>
            <div className="text-xs font-bold text-pink-300">Open →</div>
          </Link>
          <Link href="#" className="rounded-xl border-l-4 border-purple-400 bg-white/5 p-5 flex flex-col hover:bg-purple-500/10 transition">
            <span className="text-2xl mb-2">🌬️</span>
            <div className="font-bold text-purple-400">Humidity & Wind</div>
            <div className="text-xs text-slate-300 mb-2">Atmospheric moisture and wind pattern charts.</div>
            <div className="text-xs font-bold text-purple-300">Open →</div>
          </Link>
        </div>
        <div className="bg-white/5 rounded-xl p-5 mt-8">
          <h3 className="font-bold mb-2">📈 7-Day Temperature Range — New Delhi (°C)</h3>
          <div className="h-56 flex items-center justify-center text-slate-400">[7-Day Temperature Chart]</div>
        </div>
      </div>
    </main>
  );
}
