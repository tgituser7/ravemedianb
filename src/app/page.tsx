import SplashScreen, { SPLASH_DURATION_MS } from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import ServicesShowcase from "@/components/ServicesShowcase";
import WeCreateInspire from "@/components/WeCreateInspire";
import BrandServices from "@/components/BrandServices";
import StatsCarousel from "@/components/StatsCarousel";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import HomeTop from "@/components/TopSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SplashScreen />
      <Navbar entranceDelay={SPLASH_DURATION_MS / 1000} spacerBg="#050505" />
      <main className="flex-1">
        <HomeTop/>
        <ServicesShowcase />
        <WeCreateInspire />
        <BrandServices />
        <StatsCarousel />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
