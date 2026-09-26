"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { RESOURCES } from "@/data/resources";

const AUTOPLAY_MS = 3500;

export default function StudioSwiper() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame: number | null = null;

    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { scrollLeft, clientWidth } = track;
        const center = scrollLeft + clientWidth / 2;
        let closest = 0;
        let closestDist = Infinity;
        (Array.from(track.children) as HTMLElement[]).forEach((child, i) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track whether the section is currently on screen (unlike `visible`,
  // which is a one-time entrance flag) so autoplay only runs when seen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    const target = child.offsetLeft - (track.clientWidth - child.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  // Auto-rotate: glide to the next card every few seconds, looping back to
  // the first. `active` is a dependency, so any manual pick (arrows, dots,
  // swiping) restarts the countdown.
  useEffect(() => {
    if (!onScreen) return undefined;
    const id = window.setTimeout(() => {
      // The last cards can never reach the centre, so `active` may stall
      // before the final index: treat "scrolled to the end" as the last stop.
      const track = trackRef.current;
      const atEnd = !!track && track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      scrollToIndex(atEnd || active >= RESOURCES.length - 1 ? 0 : active + 1);
      setTick((t) => t + 1); // re-arm even if `active` did not change
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, onScreen, tick]);

  const goPrev = () => scrollToIndex(Math.max(0, active - 1));
  const goNext = () => scrollToIndex(Math.min(RESOURCES.length - 1, active + 1));

  return (
    <section className={`facility-swiper${visible ? " in-view" : ""}`} ref={sectionRef}>
      <div className="facility-swiper-mesh">
        <div className="facility-swiper-blob facility-swiper-blob-1" />
        <div className="facility-swiper-blob facility-swiper-blob-2" />
        <div className="facility-swiper-blob facility-swiper-blob-3" />
        <div className="facility-swiper-blob facility-swiper-blob-4" />
      </div>

      <div className="facility-swiper-head">
        <div>
          <h2 className="facility-swiper-title">
            Every story deserves the <span className="facility-swiper-highlight">right room</span>.
          </h2>
        </div>
        <div className="facility-swiper-controls">
          <button type="button" aria-label="Previous facility" onClick={goPrev} disabled={active === 0}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next facility" onClick={goNext} disabled={active === RESOURCES.length - 1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="facility-swiper-track" ref={trackRef}>
        {RESOURCES.map((r, i) => (
          <button
            type="button"
            key={r.title}
            className={`facility-card${i === active ? " active" : ""}`}
            style={{ "--delay": `${i * 0.07}s` } as CSSProperties}
            onClick={() => scrollToIndex(i)}
            aria-label={r.title}
          >
            <span className="facility-card-photo" style={{ backgroundImage: `url("/${r.bg}")` }} />
            <span className="facility-card-glass">
              <span className="facility-card-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="facility-card-name">{r.title.replace(/\.$/, "")}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="facility-swiper-footer">
        <div className="facility-swiper-dots">
          {RESOURCES.map((r, i) => (
            <button
              type="button"
              key={r.title}
              className={`facility-swiper-dot${i === active ? " active" : ""}`}
              aria-label={`Go to ${r.title}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
        <Link href="/resources" className="facility-swiper-link">
          See all our spaces &rarr;
        </Link>
      </div>
    </section>
  );
}
