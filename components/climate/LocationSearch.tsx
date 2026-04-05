"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, Navigation, Search, X } from "lucide-react";
import { geocode } from "@/lib/weather";
import { useClimate } from "@/context/ClimateContext";

type Location = {
  name: string;
  lat: number;
  lon: number;
  formatted_address?: string;
};

type Props = {
  selected?: Location;
  onSelect?: (loc: Location) => void;
  showMap?: boolean;
  compact?: boolean;
};

export default function LocationSearch({ selected, onSelect, showMap = true, compact = false }: Props) {
  const { isWhiteTheme } = useClimate();
  const [leaflet, setLeaflet] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ left: number; top: number; width: number } | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Check if click is inside input or dropdown (portal)
      const input = inputRef.current;
      const dropdown = document.getElementById("location-search-dropdown");
      if (
        (input && input.contains(e.target as Node)) ||
        (dropdown && dropdown.contains(e.target as Node))
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // Calculate dropdown position
  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY,
        width: rect.width
      });
    } else {
      setDropdownPos(null);
    }
  }, [open, query]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (typeof window === "undefined") return;
      const [{ MapContainer, Marker, Popup, TileLayer, useMap }, leafletLib] = await Promise.all([
        import("react-leaflet"),
        import("leaflet")
      ]);
      await import("leaflet/dist/leaflet.css");
      if (!mounted) return;
      const L = leafletLib.default;
      const DefaultIcon = L.icon({
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      setLeaflet({ MapContainer, Marker, Popup, TileLayer, useMap });
    })();
    return () => { mounted = false; };
  }, []);

  const FlyTo = useMemo(() => {
    if (!leaflet) return null;
    const { useMap } = leaflet;
    return function FlyToInner({ center }: { center: [number, number] }) {
      const map = useMap();
      const lastCenter = useRef<string>("");
      useEffect(() => {
        const key = `${center[0].toFixed(5)}:${center[1].toFixed(5)}`;
        if (lastCenter.current === key) return;
        lastCenter.current = key;
        map.flyTo(center, 10, { duration: 1.2 });
      }, [center, map]);
      return null;
    };
  }, [leaflet]);

  const selectedCenter = useMemo(() => {
    if (!selected) return null;
    return [selected.lat, selected.lon] as [number, number];
  }, [selected?.lat, selected?.lon]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await geocode(query.trim());
        setResults(
          data.map((r: any) => ({
            name: r.name,
            lat: r.latitude,
            lon: r.longitude,
            formatted_address: r.formatted_address || r.name
          }))
        );
      } catch (_) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  useEffect(() => {
    const exactQuery = query.trim().toLowerCase();
    if (!exactQuery || loading) return;
    if (results.length === 1 && results[0].name.toLowerCase() === exactQuery) {
      const timer = setTimeout(() => choose(results[0]), 120);
      return () => clearTimeout(timer);
    }
  }, [query, results, loading]);

  const choose = (loc: Location) => {
    onSelect?.(loc);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
    setOpen(false);
  };


  return (
    <div ref={ref} className={`relative ${compact ? "" : "space-y-3"}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isWhiteTheme ? "text-slate-400" : "text-slate-500"}`} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && results.length > 0) {
                e.preventDefault();
                setOpen(true);
                setActiveIndex((i) => (i + 1) % results.length);
              }
              if (e.key === "ArrowUp" && results.length > 0) {
                e.preventDefault();
                setOpen(true);
                setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
              }
              if (e.key === "Enter" && results.length > 0) {
                e.preventDefault();
                choose(results[activeIndex >= 0 ? activeIndex : 0]);
              }
              if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder="Search city or region"
            className={`w-full rounded-xl border py-2.5 pl-8 pr-8 text-sm outline-none transition ${isWhiteTheme ? "border-slate-200 bg-slate-100 text-slate-800" : "border-slate-700 bg-slate-800/60 text-slate-200"}`}
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear">
              <X size={13} />
            </button>
          )}
          {open && query.trim() && dropdownPos && createPortal(
            <div
              id="location-search-dropdown"
              className={`fixed z-[9999] max-h-64 overflow-y-auto rounded border ${isWhiteTheme ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-900"}`}
              style={{
                left: dropdownPos.left,
                top: dropdownPos.top,
                width: dropdownPos.width,
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.12), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
              }}
              role="listbox"
            >
              {loading ? (
                <div className="px-4 py-3 text-sm text-slate-500">Searching similar locations...</div>
              ) : results.length > 0 ? (
                results.map((loc, index) => (
                  <button
                    key={`${loc.name}-${loc.lat}-${loc.lon}-${index}`}
                    onClick={() => choose(loc)}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    aria-selected={activeIndex === index}
                    className={`flex w-full items-start gap-3 px-4 py-2 text-left text-sm transition border-b last:border-b-0 ${
                      activeIndex === index
                        ? isWhiteTheme
                          ? "bg-emerald-50 text-emerald-900"
                          : "bg-emerald-900/30 text-emerald-100"
                        : isWhiteTheme
                        ? "hover:bg-slate-100"
                        : "hover:bg-slate-800/40"
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <MapPin size={14} className="mt-1 text-emerald-500" />
                    <div className="min-w-0">
                      <p className={`truncate font-semibold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{loc.name}</p>
                      <p className="truncate text-xs text-slate-500">{loc.formatted_address}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-500">No locations found</div>
              )}
            </div>,
            document.body
          )}
        </div>
        <button
          onClick={() => {
            if (!navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(({ coords }) => choose({ name: "My Location", lat: coords.latitude, lon: coords.longitude }));
          }}
          className={`rounded-xl border px-3 text-sm transition ${isWhiteTheme ? "border-slate-200 bg-slate-100 text-slate-600" : "border-slate-700 bg-slate-800/60 text-slate-300"}`}
          aria-label="Use GPS"
        >
          <Navigation size={15} />
        </button>
      </div>

      {/* Map and details below search and dropdown */}

      {showMap && selected && leaflet && FlyTo && selectedCenter && (
        <div className={`overflow-hidden rounded-2xl border ${isWhiteTheme ? "border-slate-200" : "border-slate-700"}`}>
          <leaflet.MapContainer center={selectedCenter} zoom={10} style={{ height: 220, width: "100%" }} zoomControl>
            <leaflet.TileLayer
              attribution="© OpenStreetMap"
              url={isWhiteTheme ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"}
            />
            <leaflet.Marker position={selectedCenter}>
              <leaflet.Popup>{selected.name}</leaflet.Popup>
            </leaflet.Marker>
            <FlyTo center={selectedCenter} />
          </leaflet.MapContainer>
        </div>
      )}

      {selected && !compact && (
        <div className={`flex items-start gap-2 rounded-xl border p-3 ${isWhiteTheme ? "border-slate-200 bg-slate-50" : "border-slate-700 bg-slate-800/60"}`}>
          <MapPin size={16} className="mt-0.5 text-emerald-500" />
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isWhiteTheme ? "text-slate-500" : "text-slate-400"}`}>Location</p>
            <p className={`text-sm font-semibold ${isWhiteTheme ? "text-slate-800" : "text-slate-100"}`}>{selected.name}</p>
            {selected.formatted_address && <p className="text-xs text-slate-500">{selected.formatted_address}</p>}
          </div>
        </div>
      )}

      {!open && loading && <p className="text-xs text-slate-400">Searching…</p>}
    </div>
  );
}
