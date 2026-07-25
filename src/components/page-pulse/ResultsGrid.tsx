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

export default function ResultsGrid({
  metrics,
  status = "idle",
  analyzedUrl,
}: ResultsGridProps) {
  const badgeLabel =
    status === "success" && analyzedUrl ? analyzedUrl : STATUS_BADGE[status];

  return (
    <section className="mx-auto mt-14 w-full max-w-5xl px-6 pb-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-neutral-400">Results</h2>
        <span className="max-w-[60%] truncate rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-500">
          {badgeLabel}
        </span>
      </div>

      <div
        className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-4 ${
          status === "loading" ? "opacity-60" : "opacity-100"
        }`}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}