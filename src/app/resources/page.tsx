import Navbar from "@/components/Navbar";
import ResourcesHero from "@/components/ResourcesHero";
import ResourceSections from "@/components/ResourceSections";
import ResourcesContact from "@/components/ResourcesContact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resources | Rave",
};

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <Navbar />
      <main className="flex-1">
        <ResourcesHero />
        <ResourceSections />
        <ResourcesContact />
      </main>
      <Footer />
    </div>
  );
}
