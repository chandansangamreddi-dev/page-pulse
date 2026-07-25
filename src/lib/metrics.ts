import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Timer,
  Heading,
  AlignLeft,
  Hash,
  Image,
  ImageOff,
  Type,
} from "lucide-react";

export type MetricStatus = "good" | "warning" | "critical" | "neutral";

export interface Metric {
  id: string;
  label: string;
  value: string;
  helperText: string;
  icon: LucideIcon;
  status: MetricStatus;
}

/**
 * Shape returned by POST /api/analyze on success.
 * Keep in sync with src/app/api/analyze/route.ts.
 */
export interface AnalyzeApiResponse {
  url: string;
  httpStatus: number;
  responseTimeMs: number;
  pageTitle: string | null;
  metaDescription: string | null;
  h1Count: number;
  totalImages: number;
  imagesMissingAlt: number;
  wordCount: number;
}

/**
 * Placeholder values for the empty / pre-analysis state.
 * Replace with real data once the analysis pipeline is wired up.
 */
export const placeholderMetrics: Metric[] = [
  {
    id: "http-status",
    label: "HTTP Status",
    value: "—",
    helperText: "Awaiting analysis",
    icon: Activity,
    status: "neutral",
  },
  {
    id: "response-time",
    label: "Response Time",
    value: "— ms",
    helperText: "Awaiting analysis",
    icon: Timer,
    status: "neutral",
  },
  {
    id: "page-title",
    label: "Page Title",
    value: "—",
    helperText: "Awaiting analysis",
    icon: Heading,
    status: "neutral",
  },
  {
    id: "meta-description",
    label: "Meta Description",
    value: "—",
    helperText: "Awaiting analysis",
    icon: AlignLeft,
    status: "neutral",
  },
  {
    id: "h1-count",
    label: "H1 Count",
    value: "—",
    helperText: "Awaiting analysis",
    icon: Hash,
    status: "neutral",
  },
  {
    id: "total-images",
    label: "Total Images",
    value: "—",
    helperText: "Awaiting analysis",
    icon: Image,
    status: "neutral",
  },
  {
    id: "images-missing-alt",
    label: "Images Missing Alt Text",
    value: "—",
    helperText: "Awaiting analysis",
    icon: ImageOff,
    status: "neutral",
  },
  {
    id: "word-count",
    label: "Word Count",
    value: "—",
    helperText: "Awaiting analysis",
    icon: Type,
    status: "neutral",
  },
];

/**
 * Maps a live /api/analyze response into the Metric[] shape ResultsGrid renders.
 * Status thresholds are simple, opinionated defaults — tune as needed.
 */
