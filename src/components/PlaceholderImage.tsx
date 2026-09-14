"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type PlaceholderImageProps = HTMLMotionProps<"div"> & {
  label: string;
  gradient?: string;
  src?: string;
};

const DEFAULT_GRADIENT = "from-zinc-200 via-zinc-100 to-zinc-300";

export default function PlaceholderImage({
  label,
  className = "",
  gradient = DEFAULT_GRADIENT,
  src,
  ...motionProps
}: PlaceholderImageProps) {
  return (
    <motion.div
      className={`grid overflow-hidden ${src ? "bg-zinc-200" : `bg-gradient-to-br ${gradient}`} ${className}`}
      {...motionProps}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          style={{ gridArea: "1 / 1" }}
        />
      ) : null}
      {label ? (
        <span
          className="m-2 w-fit self-end justify-self-start rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium leading-none text-white backdrop-blur-sm"
          style={{ gridArea: "1 / 1" }}
        >
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
