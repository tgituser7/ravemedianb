"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Section 6 — a story/video reel slider: a numbered index with a
// grayscale video thumbnail, an "ABOUT" blurb and "TAGS" row on the left,
// paired with a vertical list of topic words on the right (click any word
// to jump to it, or use the circular button to advance). A continuous
// marquee ticker runs along the bottom, independent of the slide state.

const SLIDES = [
  {
    word: "Switching",
    about:
      "Flip between scales and chord modes mid-performance with a single press — no menus, no lag, just the next idea.",
    tags: ["MODE", "SWITCH", "FLOW"],
  },
  {
    word: "Chord Path",
    about:
      "Map out custom chord progressions once, then trigger the whole path with a single pad. Build your own shortcuts through music theory.",
    tags: ["PATH", "CUSTOM", "MAPPING"],
  },
  {
    word: "Interaction",
    about:
      "Before the RED-09, building chord progressions always felt rigid. This changes everything. I'm no longer clicking blocks in a DAW or stuck thinking about theory.",
    tags: ["KEY", "INTERACTION", "PROGRESSIONS"],
  },
  {
    word: "Expression",
    about:
      "Pressure-sensitive pads translate every ounce of touch into dynamics, so a chord can whisper or shout depending on how you play it.",
    tags: ["PRESSURE", "VELOCITY", "EXPRESSION"],
  },
  {
    word: "Pressure",
    about:
      "Finely tuned pressure curves respond the instant you press down, keeping the instrument feeling immediate at any velocity.",
    tags: ["PRESSURE", "RESPONSE", "TOUCH"],
  },
  {
    word: "Movement",
    about:
      "Gesture control turns hand movement into modulation — tilt, swipe, and hold gestures shape the sound in real time.",
    tags: ["GESTURE", "MOTION", "CONTROL"],
  },
];

const YEAR = "2025";
const TICKER_WORDS = ["RAVE", "GET STARTED"];

export default function StoryReel() {
  const [active, setActive] = useState(2);
  const slide = SLIDES[active];
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-zinc-950 px-[6%] pb-28 pt-24 text-white">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        {/* Left: index, thumbnail, about, tags */}
        <div>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold leading-none">
              0{active + 1}
              <span className="text-orange-500">/</span>
            </span>
            <span className="pb-1 text-sm text-zinc-500">{YEAR}</span>
          </div>

          <button
            aria-label="Play preview"
            className="group relative mt-10 flex h-32 w-52 items-center justify-center overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Frame-34.jpeg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-900 transition-transform group-hover:scale-110">
              ▶
            </span>
          </button>

          <div className="mt-12 border-t border-zinc-800 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  About
                </p>
                <p className="mt-3 max-w-sm text-sm uppercase leading-relaxed tracking-wide text-zinc-300">
                  {slide.about}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 border-t border-zinc-800 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Tags</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex flex-wrap gap-3"
              >
                {slide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: vertical word list */}
        <div className="relative flex flex-col justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.word}
              onClick={() => setActive(i)}
              className="flex items-center gap-4 py-2 text-left"
            >
              <span className="w-10 shrink-0 text-[10px] text-zinc-600">{YEAR}</span>
              <span
                className={`text-3xl font-bold transition-colors sm:text-4xl ${
                  i === active ? "text-white" : "text-zinc-700 hover:text-zinc-500"
                }`}
              >
                {s.word}
              </span>
              {i === active && (
                <span className="h-3 w-3 shrink-0 rounded-full bg-zinc-900 ring-1 ring-zinc-600" />
              )}
            </button>
          ))}

          <button
            onClick={next}
            aria-label="Next"
            className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
          >
            ✦
          </button>
        </div>
      </div>

      {/* Continuous marquee ticker */}
      <div className="relative mt-24 overflow-hidden border-y border-zinc-800 py-4">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-10 whitespace-nowrap text-sm font-semibold tracking-wide text-zinc-600">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{TICKER_WORDS[i % 2]}</span>
              <span className="text-orange-500">|</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
