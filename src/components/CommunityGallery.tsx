"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

const COLUMNS: { gradient: string }[][] = [
  [{ gradient: "from-fuchsia-400 to-purple-600" }, { gradient: "from-pink-300 to-rose-500" }],
  [{ gradient: "from-emerald-400 to-teal-600" }, { gradient: "from-lime-300 to-emerald-500" }],
  [{ gradient: "from-orange-400 to-red-600" }, { gradient: "from-cyan-300 to-sky-600" }],
  [{ gradient: "from-sky-300 to-blue-600" }, { gradient: "from-yellow-300 to-orange-400" }],
  [{ gradient: "from-amber-300 to-orange-500" }, { gradient: "from-violet-400 to-indigo-700" }],
];

const PARALLAX_MULTIPLIERS = [40, -30, 45, -25, 35];

const FEATURED = { column: 2, row: 0 };

export default function CommunityGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-zinc-100 px-6 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-4 sm:grid-cols-5">
        {COLUMNS.map((column, colIndex) => (
          <ParallaxColumn
            key={colIndex}
            column={column}
            colIndex={colIndex}
            scrollYProgress={scrollYProgress}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </section>
  );
}

function ParallaxColumn({
  column,
  colIndex,
  scrollYProgress,
  hovered,
  setHovered,
}: {
  column: { gradient: string }[];
  colIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  hovered: boolean;
  setHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [PARALLAX_MULTIPLIERS[colIndex], -PARALLAX_MULTIPLIERS[colIndex]]
  );

  return (
    <motion.div style={{ y }} className="flex flex-col gap-4">
      {column.map((item, rowIndex) => {
        const isFeatured = colIndex === FEATURED.column && rowIndex === FEATURED.row;
        return (
          <div key={rowIndex} className="relative">
            <PlaceholderImage
              label=""
              gradient={item.gradient}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: (colIndex * column.length + rowIndex) * 0.05,
                ease: EASE_OUT,
              }}
              onHoverStart={isFeatured ? () => setHovered(true) : undefined}
              onHoverEnd={isFeatured ? () => setHovered(false) : undefined}
              onTap={isFeatured ? () => setHovered((h) => !h) : undefined}
              className="aspect-[3/4] rounded-2xl"
            />
            {isFeatured ? (
              <AnimatePresence>
                {hovered ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-2 rounded-2xl bg-black/40 p-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 flex-shrink-0 rounded-full bg-white/90" />
                      <span>
                        <span className="block text-[11px] font-semibold text-white">
                          Trisha Woodward
                        </span>
                        <span className="block text-[9px] text-white/80">
                          from ArtRoss
                        </span>
                      </span>
                    </div>
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-zinc-900">
                      <Heart size={11} fill="currentColor" />
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : null}
          </div>
        );
      })}
    </motion.div>
  );
}
