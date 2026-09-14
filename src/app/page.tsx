import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EcommerceHero from "@/components/EcommerceHero";
import WatchBanner from "@/components/WatchBanner";
import TrustedBy from "@/components/TrustedBy";
import VisionSection from "@/components/VisionSection";
import StorySection from "@/components/StorySection";
import MarketplaceSection from "@/components/MarketplaceSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EcommerceHero />
        <WatchBanner />
        <TrustedBy />
        <VisionSection />
        <StorySection />
        <MarketplaceSection />
      </main>
      <Footer />
    </div>
  );
}
