"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CAM_SCALE, CAM_TY, ROW_X } from "@/components/studioWall/camera";
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

// The reference is a 960x720 viewport onto a wall of 411x258 slides laid
// out in rows (15 unit gutters, 426/273 pitch). Row 0's top edge sits at
// wall y=81 in the final, static frame; every other row follows at 273.
const REF_W = 960;
const REF_H = 720;
const ROW0_TOP = 81;
const ROW_PITCH = 273;

// Scroll progress spent travelling the camera path; the rest holds on the
// final frame (the reference sits still for its last few frames).
const TRAVEL = 0.88;

type WallCard = { x: number; el: ReactNode };

const ROWS: { k: number; cards: WallCard[] }[] = [
  {
    k: -3,
    cards: [
      { x: 234, el: <TealCover /> },
      { x: 660, el: <LogoApplication /> },
      { x: 1085, el: <TitleCard num="02" title="Logo" /> },
      { x: 1511, el: <LogoVariants /> },
    ],
  },
  {
    k: -2,
    cards: [
      { x: 315, el: <BlankSlide /> },
      { x: 741, el: <ClearSpace /> },
      { x: 1166, el: <TickerBlack /> },
      { x: 1591, el: <Anatomy /> },
    ],
  },
  {
    k: -1,
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
    cards: [
      { x: -516, el: <SecondaryColours /> },
      { x: -90, el: <Weights /> },
      { x: 336, el: <LogoApplication /> },
      { x: 762, el: <YellowScale /> },
    ],
  },
  {
    k: 2,
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

const FRAME_COUNT = CAM_SCALE.length;
const INPUT = [...Array.from({ length: FRAME_COUNT }, (_, i) => (i / (FRAME_COUNT - 1)) * TRAVEL), 1];
const withHold = (a: number[]) => [...a, a[a.length - 1]];

function Row({ k, cards, progress }: { k: number; cards: WallCard[]; progress: MotionValue<number> }) {
  const x = useTransform(progress, INPUT, withHold(ROW_X[k]));
  return (
    <motion.div style={{ x, position: "absolute", left: 0, top: ROW0_TOP + ROW_PITCH * k, width: 0, height: 0 }}>
      {cards.map((c) => (
        <div key={c.x} style={{ position: "absolute", left: c.x, top: 0 }}>
          {c.el}
        </div>
      ))}
    </motion.div>
  );
}

export default function StudioWall() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // "Cover" the 960x720 reference viewport with the real one, centred, so
  // every aspect ratio frames the same slice of the wall.
  const { k, offX, offY } = useMemo(() => {
    const kk = Math.max(size.w / REF_W, size.h / REF_H);
    return { k: kk, offX: (REF_W - size.w / kk) / 2, offY: (REF_H - size.h / kk) / 2 };
  }, [size]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, INPUT, withHold(CAM_SCALE).map((s) => s * k));
  const y = useTransform(scrollYProgress, INPUT, withHold(CAM_TY).map((t) => k * (t - offY)));

  return (
    <section ref={wrapRef} aria-label="Brand guidelines wall" className="relative bg-black" style={{ height: "400vh" }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          aria-hidden
          style={{ x: -k * offX, y, scale, originX: 0, originY: 0, position: "absolute", left: 0, top: 0, width: 0, height: 0, willChange: "transform" }}
        >
          {ROWS.map((r) => (
            <Row key={r.k} k={r.k} cards={r.cards} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
