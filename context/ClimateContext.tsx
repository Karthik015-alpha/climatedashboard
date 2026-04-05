"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Location = {
  name: string;
  lat: number;
  lon: number;
  shortName?: string;
  formatted_address?: string;
  city?: string;
  state?: string;
  country?: string;
};

type ClimateContextType = {
  temp: number;
  setTemp: (v: number) => void;
  scenario: string;
  setScenario: (v: string) => void;
  isWhiteTheme: boolean;
  toggleWhiteTheme: () => void;
  activeWeatherCode: number;
  setActiveWeatherCode: (v: number) => void;
  selectedLocation: Location;
  setSelectedLocation: (l: Location) => void;
  theme: {
    bg: string;
    accent: string;
    border: string;
    glow: string;
    primary: string;
  };
};

const ClimateContext = createContext<ClimateContextType | null>(null);

export function ClimateProvider({ children }: { children: React.ReactNode }) {
  const [temp, setTemp] = useState(25);
  const [scenario, setScenario] = useState("normal");
  const [isWhiteTheme, setIsWhiteTheme] = useState(true);
  const [activeWeatherCode, setActiveWeatherCode] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    name: "New Delhi",
    lat: 28.61,
    lon: 77.21,
    shortName: "New Delhi",
    formatted_address: "New Delhi, Delhi, India"
  });

  const theme = useMemo(() => {
    if (temp > 35) {
      return {
        bg: "from-orange-600/20 to-red-950/40",
        accent: "text-red-400",
        border: "border-red-500/20",
        glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]",
        primary: "#ef4444"
      };
    }
    if (temp < 20) {
      return {
        bg: "from-blue-600/20 to-blue-950/40",
        accent: "text-blue-400",
        border: "border-blue-500/20",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
        primary: "#3b82f6"
      };
    }
    return {
      bg: "from-emerald-600/20 to-slate-950/40",
      accent: "text-emerald-400",
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.1)]",
      primary: "#10b981"
    };
  }, [temp]);

  const toggleWhiteTheme = () => setIsWhiteTheme((v) => !v);

  useEffect(() => {
    document.body.classList.toggle("theme-light", isWhiteTheme);
    return () => document.body.classList.remove("theme-light");
  }, [isWhiteTheme]);

  const value: ClimateContextType = {
    temp,
    setTemp,
    scenario,
    setScenario,
    isWhiteTheme,
    toggleWhiteTheme,
    activeWeatherCode,
    setActiveWeatherCode,
    selectedLocation,
    setSelectedLocation,
    theme
  };

  return <ClimateContext.Provider value={value}>{children}</ClimateContext.Provider>;
}

export function useClimate() {
  const ctx = useContext(ClimateContext);
  if (!ctx) throw new Error("useClimate must be used within ClimateProvider");
  return ctx;
}
