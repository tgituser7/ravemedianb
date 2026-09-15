"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Section 3 — a 3-slide feature carousel: an image card on the left (with
// a rotating caption, a small "device screen" mockup, a pill tag, and a
// vertical diamond pagination rail) paired with a heading/description on
// the right and a "01/03" page counter. Manual controls only (diamond
// clicks + the circular next button) — no autoplay, so nothing can race
// or desync on its own.

const SLIDES = [
  {
    tag: "INTERACTION",
    caption: "TRANSFORMS YOUR GESTURES INTO RICH, LAYERED CHORDS.",
    titleAccent: "Designed For",
    titleRest: "Pure Interaction",
    description:
      "Every curve, button, and surface on the RED-09 is crafted for intuitive musical expression. From pressure-sensitive pads to the fluid chord.",
    chord: "D#M",
  },
  {
    tag: "PERFORMANCE",
    caption: "BUILT TO SURVIVE THE STAGE, NIGHT AFTER NIGHT.",
    titleAccent: "Built For",
    titleRest: "Live Performance",
    description:
      "A reinforced shell and instant-response pads keep RED-09 steady under stage lights, so every set stays exactly as expressive as soundcheck.",
    chord: "G7",
  },
  {
    tag: "PRECISION",
    caption: "MAPS EVERY TOUCH TO STUDIO-GRADE VELOCITY.",
    titleAccent: "Tuned For",
    titleRest: "Studio Precision",
    description:
      "Fine-grained velocity curves and custom mapping give producers exact control, turning subtle finger pressure into precise dynamic range.",
    chord: "CMAJ",
  },
];

export default function InteractionSlider() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  return (
    <section className="bg-zinc-950 px-[6%] py-28 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Image card */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 aspect-[4/5]">
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.caption}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="max-w-[65%] text-sm leading-snug text-zinc-300"
            >
              {slide.caption}
            </motion.p>
          </AnimatePresence>

          {/* Device visual with a small CSS-built "screen" overlay */}
          <div className="relative mt-8 h-[64%] w-full overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Frame-34.jpeg"
              alt="RED-09 chord machine detail"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-x-6 bottom-6 top-6 flex flex-col justify-between rounded-2xl bg-zinc-950/90 p-4">
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-white" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slide.chord}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {slide.chord}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-zinc-700">
                <span className="h-8 w-8 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span className="text-sm">T</span>
                <span className="grid grid-cols-2 gap-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-zinc-600" />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Diamond pagination rail */}
          <div className="absolute right-5 top-1/3 flex flex-col gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rotate-45 transition-colors ${
                  i === active ? "bg-orange-500" : "border border-zinc-600"
                }`}
              />
            ))}
          </div>

          {/* Pill tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs tracking-wide text-zinc-400"
            >
              <span>⌘</span>
              <span>{slide.tag}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text column */}
        <div className="relative">
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
          >
            ✦
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="max-w-lg text-[clamp(32px,4vw,52px)] font-bold leading-[1.05]">
                <span className="text-orange-500">{slide.titleAccent}</span>{" "}
                {slide.titleRest}
              </h2>
              <p className="mt-6 max-w-md text-sm uppercase leading-relaxed tracking-wide text-zinc-400">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-24 text-right">
            <span className="text-2xl font-bold text-white">0{active + 1}</span>
            <span className="text-sm text-zinc-500"> /0{SLIDES.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
