"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LOGOS = ["Mercury", "Remote", "Miro", "Brex", "Databricks", "Linear", "Circus"];

export default function TrustedBy() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="border-t border-zinc-100 px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Trusted by the <span className="text-zinc-400">best.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
              Our growth hackers are experts in identifying and capitalizing
              on the most effective growth strategies.
            </p>
          </div>

          <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
            <button
              aria-label="Scroll left"
              onClick={() => scroll(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scroll(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex items-center gap-12 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {LOGOS.map((name) => (
            <span
              key={name}
              className="flex flex-shrink-0 items-center gap-2 text-xl font-semibold tracking-tight text-zinc-300 grayscale"
            >
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
