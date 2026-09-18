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

// Decorative "barcode" rail along the left edge — a dense run of black
// bars up top thinning out to a mostly-cream run further down, echoing
// the reference's vertical stripe column. Absolutely positioned against
// this section only, so it never bleeds into the rest of the page.
const RAIL_TOP_BARS = [
  { w: 15, dark: true },
  { w: 3, dark: false },
  { w: 14, dark: true },
  { w: 2, dark: false },
  { w: 8, dark: true },
  { w: 3, dark: false },
  { w: 16, dark: true },
  { w: 2, dark: false },
  { w: 11, dark: true },
  { w: 2, dark: false },
  { w: 6, dark: true },
  { w: 2, dark: false },
  { w: 6, dark: true },
];

// The cream run below isn't one continuous set of bars — it's broken
// into a few shorter bands by plain horizontal cream gaps, with each
// band's bars offset differently from the one above. That's what gives
// it the "woven"/interrupted look instead of clean unbroken stripes.
const RAIL_MID_BARS = [
  { w: 24, dark: false },
  { w: 2, dark: true },
  { w: 18, dark: false },
  { w: 3, dark: true },
  { w: 28, dark: false },
  { w: 2, dark: true },
  { w: 13, dark: false },
];

const RAIL_LOWER_BARS = [
  { w: 14, dark: false },
  { w: 3, dark: true },
  { w: 22, dark: false },
  { w: 2, dark: true },
  { w: 20, dark: false },
  { w: 4, dark: true },
  { w: 25, dark: false },
];

const RAIL_BASE_BARS = [
  { w: 20, dark: false },
  { w: 2, dark: true },
  { w: 30, dark: false },
  { w: 3, dark: true },
  { w: 16, dark: false },
  { w: 2, dark: true },
  { w: 17, dark: false },
];

function RailBand({
  bars,
  className,
}: {
  bars: { w: number; dark: boolean }[];
  className: string;
}) {
  return (
    <div className={`flex w-full ${className}`}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className={bar.dark ? "bg-neutral-950" : "bg-[#e7e4db]"}
          style={{ width: bar.w }}
        />
      ))}
    </div>
  );
}

function BarcodeRail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[90px] flex-col md:flex"
    >
      {/* Short, dense black run up top... */}
      <RailBand bars={RAIL_TOP_BARS} className="h-[18%]" />
      {/* ...then plain cream breaks separating a few shorter,
          differently-offset cream-dominant bands for the rest of the
          rail, echoing the reference's white gaps above and mid-way
          down its own stripe column. */}
      <div className="h-[3%] w-full bg-[#e7e4db]" />
      <RailBand bars={RAIL_MID_BARS} className="h-[27%]" />
      <div className="h-[3%] w-full bg-[#e7e4db]" />
      <RailBand bars={RAIL_LOWER_BARS} className="h-[27%]" />
      <div className="h-[3%] w-full bg-[#e7e4db]" />
      <RailBand bars={RAIL_BASE_BARS} className="h-[19%]" />
    </div>
  );
}

export default function StudioGrids() {
  return (
    <section className="relative flex h-[calc(100vh-92px)] min-h-[560px] flex-col overflow-hidden bg-white px-6 text-neutral-900 sm:px-10 md:pl-[150px] md:pr-16">
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