export function buildMetricsFromResult(data: AnalyzeApiResponse): Metric[] {
  const httpStatusOk = data.httpStatus >= 200 && data.httpStatus < 300;
  const httpStatusRedirect = data.httpStatus >= 300 && data.httpStatus < 400;

  const missingAltRatio =
    data.totalImages > 0 ? data.imagesMissingAlt / data.totalImages : 0;

  return [
    {
      id: "http-status",
      label: "HTTP Status",
      value: String(data.httpStatus),
      helperText: httpStatusOk
        ? "Page responded successfully"
        : httpStatusRedirect
          ? "Page redirected"
          : "Page returned an error",
      icon: Activity,
      status: httpStatusOk ? "good" : httpStatusRedirect ? "warning" : "critical",
    },
    {
      id: "response-time",
      label: "Response Time",
      value: `${data.responseTimeMs} ms`,
      helperText:
        data.responseTimeMs < 500
          ? "Fast"
          : data.responseTimeMs < 1500
            ? "Could be faster"
            : "Slow response",
      icon: Timer,
      status:
        data.responseTimeMs < 500
          ? "good"
          : data.responseTimeMs < 1500
            ? "warning"
            : "critical",
    },
    {
      id: "page-title",
      label: "Page Title",
      value: data.pageTitle ?? "Missing",
      helperText: data.pageTitle
        ? `${data.pageTitle.length} characters`
        : "No <title> tag found",
      icon: Heading,
      status: data.pageTitle ? "good" : "critical",
    },
    {
      id: "meta-description",
      label: "Meta Description",
      value: data.metaDescription ?? "Missing",
      helperText: data.metaDescription
        ? `${data.metaDescription.length} characters`
        : "No meta description found",
      icon: AlignLeft,
      status: data.metaDescription ? "good" : "warning",
    },
    {
      id: "h1-count",
      label: "H1 Count",
      value: String(data.h1Count),
      helperText:
        data.h1Count === 1
          ? "Exactly one H1 (recommended)"
          : data.h1Count === 0
            ? "No H1 found"
            : "Multiple H1s found",
      icon: Hash,
      status: data.h1Count === 1 ? "good" : data.h1Count === 0 ? "critical" : "warning",
    },
    {
      id: "total-images",
      label: "Total Images",
      value: String(data.totalImages),
      helperText: data.totalImages === 0 ? "No images found" : "Images on page",
      icon: Image,
      status: "neutral",
    },
    {
      id: "images-missing-alt",
      label: "Images Missing Alt Text",
      value: String(data.imagesMissingAlt),
      helperText:
        data.imagesMissingAlt === 0
          ? "All images have alt text"
          : `${Math.round(missingAltRatio * 100)}% missing alt text`,
      icon: ImageOff,
      status: data.imagesMissingAlt === 0 ? "good" : "warning",
    },
    {
      id: "word-count",
      label: "Word Count",
      value: String(data.wordCount),
      helperText: data.wordCount < 300 ? "Thin content" : "Healthy content length",
      icon: Type,
      status: data.wordCount < 300 ? "warning" : "good",
    },
  ];
}

/**
 * --- Overall Health Score ---
 * Derived entirely on the client from the existing /api/analyze response.
 * No new backend calls or fields required.
 */

export type HealthGrade = "Excellent" | "Good" | "Needs Improvement" | "Poor";

export interface HealthScoreBreakdownItem {
  label: string;
  points: number;
  maxPoints: number;
}

export interface HealthScoreResult {
  score: number; // 0–100
  grade: HealthGrade;
  breakdown: HealthScoreBreakdownItem[];
}

/**
 * Weighting (sums to 100):
 *  - HTTP Status        20
 *  - Response Time      20
 *  - Page Title         15
 *  - Meta Description   15
 *  - H1 Structure       15
 *  - Image Alt Text     15
 */
export function computeHealthScore(data: AnalyzeApiResponse): HealthScoreResult {
  const breakdown: HealthScoreBreakdownItem[] = [];

  const httpStatusOk = data.httpStatus >= 200 && data.httpStatus < 300;
  const httpStatusRedirect = data.httpStatus >= 300 && data.httpStatus < 400;
  breakdown.push({
    label: "HTTP Status",
    points: httpStatusOk ? 20 : httpStatusRedirect ? 10 : 0,
    maxPoints: 20,
  });

  breakdown.push({
    label: "Response Time",
    points:
      data.responseTimeMs < 500 ? 20 : data.responseTimeMs < 1500 ? 12 : 5,
    maxPoints: 20,
  });

  breakdown.push({
    label: "Page Title",
    points: data.pageTitle ? 15 : 0,
    maxPoints: 15,
  });

  breakdown.push({
    label: "Meta Description",
    points: data.metaDescription ? 15 : 0,
    maxPoints: 15,
  });

  breakdown.push({
    label: "H1 Structure",
    points: data.h1Count === 1 ? 15 : data.h1Count === 0 ? 0 : 8,
    maxPoints: 15,
  });

  const missingAltRatio =
    data.totalImages > 0 ? data.imagesMissingAlt / data.totalImages : 0;
  breakdown.push({
    label: "Image Alt Text",
    points: Math.round(15 * (1 - missingAltRatio)),
    maxPoints: 15,
  });

  const score = breakdown.reduce((sum, item) => sum + item.points, 0);

  const grade: HealthGrade =
    score >= 90
      ? "Excellent"
      : score >= 75
        ? "Good"
        : score >= 50
          ? "Needs Improvement"
          : "Poor";

  return { score, grade, breakdown };
}