// EcoVision Radar Page migrated from radar.html
export default function EcoVisionRadar() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">📡 Radar & Satellite</h1>
          <p className="text-lg text-slate-200">Live radar, cloud coverage, satellite imagery and storm tracking.</p>
        </div>
        {/* Layer buttons (static for now) */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="layer-btn bg-purple-700/20 text-purple-300 px-4 py-2 rounded-lg font-bold text-xs">🌧️ Rain Radar</button>
          <button className="layer-btn bg-slate-700/20 text-slate-300 px-4 py-2 rounded-lg font-bold text-xs">☁️ Cloud Map</button>
          <button className="layer-btn bg-orange-700/20 text-orange-300 px-4 py-2 rounded-lg font-bold text-xs">🌡️ Temp Overlay</button>
          <button className="layer-btn bg-cyan-700/20 text-cyan-300 px-4 py-2 rounded-lg font-bold text-xs">💨 Wind</button>
          <button className="layer-btn bg-blue-700/20 text-blue-300 px-4 py-2 rounded-lg font-bold text-xs">🛰️ Satellite</button>
        </div>
        {/* Map placeholder */}
        <div className="bg-white/5 rounded-xl p-2 mb-8">
          <div className="h-[500px] flex items-center justify-center text-slate-400 rounded-2xl bg-slate-900/30">[Interactive Map Placeholder]</div>
        </div>
        {/* Cyclone tracker */}
        <h2 className="text-lg font-extrabold text-slate-100 mb-4">🌀 Active Storm Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border-l-4 border-purple-400 rounded-xl p-5 flex gap-3">
            <div className="text-3xl">🌀</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-slate-100 text-base">Cyclone Biparjoy</strong>
                <span className="bg-purple-600/30 text-purple-300 text-xs font-bold px-2 py-1 rounded-full">Very Severe</span>
              </div>
              <p className="text-xs text-slate-400 mb-1">📍 Arabian Sea — 18.5°N 66.2°E</p>
              <p className="text-sm text-slate-200">💨 145 km/h winds · Moving NNW at 8 km/h</p>
            </div>
          </div>
          <div className="bg-white/5 border-l-4 border-red-400 rounded-xl p-5 flex gap-3">
            <div className="text-3xl">🌀</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-slate-100 text-base">Cyclone Mocha</strong>
                <span className="bg-red-600/30 text-red-300 text-xs font-bold px-2 py-1 rounded-full">Super Cyclone</span>
              </div>
              <p className="text-xs text-slate-400 mb-1">📍 Bay of Bengal — 14.2°N 92.8°E</p>
              <p className="text-sm text-slate-200">💨 185 km/h winds · Moving NNE at 12 km/h</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 flex items-center justify-center border-2 border-dashed border-slate-700">
            <p className="text-slate-400 text-sm">No additional active systems</p>
          </div>
        </div>
      </div>
    </main>
  );
}
