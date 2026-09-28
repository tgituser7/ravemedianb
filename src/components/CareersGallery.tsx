"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

const PHOTOS = [
  { src: "/Shooting Floor.jpeg", h: "h-72" },
  { src: "/makeup.JPG", h: "h-48" },
  { src: "/cstudio.jpeg", h: "h-60" },
  { src: "/w2orking.JPG", h: "h-56" },
  { src: "/animation studio_1.jpeg", h: "h-72" },
  { src: "/Resources Equipments 2.jpeg", h: "h-48" },
  { src: "/kset2.JPG", h: "h-60" },
  { src: "/DSC_0635 copy.jpg", h: "h-56" },
];

export default function CareersGallery() {
  return (
    <section id="life" className="scroll-mt-20 bg-white px-[6%] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...fadeUpInView(0, 14, 0.5)}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500"
        >
          Life at Rave
        </motion.p>
        <motion.h2
          {...fadeUpInView(0.08, 20, 0.7)}
          className="mt-4 max-w-lg text-[clamp(28px,3.6vw,42px)] font-bold leading-tight tracking-tight text-zinc-900"
        >
          More set than office.
        </motion.h2>

        <div className="mt-12 columns-2 gap-4 sm:columns-3">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.src}
              {...fadeUpInView((i % 6) * 0.06, 20, 0.6)}
              className={`mb-4 overflow-hidden rounded-2xl ${p.h}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
