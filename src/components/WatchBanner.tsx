"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function WatchBanner() {
  return (
    <section className="px-6">
      <div className="relative mx-auto flex h-[420px] max-w-7xl items-end overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 sm:h-[480px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.25),transparent_55%)]" />

        <div className="relative z-10 flex w-full items-end justify-between p-6 sm:p-8">
          <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition-transform hover:scale-[1.03]">
            <Play size={12} fill="currentColor" strokeWidth={0} />
            Watch
          </button>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition-transform hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition-transform hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
