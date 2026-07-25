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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: trimmedUrl,
        }),
      });

      const data: AnalyzeApiResponse | AnalyzeApiError =
        await response.json();

      if (!response.ok) {
        onAnalyzeError(
          "error" in data && data.error
            ? data.error
            : "Something went wrong while analyzing this page."
        );
        return;
      }

      onAnalyzeSuccess(data as AnalyzeApiResponse);
    } catch {
      onAnalyzeError(
        "Couldn't reach the analysis service. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 px-6 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-colors hover:border-white/20 focus-within:border-emerald-400">
        <Globe className="h-4 w-4 shrink-0 text-neutral-500" />

        <input
          type="url"
          required
          disabled={isLoading}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          aria-label="Website URL"
          className="w-full bg-transparent font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            Analyze
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}