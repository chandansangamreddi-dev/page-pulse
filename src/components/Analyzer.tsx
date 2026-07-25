"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import UrlInputForm from "@/components/page-pulse/UrlInputForm";
import ResultsGrid from "@/components/page-pulse/ResultsGrid";
import HealthScoreCard from "@/components/HealthScoreCard";
import {
  placeholderMetrics,
  buildMetricsFromResult,
  computeHealthScore,
  type AnalyzeApiResponse,
  type Metric,
  type HealthScoreResult,
} from "@/lib/metrics";

type ScanStatus = "idle" | "loading" | "success" | "error";

export default function Analyzer() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [metrics, setMetrics] = useState<Metric[]>(placeholderMetrics);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScoreResult | null>(
    null
  );

  function handleAnalyzeStart() {
    setStatus("loading");
    setErrorMessage(null);
  }

  function handleAnalyzeSuccess(data: AnalyzeApiResponse) {
    setMetrics(buildMetricsFromResult(data));
    setHealthScore(computeHealthScore(data));
    setAnalyzedUrl(data.url);
    setStatus("success");
  }

  function handleAnalyzeError(message: string) {
    setErrorMessage(message);
    setMetrics(placeholderMetrics);
    setHealthScore(null);
    setAnalyzedUrl(null);
    setStatus("error");
  }

  return (
    <>
      <UrlInputForm
        isLoading={status === "loading"}
        onAnalyzeStart={handleAnalyzeStart}
        onAnalyzeSuccess={handleAnalyzeSuccess}
        onAnalyzeError={handleAnalyzeError}
      />

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="animate-fade-up relative z-10 mx-auto mt-4 flex w-full max-w-2xl items-start gap-2 rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3.5 text-sm text-red-300 backdrop-blur-xl"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === "success" && healthScore && (
        <HealthScoreCard result={healthScore} />
      )}

      <ResultsGrid metrics={metrics} status={status} analyzedUrl={analyzedUrl} />
    </>
  );
}