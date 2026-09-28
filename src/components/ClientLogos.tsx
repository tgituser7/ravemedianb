"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";
import { CLIENT_LOGOS } from "@/data/clientLogos";

// Last section on /studio: the brand wall of clients we've shot for.
export default function ClientLogos({
  heading = "With whom we've shared our memorable experiences",
  closing = "Are the ones who inspire us to reveal and explore our better selves.",
}: {
  heading?: string;
  closing?: string;
}) {
  return (
    <section className="bg-white px-[6%] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...fadeUpInView(0, 20, 0.7)}
          className="text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          {heading}
        </motion.p>

        <motion.div
          {...fadeUpInView(0.1, 20, 0.7)}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-12 sm:gap-x-20"
        >
          {CLIENT_LOGOS.map((logo, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={logo.src}
              src={`/${logo.src}`}
              alt=""
              className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 sm:h-14"
              style={{ transitionDelay: `${Math.min(i, 12) * 15}ms` }}
            />
          ))}
        </motion.div>

        <motion.p
          {...fadeUpInView(0.15, 16, 0.6)}
          className="mx-auto mt-20 max-w-3xl text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          {closing}
        </motion.p>
      </div>
    </section>
  );
}
