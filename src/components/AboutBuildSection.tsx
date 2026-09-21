"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

// Section 2 of the About page: a "how we build" showcase matching the
// reference's two-column layout — a numbered build card on the left, a
// purple stack card (two black sub-panels) on the right, both sitting on
// the same cream/dotted background language as the hero above it.

const BUILD_POINTS = [
  "Design systems built with Figma, Framer, or your existing stack.",
  "Customize every touchpoint with brand-accurate components.",
  "Handoff and collaboration through a shared workspace.",
];

const CREATIVE_STACK = [
  { label: "Figma", mark: "F" },
  { label: "Framer", mark: "Fr" },
  { label: "Adobe CC", mark: "Ae" },
];

const DEPLOYMENT = [
  { label: "Vercel", mark: "▲" },
  { label: "Webflow", mark: "W" },
  { label: "Shopify", mark: "S" },
];

function StackPanel({
  title,
  items,
}: {
  title: string;
  items: { label: string; mark: string }[];
}) {
  return (
    <div className="rounded-2xl bg-black p-5">
      <p className="text-sm font-bold text-white">{title}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/20 px-2 py-3 text-center"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
              {item.mark}
            </span>
            <span className="text-[11px] leading-tight text-white/80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutBuildSection() {
  return (
    <section
      className="relative overflow-hidden px-[6%] pb-24 pt-16"
      style={{
        backgroundColor: "#eae8e2",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...fadeUpInView(0, 24, 0.7)}
          className="max-w-2xl text-[clamp(36px,5vw,64px)] font-bold leading-[0.95] tracking-tight text-zinc-900"
        >
          Custom Work,
          <br />
          Built To Scale
        </motion.h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Build card */}
          <motion.div
            {...fadeUpInView(0.1)}
            className="rounded-3xl bg-[#f5f4f1] p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-zinc-400 text-lg font-bold text-zinc-900">
              1
            </span>
            <h3 className="mt-16 text-3xl font-bold text-zinc-900">Build</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {BUILD_POINTS.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                  <span className="text-zinc-400">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stack card */}
          <motion.div
            {...fadeUpInView(0.18)}
            className="flex flex-col gap-4 rounded-3xl p-6"
            style={{ background: "#5144d9" }}
          >
            <StackPanel title="Creative Stack" items={CREATIVE_STACK} />
            <StackPanel title="Deployment" items={DEPLOYMENT} />
          </motion.div>
        </div>

        <motion.div {...fadeUpInView(0.26)} className="mt-10 flex items-center gap-3">
          <a
            href="/network"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "#ff4b08" }}
          >
            Start A Project
          </a>
          <a
            href="/network"
            className="rounded-full border border-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Book A Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
