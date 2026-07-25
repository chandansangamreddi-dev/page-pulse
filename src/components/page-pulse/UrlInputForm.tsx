"use client";

import { useState } from "react";
import { Globe, ArrowRight, Loader2 } from "lucide-react";
import type { AnalyzeApiResponse } from "@/lib/metrics";

interface UrlInputFormProps {
  isLoading: boolean;
  onAnalyzeStart: () => void;
  onAnalyzeSuccess: (data: AnalyzeApiResponse) => void;
  onAnalyzeError: (message: string) => void;
}

interface AnalyzeApiError {
  error?: string;
}

export default function UrlInputForm({
  isLoading,
  onAnalyzeStart,
  onAnalyzeSuccess,
  onAnalyzeError,
}: UrlInputFormProps) {
  const [url, setUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl || isLoading) return;

    onAnalyzeStart();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data: AnalyzeApiResponse | AnalyzeApiError = await response.json();

      if (!response.ok) {
        const message =
          "error" in data && data.error
            ? data.error
            : "Something went wrong while analyzing this page.";
        onAnalyzeError(message);
        return;
      }

      onAnalyzeSuccess(data as AnalyzeApiResponse);
    } catch {
      onAnalyzeError(
        "Couldn't reach the analysis service. Check your connection and try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up relative z-10 mx-auto w-full max-w-2xl px-6"
      style={{ animationDelay: "460ms" }}
    >
      <div className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300 focus-within:border-[var(--color-pulse)]/50 focus-within:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_8px_44px_-8px_rgba(52,211,153,0.25)] hover:border-white/20 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 px-3 py-2.5">
          <Globe className="h-4 w-4 shrink-0 text-neutral-500" />
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            aria-label="Webpage URL to analyze"
            disabled={isLoading}
            className="w-full bg-transparent font-mono text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-pulse)] px-6 py-3 text-sm font-semibold text-[#08090b] shadow-[0_0_20px_-4px_rgba(52,211,153,0.55)] transition-all duration-300 hover:shadow-[0_0_30px_-2px_rgba(52,211,153,0.8)] hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:hover:brightness-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              Analyze
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}