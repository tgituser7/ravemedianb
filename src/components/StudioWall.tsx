"use client";

import { useReducedMotion, motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import {
  Anatomy,
  BlankSlide,
  ClearSpace,
  DataDriven,
  Discover,
  LogoApplication,
  LogoVariants,
  LogoYellow,
  MarkSlide,
  PaletteText,
  PrimaryColours,
  SecondaryColours,
  SocialPosts,
  TealCover,
  ThankYouCard,
  TickerBlack,
  TitleCard,
  TypeSpecimen,
  Weights,
  YellowScale,
} from "@/components/studioWall/slides";
import { CARD_H, CARD_W } from "@/components/studioWall/slides";

// A self-playing "brand wall": rows of design-spec cards that drift
// sideways forever, alternating direction row to row, entirely on their
// own — no scrolling required to see them move.
const CARD_SCALE = 0.6;
const MINI_W = CARD_W * CARD_SCALE;
const MINI_H = CARD_H * CARD_SCALE;
const CARD_GAP = 14;

type WallCard = { x: number; el: ReactNode };

// Each row's own content (the `x` values were reference-video coordinates
// from an earlier scroll-synced version of this wall — no longer used,
// but the shape is kept as-is so this data doesn't need retyping).
const ROWS: { k: number; cards: WallCard[]; duration: number }[] = [
  {
    k: -3,
    duration: 50,
    cards: [
      { x: 234, el: <TealCover /> },
      { x: 660, el: <LogoApplication /> },
      { x: 1085, el: <TitleCard num="02" title="Logo" /> },
      { x: 1511, el: <LogoVariants /> },
    ],
  },
  {
    k: -2,
    duration: 60,
    cards: [
      { x: 315, el: <BlankSlide /> },
      { x: 741, el: <ClearSpace /> },
      { x: 1166, el: <TickerBlack /> },
      { x: 1591, el: <Anatomy /> },
    ],
  },
  {
    k: -1,
    duration: 66,
    cards: [
      { x: -957, el: <PrimaryColours /> },
      { x: -525, el: <TitleCard num="03" title="Typography" /> },
      { x: -101, el: <Discover /> },
      { x: 325, el: <TypeSpecimen /> },
      { x: 751, el: <TitleCard num="04" title="Colour" /> },
    ],
  },
  {
    k: 0,
    duration: 70,
    cards: [
      { x: -125, el: <PrimaryColours /> },
      { x: 301, el: <PaletteText /> },
      { x: 727, el: <SocialPosts /> },
      { x: 1153, el: <LogoYellow /> },
      { x: 1579, el: <PaletteText /> },
    ],
  },
  {
    k: 1,
    duration: 54,
    cards: [
      { x: -516, el: <SecondaryColours /> },
      { x: -90, el: <Weights /> },
      { x: 336, el: <LogoApplication /> },
      { x: 762, el: <YellowScale /> },
    ],
  },
  {
    k: 2,
    duration: 78,
    cards: [
      { x: -350, el: <MarkSlide /> },
      { x: 76, el: <ThankYouCard /> },
      { x: 502, el: <TypeSpecimen /> },
      { x: 928, el: <TitleCard num="05" title="Social" /> },
      { x: 1354, el: <DataDriven /> },
      { x: 1780, el: <SocialPosts /> },
    ],
  },
];

function MiniCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ width: MINI_W, height: MINI_H, flexShrink: 0, overflow: "hidden", borderRadius: 4 }}
    >
      <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${CARD_SCALE})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

function MarqueeRow({
  cards,
  reverse,
  duration,
  reduced,
}: {
  cards: WallCard[];
  reverse: boolean;
  duration: number;
  reduced: boolean;
}) {
  // Two identical copies back to back: animating exactly -50% (or the
  // reverse) is a perfectly seamless loop no matter how wide the row is.
  const doubled = [...cards, ...cards];
  const transition: Transition = { duration, ease: "linear", repeat: Infinity };

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max items-center"
        style={{ gap: CARD_GAP }}
        animate={reduced ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={transition}
      >
        {doubled.map((c, i) => (
          <MiniCard key={i}>{c.el}</MiniCard>
        ))}
      </motion.div>
    </div>
  );
}

export default function StudioWall() {
  const reduced = useReducedMotion();

  return (
    <section aria-label="Brand guidelines wall" className="relative overflow-hidden bg-black py-16">
      {/* Slow ambient zoom: the whole wall breathes in and back out on a
          loop, entirely on its own — same "automatic, no scroll needed"
          spirit as the rows drifting inside it. */}
      <motion.div
        aria-hidden
        className="flex flex-col"
        style={{ gap: CARD_GAP }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        {ROWS.map((r, i) => (
          <MarqueeRow key={r.k} cards={r.cards} reverse={i % 2 === 1} duration={r.duration} reduced={!!reduced} />
        ))}
      </motion.div>
    </section>
  );
}
