import type { HealthGrade, HealthScoreResult } from "@/lib/metrics";

const GRADE_STYLES: Record<
  HealthGrade,
  { text: string; badge: string; stroke: string; glow: string }
> = {
  Excellent: {
    text: "text-[var(--color-pulse)]",
    badge: "border-[var(--color-pulse)]/30 bg-[var(--color-pulse)]/10 text-[var(--color-pulse)]",
    stroke: "#34d399",
    glow: "shadow-[0_0_60px_-16px_rgba(52,211,153,0.55)]",
  },
  Good: {
    text: "text-[var(--color-pulse)]",
    badge: "border-[var(--color-pulse)]/30 bg-[var(--color-pulse)]/10 text-[var(--color-pulse)]",
    stroke: "#34d399",
    glow: "shadow-[0_0_60px_-16px_rgba(52,211,153,0.4)]",
  },
  "Needs Improvement": {
    text: "text-amber-400",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    stroke: "#fbbf24",
    glow: "shadow-[0_0_60px_-16px_rgba(251,191,36,0.45)]",
  },
  Poor: {
    text: "text-red-400",
    badge: "border-red-400/30 bg-red-400/10 text-red-400",
    stroke: "#f87171",
    glow: "shadow-[0_0_60px_-16px_rgba(248,113,113,0.45)]",
  },
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HealthScoreCard({
  result,
}: {
  result: HealthScoreResult;
}) {
  const { score, grade, breakdown } = result;
  const styles = GRADE_STYLES[grade];
  const dashOffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <section
      className="animate-fade-up relative z-10 mx-auto mt-14 w-full max-w-5xl px-6"
      style={{ animationDelay: "500ms" }}
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-2xl transition-shadow duration-300 ${styles.glow} sm:p-10`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
          {/* Circular score ring */}
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 120 120"
              className="h-full w-full -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke={styles.stroke}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-4xl font-semibold tracking-tight text-white">
                {score}
              </span>
              <span className="text-xs text-neutral-500">/ 100</span>
            </div>
          </div>

          {/* Grade + breakdown */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Overall Health Score
            </p>
            <span
              className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles.badge}`}
            >
              {grade}
            </span>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {breakdown.map((item) => (
                <div key={item.label} className="text-left">
                  <dt className="truncate text-xs text-neutral-500">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-neutral-200">
                    {item.points}
                    <span className="text-neutral-600">
                      /{item.maxPoints}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}