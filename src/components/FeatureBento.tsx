"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";

// Section 5 — a 6-card "bento" grid mixing stats, feature illustrations
// (a fine-tune dial, three faders), a device-screen detail, an orange CTA
// card, and a repeated testimonial snippet. All static/whileInView —
// nothing here is scroll-position-driven.

function Card({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      {...fadeUpInView(delay)}
      className={`rounded-3xl p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Dial() {
  const ticks = Array.from({ length: 28 });
  const activeCount = Math.round(ticks.length * 0.62);
  return (
    <div className="relative mx-auto h-32 w-32">
      {ticks.map((_, i) => {
        const angle = (i / (ticks.length - 1)) * 270 - 135;
        return (
          <span
            key={i}
            className={`absolute left-1/2 top-1/2 h-2 w-[2px] origin-[0_58px] ${
              i < activeCount ? "bg-orange-500" : "bg-zinc-700"
            }`}
            style={{ transform: `translate(-50%, -58px) rotate(${angle}deg)` }}
          />
        );
      })}
      <div className="absolute inset-5 rounded-full bg-zinc-800">
        <span className="absolute left-1/2 top-2.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange-500" />
      </div>
    </div>
  );
}

function Faders() {
  const bars = [
    { fill: 38, color: "bg-zinc-500" },
    { fill: 72, color: "bg-orange-500" },
    { fill: 28, color: "bg-zinc-500" },
  ];
  return (
    <div className="mx-auto flex h-32 items-end justify-center gap-10">
      {bars.map((b, i) => (
        <div key={i} className="relative h-full w-1 rounded-full bg-zinc-700">
          <span
            className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-zinc-950 ${b.color}`}
            style={{ bottom: `${b.fill}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function DeviceScreen() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-950">
      <div className="flex items-center justify-between px-3 pt-3 text-[9px] text-zinc-500">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span>C#MAJ</span>
      </div>
      <div className="mx-auto mt-3 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700">
        <span className="h-6 w-6 rounded-full bg-orange-500" />
      </div>
      <div className="flex items-center justify-between px-3 pb-3 pt-2 text-zinc-600">
        <span className="text-xs">T</span>
        <span className="grid grid-cols-2 gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-zinc-600" />
          ))}
        </span>
      </div>
    </div>
  );
}

export default function FeatureBento() {
  return (
    <section className="bg-zinc-950 px-[6%] py-24 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stat card */}
        <Card delay={0} className="border border-zinc-800 bg-zinc-900/60 text-center">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-4xl font-bold tracking-tight">
              <span className="text-orange-500">&gt;</span>230K
            </p>
            <p className="mt-6 max-w-[220px] text-sm uppercase leading-relaxed tracking-wide text-zinc-400">
              Since switching to RED-09, my creative flow has never felt this
              immediate.
            </p>
          </div>
        </Card>

        {/* Progressions created + device screen */}
        <Card delay={0.06} className="border border-zinc-800 bg-zinc-900/60">
          <p className="text-3xl font-bold tracking-tight">
            320<span className="text-orange-500">+</span>
          </p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Progressions created
          </p>
          <div className="mt-6">
            <DeviceScreen />
          </div>
          <p className="mt-6 text-xs uppercase leading-relaxed tracking-wide text-zinc-500">
            Artists have unlocked hundreds of custom chord paths.
          </p>
        </Card>

        {/* CTA card */}
        <Card delay={0.12} className="flex flex-col items-center justify-center bg-orange-500 text-center">
          <a href="/network" className="flex flex-col items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-xl">
              🌐
            </span>
            <span className="text-lg font-semibold">Explore More About Us</span>
          </a>
        </Card>

        {/* Dial */}
        <Card delay={0.18} className="border border-zinc-800 bg-zinc-900/60 text-center">
          <Dial />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Fine-tune your expression
          </p>
        </Card>

        {/* Faders */}
        <Card delay={0.24} className="border border-zinc-800 bg-zinc-900/60 text-center">
          <Faders />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Built around you
          </p>
          <p className="mt-2 text-xs uppercase leading-relaxed tracking-wide text-zinc-500">
            Every switch, every slider — optimized for how you create, not
            how others expect.
          </p>
        </Card>

        {/* Testimonial snippet */}
        <Card delay={0.3} className="border border-zinc-800 bg-zinc-900/60 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm">
              ⌘
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm">
              +
            </span>
          </div>
          <p className="mt-6 text-sm uppercase leading-relaxed tracking-wide text-zinc-400">
            Since switching to RED-09, my creative flow has never felt this
            immediate.
          </p>
          <p className="mt-6 text-sm font-semibold text-white">Masbe Cek</p>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Sound Designer</p>
        </Card>
      </div>
    </section>
  );
}
