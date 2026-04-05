"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">EcoVision</p>
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="text-sm text-white/60">Sign in to access the climate dashboard.</p>
        </header>
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white/80">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
          </label>
          <label className="block text-sm font-semibold text-white/80">
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
          </label>
        </div>
        <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 font-bold text-black shadow-lg shadow-emerald-500/30">Continue</button>
        <div className="text-center text-xs text-white/50">Or <Link href="/" className="text-emerald-300">return home</Link></div>
      </div>
    </div>
  );
}
