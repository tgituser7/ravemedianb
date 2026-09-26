import Navbar from "@/components/Navbar";
import ProjectHero from "@/components/ProjectHero";
import ManifestoPanel from "@/components/ManifestoPanel";
import InteractionSlider from "@/components/InteractionSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import FeatureBento from "@/components/FeatureBento";
import StoryReel from "@/components/StoryReel";
import Footer from "@/components/Footer";

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <ProjectHero />
        <ManifestoPanel />
        <InteractionSlider />
        <TestimonialSlider />
        <FeatureBento />
        <StoryReel />
      </main>
      <Footer />
    </div>
  );
}
