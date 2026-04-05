// EcoVision AQI Page migrated from aqi.html
export default function EcoVisionAQI() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">💨 AQI Monitor</h1>
            <p className="text-lg text-slate-200">Real-time air quality index & interactive pollution charts.</p>
          </div>
          <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full font-bold text-green-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>Live
          </div>
        </div>
        {/* City selector pills placeholder */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="city-pill border-green-400 text-green-300 font-bold px-4 py-2">Delhi</button>
          <button className="city-pill border-blue-400 text-blue-300 font-bold px-4 py-2">Mumbai</button>
          <button className="city-pill border-cyan-400 text-cyan-300 font-bold px-4 py-2">Bangalore</button>
        </div>
        {/* Overview chart placeholder */}
        <div className="bg-white/5 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-2">📊 Current AQI — All Cities</h3>
          <div className="h-56 flex items-center justify-center text-slate-400">[AQI Bar Chart]</div>
        </div>
        {/* Featured city + Pollutants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Dial */}
          <div className="bg-white/5 rounded-xl p-5">
            <h3 className="font-bold mb-2">Delhi — AQI Level</h3>
            <div className="flex items-center gap-7 flex-wrap">
              <div className="w-44 h-44 flex items-center justify-center text-slate-400 bg-slate-900/30 rounded-full">[AQI Dial]</div>
              <div className="flex flex-col gap-2">
                <div className="poll-bar">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-100">PM2.5</span>
                    <span className="font-black text-orange-400">42 µg/m³</span>
                  </div>
                  <div className="h-2 rounded bg-orange-400/30 w-32"><div className="h-2 rounded bg-orange-400" style={{ width: '60%' }}></div></div>
                </div>
                <div className="poll-bar">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-100">PM10</span>
                    <span className="font-black text-yellow-400">88 µg/m³</span>
                  </div>
                  <div className="h-2 rounded bg-yellow-400/30 w-32"><div className="h-2 rounded bg-yellow-400" style={{ width: '80%' }}></div></div>
                </div>
                <div className="poll-bar">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-100">NO₂</span>
                    <span className="font-black text-cyan-400">32 µg/m³</span>
                  </div>
                  <div className="h-2 rounded bg-cyan-400/30 w-32"><div className="h-2 rounded bg-cyan-400" style={{ width: '40%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
          {/* Placeholder for more city info or charts */}
          <div className="bg-white/5 rounded-xl p-5 flex items-center justify-center text-slate-400">[More City AQI Details]</div>
        </div>
      </div>
    </main>
  );
}
