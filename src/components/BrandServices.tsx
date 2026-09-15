"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";

const SERVICES = [
  "Branding & Identity",
  "UI/UX Design",
  "Creative Direction",
  "Development",
];

const TAGS = ["Visual Identity", "Logo Systems", "Brand Guidelines"];
const ACCENT = "#ed642b";
// The magnifier lens: a circular window that follows the cursor and shows
// a scaled-up, inverted-color clone of the row underneath it — like a
// loupe passing over the text.
const LENS_SIZE = 110;
const LENS_ZOOM = 1.8;

export default function BrandServices() {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const lensContentRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);

  // Cursor position, in the same coordinate space as the list itself
  // (both the lens overlay and its content are `inset-0` on the list, so
  // this one point drives both the clip-path window and the zoom origin).
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const springX = useSpring(cx, { stiffness: 320, damping: 30, mass: 0.5 });
  const springY = useSpring(cy, { stiffness: 320, damping: 30, mass: 0.5 });

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SERVICES.length);
    }, 3200);
    return () => clearInterval(id);
  }, [hovering]);

  function handlePointerMove(e: React.PointerEvent<HTMLUListElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    cx.set(e.clientX - rect.left);
    cy.set(e.clientY - rect.top);
  }

  // Both driven by the same point: the clip-path keeps a circular window
  // centered on the cursor, and the content's transform-origin scales the
  // text up around that exact point, so the magnified glyphs stay locked
  // under the lens as it tracks the pointer. Runs on a rAF loop rather than
  // spring "change" events — those go quiet once the spring settles, which
  // left the lens frozen at a stale position after the pointer stopped.
  useEffect(() => {
    if (!hovering) return;
    let raf: number;
    const loop = () => {
      const x = springX.get();
      const y = springY.get();
      if (lensRef.current) {
        lensRef.current.style.clipPath = `circle(${LENS_SIZE / 2}px at ${x}px ${y}px)`;
      }
      if (lensContentRef.current) {
        lensContentRef.current.style.transformOrigin = `${x}px ${y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hovering, springX, springY]);

  return (
    <section className="border-t border-zinc-100 bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-20">
        {/* Left: auto-cycling / hover-driven service list */}
        <ul
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          className="relative flex flex-col"
        >
          {/* Magnifier lens: a black circular window, cursor-tracking, that
              shows an enlarged, color-inverted clone of the row beneath it.
              clip-path (not overflow:hidden on a moving box) keeps the
              window's coordinate space identical to the list's own, so the
              zoomed content lines up without extra offset math. */}
          <motion.div
            aria-hidden
            ref={lensRef}
            className="pointer-events-none absolute inset-0 z-20 bg-zinc-950"
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <div ref={lensContentRef} style={{ transform: `scale(${LENS_ZOOM})` }}>
              {SERVICES.map((label, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 border-b border-transparent py-6 pl-8"
                  >
                    <span style={{ color: isActive ? ACCENT : "#71717a" }} className="flex shrink-0">
                      <CornerDownRight size={isActive ? 20 : 15} strokeWidth={2} />
                    </span>
                    {/* matches the real row's `grid ... py-1` text wrapper exactly,
                        so row heights (and the cursor's Y mapping) stay in sync */}
                    <div className="py-1">
                      <span
                        className={
                          isActive
                            ? "font-semibold tracking-tight text-white text-[28px] sm:text-[34px]"
                            : "font-medium tracking-tight text-white/40 text-lg sm:text-xl"
                        }
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {SERVICES.map((label, i) => {
            const isActive = i === active;
            return (
              <li
                key={label}
                onPointerEnter={() => setActive(i)}
                className="relative border-b border-zinc-100 py-6 pl-8"
              >
                {/* black underline that draws in under the active item */}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-full origin-left bg-black"
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                />

                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{ color: isActive ? ACCENT : "#a1a1aa" }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="flex shrink-0"
                  >
                    <CornerDownRight size={isActive ? 20 : 15} strokeWidth={2} />
                  </motion.span>

                  <div className="grid overflow-hidden py-1">
                    <AnimatePresence initial={false} mode="sync">
                      <motion.span
                        key={isActive ? "active" : "inactive"}
                        initial={{ filter: "blur(10px)", opacity: 0, y: isActive ? 10 : -6 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        exit={{ filter: "blur(10px)", opacity: 0, y: isActive ? -6 : 10 }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                        style={{ gridArea: "1 / 1" }}
                        className={
                          isActive
                            ? "font-semibold tracking-tight text-zinc-950 text-[28px] sm:text-[34px]"
                            : "font-medium tracking-tight text-zinc-400 text-lg sm:text-xl"
                        }
                      >
                        {label}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Right: static showcase panel */}
        <div>
          <motion.p
            {...fadeUpInView(0.05, 12, 0.6)}
            className="mb-10 text-right text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            We craft brand identities and digital experiences with
            <br className="hidden sm:block" /> precision, blending creativity and minimalism.
          </motion.p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div {...fadeUpInView(0.1, 24, 0.7)}>
              <PlaceholderImage
                label="STUDIO"
                gradient="from-amber-900 via-stone-800 to-neutral-900"
                className="aspect-[4/5] rounded-2xl"
              />
            </motion.div>
            <motion.div {...fadeUpInView(0.18, 24, 0.7)} className="mt-8 sm:mt-12">
              <PlaceholderImage
                label="EDO"
                gradient="from-zinc-100 via-zinc-200 to-stone-300"
                className="aspect-[4/5] rounded-2xl"
              />
            </motion.div>
          </div>

          <motion.p
            {...fadeUpInView(0.15, 16, 0.6)}
            className="mt-10 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            We design logos, identity systems, and brand guidelines that
            don&apos;t chase trends — they&apos;re built to last. Every
            element is crafted to reflect your brand&apos;s true essence
            across all platforms.
          </motion.p>

          <motion.div
            {...fadeUpInView(0.22, 12, 0.5)}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600"
              >
                {tag}
              </span>
            ))}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500">
              <ArrowUpRight size={16} />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
