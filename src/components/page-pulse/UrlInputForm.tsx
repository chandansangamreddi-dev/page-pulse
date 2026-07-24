"use client";

import { useState } from "react";
import { Globe, ArrowRight } from "lucide-react";

export default function UrlInputForm() {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Backend API will be connected later
    console.log("Analyze:", url);
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-transparent font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:brightness-110 active:scale-95"
      >
        Analyze
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}