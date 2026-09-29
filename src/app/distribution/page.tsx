import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EcommerceHero from "@/components/EcommerceHero";
import WatchBanner from "@/components/WatchBanner";
import TrustedBy from "@/components/TrustedBy";
import CreativityBanner from "@/components/CreativityBanner";
import VisionSection from "@/components/VisionSection";
import CommunityCollage from "@/components/CommunityCollage";
import StorySection from "@/components/StorySection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CommunityGallery from "@/components/CommunityGallery";
import InspiredBanner from "@/components/InspiredBanner";
import PricingSection from "@/components/PricingSection";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function NetworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EcommerceHero />
        <WatchBanner />
        <TrustedBy />
        <CreativityBanner />
        <VisionSection />
        <CommunityCollage />
        <StorySection />
        <MarketplaceSection />
        <CommunityGallery />
        <InspiredBanner />
        <PricingSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
