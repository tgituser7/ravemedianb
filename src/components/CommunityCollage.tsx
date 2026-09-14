"use client";

import { motion } from "framer-motion";
import { Wine } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";

type Direction = "top" | "bottom" | "left" | "right";

const GRADIENTS = [
  "from-orange-400 to-amber-600",
  "from-emerald-700 to-zinc-900",
  "from-fuchsia-500 to-purple-700",
  "from-zinc-400 to-zinc-600",
  "from-amber-200 to-zinc-400",
  "from-rose-300 to-orange-400",
  "from-red-600 to-rose-800",
  "from-zinc-700 to-zinc-900",
  "from-yellow-300 to-amber-500",
  "from-rose-800 to-red-950",
];

const TOP_ROW: { gradient: string; direction: Direction; rotate: number }[] = GRADIENTS.map(
  (gradient, i) => ({ gradient, direction: "top", rotate: i % 2 === 0 ? -4 : 4 })
);

const BOTTOM_ROW: { gradient: string; direction: Direction; rotate: number }[] = [
  ...GRADIENTS,
].reverse().map((gradient, i) => ({
  gradient,
  direction: "bottom",
  rotate: i % 2 === 0 ? 4 : -4,
}));

function directionOffset(direction: Direction) {
  switch (direction) {
    case "top":
      return { y: -60, x: 0 };
    case "bottom":
      return { y: 60, x: 0 };
    case "left":
      return { y: 0, x: -60 };
    case "right":
      return { y: 0, x: 60 };
  }
}

function CollageRow({
  items,
  baseDelay,
}: {
  items: { gradient: string; direction: Direction; rotate: number }[];
  baseDelay: number;
}) {
  return (
    <div className="flex justify-center gap-4 px-4">
      {items.map((item, i) => {
        const offset = directionOffset(item.direction);
        return (
          <div
            key={i}
            className="animate-float flex-shrink-0"
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          >
            <PlaceholderImage
              label=""
              gradient={item.gradient}
              initial={{ opacity: 0, scale: 0.85, rotate: item.rotate * 2, ...offset }}
              whileInView={{ opacity: 1, scale: 1, rotate: item.rotate, x: 0, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.8,
                delay: baseDelay + i * 0.03,
                ease: EASE_OUT,
              }}
              className="h-24 w-24 rounded-2xl shadow-md sm:h-28 sm:w-28"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function CommunityCollage() {
  return (
    <section className="overflow-hidden border-t border-zinc-100 py-20 lg:py-28">
      <div className="mx-auto max-w-full">
        <CollageRow items={TOP_ROW} baseDelay={0} />

        <div className="mx-auto my-10 max-w-xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-sm"
          >
            <Wine size={16} />
          </motion.span>
          <motion.h2
            {...fadeUpInView(0.4, 26, 0.7)}
            className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
          >
            You will find yourself among us
          </motion.h2>
          <motion.p
            {...fadeUpInView(0.5, 18, 0.6)}
            className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Dive into a dynamic community where artists and buyers
            seamlessly merge.
          </motion.p>
        </div>

        <CollageRow items={BOTTOM_ROW} baseDelay={0.15} />
      </div>
    </section>
  );
}
