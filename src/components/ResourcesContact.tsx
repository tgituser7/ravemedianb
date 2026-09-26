"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";

// Closing line of /resources: the sentence rises in, then the email link
// fades up with an underline that draws itself.
export default function ResourcesContact() {
  return (
    <section className="mx-auto max-w-[1400px] px-[6%] py-24 text-center">
      <p className="text-lg text-neutral-700">
        <RevealText
          text="For studios and equipments rental services kindly contact"
          stagger={0.04}
          duration={0.7}
        />
      </p>
      <motion.a
        {...fadeUpInView(0.5, 14)}
        href="mailto:work@rave.net.in"
        className="relative mt-3 inline-block text-2xl font-semibold text-neutral-900 md:text-3xl"
      >
        work@rave.net.in
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-orange-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
        />
      </motion.a>
    </section>
  );
}
