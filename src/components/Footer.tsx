export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-white/[0.02] px-6 py-10 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 text-center">
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-[var(--color-pulse)]/40 hover:text-[var(--color-pulse)]"
        >
          Built for Digital Heroes Training Task
        </a>

        <p className="font-mono text-xs text-neutral-500">
          Built with Next.js • TypeScript • Tailwind CSS
        </p>

        <p className="text-xs text-neutral-600">© 2026 Sai Chandan</p>
      </div>
    </footer>
  );
}