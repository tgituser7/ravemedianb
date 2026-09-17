import SplashScreen, { SPLASH_DURATION_MS } from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import ServicesShowcase from "@/components/ServicesShowcase";
import BrandServices from "@/components/BrandServices";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import HomeTop from "@/components/TopSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SplashScreen />
      <Navbar entranceDelay={SPLASH_DURATION_MS / 1000} />
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
