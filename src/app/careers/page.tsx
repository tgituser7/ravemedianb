import Navbar from "@/components/Navbar";
import CareersHero from "@/components/CareersHero";
import CareersValues from "@/components/CareersValues";
import CareersPerks from "@/components/CareersPerks";
import CareersGallery from "@/components/CareersGallery";
import CareersProcess from "@/components/CareersProcess";
import CareersRoles from "@/components/CareersRoles";
import CareersCTA from "@/components/CareersCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Careers | Rave",
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <Navbar />
      <main className="flex-1">
        <CareersHero />
        <CareersValues />
        <CareersPerks />
        <CareersGallery />
        <CareersProcess />
        <CareersRoles />
        <CareersCTA />
      </main>
      <Footer />
    </div>
  );
}
