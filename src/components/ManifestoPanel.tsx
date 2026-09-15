"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

// Section 2 — the black "manifesto" panel. Plays once when scrolled into
// view (via useInView, not continuous scroll progress): the sentence
// types itself out, and the stat bars count up from zero. Being a
// one-shot, trigger-once animation rather than a scroll-position-driven
// one, it can't glitch on fast or reversed scrolling the way the earlier
// pinned/scroll-jacked version did.

const MANIFESTO =
  "RED-09 is a pressure-sensitive chord machine that turns music theory into pure instinct.";
const ICON_MARK = "chord machine ";
const ICON_SPLIT = MANIFESTO.indexOf(ICON_MARK) + ICON_MARK.length;

const STATS = [
  { label: "ACTIVE SESSIONS", sublabel: "HIGHEST REAL-TIME ENGAGEMENT.", target: 75 },
  { label: "CUSTOM MAPPING", sublabel: "RARELY CONFIGURED BY USERS.", target: 2 },
  { label: "EXPRESSION CONTROL", sublabel: "MODERATE USE OF VELOCITY.", target: 16 },
  { label: "KEY SHIFT USAGE", sublabel: "LIMITED MODULATION IN PLAY.", target: 7 },
];

const TYPE_DURATION_MS = 1400;
const COUNT_DURATION_MS = 1200;

export default function ManifestoPanel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const [typedCount, setTypedCount] = useState(0);
  const [statsFrac, setStatsFrac] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setTypedCount(Math.round(clamp01(elapsed / TYPE_DURATION_MS) * MANIFESTO.length));
      setStatsFrac(clamp01(elapsed / COUNT_DURATION_MS));
      if (elapsed < Math.max(TYPE_DURATION_MS, COUNT_DURATION_MS)) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  const manifestoBefore = MANIFESTO.slice(0, Math.min(typedCount, ICON_SPLIT));
  const manifestoAfter = typedCount > ICON_SPLIT ? MANIFESTO.slice(ICON_SPLIT, typedCount) : "";
  const showCursor = typedCount < MANIFESTO.length;

  return (
    <section
      ref={ref}
      className="relative rounded-t-[2.5rem] bg-zinc-950 px-[6%] pb-24 pt-24 text-white"
    >
      {/* Raised tab: the CTA straddles the seam, half sitting in the white
          hero above and half in the black panel, so it reads as a rounded
          bump grown out of the panel's otherwise flat top edge. */}
      <a
        href="/network"
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-zinc-800"
      >
        GET STARTED
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <motion.div {...fadeUpInView(0)} className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Play chords
          <br />
          Differently
        </motion.div>
        <motion.a
          {...fadeUpInView(0.05)}
          href="/network"
          className="rounded-full border border-zinc-700 px-6 py-2.5 text-xs font-semibold tracking-wide text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          ABOUT US
        </motion.a>
      </div>

      <p className="mx-auto mt-16 max-w-4xl text-2xl font-medium leading-snug sm:text-4xl">
        {manifestoBefore}
        {typedCount > ICON_SPLIT && (
          <span className="mx-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 align-middle text-xs text-white">
            +
          </span>
        )}
        {manifestoAfter}
        <span className="text-base text-zinc-500"> /20</span>
        {showCursor && (
          <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-white align-middle" />
        )}
      </p>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 divide-x divide-zinc-800 sm:grid-cols-4">
        {STATS.map((stat, i) => {
          const value = Math.round(stat.target * statsFrac);
          const barPct = statsFrac * 100;
          if (i === 0) {
            return (
              <div key={stat.label} className="px-6 first:pl-0">
                <div className="flex items-baseline justify-between text-[11px] font-semibold tracking-wide text-zinc-300">
                  <span>{stat.label}</span>
                  <span className="text-zinc-500">/{stat.target}</span>
                </div>
                <p className="mt-1 text-[10px] text-zinc-500">{stat.sublabel}</p>
                <div className="relative mt-4 h-28 w-full overflow-hidden rounded-md bg-zinc-900">
                  <div
                    className="absolute inset-x-0 bottom-0 bg-orange-500"
                    style={{ height: `${barPct}%` }}
                  />
                  <span className="absolute bottom-3 left-3 text-3xl font-bold text-white">
                    {value}%
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div key={stat.label} className="px-6">
              <div className="flex items-baseline justify-between text-[11px] font-semibold tracking-wide text-zinc-400">
                <span>{stat.label}</span>
                <span className="text-zinc-600">/{stat.target}</span>
              </div>
              <p className="mt-1 text-[10px] text-zinc-600">{stat.sublabel}</p>
              <div className="mt-4 text-3xl font-bold text-white">{value}%</div>
              <div className="relative mt-3 h-28 w-full overflow-hidden rounded-md bg-zinc-900">
                <div
                  className="absolute inset-x-0 bottom-0 bg-zinc-700"
                  style={{ height: `${barPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
