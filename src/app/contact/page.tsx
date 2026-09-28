import Navbar from "@/components/Navbar";
import ContactOffices from "@/components/ContactOffices";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | Rave",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eae8e2]">
      <Navbar />
      <main className="flex-1">
        <section className="px-[6%] pb-6 pt-16 text-center sm:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Get in touch</p>
          <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-zinc-900">
            Got a story to tell? We&apos;re listening.
          </h1>
        </section>
        <ContactOffices />
      </main>
      <Footer />
    </div>
  );
}
