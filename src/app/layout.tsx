import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Figtree } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Used by the Studio brand-wall section (slide body copy + geometric specimen).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rave",
  description: "A place to display your masterpiece.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
