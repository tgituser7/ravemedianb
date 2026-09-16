import IntroLoader, { SPLASH_FADE_START_MS } from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import ServicesShowcase from "@/components/ServicesShowcase";
import BrandServices from "@/components/BrandServices";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import HomeTop from "@/components/TopSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <IntroLoader />
      <Navbar entranceDelay={SPLASH_FADE_START_MS / 1000} />
      <main className="flex-1">
        <HomeTop/>
        <ServicesShowcase />
        <BrandServices />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
