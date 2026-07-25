export default function BackgroundBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-blob-drift absolute left-1/2 top-[-14%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[var(--color-pulse)]/20 blur-[120px]" />
      <div
        className="animate-blob-drift absolute right-[-12%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-emerald-400/10 blur-[110px]"
        style={{ animationDelay: "2s", animationDuration: "14s" }}
      />
      <div
        className="animate-blob-drift absolute bottom-[-16%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-teal-400/10 blur-[130px]"
        style={{ animationDelay: "4s", animationDuration: "16s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />
    </div>
  );
}