import { placeholderMetrics } from "@/lib/metrics";
import MetricCard from "@/components/ui/MetricCard";

export default function ResultsGrid() {
  return (
    <section className="mx-auto mt-14 w-full max-w-5xl px-6 pb-24">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-400">
          Results
        </h2>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-500">
          No scan yet
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placeholderMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}