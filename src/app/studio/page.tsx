import Navbar from "@/components/Navbar";
import StudioGrids from "@/components/StudioGrids";
import StudioWall from "@/components/StudioWall";
import StudioBlocks from "@/components/studioBlocks";
import Footer from "@/components/Footer";

export default function StudioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <Navbar />
        <StudioGrids />
        <StudioWall />
        <StudioBlocks />
      </main>
      <Footer />
    </div>
  );
}
