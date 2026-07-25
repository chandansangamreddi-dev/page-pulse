import Hero from "@/components/page-pulse/Hero";
import Analyzer from "@/components/Analyzer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundBlobs />
      <Hero />
      <Analyzer />
      <Footer />
    </main>
  );
}