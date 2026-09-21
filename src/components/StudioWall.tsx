"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

// The camera never jumps to the scroll position: it eases toward it and its
// speed is capped, so a hard fling takes the same slow, gliding path as a
// gentle scroll. MAX_SPEED is progress per second (the cap below is adaptive; the whole wall
// takes many seconds to cross, however fast you scroll).
const EASE_RATE = 2.0; // higher = catches up to the scroll sooner
const MAX_SPEED = 0.16; // ceiling, in progress per second
// The recorded camera path is far steeper in some stretches (the opening
// swoop) than others, so a flat progress cap would still feel fast there.
// This caps the camera's *visible* speed (reference-viewport units per
// second) instead; the progress cap below is derived from it per segment.
const MAX_VISIBLE_SPEED = 420;

// Over the wall the page itself scrolls slowly: wheel / touch input is scaled
// down and eased, so the same swipe moves the page a fraction as far.
const SCROLL_FACTOR = 0.3; // 1 = normal scroll speed
const SCROLL_EASE = 0.1; // 0..1, lower = softer, longer glide

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

// Visible camera travel per unit of progress, per path segment.
const SEG = TRAVEL / (FRAME_COUNT - 1);
const SEGMENT_SLOPE = (() => {
  const out: number[] = [];
  for (let i = 0; i < FRAME_COUNT - 1; i++) {
    let d = Math.abs(CAM_TY[i + 1] - CAM_TY[i]);
    for (const k of Object.keys(ROW_X)) {
      const row = ROW_X[Number(k)];
      d = Math.max(d, Math.abs(row[i + 1] - row[i]) * CAM_SCALE[i]);
    }
    out.push(Math.max(d, 1) / SEG);
  }
  return out;
})();

// Fastest progress/second the camera may move at around progress `p`
// (looks one segment ahead so it slows down before a steep stretch).
function speedCapAt(p: number) {
  const i = Math.max(0, Math.min(SEGMENT_SLOPE.length - 1, Math.floor(p / SEG)));
  const slope = Math.max(SEGMENT_SLOPE[i], SEGMENT_SLOPE[Math.min(SEGMENT_SLOPE.length - 1, i + 1)]);
  return Math.min(MAX_SPEED, MAX_VISIBLE_SPEED / slope);
}

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

  // Slow, eased page scroll while the wall is on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let target = window.scrollY;
    let y = target;
    let lastSet = -1;
    let frame: number | null = null;

    const maxY = () => document.documentElement.scrollHeight - window.innerHeight;
    const inZone = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
    };

    const loop = () => {
      // Something else (scrollbar drag, keyboard, anchor) moved the page: yield to it.
      if (lastSet >= 0 && Math.abs(window.scrollY - lastSet) > 2) {
        frame = null;
        lastSet = -1;
        return;
      }
      y += (target - y) * SCROLL_EASE;
      if (Math.abs(target - y) < 0.5) y = target;
      lastSet = y;
      window.scrollTo(0, y);
      if (y === target) {
        frame = null;
        lastSet = -1;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const push = (delta: number) => {
      if (frame === null) {
        target = window.scrollY;
        y = target;
      }
      target = Math.max(0, Math.min(maxY(), target + delta * SCROLL_FACTOR));
      if (frame === null) frame = requestAnimationFrame(loop);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX) || !inZone()) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      push(e.deltaY * unit);
    };

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1 || !inZone()) return;
      const cy = e.touches[0].clientY;
      const dy = lastTouchY - cy;
      lastTouchY = cy;
      if (e.cancelable) e.preventDefault();
      push(dy);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const reduced = useReducedMotion();
  const glide = useMotionValue(scrollYProgress.get());
  const raf = useRef<number | null>(null);

  // Runs only while the camera is still catching up to the scroll position.
  const kick = () => {
    if (raf.current !== null) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const cur = glide.get();
      const diff = scrollYProgress.get() - cur;
      if (Math.abs(diff) < 0.00015) {
        glide.set(scrollYProgress.get());
        raf.current = null;
        return;
      }
      const eased = diff * (1 - Math.exp(-EASE_RATE * dt));
      const cap = speedCapAt(cur) * dt;
      glide.set(cur + Math.max(-cap, Math.min(cap, eased)));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (reduced) glide.set(scrollYProgress.get());
    else kick();
  });

  useEffect(() => {
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const progress = glide;

  const scale = useTransform(progress, INPUT, withHold(CAM_SCALE).map((s) => s * k));
  const y = useTransform(progress, INPUT, withHold(CAM_TY).map((t) => k * (t - offY)));

  return (
    <section ref={wrapRef} aria-label="Brand guidelines wall" className="relative bg-black" style={{ height: "400vh" }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          aria-hidden
          style={{ x: -k * offX, y, scale, originX: 0, originY: 0, position: "absolute", left: 0, top: 0, width: 0, height: 0, willChange: "transform" }}
        >
          {ROWS.map((r) => (
            <Row key={r.k} k={r.k} cards={r.cards} progress={progress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
