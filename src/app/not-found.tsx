import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NotFoundView from "@/components/NotFoundView";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found | Rave",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <Navbar />
      <main className="flex flex-1 items-center">
        <NotFoundView />
      </main>
      <Footer />
    </div>
  );
}
