"use client";

import { motion } from "framer-motion";
import { Tag, Users } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import { imageAt } from "@/lib/images";

type Token =
  | { text: string; className?: string }
  | { icon: typeof Users; bg: string };

const TOKENS: Token[] = [
  { text: "Whether" },
  { text: "you're" },
  { text: "an" },
  { text: "artist" },
  { text: "looking" },
  { text: "to" },
  { text: "sell" },
  { text: "your" },
  { text: "work" },
  { text: "/" },
  { text: "or" },
  { text: "buyer" },
  { text: "seeking" },
  { text: "unique", className: "text-teal-500" },
  { text: "pieces" },
  { icon: Users, bg: "bg-zinc-900" },
  { text: "connects", className: "text-zinc-300" },
  { text: "you", className: "text-zinc-300" },
  { text: "to", className: "text-zinc-300" },
  { text: "world", className: "text-zinc-300" },
  { text: "of", className: "text-zinc-300" },
  { text: "creativity", className: "text-zinc-300" },
  { icon: Tag, bg: "bg-orange-500" },
  { text: "commerce." },
];

const WORD_STAGGER = 0.05;

const CARDS = [
  { label: "All Good Things", gradient: "from-zinc-100 via-zinc-200 to-zinc-300", rotate: -18, y: 30 },
  { label: "Where Art Meets Market", gradient: "from-white via-zinc-50 to-zinc-100", rotate: -8, y: 5 },
  { label: "A Knit by le Fleur", gradient: "from-emerald-400 via-green-500 to-teal-600", rotate: 3, y: 0 },
  { label: "Glimmer", gradient: "from-amber-400 via-orange-500 to-red-500", rotate: 14, y: 15 },
  { label: "Fluffy Worm", gradient: "from-sky-400 via-blue-500 to-indigo-500", rotate: 22, y: 45 },
];

const CARDS_CENTER = 2;
const CARDS_BASE_DELAY = 0.15;

export default function CreativityBanner() {
  return (
    <section className="overflow-hidden border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="relative mx-auto max-w-3xl pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="absolute -top-2 left-0 z-10 flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:-left-6"
        >
          @alician
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          className="absolute -top-2 right-0 z-10 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:-right-6"
        >
          @andrea
        </motion.div>
        <p className="text-2xl font-medium leading-snug tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
          {TOKENS.map((token, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * WORD_STAGGER, ease: EASE_OUT }}
            >
              {"icon" in token ? (
                <token.icon
                  className={`inline-block h-7 w-7 -translate-y-1 rounded-full ${token.bg} p-1.5 text-white sm:h-8 sm:w-8`}
                />
              ) : (
                <span className={token.className}>{token.text}</span>
              )}{" "}
            </motion.span>
          ))}
        </p>
      </div>

      <div className="relative mx-auto mt-16 flex h-64 max-w-4xl items-start justify-center sm:h-72">
        {CARDS.map((card, i) => (
          <PlaceholderImage
            key={card.label}
            label={card.label}
            gradient={card.gradient}
            src={imageAt(i + 15)}
            initial={{
              opacity: 0,
              scale: 0.5,
              x: (CARDS_CENTER - i) * 70,
              y: card.y,
              rotate: 0,
            }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: card.y, rotate: card.rotate }}
            viewport={viewportOnce}
            transition={{
              duration: 0.8,
              delay: CARDS_BASE_DELAY + Math.abs(i - CARDS_CENTER) * 0.1,
              ease: EASE_OUT,
            }}
            className={`h-52 w-40 flex-shrink-0 rounded-2xl border-4 border-white shadow-xl sm:h-60 sm:w-44 ${
              i === 0 ? "" : "-ml-10 sm:-ml-12"
            }`}
            style={{ zIndex: 5 - Math.abs(i - CARDS_CENTER) }}
          />
        ))}
      </div>
    </section>
  );
}
