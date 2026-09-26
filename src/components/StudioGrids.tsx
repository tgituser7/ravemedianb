"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { imageAt } from "@/lib/images";

// A soft "grid paper" spotlight that only shows up while the pointer is
// over the image, and follows the cursor around — revealing the grid
// pattern wherever you're hovering rather than drifting on its own.
// Self-contained: renders its own full-size mouse-capture layer, so it
// can just be dropped into any `relative overflow-hidden` image wrapper.
function GridHoverBlob({ diameter = 160 }: { diameter?: number }) {
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 260, damping: 28, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 28, mass: 0.4 });
  const left = useTransform(x, (v) => `${v * 100}%`);
  const top = useTransform(y, (v) => `${v * 100}%`);

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          rawX.set((e.clientX - rect.left) / rect.width);
          rawY.set((e.clientY - rect.top) / rect.height);
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full mix-blend-multiply"
        style={{
          width: diameter,
          height: diameter,
          aspectRatio: "1 / 1",
          left,
          top,
          translateX: "-50%",
          translateY: "-50%",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundColor: "rgba(245,244,240,0.92)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
    </>
  );
}

const REELS = [
  { index: "01", title: "Behind the Scenes: On Set with the Rave Crew", duration: "12:41" },
  { index: "02", title: "Process Notes: Grid & Composition in Practice", duration: "04:08" },
];

// Decorative "barcode" rail along the left edge, modeled as a matrix:
// the same irregular column widths (hairline/medium/wide bars, hand-set
// rather than a repeating pattern) run through three stacked bands, and
// a handful of columns get overridden to cream in specific bands —
// that's what punches the "notch" breaks into an otherwise-solid bar,
// rather than each band using an unrelated set of bar widths.
const RAIL_CREAM = "#f0efea";

const RAIL_COLUMNS: { w: number; dark: boolean }[] = [
  { w: 14, dark: true },
  { w: 4, dark: false },
  { w: 6, dark: true },
  { w: 3, dark: false },
  { w: 10, dark: true },
  { w: 3, dark: false },
  { w: 6, dark: true },
  { w: 3, dark: false },
  { w: 16, dark: true },
  { w: 4, dark: false },
  { w: 8, dark: true },
  { w: 3, dark: false },
  { w: 10, dark: true },
];

// band index -> column index -> forced colour. Only the middle band
// breaks a few of its bars to cream mid-height; top and bottom stay
// mostly solid, per the reference.
const RAIL_BAND_OVERRIDES: Record<number, Record<number, boolean>> = {
  1: { 2: false, 6: false, 10: false },
};

// One thin bar in the bottom band doesn't run the full band height —
// it ends early, leaving cream beneath it near the rail's bottom edge.
const RAIL_EARLY_END = { band: 2, column: 6, stopAt: "55%" };

function BarcodeRail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[90px] flex-col md:flex"
    >
      {[0, 1, 2].map((band) => (
        <div key={band} className="flex h-1/3 w-full">
          {RAIL_COLUMNS.map((col, i) => {
            const override = RAIL_BAND_OVERRIDES[band]?.[i];
            const dark = override ?? col.dark;
            const earlyEnd = band === RAIL_EARLY_END.band && i === RAIL_EARLY_END.column;
            return (
              <div key={i} className="flex flex-col" style={{ width: col.w }}>
                <div
                  className={dark ? "bg-neutral-950" : ""}
                  style={{
                    height: earlyEnd ? RAIL_EARLY_END.stopAt : "100%",
                    backgroundColor: dark ? undefined : RAIL_CREAM,
                  }}
                />
                {earlyEnd ? <div className="flex-1" style={{ backgroundColor: RAIL_CREAM }} /> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function StudioGrids() {
  return (
    <section className="relative mb-16 flex h-[calc(100vh-92px)] min-h-[560px] flex-col overflow-hidden bg-white px-6 text-neutral-900 sm:px-10 md:pl-[150px] md:pr-16">
      <BarcodeRail />
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col pt-6 sm:pt-8">
        {/* Title block: "STUDIO" top-left, with a thumbnail on the right
            that's absolutely positioned to stretch the full height of
            this block — from the title's own line all the way down to
            just above the divider bar below — with "VOL. 01" overlaid
            directly on the photo, matching the reference. The whitespace
            beside "STUDIO" is what's left over in this same block. */}
        <div className="relative flex flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="text-[32px] font-bold leading-[0.9] tracking-tight sm:text-[40px] md:text-[52px]"
            >
              STUDIO
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="absolute inset-y-0 right-0 w-[22vw] max-w-[280px] min-w-[180px] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageAt(3)} alt="" className="h-full w-full object-cover grayscale contrast-110" />
            <GridHoverBlob diameter={120} />
            <span className="absolute right-3 top-3 text-[20px] font-bold leading-none tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] sm:text-[24px] md:text-[28px]">
              VOL. 01
            </span>
          </motion.div>
        </div>

        {/* Index / title / duration row */}
        <div className="grid shrink-0 grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE_OUT }}
            >
              <div className="border-t-[16px] border-neutral-950" />
              <div className="mt-3 flex items-start justify-between gap-6">
                <span className="text-[13px] font-medium text-neutral-900">{reel.index}</span>
                <p className="flex-1 text-[13px] font-medium leading-snug text-neutral-900">{reel.title}</p>
                <span className="whitespace-nowrap text-[13px] font-medium tabular-nums text-neutral-900">
                  {reel.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom image panels — take a proportional share of whatever
            vertical space is left, so the whole section always fits in
            one screen at any viewport height. */}
        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-1 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            className="relative min-h-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageAt(12)} alt="" className="h-full w-full object-cover grayscale contrast-110" />
            <GridHoverBlob diameter={220} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            className="relative min-h-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageAt(1)} alt="" className="h-full w-full object-cover grayscale contrast-110" />
            <GridHoverBlob diameter={220} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
