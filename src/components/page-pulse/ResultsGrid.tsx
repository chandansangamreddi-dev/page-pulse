import type { Metric } from "@/lib/metrics";
import MetricCard from "@/components/ui/MetricCard";
type ScanStatus = "idle" | "loading" | "success" | "error";

interface ResultsGridProps {
  metrics: Metric[];
  status?: ScanStatus;
  analyzedUrl?: string | null;
}

const STATUS_BADGE: Record<ScanStatus, string> = {
  idle: "No scan yet",
  loading: "Scanning…",
  success: "Scan complete",
  error: "Scan failed",
};

const BADGE_TONE: Record<ScanStatus, string> = {
  idle: "border-white/10 bg-white/[0.03] text-neutral-500",
  loading: "border-white/10 bg-white/[0.03] text-neutral-400",
  success:
    "border-[var(--color-pulse)]/30 bg-[var(--color-pulse)]/10 text-[var(--color-pulse)]",
  error: "border-red-400/30 bg-red-400/10 text-red-300",
};

export default function ResultsGrid({
  metrics,
  status = "idle",
  analyzedUrl,
}: ResultsGridProps) {
  const badgeLabel =
    status === "success" && analyzedUrl ? analyzedUrl : STATUS_BADGE[status];

  return (
    <section
      className="animate-fade-up relative z-10 mx-auto mt-24 w-full max-w-5xl px-6 pb-32"
      style={{ animationDelay: "560ms" }}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
            Results
          </h2>
          <p className="mt-1 text-xs text-neutral-600">
            Technical health overview
          </p>
        </div>
        <span
          className={`max-w-[70%] truncate rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-xl transition-colors duration-300 ${BADGE_TONE[status]}`}
        >
          {badgeLabel}
        </span>
      </div>

      <div
        className={`grid grid-cols-1 gap-5 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-4 ${
          status === "loading" ? "opacity-50" : "opacity-100"
        }`}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}