"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Section 4 — a testimonial carousel: a top info ticker (reusing the same
// four-column strip from the hero), a big pull-quote heading, the full
// quote body, an author (initials avatar, name, role), a star rating, and
// a "01/03" counter with a single forward arrow to advance. Fictional
// authors only — no real names or photos are used.
 
const TICKER = ["$799.00", "NOW AVAILABLE", "DEVICE", "NEW VERSION"];

const TESTIMONIALS = [
  {
    quote: "IT'S LIKE SCULPTING CHORDS WITH YOUR HANDS!",
    body: "Before the RED-09, building chord progressions always felt rigid. This changes everything. I'm no longer clicking blocks in a DAW or stuck thinking about theory — I just play. It responds to pressure, movement, and intent.",
    name: "Masbe Cek",
    role: "Sound Designer",
    rating: 5.0,
  },
  {
    quote: "IT FEELS LIKE THE INSTRUMENT IS LISTENING.",
    body: "I've owned a lot of MIDI controllers and none of them react like this. The pressure curve on the pads makes every chord feel performed, not programmed. It's changed how I write from the very first session.",
    name: "Rin Okabe",
    role: "Touring Keyboardist",
    rating: 4.9,
  },
  {
    quote: "MY BEDROOM SESSIONS SOUND LIKE A STUDIO NOW.",
    body: "The custom mapping alone paid for the device. I built a whole live set around gesture control in an afternoon, no manual required. It's the first piece of gear that actually got out of my way.",
    name: "Theo Marsh",
    role: "Bedroom Producer",
    rating: 5.0,
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section className="bg-zinc-950 px-[6%] py-24 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-xs tracking-wide text-zinc-400">
        {TICKER.map((label, i) => (
          <span key={label} className={i === 0 ? "font-medium text-white" : ""}>
            {label}
          </span>
        ))}
      </div>

      <div className="relative mx-auto mt-24 max-w-6xl">
        <span className="absolute -left-2 -top-6 text-5xl text-zinc-700">&ldquo;</span>
        <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-700 text-lg text-zinc-500">
          &rdquo;
        </div>
        <div className="absolute right-0 top-0 text-right">
          <span className="text-2xl font-bold text-white">0{active + 1}</span>
          <span className="text-sm text-zinc-500"> /0{TESTIMONIALS.length}</span>
        </div>

        <div className="grid gap-12 pt-16 lg:grid-cols-[220px_1fr]">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">
              {initials}
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold tracking-wide text-white">{t.name}</p>
              <p className="text-xs uppercase tracking-wide text-zinc-500">{t.role}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="max-w-2xl text-2xl font-bold uppercase leading-snug sm:text-3xl">
                {t.quote}
              </h2>
              <p className="mt-6 max-w-2xl text-sm uppercase leading-relaxed tracking-wide text-zinc-400">
                {t.body}
              </p>

              <div className="mt-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-white">
                    {t.rating.toFixed(1)}
                  </span>
                  <div className="flex gap-1 text-orange-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {TESTIMONIALS.filter((_, i) => i !== active)
                      .slice(0, 2)
                      .map((other) => (
                        <div
                          key={other.name}
                          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[10px] font-semibold text-zinc-300"
                        >
                          {other.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
