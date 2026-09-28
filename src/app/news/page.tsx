import Navbar from "@/components/Navbar";
import Newsroom from "@/components/Newsroom";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Newsroom | Rave",
};

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <Navbar />
      <main className="flex-1">
        <Newsroom />
      </main>
      <Footer />
    </div>
  );
}
