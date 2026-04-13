export default function EcoVisionHome() {
  return (
    <main style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "#000", minHeight: "100vh" }}>
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-5xl font-extrabold mb-4" style={{ fontFamily: "Orbitron, monospace" }}>
          EcoVision
        </h1>
        <p className="text-xl mb-8 max-w-xl text-center">
          Real-time climate monitoring, air quality, weather forecasts and environmental analytics for India and the world.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/ecovision/alerts" className="rounded-lg bg-emerald-600 px-6 py-3 font-bold hover:bg-emerald-700 transition">Alerts</a>
          <a href="/ecovision/analytics" className="rounded-lg bg-cyan-600 px-6 py-3 font-bold hover:bg-cyan-700 transition">Analytics</a>
          <a href="/ecovision/aqi" className="rounded-lg bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700 transition">AQI</a>
          <a href="/ecovision/climate" className="rounded-lg bg-green-600 px-6 py-3 font-bold hover:bg-green-700 transition">Climate</a>
          <a href="/ecovision/forecast" className="rounded-lg bg-indigo-600 px-6 py-3 font-bold hover:bg-indigo-700 transition">Forecast</a>
          <a href="/ecovision/weather" className="rounded-lg bg-yellow-600 px-6 py-3 font-bold hover:bg-yellow-700 transition">Weather</a>
        </div>
      </div>
    </main>
  );
}
