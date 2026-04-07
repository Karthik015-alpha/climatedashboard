"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Droplets, Navigation, RotateCcw, Wind } from "lucide-react";
import { fetchAQI, fetchWeather, weatherLabel } from "@/lib/weather";
import { useClimate } from "@/context/ClimateContext";
import { generateWeatherReportPDF } from "@/utils/pdf";
import LocationSearch from "./LocationSearch";

type WeatherData = {
  temp: number;
  wind: number;
  humidity: number;
  code: number;
};

type Props = {
  initialName?: string;
  lat?: number;
  lon?: number;
};

export default function WeatherCard({ initialName = "New Delhi", lat = 28.61, lon = 77.21 }: Props) {
  const { isWhiteTheme, setSelectedLocation } = useClimate();
  const [location, setLocation] = useState({ name: initialName, lat, lon });
  const [isNarrow, setIsNarrow] = useState(false);
  const hasManualSelection = useRef(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingReport, setDownloadingReport] = useState(false);

  const load = useCallback(async (coords: { lat: number; lon: number }) => {
    setLoading(true);
    try {
      const data = await fetchWeather(coords.lat, coords.lon);
      const h = new Date().getHours();
      setWeather({
        temp: data.current_weather?.temperature ?? 0,
        wind: data.current_weather?.windspeed ?? 0,
        humidity: data.hourly?.relative_humidity_2m?.[h] ?? 0,
        code: data.current_weather?.weathercode ?? 0
      });
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (e) {
      setError("Weather fetch failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load({ lat, lon }); }, [lat, lon, load]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (hasManualSelection.current) return;
        const next = { name: "My Location", lat: coords.latitude, lon: coords.longitude };
        setLocation(next);
        load({ lat: next.lat, lon: next.lon });
      },
      () => {
        // Keep initial location when location permission is denied.
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 600000 }
    );
  }, [load]);

  useEffect(() => {
    const update = () => setIsNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setSelectedLocation({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      shortName: location.name,
      formatted_address: location.name,
      city: location.name,
      state: "",
      country: ""
    });
  }, [location, setSelectedLocation]);

  const handleDownloadReport = async () => {
    try {
      setDownloadingReport(true);
      const [weatherData, aqi] = await Promise.all([
        fetchWeather(location.lat, location.lon),
        fetchAQI(location.lat, location.lon)
      ]);
      const hour = new Date().getHours();
      const forecast = (weatherData.daily?.time || []).map((d, i) => ({
        date: d,
        min: weatherData.daily?.temperature_2m_min?.[i],
        max: weatherData.daily?.temperature_2m_max?.[i],
        weatherCode: weatherData.daily?.weathercode?.[i]
      }));

      const payload = {
        location: {
          name: location.name,
          lat: location.lat,
          lon: location.lon,
          formatted_address: location.name
        },
        weather: {
          temperature: weatherData.current_weather?.temperature,
          humidity: weatherData.hourly?.relative_humidity_2m?.[hour],
          windspeed: weatherData.current_weather?.windspeed,
          weatherCode: weatherData.current_weather?.weathercode,
          weatherLabel: weatherLabel(weatherData.current_weather?.weathercode ?? 0)
        },
        aqi: {
          europeanAqi: aqi?.current?.european_aqi,
          pm10: aqi?.current?.pm10,
          pm2_5: aqi?.current?.pm2_5,
          ozone: aqi?.current?.ozone,
          nitrogenDioxide: aqi?.current?.nitrogen_dioxide
        },
        forecast,
        generatedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      };

      const safeName = location.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "location";
      generateWeatherReportPDF(payload, `weather-report-${safeName}.pdf`);
    } finally {
      setDownloadingReport(false);
    }
  };

  const condition = weather ? weatherLabel(weather.code) : "--";

  return (
    <div className="glass-panel relative flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-6">
      <LocationSearch
        selected={{ name: location.name, lat: location.lat, lon: location.lon }}
        onSelect={(loc) => {
          hasManualSelection.current = true;
          setLocation(loc);
          load({ lat: loc.lat, lon: loc.lon });
        }}
        showMap={!isNarrow}
      />

      <button
        onClick={handleDownloadReport}
        disabled={loading || downloadingReport}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
          loading || downloadingReport
            ? "cursor-not-allowed bg-slate-300 text-slate-500"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        <Download size={16} />
        {downloadingReport ? "Preparing Report..." : "Download Weather Report"}
      </button>

      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-semibold ${isWhiteTheme ? "text-slate-600" : "text-slate-400"}`}>{condition}</p>
          <h3 className={`max-w-[11rem] truncate text-2xl font-black sm:max-w-none sm:text-3xl ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{location.name}</h3>
        </div>
        <Navigation size={28} className="text-emerald-400" />
      </div>

      <div className="flex items-end gap-2">
        <span className={`text-5xl font-black sm:text-6xl ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>
          {weather?.temp ?? "--"}
        </span>
        <span className={`mb-2 text-2xl font-bold ${isWhiteTheme ? "text-slate-400" : "text-emerald-400/60"}`}>°C</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${isWhiteTheme ? "bg-slate-50 border-slate-200" : "bg-slate-800/30 border-white/10"} flex items-center gap-2 rounded-2xl border p-3 sm:gap-3 sm:p-4`}>
          <Droplets className="text-cyan-400" size={20} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Humidity</p>
            <p className={`text-lg font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{weather?.humidity ?? "--"}%</p>
          </div>
        </div>
        <div className={`${isWhiteTheme ? "bg-slate-50 border-slate-200" : "bg-slate-800/30 border-white/10"} flex items-center gap-2 rounded-2xl border p-3 sm:gap-3 sm:p-4`}>
          <Wind className="text-orange-400" size={20} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Wind</p>
            <p className={`text-lg font-bold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>
              {weather?.wind ?? "--"} <span className="text-xs">km/h</span>
            </p>
          </div>
        </div>
      </div>

      <div className={`mt-auto flex items-center justify-between border-t pt-4 text-[11px] ${isWhiteTheme ? "border-slate-200 text-slate-500" : "border-white/10 text-slate-400"}`}>
        <span className="flex items-center gap-2"><RotateCcw size={12} className={loading ? "animate-spin" : ""} /> Updated {lastUpdated ?? "--"}</span>
        {error && <span className="text-rose-400">{error}</span>}
      </div>
    </div>
  );
}
