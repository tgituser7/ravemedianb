"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

export default function CareersCTA() {
  return (
    <section className="bg-zinc-950 px-[6%] py-24 text-center text-white sm:py-28">
      <motion.h2
        {...fadeUpInView(0, 20, 0.7)}
        className="mx-auto max-w-xl text-[clamp(28px,4vw,48px)] font-bold leading-tight tracking-tight"
      >
        Don&apos;t see your role? We&apos;re still listening.
      </motion.h2>
      <motion.p {...fadeUpInView(0.1, 14, 0.6)} className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
        Send us your reel or resume anyway. We keep every application on file for the next opening that fits.
      </motion.p>
      <motion.a
        {...fadeUpInView(0.2, 14, 0.5)}
        href="mailto:work@rave.net.in?subject=General%20Application"
        className="mt-8 inline-block rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
      >
        Get in touch
      </motion.a>
    </section>
  );
}
