import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutBuildSection from "@/components/AboutBuildSection";
import AboutTimeline from "@/components/AboutTimeline";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <main className="flex-1">
        <Navbar/>
        <AboutHero />
        <AboutBuildSection />
        <AboutTimeline />
      </main>
      <Footer />
    </div>
  );
}
