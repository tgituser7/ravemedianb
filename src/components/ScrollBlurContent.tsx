"use client";

import { motion } from "framer-motion";
import { useScrollBlur } from "@/lib/useScrollBlur";

export default function ScrollBlurContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const filter = useScrollBlur();
  return <motion.div style={{ filter }}>{children}</motion.div>;
}
