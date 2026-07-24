import Hero from "@/components/page-pulse/Hero";
import UrlInputForm from "@/components/page-pulse/UrlInputForm";
import ResultsGrid from "@/components/page-pulse/ResultsGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <UrlInputForm />
      <ResultsGrid />
    </main>
  );
}