"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

// A full-bleed photo banner between the white sections of the home page:
// "We Create" on the left, "We Inspire" on the right.
//
// The parallax is real CSS `background-attachment: fixed` this time (the
// photo stays pinned to the viewport while the page scrolls past it), not a
// scroll-linked transform. For that to work, nothing between the photo div
// and the viewport can set a `transform`/`filter`/`perspective` — any of
// those turns "fixed" into "local" — so the photo layer is a plain div, not
// a motion.div. `backgroundSize` is pushed past a normal cover-fit so the
// photo has slack to stay legible while pinned, `backgroundBlendMode:
// luminosity` tints it with the background-color under it, and the drop
// shadow is the one static touch that isn't scroll-related at all.
const TINT = "#0a0a0a";

export default function WeCreateInspire() {
  return (
    <section className="border-t border-zinc-100 bg-white px-6 py-14 lg:py-16">
      <div className="relative mx-auto h-[22rem] max-w-6xl overflow-hidden rounded-[28px] sm:h-[26rem]">
        <div
          aria-hidden
          className="absolute inset-0 bg-center"
          style={{
            backgroundImage: "url(/Christies-FI-Hero.jpeg)",
            backgroundSize: "160%",
            backgroundAttachment: "fixed",
            backgroundColor: TINT,
            backgroundBlendMode: "luminosity",
            filter: "drop-shadow(2px 4px 10px gray)",
            transition: "all 1s ease",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/35" />

        <div className="relative flex h-full flex-col justify-center gap-10 px-8 sm:px-12 md:flex-row md:items-center md:justify-between md:gap-6">
          <motion.div {...fadeUpInView(0)} className="max-w-xs">
            <p className="text-[clamp(30px,4vw,44px)] font-bold leading-none tracking-tight text-white">We Create</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              environment that forges us with our fate
            </p>
          </motion.div>
          <motion.div {...fadeUpInView(0.12)} className="max-w-xs md:text-right">
            <p className="text-[clamp(30px,4vw,44px)] font-bold leading-none tracking-tight text-white">We Inspire</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              through synchronizing our idea with your desires
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
