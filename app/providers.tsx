"use client";
import { ClimateProvider } from "@/context/ClimateContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ClimateProvider>{children}</ClimateProvider>;
}
