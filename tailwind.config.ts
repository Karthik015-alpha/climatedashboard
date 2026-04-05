import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#38bdf8",
        climate: {
          dark: "#0f172a",
          card: "#1e293b",
          accent: "#10b981",
          danger: "#ef4444",
          warning: "#f59e0b"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(16,185,129,0.15)"
      },
      borderRadius: {
        22: "22px"
      }
    }
  },
  plugins: []
};

export default config;
