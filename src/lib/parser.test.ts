import { describe, expect, it } from "vitest";
import { parseHtml } from "./parser";

describe("parseHtml", () => {

  it("parses a valid HTML page", () => {

    const html = `
      <html>

      <head>

      <title>GitHub</title>

      <meta name="description" content="Code hosting">

      </head>

      <body>

      <h1>Hello</h1>

      <img src="one.png">

      <img src="two.png" alt="Dog">

      This is some sample content for testing.

      </body>

      </html>
    `;

    const result = parseHtml(html);

    expect(result.pageTitle).toBe("GitHub");
    expect(result.metaDescription).toBe("Code hosting");
    expect(result.h1Count).toBe(1);
    expect(result.totalImages).toBe(2);
    expect(result.imagesMissingAlt).toBe(1);
    expect(result.wordCount).toBeGreaterThan(5);

  });

  it("returns null when title is missing", () => {

    const result = parseHtml("<body><h1>Hello</h1></body>");

    expect(result.pageTitle).toBeNull();

  });

  it("returns null when meta description is missing", () => {

    const result = parseHtml("<title>Hello</title>");

    expect(result.metaDescription).toBeNull();

  });

});