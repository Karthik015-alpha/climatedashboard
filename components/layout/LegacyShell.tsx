"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { useClimate } from "@/context/ClimateContext";

export default function LegacyShell({ children }: { children: ReactNode }) {
  const { isWhiteTheme, theme } = useClimate();
  return (
    <div className={`min-h-screen ${isWhiteTheme ? "bg-slate-50" : `bg-climate-dark bg-gradient-to-br ${theme.bg}`}`}>
      <header className={`border-b px-4 py-3 ${isWhiteTheme ? "border-slate-200 bg-white/80" : `${theme.border} bg-slate-900/70`}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/dashboard" className="text-sm font-bold text-emerald-400">← Back to Dashboard</Link>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Legacy View</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">{children}</main>
    </div>
  );
}
