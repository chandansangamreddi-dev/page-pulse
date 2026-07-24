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

export type MetricStatus =
  | "good"
  | "warning"
  | "critical"
  | "neutral";

export interface Metric {
  id: string;
  label: string;
  value: string;
  helperText: string;
  icon: LucideIcon;
  status: MetricStatus;
}

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