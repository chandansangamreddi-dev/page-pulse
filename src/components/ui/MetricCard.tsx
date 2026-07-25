import type { Metric } from "@/lib/metrics";

const STATUS_STYLES: Record<
  Metric["status"],
  { border: string; icon: string; badge: string; hoverGlow: string }
> = {
  good: {
    border: "group-hover:border-[var(--color-pulse)]/40",
    icon: "text-[var(--color-pulse)]",
    badge: "bg-[var(--color-pulse)]/10 text-[var(--color-pulse)]",
    hoverGlow: "hover:shadow-[0_0_50px_-12px_rgba(52,211,153,0.55)]",
  },
  warning: {
    border: "group-hover:border-amber-400/40",
    icon: "text-amber-400",
    badge: "bg-amber-400/10 text-amber-400",
    hoverGlow: "hover:shadow-[0_0_50px_-12px_rgba(251,191,36,0.5)]",
  },
  critical: {
    border: "group-hover:border-red-400/40",
    icon: "text-red-400",
    badge: "bg-red-400/10 text-red-400",
    hoverGlow: "hover:shadow-[0_0_50px_-12px_rgba(248,113,113,0.5)]",
  },
  neutral: {
    border: "group-hover:border-white/20",
    icon: "text-neutral-500",
    badge: "bg-white/5 text-neutral-500",
    hoverGlow: "hover:shadow-[0_0_50px_-14px_rgba(255,255,255,0.35)]",
  },
};

export default function MetricCard({ metric }: { metric: Metric }) {
  const { label, value, helperText, icon: Icon, status } = metric;
  const styles = STATUS_STYLES[status];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.05] ${styles.border} ${styles.hoverGlow}`}
    >
      {/* soft top sheen for a frosted-glass feel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.badge}`}
      >
        <Icon className={`h-5 w-5 ${styles.icon}`} strokeWidth={2} />
      </div>

      <p className="mt-5 truncate font-mono text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1.5 text-sm font-medium text-neutral-300">{label}</p>
      <p className="mt-1 text-xs text-neutral-500">{helperText}</p>
    </div>
  );
}