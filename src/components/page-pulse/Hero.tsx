export default function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-20 pb-10 text-center sm:pt-28">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Live SEO &amp; Technical Health Scan
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Page Pulse
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-2xl text-base text-neutral-400 sm:text-lg">
        Analyze any webpage for SEO and technical health.
      </p>

      {/* Decorative pulse line */}
      <div className="mt-10 w-full max-w-3xl overflow-hidden">
        <svg
          viewBox="0 0 700 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 40 H240 L265 40 L280 12 L300 68 L318 40 L335 40 L350 26 L365 40 L420 40 H700"
            fill="none"
            stroke="#34D399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
        </svg>
      </div>
    </section>
  );
}