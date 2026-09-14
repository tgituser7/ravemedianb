"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUpInView } from "@/lib/motion";

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 4.5c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.96-2.48 8.94 8.94 0 0 1-2.83 1.08 4.45 4.45 0 0 0-7.58 4.06A12.63 12.63 0 0 1 2.9 3.15a4.44 4.44 0 0 0 1.38 5.94 4.4 4.4 0 0 1-2.01-.56v.06a4.45 4.45 0 0 0 3.57 4.36 4.46 4.46 0 0 1-2 .08 4.46 4.46 0 0 0 4.16 3.09A8.93 8.93 0 0 1 1 18.07a12.6 12.6 0 0 0 6.84 2c8.2 0 12.7-6.8 12.7-12.7l-.01-.58A9.1 9.1 0 0 0 23 4.5Z" />
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

function DribbbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.9 8.7c4.6 1.4 10 1.2 14.7-.7M6.2 20.3c2.3-6.2 6-11 11.3-14.4M4 12.5c6.3-.6 12.4.9 16.7 4.6" />
    </svg>
  );
}

const PLATFORM_LINKS = [
  { label: "Get Started" },
  { label: "Create strategy", icon: true, badge: { text: "New", tone: "solid" as const } },
  { label: "Pricing" },
  { label: "Contact" },
  { label: "Solution" },
  { label: "E-Commerce" },
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
  links: { label: string; icon?: boolean; badge?: { text: string; tone: "solid" | "soon" | "outline" } }[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {links.map(({ label, icon, badge }) => (
        <li key={label}>
          <a
            href="#"
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
  const socialIcons = [TwitterIcon, InstagramIcon, DribbbleIcon];

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
              {socialIcons.map((Icon, i) => (
                <button
                  key={i}
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 transition-colors hover:text-zinc-900"
                >
                  <Icon />
                </button>
              ))}
              <button
                aria-label="Behance"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold italic text-zinc-700 transition-colors hover:text-zinc-900"
              >
                Bē
              </button>
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
