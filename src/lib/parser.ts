import * as cheerio from "cheerio";

export interface ParsedHtml {
  pageTitle: string | null;
  metaDescription: string | null;
  h1Count: number;
  totalImages: number;
  imagesMissingAlt: number;
  wordCount: number;
}

function countWords(text: string): number {
  const trimmed = text.trim();

  if (!trimmed) return 0;

  return trimmed.split(/\s+/).length;
}

export function parseHtml(html: string): ParsedHtml {
  const $ = cheerio.load(html);

  const pageTitle =
    $("title").first().text().trim() || null;

  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;

  const h1Count = $("h1").length;

  const images = $("img");

  const totalImages = images.length;

  let imagesMissingAlt = 0;

  images.each((_, el) => {
    const alt = $(el).attr("alt");

    if (!alt || alt.trim() === "") {
      imagesMissingAlt++;
    }
  });

  const wordCount = countWords($("body").text());

  return {
    pageTitle,
    metaDescription,
    h1Count,
    totalImages,
    imagesMissingAlt,
    wordCount,
  };
}