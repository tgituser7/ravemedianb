"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, PenTool, Circle, Aperture, Flag, Layers, Sparkles } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";
import { imageAt } from "@/lib/images";

const TABS = ["Business", "Personal"] as const;

const GALLERIES: Record<(typeof TABS)[number], { label: string; gradient: string }[]> = {
  Personal: [
    { label: "Staff Pick", gradient: "from-orange-400 to-amber-600" },
    { label: "Le Fleur", gradient: "from-lime-200 to-emerald-300" },
    { label: "The Green Knight", gradient: "from-yellow-400 to-amber-500" },
    { label: "Social Habits", gradient: "from-fuchsia-500 to-purple-700" },
    { label: "Glimmer", gradient: "from-orange-500 to-red-600" },
    { label: "Fluffy Worm", gradient: "from-sky-300 to-blue-500" },
  ],
  Business: [
    { label: "Quarterly Deck", gradient: "from-zinc-700 to-zinc-900" },
    { label: "Brand Kit", gradient: "from-blue-400 to-indigo-600" },
    { label: "Pitch Class", gradient: "from-teal-400 to-emerald-600" },
    { label: "Growth Plan", gradient: "from-rose-400 to-red-600" },
    { label: "Client Notes", gradient: "from-amber-300 to-orange-500" },
    { label: "Roadmap", gradient: "from-violet-400 to-purple-700" },
  ],
};

const FLOATING_ICONS = [
  { Icon: PenTool, className: "left-2 top-0", jitter: 0.02 },
  { Icon: Circle, className: "left-16 top-10", jitter: 0.08 },
  { Icon: Aperture, className: "left-32 top-2", jitter: -0.03 },
  { Icon: Flag, className: "left-48 top-10", jitter: 0.06 },
  { Icon: Layers, className: "left-16 top-24", jitter: -0.05 },
  { Icon: Sparkles, className: "left-40 top-24", jitter: 0.04 },
];

const ICON_STAGGER = 0.1;
const ICONS_BASE_DELAY = 0.4;

export default function VisionSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Personal");

  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <motion.span
            {...fadeUpInView(0, 16, 0.5)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white"
          >
            <Send size={14} strokeWidth={2.5} fill="white" />
          </motion.span>

          <motion.h2
            {...fadeUpInView(0.1, 22, 0.7)}
            className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
          >
            Our vision
            <br />
            for any art technology.
          </motion.h2>

          <motion.p
            {...fadeUpInView(0.2, 20, 0.6)}
            className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Every piece of art tells a story. Echoes of Expression allows
            artists to showcase their personal journeys through their work.
          </motion.p>

          <motion.button
            {...fadeUpInView(0.28, 16, 0.5)}
            className="mt-5 text-sm font-medium text-zinc-900 underline underline-offset-4"
          >
            Read more
          </motion.button>

          <div className="relative mt-16 h-40 w-full max-w-xs">
            {FLOATING_ICONS.map(({ Icon, className, jitter }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: ICONS_BASE_DELAY + i * ICON_STAGGER + jitter,
                  ease: EASE_OUT,
                }}
                className={`absolute flex h-14 w-14 items-center justify-center rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-sm ${className}`}
              >
                <Icon size={18} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="rounded-3xl border border-zinc-100 bg-zinc-50 p-4 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full bg-white p-1 text-xs font-medium shadow-sm">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    tab === t ? "bg-zinc-900 text-white" : "text-zinc-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white">
              + Create
            </button>
          </div>

          <div className="relative grid grid-cols-3 gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="col-span-3 grid grid-cols-3 gap-3"
              >
                {GALLERIES[tab].map((item, i) => (
                  <PlaceholderImage
                    key={item.label}
                    label={item.label}
                    gradient={item.gradient}
                    src={imageAt(i + (tab === "Business" ? 6 : 0))}
                    className="aspect-[3/4] rounded-xl"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
