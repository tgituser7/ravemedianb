import type { CSSProperties } from "react";

type PlaceholderImageProps = {
  label: string;
  className?: string;
  gradient?: string;
  style?: CSSProperties;
};

const DEFAULT_GRADIENT = "from-zinc-200 via-zinc-100 to-zinc-300";

export default function PlaceholderImage({
  label,
  className = "",
  gradient = DEFAULT_GRADIENT,
  style,
}: PlaceholderImageProps) {
  return (
    <div
      style={style}
      className={`flex items-end overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <span className="m-2 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium leading-none text-white backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
