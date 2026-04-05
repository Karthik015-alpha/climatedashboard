import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  icon,
  backTo = "/dashboard",
  backLabel = "Back to Dashboard"
}: {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  backTo?: string;
  backLabel?: string;
}) {
  return (
    <div className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 p-7 shadow-2xl">
      <div className="absolute -top-10 -right-12 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5" />
      <div className="relative z-10 space-y-3">
        <Link href={{ pathname: backTo }} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-xs font-bold uppercase text-white/90 backdrop-blur transition hover:bg-white/30">
          <ArrowLeft size={14} />
          {backLabel}
        </Link>
        <h1 className="flex items-center gap-3 text-3xl font-black text-white">
          {icon}
          {title}
        </h1>
        <p className="max-w-2xl text-sm font-medium text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
