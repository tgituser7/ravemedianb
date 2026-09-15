"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowUpRight } from "lucide-react";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";

const PLANS = [
  {
    name: "Basic",
    tag: null,
    dark: false,
    price: 990,
    desc: "For teams needing ongoing creative power.",
    features: ["1 major deliverable/month", "Priority email support", "2 revision cycles"],
    cta: "Choose this plan",
  },
  {
    name: "Pro",
    tag: "Most Popular",
    dark: true,
    price: 2400,
    desc: "For teams needing ongoing creative power.",
    features: [
      "2 major deliverables/month",
      "Unlimited minor requests",
      "Slack/Notion workspace",
      "Weekly check-in",
    ],
    cta: "Choose this plan",
  },
  {
    name: "Custom",
    tag: null,
    dark: true,
    price: null,
    priceLabel: "Project Based",
    desc: "For brands with unique needs.",
    features: [
      "Fully personalized scope",
      "Dedicated creative direction",
      "Multi-channel design support",
      "Scalable to project or retainer",
    ],
    cta: "Contact us",
  },
];

function Barcode({ className = "" }: { className?: string }) {
  const heights = [8, 5, 10, 4, 9, 6, 11, 5, 7, 4, 10, 6];
  return (
    <div className={`flex items-end gap-[2px] ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[2px] bg-current"
          style={{ height: h, opacity: i % 3 === 0 ? 0.9 : 0.4 }}
        />
      ))}
    </div>
  );
}

function PlanCard({
  plan,
  index,
  total,
  yearly,
}: {
  plan: (typeof PLANS)[number];
  index: number;
  total: number;
  yearly: boolean;
}) {
  const price = plan.price ? Math.round(plan.price * (yearly ? 0.8 : 1)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: EASE_OUT }}
      className={`flex flex-col rounded-2xl p-8 ${
        plan.dark ? "bg-zinc-900 text-white" : "border border-zinc-100 bg-white text-zinc-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              plan.dark ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-700"
            }`}
          >
            {plan.name}
          </span>
          {plan.tag ? (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold text-white">
              {plan.tag}
            </span>
          ) : null}
        </div>
        <div className={`hidden items-center gap-2 sm:flex ${plan.dark ? "text-white/40" : "text-zinc-300"}`}>
          <span className="text-[10px] font-medium">
            // {String(index + 1).padStart(2, "0")}-{String(total).padStart(2, "0")}
          </span>
          <Barcode />
        </div>
      </div>

      <div className="mt-8">
        {price !== null ? (
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold tracking-tight">${price.toLocaleString()}</span>
            <span className={`pb-1 text-sm ${plan.dark ? "text-white/50" : "text-zinc-400"}`}>
              /month
            </span>
          </div>
        ) : (
          <span className="text-4xl font-bold tracking-tight">{plan.priceLabel}</span>
        )}
        <p className={`mt-3 text-sm ${plan.dark ? "text-white/60" : "text-zinc-500"}`}>{plan.desc}</p>
      </div>

      <div className={`mt-6 border-t ${plan.dark ? "border-white/10" : "border-zinc-100"}`} />

      <div className="mt-6 flex-1">
        <span className={`text-xs font-medium uppercase tracking-wide ${plan.dark ? "text-white/40" : "text-zinc-400"}`}>
          What&apos;s Included:
        </span>
        <ul className="mt-4 flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  plan.dark ? "bg-white/15 text-white" : "bg-zinc-900 text-white"
                }`}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span className={plan.dark ? "text-white/80" : "text-zinc-600"}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        {...buttonMotion}
        className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold ${
          plan.dark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"
        }`}
      >
        {plan.cta.toUpperCase()}
        <ArrowUpRight size={15} />
      </motion.button>
    </motion.div>
  );
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="border-t border-zinc-100 bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.span
          {...fadeUpInView(0, 16, 0.5)}
          className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          [06] Pricing Plan
        </motion.span>
        <motion.h2
          {...fadeUpInView(0.1, 26, 0.7)}
          className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl"
        >
          Design, Scaled to Your Needs, Instantly Ready When You Are.
        </motion.h2>
        <motion.p
          {...fadeUpInView(0.18, 18, 0.6)}
          className="mt-5 text-sm leading-relaxed text-zinc-500 sm:text-base"
        >
          Choose a one-time project or an ongoing subscription.
        </motion.p>

        <motion.div
          {...fadeUpInView(0.24, 16, 0.6)}
          className="mt-12 flex flex-wrap items-center justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-500"
                  />
                ))}
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-zinc-900">
                <Star size={13} fill="#ed642b" className="text-orange-500" />
                4.9<span className="font-normal text-zinc-400">/5</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Trusted by teams worldwide
              <br />
              your story deserves to be next.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${!yearly ? "text-zinc-900" : "text-zinc-400"}`}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              onClick={() => setYearly((v) => !v)}
              className="flex h-6 w-11 items-center rounded-full bg-orange-500 p-1 transition-colors"
            >
              <motion.span
                layout
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="h-4 w-4 rounded-full bg-white"
                style={{ marginLeft: yearly ? "auto" : 0 }}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-zinc-900" : "text-zinc-400"}`}>
              Yearly
            </span>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
              Save 20%
            </span>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} total={PLANS.length} yearly={yearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
