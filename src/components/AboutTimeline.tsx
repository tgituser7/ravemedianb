"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { MILESTONES } from "@/data/timeline";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";

const N = MILESTONES.length;
const AUTOPLAY_MS = 6500;

export default function AboutTimeline() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const playing = !reduced && !userPaused && !hovering && inView;

  const go = useCallback((i: number) => {
    setActive((cur) => {
      const next = (i + N) % N;
      setDir(next >= cur ? 1 : -1);
      return next;
    });
  }, []);

  // Start autoplay only once the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active year centred in the (mobile) scrolling rail.
  useEffect(() => {
    const rail = railRef.current;
    const btn = rail?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    if (!rail || !btn || rail.scrollWidth <= rail.clientWidth + 1) return;
    rail.scrollTo({ left: btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  // Mouse parallax on the photo.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 20 });
  const py = useSpring(my, { stiffness: 90, damping: 20 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(-((e.clientX - r.left) / r.width - 0.5) * 26);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(N - 1); }
  };

  const m = MILESTONES[active];
  const wipeFrom = dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <section
      ref={sectionRef}
      aria-label="Our timeline"
      className="relative overflow-hidden px-[6%] pb-16 pt-16"
      style={{
        backgroundColor: "#eae8e2",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.span
              {...fadeUpInView(0, 14, 0.5)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "#ff4b08" }} />
              Our journey
            </motion.span>
            <motion.h2
              {...fadeUpInView(0.08, 24, 0.7)}
              className="mt-4 max-w-2xl text-[clamp(36px,5vw,64px)] font-bold leading-[0.95] tracking-tight text-zinc-900"
            >
              Every year, a new
              <br />
              reason to <span style={{ color: "#ff4b08" }}>tell our story.</span>
            </motion.h2>
          </div>

          <motion.div {...fadeUpInView(0.16, 14, 0.6)} className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous year"
              onClick={() => go(active - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/30 bg-white text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next year"
              onClick={() => go(active + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/30 bg-white text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
            {!reduced ? (
              <button
                type="button"
                aria-label={userPaused ? "Play timeline" : "Pause timeline"}
                onClick={() => setUserPaused((p) => !p)}
                className="ml-1 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105"
              >
                {userPaused ? <Play size={16} fill="white" /> : <Pause size={16} fill="white" />}
              </button>
            ) : null}
          </motion.div>
        </div>

        {/* Stage */}
        <motion.div
          {...fadeUpInView(0.1, 40, 0.9)}
          className="relative mt-10 aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-zinc-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:aspect-[16/9] lg:aspect-[2/1]"
          onPointerMove={onMove}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            mx.set(0);
            my.set(0);
          }}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={m.year}
              className="absolute inset-0"
              initial={reduced ? { opacity: 0 } : { clipPath: wipeFrom }}
              animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0 0)" }}
              exit={{ opacity: 1, zIndex: 0, transition: { delay: 0.9 } }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              style={{ zIndex: 1 }}
            >
              <motion.div style={{ x: px, y: py }} className="absolute -inset-8">
                <motion.img
                  src={m.image}
                  alt={`${m.title}, ${m.year}`}
                  draggable={false}
                  className="h-full w-full object-cover"
                  initial={reduced ? false : { scale: 1.18 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.2, ease: EASE_OUT }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* counter + autoplay progress */}
          <div className="absolute inset-x-0 top-0 z-10 p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-widest text-white backdrop-blur-md">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  key={`${active}-${playing ? "p" : "s"}`}
                  className="h-full origin-left rounded-full"
                  style={{ background: "#ff4b08" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: playing ? 1 : 0 }}
                  transition={playing ? { duration: AUTOPLAY_MS / 1000, ease: "linear" } : { duration: 0.2 }}
                  onAnimationComplete={() => {
                    if (playing) go(active + 1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* giant outlined year */}
          <div aria-hidden className="pointer-events-none absolute left-4 top-16 z-10 overflow-hidden sm:bottom-0 sm:left-8 sm:top-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={m.year}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="text-[clamp(80px,17vw,230px)] font-black leading-[0.82] tracking-tighter"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
              >
                {m.year}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* caption */}
          <div className="absolute bottom-5 right-5 z-10 w-[min(360px,calc(100%-2.5rem))] sm:bottom-8 sm:right-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="rounded-2xl border border-white/25 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-xl"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{m.year}</p>
                <h3 className="mt-1 text-xl font-bold leading-tight sm:text-2xl">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{m.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chapter filmstrip: a connected track of photo cards. The active
            year expands, the rest collapse to a slim year tab. */}
        <motion.div {...fadeUpInView(0.15, 24, 0.8)} className="relative mt-10">
          <div
            ref={railRef}
            role="tablist"
            aria-label="Timeline years"
            onKeyDown={onKey}
            className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-[760px] gap-3">
              {MILESTONES.map((item, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <button
                    key={item.year}
                    type="button"
                    role="tab"
                    data-i={i}
                    aria-selected={on}
                    aria-label={`${item.year}: ${item.title}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    className={`group relative flex basis-0 flex-col text-left outline-none transition-[flex-grow] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on ? "min-w-[230px] grow-[5]" : "min-w-[68px] grow"
                    }`}
                  >
                    {/* track: hairline + node, fills orange up to the active year */}
                    <span aria-hidden className="relative block h-6 w-full">
                      <span className={`absolute left-0 top-[11px] h-[2px] rounded-full bg-zinc-900/15 ${i === N - 1 ? "right-0" : "-right-3"}`} />
                      <motion.span
                        className={`absolute left-0 top-[11px] h-[2px] origin-left rounded-full ${i === N - 1 ? "right-0" : "-right-3"}`}
                        style={{ background: "#ff4b08" }}
                        initial={false}
                        animate={{ scaleX: past ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                      />
                      <motion.span
                        className="absolute left-0 top-[5px] block rounded-full border-2"
                        initial={false}
                        animate={{
                          width: on ? 16 : 10,
                          height: on ? 16 : 10,
                          y: on ? -1 : 2,
                          backgroundColor: on || past ? "#ff4b08" : "#eae8e2",
                          borderColor: on || past ? "#ff4b08" : "rgba(24,24,27,0.35)",
                          boxShadow: on ? "0 0 0 6px rgba(255,75,8,0.18)" : "0 0 0 0px rgba(255,75,8,0)",
                        }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />
                    </span>

                    {/* card */}
                    <span className="relative mt-2 block h-[124px] w-full overflow-hidden rounded-2xl bg-zinc-900 sm:h-[148px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt=""
                        draggable={false}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                          on ? "scale-100 grayscale-0" : "scale-110 grayscale group-hover:grayscale-0"
                        }`}
                      />
                      <span
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          on ? "opacity-100" : "opacity-100 group-hover:opacity-70"
                        } bg-gradient-to-t from-black/85 via-black/35 to-black/20`}
                      />
                      <span className="absolute inset-x-0 bottom-0 flex flex-col p-3 sm:p-4">
                        <span
                          className={`font-black leading-none tracking-tight text-white tabular-nums transition-all duration-700 ${
                            on ? "text-[34px] sm:text-[42px]" : "text-[15px] sm:text-[16px]"
                          }`}
                        >
                          {item.year}
                        </span>
                        <span
                          className={`overflow-hidden whitespace-nowrap text-[13px] font-medium text-white/85 transition-all duration-700 ${
                            on ? "mt-1.5 max-h-6 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
