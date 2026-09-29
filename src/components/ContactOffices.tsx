"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

const OFFICES = [
  {
    city: "Lucknow",
    image: "/lko.png",
    address: "Gomti Nagar, Lucknow",
    tel: "522 7964408",
  },
  {
    city: "Mumbai",
    image: "/mumbai.png",
    address: "Santacruz West, Mumbai",
    tel: "+91 8451897298",
  },
];

export default function ContactOffices() {
  return (
    <section className="px-[6%] pb-16 pt-16">
      <div className="mx-auto grid max-w-4xl gap-16 sm:grid-cols-2 sm:gap-8">
        {OFFICES.map((o, i) => (
          <motion.div key={o.city} {...fadeUpInView(i * 0.1, 24, 0.7)} className="flex flex-col items-center text-center">
            {/* A fixed box for both, not just a shared height: the Lucknow
                arch is wide and short while the Mumbai one is taller and
                narrower, so matching height alone still left Lucknow
                looking noticeably bigger. */}
            <div className="flex h-40 w-56 items-center justify-center sm:h-48 sm:w-64">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.image} alt={`${o.city} office`} className="max-h-full max-w-full object-contain" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-zinc-900">{o.city}</h2>
            <p className="mt-3 text-zinc-600">{o.address}</p>
            <p className="mt-2 text-zinc-600">Tel : {o.tel}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
