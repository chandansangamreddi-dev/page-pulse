export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center sm:pt-16">
      {/* Eyebrow */}
      <div
        className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-xl"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--color-pulse)]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-pulse)]" />
        </span>
        Live SEO &amp; technical health scan
      </div>

      <h1
        className="animate-fade-up max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl"
        style={{ animationDelay: "100ms" }}
      >
        Website Intelligence
        <br />
        <span className="bg-gradient-to-r from-white via-white to-[var(--color-pulse)] bg-clip-text text-transparent">
          in Seconds.
        </span>
      </h1>

      <p
        className="animate-fade-up mt-6 max-w-xl text-balance text-lg text-neutral-400 sm:text-xl"
        style={{ animationDelay: "220ms" }}
      >
        Analyze any webpage for SEO and technical health.
      </p>

      {/* Signature: animated ECG pulse line */}
      <div
        className="animate-fade-up mt-16 w-full max-w-2xl"
        style={{ animationDelay: "340ms" }}
      >
        <svg
          viewBox="0 0 700 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full opacity-90"
          aria-hidden="true"
        >
          <path
            d="M0 40 H240 L265 40 L280 12 L300 68 L318 40 L335 40 L350 26 L365 40 L420 40 H700"
            stroke="var(--color-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pulse-line-path"
          />
        </svg>
      </div>
    </section>
  );
}