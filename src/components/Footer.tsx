"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUpInView } from "@/lib/motion";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.97C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33ZM9.75 15.02V8.48l5.75 3.27-5.75 3.27Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const PLATFORM_LINKS = [
  { label: "About", href: "/about" },
  { label: "News" },
  { label: "Careers" },
];

const STORY_LINKS = [
  { label: "Your Story" },
  { label: "Create Story", icon: true },
  { label: "Sell fast", badge: { text: "Soon", tone: "soon" as const } },
];

const LEGAL_LINKS = [
  { label: "Privacy & Policy" },
  { label: "Contact Us" },
  { label: "Api", badge: { text: "New", tone: "outline" as const } },
];

function Badge({ text, tone }: { text: string; tone: "solid" | "soon" | "outline" }) {
  if (tone === "solid") {
    return (
      <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
        {text}
      </span>
    );
  }
  if (tone === "soon") {
    return (
      <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
        {text}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-rose-200 px-2 py-0.5 text-[10px] font-semibold text-rose-400">
      {text}
    </span>
  );
}

function FooterLinkList({
  links,
}: {
  links: { label: string; href?: string; icon?: boolean; badge?: { text: string; tone: "solid" | "soon" | "outline" } }[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {links.map(({ label, href, icon, badge }) => (
        <li key={label}>
          <a
            href={href ?? "#"}
            className="flex items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
          >
            {icon ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <Play size={9} fill="white" strokeWidth={0} className="ml-px" />
              </span>
            ) : null}
            {label}
            {badge ? <Badge text={badge.text} tone={badge.tone} /> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const socialIcons = [
    { Icon: InstagramIcon, label: "Instagram", href: "#" },
    { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@RaveNetworkIndustries" },
    { Icon: XIcon, label: "X", href: "#" },
  ];

  return (
    <motion.footer {...fadeUpInView(0, 25, 0.7)} className="px-6 pb-10 pt-4">
      <div className="mx-auto max-w-7xl rounded-3xl bg-zinc-100 p-10 sm:p-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Our platform, your art.
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              In the realm of Artnesia, creativity knows no bounds. This
              eternal marketplace celebrates the timeless nature of art.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 transition-colors hover:text-zinc-900"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkList links={PLATFORM_LINKS} />
          <FooterLinkList links={STORY_LINKS} />

          <div className="flex flex-col justify-between gap-8">
            <FooterLinkList links={LEGAL_LINKS} />
            <p className="text-xs text-zinc-400">
              © {new Date().getFullYear()} . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
