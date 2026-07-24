import type { Metric } from "@/lib/metrics";

const STATUS_STYLES: Record<
  Metric["status"],
  { ring: string; icon: string; badge: string }
> = {
  good: {
    ring: "group-hover:border-emerald-400/40",
    icon: "text-emerald-400",
    badge: "bg-emerald-400/10 text-emerald-400",
  },
  warning: {
    ring: "group-hover:border-amber-400/40",
    icon: "text-amber-400",
    badge: "bg-amber-400/10 text-amber-400",
  },
  critical: {
    ring: "group-hover:border-red-400/40",
    icon: "text-red-400",
    badge: "bg-red-400/10 text-red-400",
  },
  neutral: {
    ring: "group-hover:border-white/20",
    icon: "text-neutral-500",
    badge: "bg-white/5 text-neutral-500",
  },
};

export default function MetricCard({ metric }: { metric: Metric }) {
  const { label, value, helperText, icon: Icon, status } = metric;
  const styles = STATUS_STYLES[status];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 ${styles.ring}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.badge}`}
        >
          <Icon className={`h-5 w-5 ${styles.icon}`} strokeWidth={2} />
        </div>
      </div>

      <p className="mt-4 truncate font-mono text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-sm font-medium text-neutral-300">
        {label}
      </p>

      <p className="mt-0.5 text-xs text-neutral-500">
        {helperText}
      </p>
    </div>
  );
}