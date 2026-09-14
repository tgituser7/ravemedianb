"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";

const PLANS = [
  {
    name: "Monthly",
    price: "9",
    cents: "99",
    caption: "Regular monthly payment",
    highlight: false,
  },
  {
    name: "Quarterly",
    price: "12",
    cents: "99",
    caption: "Regular monthly payment",
    highlight: true,
    badge: "Popular",
  },
  {
    name: "Annually",
    price: "19",
    cents: "99",
    caption: "Plus %56 off for 1 year",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <div>
          <motion.span
            {...fadeUpInView(0, 16, 0.5)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-sm"
          >
            <Camera size={16} />
          </motion.span>
          <motion.h2
            {...fadeUpInView(0.1, 26, 0.7)}
            className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
          >
            Membership
          </motion.h2>
          <motion.p
            {...fadeUpInView(0.2, 18, 0.6)}
            className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Offering buyers a chance to own a piece of that narrative. This
            platform is where stories come alive through art.
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.12,
                ease: EASE_OUT,
              }}
              {...buttonMotion}
              className={`relative w-full max-w-[220px] rounded-3xl p-6 shadow-sm sm:w-56 ${
                plan.highlight
                  ? "z-10 scale-105 bg-gradient-to-br from-orange-400 to-orange-600 py-8 text-white shadow-xl"
                  : "border border-zinc-100 bg-white text-zinc-900"
              }`}
            >
              {plan.badge ? (
                <span className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-orange-600">
                  {plan.badge}
                </span>
              ) : null}
              <span
                className={`text-sm font-medium ${
                  plan.highlight ? "text-white/90" : "text-zinc-500"
                }`}
              >
                {plan.name}
              </span>
              <div className="mt-2 flex items-start">
                <span className="mt-1 text-xl font-semibold">$</span>
                <span className="text-5xl font-bold leading-none tracking-tight">
                  {plan.price}
                </span>
                <span className="mt-1 text-sm font-medium">.{plan.cents}</span>
              </div>
              <p
                className={`mt-6 text-xs ${
                  plan.highlight ? "text-white/80" : "text-zinc-400"
                }`}
              >
                {plan.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
