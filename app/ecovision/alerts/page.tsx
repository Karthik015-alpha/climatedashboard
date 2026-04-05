// EcoVision Alerts Page migrated from alerts.html

export default function EcoVisionAlerts() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">🔔 Weather Alerts</h1>
            <p className="text-lg text-slate-200">Active warnings, advisories and severe weather notifications.</p>
          </div>
          <div className="flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full font-bold text-red-400">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>Live
          </div>
        </div>
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🔴</div>
            <div className="text-2xl font-black text-red-400">3</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Severe Alerts</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🟠</div>
            <div className="text-2xl font-black text-orange-400">5</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Moderate Alerts</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">🟡</div>
            <div className="text-2xl font-black text-yellow-400">4</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Watch Advisories</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl">✅</div>
            <div className="text-2xl font-black text-green-400">12</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Areas Safe</div>
          </div>
        </div>
        {/* Filter bar (static for now) */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="filter-btn active bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase">All (12)</button>
          <button className="filter-btn bg-red-700/20 text-red-400 px-4 py-2 rounded-lg font-bold text-xs uppercase">🔴 Extreme</button>
          <button className="filter-btn bg-orange-700/20 text-orange-400 px-4 py-2 rounded-lg font-bold text-xs uppercase">🟠 Severe</button>
          <button className="filter-btn bg-yellow-700/20 text-yellow-400 px-4 py-2 rounded-lg font-bold text-xs uppercase">🟡 Moderate</button>
          <button className="filter-btn bg-blue-700/20 text-blue-400 px-4 py-2 rounded-lg font-bold text-xs uppercase">🔵 Watch</button>
        </div>
        {/* Alerts list placeholder */}
        <div className="mb-8 text-slate-400">(Alerts list would be rendered here.)</div>
        {/* Emergency contacts */}
        <h2 className="text-lg font-extrabold text-slate-100 mb-3">📞 Emergency Contacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-bold text-slate-100 mb-1">NDMA</div>
            <div className="text-xs text-slate-400 mb-1">National Disaster Management</div>
            <div className="text-lg font-black text-red-400 mt-2">1078</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl mb-2">🚓</div>
            <div className="font-bold text-slate-100 mb-1">Police</div>
            <div className="text-xs text-slate-400 mb-1">Emergency Response</div>
            <div className="text-lg font-black text-red-400 mt-2">100</div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex flex-col items-center">
            <div className="text-2xl mb-2">🚒</div>
            <div className="font-bold text-slate-100 mb-1">Fire</div>
            <div className="text-xs text-slate-400 mb-1">Fire & Rescue</div>
            <div className="text-lg font-black text-red-400 mt-2">101</div>
          </div>
        </div>
      </div>
    </main>
  );
}
