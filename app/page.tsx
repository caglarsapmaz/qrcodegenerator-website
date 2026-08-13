import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QRGenerator } from "@/components/QRGenerator";
import { FeatureCards } from "@/components/FeatureCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <QRGenerator />
        <FeatureCards />
      </main>
      <Footer />
    </>
  );
}
