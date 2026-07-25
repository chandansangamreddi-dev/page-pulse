import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { parseHtml } from "@/lib/parser";

// Cheerio/HTML parsing needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

interface AnalyzeRequestBody {
  url?: unknown;
}

interface AnalyzeResult {
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

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB safety cap

/**
 * Validates that a string is a well-formed, publicly fetchable http/https URL.
 */
function parseTargetUrl(value: string): URL | null {
  try {
    const parsed = new URL(value);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: AnalyzeRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const rawUrl = body?.url;

  if (typeof rawUrl !== "string" || rawUrl.trim() === "") {
    return NextResponse.json(
      { error: "A 'url' field (non-empty string) is required." },
      { status: 400 }
    );
  }

  const targetUrl = parseTargetUrl(rawUrl.trim());

  if (!targetUrl) {
    return NextResponse.json(
      { error: "The provided URL is not a valid http/https URL." },
      { status: 400 }
    );
  }

  const startTime = performance.now();

  try {
    const response = await axios.get<string>(targetUrl.toString(), {
      timeout: REQUEST_TIMEOUT_MS,
      maxRedirects: MAX_REDIRECTS,
      maxContentLength: MAX_RESPONSE_BYTES,
      validateStatus: () => true,
      responseType: "text",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PagePulseBot/1.0; +https://pagepulse.app)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    const responseTimeMs = Math.round(performance.now() - startTime);

    const contentType = String(response.headers["content-type"] ?? "");

    if (!contentType.includes("text/html")) {
      return NextResponse.json(
        {
          error: `Expected an HTML page but received content-type "${
            contentType || "unknown"
          }".`,
        },
        { status: 422 }
      );
    }

    const parsed = parseHtml(response.data);

    const result: AnalyzeResult = {
      url: targetUrl.toString(),
      httpStatus: response.status,
      responseTimeMs,
      ...parsed,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.code === "ECONNABORTED") {
        return NextResponse.json(
          {
            error: `The request timed out after ${REQUEST_TIMEOUT_MS}ms.`,
          },
          { status: 504 }
        );
      }

      if (
        axiosError.code === "ENOTFOUND" ||
        axiosError.code === "EAI_AGAIN"
      ) {
        return NextResponse.json(
          {
            error:
              "The host could not be resolved. Check the URL and try again.",
          },
          { status: 400 }
        );
      }

      if (axiosError.code === "ECONNREFUSED") {
        return NextResponse.json(
          {
            error: "The connection was refused by the target server.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to fetch the target page.",
          details: axiosError.message,
        },
        { status: 502 }
      );
    }

    console.error("Unexpected error in /api/analyze:", error);

    return NextResponse.json(
      {
        error: "An unexpected error occurred while analyzing the page.",
      },
      { status: 500 }
    );
  }
}

// Any other method on this route is explicitly unsupported.
export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. Use POST with a JSON { url } body.",
    },
    { status: 405 }
  );
}