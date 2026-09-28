"use client";

import { motion } from "framer-motion";
import { Camera, Clock, Gift, GraduationCap, HeartPulse, Plane, Utensils, Wallet } from "lucide-react";
import { fadeUpInView } from "@/lib/motion";
import { PERKS } from "@/data/careers";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "heart-pulse": HeartPulse,
  clock: Clock,
  camera: Camera,
  "graduation-cap": GraduationCap,
  plane: Plane,
  utensils: Utensils,
  wallet: Wallet,
  gift: Gift,
};

export default function CareersPerks() {
  return (
    <section className="bg-zinc-950 px-[6%] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...fadeUpInView(0, 20, 0.7)}
          className="max-w-lg text-[clamp(28px,3.6vw,42px)] font-bold leading-tight tracking-tight"
        >
          What you get
        </motion.h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.div
                key={p.label}
                {...fadeUpInView((i % 4) * 0.06, 18, 0.6)}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors hover:border-zinc-700"
              >
                <Icon size={22} className="text-orange-500" />
                <h3 className="mt-4 text-base font-semibold">{p.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
