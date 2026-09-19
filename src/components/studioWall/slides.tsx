import type { CSSProperties, ReactNode } from "react";
import { imageAt } from "@/lib/images";

// Every slide is authored on a 1920-wide design grid (40px margins) and
// scaled down into a 411x258 wall card, matching the reference deck.
const W = 1920;
const H = 1205;
export const CARD_W = 411;
export const CARD_H = 258;

const INTER = "var(--font-inter), Inter, system-ui, sans-serif";
const GEO = "var(--font-figtree), var(--font-jakarta), system-ui, sans-serif";
const MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

const YELLOW = "#FED500";
const NAVY = "#002363";
const GREEN = "#00A446";
const PERI = "#B0CBFE";
const CREAM = "#F3F0E7";
const GRAY = "#F3F3F3";
const PAPER = "#FDFDFD";
const TILE = "#EDEDEE";
const SLATE = "#5C6784";

const abs = (s: CSSProperties): CSSProperties => ({ position: "absolute", ...s });

function Slide({ bg = PAPER, children }: { bg?: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        background: bg,
        position: "relative",
        overflow: "hidden",
        borderRadius: 1.5,
        fontFamily: INTER,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: `scale(${CARD_W / W})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Hdr({ children }: { children: ReactNode }) {
  return <div style={abs({ left: 40, top: 32, fontSize: 20, lineHeight: "24px", color: "#4d4d4d" })}>{children}</div>;
}

function Page({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <div style={abs({ right: 40, bottom: 30, fontSize: 18, lineHeight: "22px", color: dark ? "#8a8a8a" : "#8c8c8c" })}>{n}</div>
  );
}

function Copy({ title, lines, size = 22, pitch = 34, width = 470 }: { title: string; lines: string[]; size?: number; pitch?: number; width?: number }) {
  return (
    <div style={abs({ left: 40, top: 240, width })}>
      <div style={{ fontSize: 28, fontWeight: 600, lineHeight: "34px", color: "#111" }}>{title}</div>
      <div style={{ marginTop: 43, fontSize: size, lineHeight: `${pitch}px`, color: SLATE, whiteSpace: "nowrap" }}>
        {lines.map((l, i) => (
          <div key={i}>{l || " "}</div>
        ))}
      </div>
    </div>
  );
}

function Wordmark({ size, color = "#0a0a0a" }: { size: number; color?: string }) {
  return (
    <span style={{ fontFamily: GEO, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: "-0.04em", color, whiteSpace: "nowrap" }}>
      Rave
    </span>
  );
}

// Blocky brand mark: a heavy "R" standing in for the reference's app glyph.
function Glyph({ size, color = "#0a0a0a" }: { size: number; color?: string }) {
  return (
    <span style={{ fontFamily: GEO, fontWeight: 900, fontSize: size, lineHeight: 1, color, letterSpacing: "-0.02em" }}>R</span>
  );
}

function Photo({ index, style }: { index: number; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageAt(index)} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", ...style }} />;
}

/* ------------------------------------------------------------------ */
/* Section title cards (black, ghost numeral + white title)            */
/* ------------------------------------------------------------------ */

export function TitleCard({ num, title }: { num: string; title: string }) {
  return (
    <Slide bg="#000">
      <div style={abs({ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <span style={{ fontSize: 705, fontWeight: 300, lineHeight: "normal", color: "#292929", transform: "translateY(15px)" }}>{num}</span>
      </div>
      <div style={abs({ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <span style={{ fontSize: 226, fontWeight: 450, lineHeight: "normal", color: "#fff", letterSpacing: "0.001em", transform: "translateY(15px)" }}>{title}</span>
      </div>
    </Slide>
  );
}

export function ThankYouCard() {
  return (
    <Slide bg="#000">
      <div style={abs({ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <span style={{ fontSize: 138, fontWeight: 450, lineHeight: "normal", color: "#fff", letterSpacing: "0.055em", transform: "translateY(15px)" }}>Thank you</span>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Text-only palette statement                                          */
/* ------------------------------------------------------------------ */

export function PaletteText() {
  const lines = [
    "Rave’s colour palette combines",
    "Flatty Yellow, Black, and Deep",
    "Sapphire to express clarity,",
    "authority, and refined confidence.",
    "The system balances strong",
    "contrast with premium restraint,",
    "ensuring focus, trust, and",
    "consistent visual recognition.",
  ];
  return (
    <Slide>
      <div style={abs({ left: 40, top: 28, fontSize: 96, lineHeight: "110.5px", fontWeight: 400, color: "#0a0a0a", whiteSpace: "nowrap", letterSpacing: "0.005em" })}>
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div style={abs({ right: 40, bottom: 28, fontSize: 16, color: "#9a9a9a" })}>19</div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Colour slides                                                        */
/* ------------------------------------------------------------------ */

function Swatch({ x, y, w, h, bg, name, hex, role, dark, border }: { x: number; y: number; w: number; h: number; bg: string; name: string; hex: string; role: string; dark?: boolean; border?: boolean }) {
  const c = dark ? "rgba(255,255,255,.86)" : "#050505";
  const lab: CSSProperties = { fontSize: 18, lineHeight: "24px", color: c, fontWeight: dark ? 400 : 500 };
  return (
    <div style={abs({ left: x, top: y, width: w, height: h, background: bg, borderRadius: 14, border: border ? "2px solid #e2e2e2" : undefined, boxShadow: border ? "0 2px 6px rgba(0,0,0,.05)" : undefined })}>
      <div style={{ ...lab, position: "absolute", left: 34, top: 40 }}>{name}</div>
      <div style={{ ...lab, position: "absolute", left: 34, bottom: 40 }}>
        <div>Hex</div>
        <div>{"↓"}</div>
        <div>{hex}</div>
      </div>
      <div style={{ ...lab, position: "absolute", left: 153, bottom: 40 }}>
        <div>Colors</div>
        <div>{"↓"}</div>
        <div>{role}</div>
      </div>
    </div>
  );
}

export function PrimaryColours() {
  return (
    <Slide>
      <Copy
        title="Primary colors"
        lines={[
          "Rave’s primary colours — Flatty",
          "Yellow, Black and White — define",
          "the brand’s core identity. Yellow",
          "signals energy, black grounds it",
          "with authority, and white gives",
          "every layout clean breathing room.",
        ]}
      />
      <Swatch x={663} y={240} w={1217} h={380} bg={YELLOW} name="Flatty Yellow" hex="#FED500" role="Primary" />
      <Swatch x={663} y={648} w={596} h={385} bg="#fdfdfd" name="White" hex="#FDFDFD" role="Primary" border />
      <Swatch x={1284} y={648} w={596} h={385} bg="#000" name="Black" hex="#000000" role="Primary" dark />
      <Page n="20" />
    </Slide>
  );
}

export function SecondaryColours() {
  return (
    <Slide>
      <Copy
        title="Secondary colors"
        lines={[
          "Secondary colours — Deep",
          "Sapphire, Green, Light Periwinkle",
          "and Ivory White — support the",
          "primary palette, adding depth,",
          "balance and clear structure",
          "across dense product surfaces.",
        ]}
      />
      <Swatch x={666} y={240} w={594} h={385} bg={NAVY} name="Deep Sapphire" hex="#002363" role="Secondary" dark />
      <Swatch x={1288} y={240} w={592} h={382} bg={GREEN} name="Green" hex="#00A446" role="Secondary" dark />
      <Swatch x={663} y={648} w={598} h={390} bg={PERI} name="Light Periwinkle" hex="#B0CBFE" role="Secondary" />
      <Swatch x={1285} y={646} w={595} h={390} bg={CREAM} name="Ivory White" hex="#F3F0E7" role="Secondary" />
      <Page n="21" />
    </Slide>
  );
}

const YELLOW_SCALE = ["#FFFDE2", "#FFF9C4", "#FFF48C", "#FFEB55", "#FFDF1F", "#FED500", "#CFA800", "#A78600", "#7A6200", "#4B3B00", "#2B2200"];
const SCALE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

export function YellowScale() {
  // 5 light steps, one tall hero swatch, 5 dark steps
  const tops = [226, 289, 352, 415, 478, 549, 724, 787, 850, 913, 976];
  const hs = [52, 52, 52, 52, 52, 158, 52, 52, 52, 52, 52];
  return (
    <Slide>
      <Hdr>Rave / color</Hdr>
      <div style={abs({ left: 40, top: 240, fontSize: 28, fontWeight: 600, lineHeight: "34px", color: "#111" })}>Flatty Yellow</div>
      {YELLOW_SCALE.map((c, i) => (
        <div key={c} style={abs({ left: 663, top: tops[i], width: 1217, height: hs[i], background: c, borderRadius: 6 })}>
          <span style={{ position: "absolute", left: 38, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: i >= 6 ? "#fff" : "#111", letterSpacing: "0.02em" }}>
            {SCALE_STEPS[i]} {c}
          </span>
        </div>
      ))}
      <Page n="22" />
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Logo slides                                                           */
/* ------------------------------------------------------------------ */

export function LogoYellow() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <Copy
        title="Logo"
        lines={[
          "The Rave logo is composed as a",
          "refined wordmark. This full-colour",
          "version is the primary logo and should",
          "be used in most brand applications to",
          "ensure clarity, consistency, and",
          "strong visual recognition.",
        ]}
      />
      <div style={abs({ left: 663, top: 238, width: 1217, height: 788, background: YELLOW, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <Wordmark size={207} />
      </div>
      <Page n="24" />
    </Slide>
  );
}

export function ClearSpace() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <Copy
        title="Clear Space"
        lines={["The logo maintains clear space zone", "is equal to 1/2 of the total logo height", "(marked as x)", "", "Please leave sure each element", "is spaced correctly."]}
      />
      <div style={abs({ left: 663, top: 209, width: 1217, height: 797, background: GRAY, borderRadius: 10 })}>
        <div style={abs({ left: 0, top: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" })}>
          <div style={{ position: "relative" }}>
            <Wordmark size={165} />
            <div style={abs({ left: -34, top: 8, width: 2, height: 150, background: "#d3d3d3" })} />
            <div style={abs({ right: -30, top: 8, width: 2, height: 150, background: "#d3d3d3" })} />
            <div style={abs({ right: -58, top: -66, width: 44, height: 44, background: "#e6e6e6", borderRadius: 4, fontSize: 16, color: "#888", display: "flex", alignItems: "center", justifyContent: "center" })}>x</div>
          </div>
        </div>
      </div>
      <Page n="19" />
    </Slide>
  );
}

export function TickerBlack() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <div style={abs({ left: 40, top: 180, width: 1840, height: 854, background: "#000", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <Wordmark size={207} color="#fff" />
      </div>
      <Page n="17" />
    </Slide>
  );
}

export function Anatomy() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <Copy
        title="Logo anatomy"
        lines={["The color logo systems are the", "primary logo wordmarks to be", "used. The full-color logo is the", "preferred version and should", "be used whenever possible."]}
      />
      <div style={abs({ left: 663, top: 248, width: 1217, height: 377, background: YELLOW, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <Wordmark size={170} />
      </div>
      <div style={abs({ left: 663, top: 653, width: 596, height: 388, background: PAPER, border: "2px solid #ececec", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <Wordmark size={110} />
      </div>
      <div style={abs({ left: 1282, top: 653, width: 598, height: 388, background: "#000", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <Wordmark size={110} color="#fff" />
      </div>
      <Page n="20" />
    </Slide>
  );
}

const VARIANT_STYLES: { style: CSSProperties; size: number }[] = [
  { size: 130, style: { textShadow: "0 6px 18px rgba(0,0,0,.35)" } },
  { size: 120, style: {} },
  { size: 120, style: { color: "#b5714a" } },
  { size: 22, style: {} },
  { size: 130, style: { transform: "rotate(-6deg) scaleX(1.12)" } },
  { size: 120, style: { transform: "skewX(-14deg)" } },
];

export function LogoVariants() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <Copy
        title="Logo misuse"
        lines={[
          "Do not place the logo on cluttered or",
          "low-contrast backgrounds. Avoid",
          "adding effects, outlines, or altering",
          "proportions, or overlaying it on",
          "crowded and visually busy imagery.",
        ]}
      />
      {VARIANT_STYLES.map((v, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <div key={i} style={abs({ left: 700 + col * 400, top: 300 + row * 380, width: 380, height: 300, display: "flex", alignItems: "center", justifyContent: "center" })}>
            <span style={{ display: "inline-block", ...v.style }}>
              <Wordmark size={v.size} color={(v.style.color as string) ?? "#0a0a0a"} />
            </span>
          </div>
        );
      })}
      <Page n="16" />
    </Slide>
  );
}

/* UI fragments reused by the logo-application slide and the social posts */

function SearchRow({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26 * scale, color: "#8b93a7", fontSize: 32 * scale, whiteSpace: "nowrap" }}>
      <svg width={40 * scale} height={40 * scale} viewBox="0 0 24 24" fill="none" stroke="#c7ccd8" strokeWidth="2" strokeLinecap="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.6-4.6" />
      </svg>
      Search...
    </div>
  );
}

function AppMock({ scale = 1 }: { scale?: number }) {
  const s = scale;
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      <div style={abs({ left: 0, top: 0, width: 157 * s, height: 165 * s, background: YELLOW, display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: 26 * s })}>
        <Glyph size={96 * s} />
      </div>
      <div style={abs({ left: 157 * s, top: 0, width: 640 * s, height: 250 * s, background: "#101a2c", borderTopRightRadius: 26 * s })}>
        <div style={{ position: "absolute", left: 52 * s, top: 88 * s }}>
          <SearchRow scale={s * 1.22} />
        </div>
      </div>
      <div style={abs({ left: 0, top: 165 * s, width: 157 * s, height: 140 * s, background: "#232d3f", display: "flex", alignItems: "center", justifyContent: "center" })}>
        <svg width={50 * s} height={50 * s} viewBox="0 0 24 24" fill="none" stroke="#9aa4b8" strokeWidth="1.6">
          <rect x="5" y="3" width="10" height="18" rx="1.5" />
          <path d="M15 9h4v12h-4M8 8h4M8 12h4M8 16h4" />
        </svg>
      </div>
      <div style={abs({ left: 157 * s, top: 250 * s, width: 640 * s, height: 55 * s, background: "#101a2c" })} />
      <div style={abs({ left: 168 * s, top: 236 * s, whiteSpace: "nowrap", fontFamily: MONO, fontSize: 40 * s, color: "#e8ecf4", lineHeight: 1 })}>
        {"BA 1298.00 "}
        <span style={{ color: "#3ddc84" }}>{"↗ 0.4"}</span>
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div style={abs({ left: 53, top: 72, width: 1129, height: 420, background: "#fbfcfd", borderRadius: "10px 10px 0 0", overflow: "hidden", boxShadow: "0 0 0 1px #e4e5e7" })}>
      <div style={abs({ left: 0, top: 0, right: 0, height: 26, background: "#e9eaec" })}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <span key={c} style={abs({ left: 12 + i * 15, top: 8, width: 9, height: 9, borderRadius: 9, background: c })} />
        ))}
        <span style={abs({ left: 78, top: 5, width: 150, height: 21, background: "#f4f4f5", borderRadius: "5px 5px 0 0" })} />
      </div>
      <div style={abs({ left: 0, top: 26, right: 0, height: 22, background: "#f4f5f6" })}>
        <span style={abs({ left: 74, top: 5, width: 180, height: 12, borderRadius: 6, background: "#e4e6e8" })} />
      </div>
      <div style={abs({ left: 0, top: 58, right: 0, height: 100, background: "#000" })}>
        <div style={abs({ left: 0, right: 0, top: 22, display: "flex", justifyContent: "center" })}>
          <Wordmark size={46} color="#fff" />
        </div>
        <span style={abs({ right: 96, top: 20, fontSize: 12, color: "#fff" })}>Log in</span>
        <span style={abs({ right: 26, top: 16, width: 56, height: 26, background: YELLOW, borderRadius: 3 })} />
        <div style={abs({ left: 0, right: 0, bottom: 10, display: "flex", justifyContent: "center", gap: 34, fontSize: 11, color: "#8a8a8a" })}>
          {["Home", "Markets", "Trading", "Insights", "Learn", "Company"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
      <div style={abs({ left: 138, top: 178, width: 854, height: 260, overflow: "hidden" })}>
        <Photo index={6} style={{ filter: "grayscale(1) contrast(1.05)" }} />
      </div>
    </div>
  );
}

export function LogoApplication() {
  return (
    <Slide>
      <Hdr>Rave / logo</Hdr>
      <Copy
        title="Logo application"
        lines={[
          "The Rave logo is designed for",
          "flexible application across key digital",
          "touchpoints, including the web app,",
          "marketing website, and mobile app",
          "icon. Consistent use ensures strong",
          "recognition, clarity at small sizes, and",
          "a cohesive brand presence across",
          "platforms.",
        ]}
      />
      <div style={abs({ left: 663, top: 238, width: 597, height: 389, background: TILE, borderRadius: 12, overflow: "hidden" })}>
        <div style={abs({ left: 108, top: 82 })}>
          <AppMock scale={1.06} />
        </div>
      </div>
      <div style={abs({ left: 1282, top: 238, width: 595, height: 385, background: "#000", borderRadius: 12, overflow: "hidden" })}>
        <div style={abs({ left: 177, top: 74, width: 240, height: 238, background: YELLOW, borderRadius: 62, display: "flex", alignItems: "center", justifyContent: "center" })}>
          <Glyph size={140} />
        </div>
      </div>
      <div style={abs({ left: 663, top: 643, width: 1217, height: 391, background: TILE, borderRadius: 12, overflow: "hidden" })}>
        <BrowserMock />
      </div>
      <Page n="13" />
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Typography slides                                                    */
/* ------------------------------------------------------------------ */

export function Weights() {
  const rows: [string, number][] = [
    ["Book", 400],
    ["Medium", 500],
    ["Bold", 700],
    ["Black", 900],
  ];
  return (
    <Slide>
      <Hdr>Rave / typography</Hdr>
      <div style={abs({ left: 352, top: 268 })}>
        {rows.map(([t, w]) => (
          <div key={t} style={{ fontFamily: GEO, fontSize: 135, fontWeight: w, lineHeight: "168px", color: "#0a0a0a" }}>
            {t}
          </div>
        ))}
      </div>
      <Page n="35" />
    </Slide>
  );
}

export function TypeSpecimen() {
  const para = [
    "Figtree is a friendly geometric sans-",
    "serif typeface with open forms and a",
    "warm, even rhythm. It reads clearly at",
    "every size, from captions to display,",
    "and pairs a modern structure with just",
    "enough personality to feel human.",
    "Although the design is based primarily",
    "on geometric forms, Figtree has quirks",
    "that give it a lot of warmth. I think",
    "the design of the lowercase l is very",
    "distinctive and makes Figtree easy to",
    "identify compared to other geometric",
    "sans-serifs.",
  ];
  return (
    <Slide>
      <Hdr>Rave / typography</Hdr>
      <div style={abs({ left: 40, top: 240, width: 420 })}>
        <div style={{ fontSize: 28, fontWeight: 600, lineHeight: "34px", color: "#111" }}>Figtree</div>
        <div style={{ marginTop: 43, fontSize: 19, lineHeight: "30px", color: SLATE, whiteSpace: "nowrap" }}>
          {para.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
      <div style={abs({ left: 663, top: 238, width: 1217, height: 388, background: GRAY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" })}>
        <span style={{ fontFamily: GEO, fontSize: 137, fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.01em" }}>Figtree</span>
      </div>
      <div style={abs({ left: 663, top: 649, width: 1217, height: 390, background: GRAY, borderRadius: 8 })}>
        <div style={abs({ left: 101, top: 82, fontFamily: GEO, fontSize: 45, fontWeight: 500, lineHeight: "80px", color: "#0a0a0a", whiteSpace: "nowrap" })}>
          <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div>abcdefghijklmnopqrstuvwxyz</div>
          <div>0123456789?!()[]@</div>
        </div>
      </div>
      <Page n="34" />
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Poster / social slides                                               */
/* ------------------------------------------------------------------ */

function DotField({ cx, cy, pitch, radius, dot, color, fade = 260 }: { cx: number; cy: number; pitch: number; radius: number; dot: number; color: string; fade?: number }) {
  const dots: ReactNode[] = [];
  const n = Math.ceil(radius / pitch);
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      const x = i * pitch;
      const y = j * pitch;
      const d = Math.hypot(x, y);
      if (d > radius) continue;
      dots.push(<circle key={`${i},${j}`} cx={cx + x} cy={cy + y} r={dot * (1 - d / fade)} fill={color} opacity={Math.max(0.25, 1 - d / (radius * 1.15))} />);
    }
  }
  return <>{dots}</>;
}

export function Discover() {
  const post: CSSProperties = { position: "absolute", top: 191, width: 521, height: 836 };
  const label: CSSProperties = { position: "absolute", left: 38, bottom: 62, fontSize: 20, lineHeight: "24px" };
  return (
    <Slide>
      <div style={{ ...post, left: 122, background: "#000" }}>
        <svg width={521} height={836} style={{ position: "absolute", inset: 0 }}>
          <DotField cx={260} cy={385} pitch={52} radius={230} dot={5} color="#e9e6d2" />
          <circle cx={212} cy={385} r={90} fill="none" stroke="#d9d3b0" strokeWidth={1.6} />
        </svg>
        <div style={{ ...label, color: "#fff" }}>Discover</div>
      </div>
      <div style={{ ...post, left: 699, background: NAVY }}>
        <svg width={521} height={836} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 6 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <circle key={`${r}-${c}`} cx={128 + c * 53} cy={216 + r * 53} r={5} fill="#fff" opacity={r > 3 && c > 3 ? 0.35 : 0.95} />
            ))
          )}
          <rect x={102} y={468} width={150} height={150} fill="rgba(90,140,220,.32)" />
          <line x1={186} y1={196} x2={186} y2={560} stroke="#2f8f6a" strokeWidth={2} />
          <line x1={397} y1={196} x2={397} y2={560} stroke="#2f8f6a" strokeWidth={2} />
        </svg>
        <div style={{ ...label, color: "#fff" }}>Trust</div>
      </div>
      <div style={{ ...post, left: 1276, background: YELLOW }}>
        <svg width={521} height={836} style={{ position: "absolute", inset: 0 }}>
          {[310, 424, 538].map((y) => (
            <circle key={y} cx={260} cy={y} r={114} fill="none" stroke="#111" strokeWidth={1.6} />
          ))}
          <path d="M214 426l34 32 62-68" fill="none" stroke="#111" strokeWidth={2.2} />
        </svg>
        <div style={{ ...label, color: "#111" }}>Decision</div>
      </div>
      <Page n="23" />
    </Slide>
  );
}

function PostCard({ x, children, bg = "#fff" }: { x: number; children: ReactNode; bg?: string }) {
  return (
    <div style={abs({ left: x, top: 304, width: 458, height: 596, background: "#fff", border: "2px solid #e6e6e6", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.06)" })}>
      <div style={abs({ left: 0, right: 0, top: 0, height: 62, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", background: "#fff", zIndex: 2 })}>
        <span style={{ width: 30, height: 30, borderRadius: 30, background: YELLOW, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Glyph size={20} />
        </span>
        <span style={{ fontFamily: GEO, fontWeight: 700, fontSize: 14, color: "#111" }}>Rave</span>
      </div>
      <div style={abs({ left: 0, top: 62, width: 458, height: 458, background: bg, overflow: "hidden" })}>{children}</div>
    </div>
  );
}

export function SocialPosts() {
  return (
    <Slide>
      <Hdr>Rave / Social</Hdr>
      <PostCard x={142} bg="#f3f3f3">
        <div style={abs({ left: 41, top: 66, fontFamily: GEO, fontWeight: 800, fontSize: 41, lineHeight: "45px", color: "#111", whiteSpace: "nowrap" })}>
          Two investors.
          <br />
          Two decisions.
        </div>
        <div style={abs({ left: 41, top: 158, fontSize: 9, lineHeight: "13px", color: "#666", whiteSpace: "nowrap" })}>
          Rave isn&apos;t built for hype. It&apos;s built for informed
          <br />
          conviction.
        </div>
        <div style={abs({ left: 41, top: 238, width: 297, height: 51, background: YELLOW })} />
        <div style={abs({ left: 41, top: 302, width: 108, height: 55, background: "#9a9a9a" })} />
      </PostCard>
      <PostCard x={724}>
        <Photo index={2} />
        <div style={abs({ inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.05) 45%, rgba(0,0,0,.35))" })} />
        <span style={abs({ left: 39, top: 92, fontFamily: GEO, fontWeight: 800, fontSize: 37, color: "rgba(255,255,255,.92)" })}>Rave</span>
      </PostCard>
      <PostCard x={1306} bg="#000">
        <div style={abs({ left: 106, top: 88, transform: "scale(1)", transformOrigin: "0 0" })}>
          <AppMock scale={1.32} />
        </div>
      </PostCard>
      <Page n="26" />
    </Slide>
  );
}

function Pixels({ cells, color, size, x, y }: { cells: [number, number][]; color: string; size: number; x: number; y: number }) {
  return (
    <>
      {cells.map(([c, r], i) => (
        <span key={i} style={abs({ left: x + c * size, top: y + r * size, width: size, height: size, background: color })} />
      ))}
    </>
  );
}

export function DataDriven() {
  const stair: [number, number][] = [
    [0, 1], [1, 1], [3, 1], [4, 0], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3], [0, 3], [3, 3],
  ];
  return (
    <Slide>
      <Hdr>Rave / Social</Hdr>
      <PostCard x={142} bg="#000">
        <div style={abs({ left: 38, top: 66, fontFamily: GEO, fontWeight: 800, fontSize: 50, lineHeight: "56px", color: "#fff", whiteSpace: "nowrap" })}>
          Data Driven
          <br />
          Success
        </div>
        <div style={abs({ left: 38, top: 196, fontSize: 9, lineHeight: "13px", color: "#aaa", whiteSpace: "nowrap" })}>
          Rave analyzes the gap between markets
          <br />
          and portfolios to surface what matters
          <br />
          for informed investors.
        </div>
        <Pixels cells={stair} color="#303030" size={40} x={16} y={238} />
        <span style={abs({ right: 30, bottom: 26, fontFamily: GEO, fontWeight: 800, fontSize: 30, color: "#fff" })}>Rave</span>
      </PostCard>
      <PostCard x={724} bg={YELLOW}>
        <div style={abs({ left: 0, right: 0, top: 24, textAlign: "center", fontFamily: GEO, fontWeight: 800, fontSize: 28, color: "#111" })}>Rave</div>
        <div style={abs({ left: 129, top: 78, width: 200, height: 200, borderRadius: 200, overflow: "hidden", background: "#d9d9d9", border: "4px solid #fff" })}>
          <Photo index={9} style={{ filter: "grayscale(1)" }} />
        </div>
        <Pixels cells={[[0, 0]]} color="#111" size={16} x={96} y={98} />
        <Pixels cells={[[0, 0]]} color="#111" size={16} x={352} y={146} />
        <Pixels cells={[[0, 0], [1, 1]]} color="#111" size={16} x={72} y={232} />
        <div style={abs({ left: 70, right: 40, top: 302, fontSize: 11, lineHeight: "15px", color: "#111", fontWeight: 500 })}>
          Rave delivered outstanding market clarity in a major, distinctive data experience for the investors who follow.
        </div>
      </PostCard>
      <PostCard x={1306} bg={NAVY}>
        <div style={abs({ left: 30, top: 68, fontFamily: GEO, fontWeight: 800, fontSize: 150, lineHeight: "150px", color: "#fff", letterSpacing: "-0.03em" })}>2M+</div>
        <div style={abs({ left: 34, top: 236, fontSize: 11, color: "#c8d2ee" })}>Satisfied clients</div>
        <Pixels cells={[[3, 0], [3, 1], [2, 1], [3, 2], [2, 2], [1, 2], [3, 3]]} color="#1c3a7a" size={44} x={230} y={190} />
        <div style={abs({ left: 30, bottom: 30, display: "flex", alignItems: "center", gap: 10 })}>
          <span style={{ width: 30, height: 30, borderRadius: 30, background: YELLOW, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Glyph size={20} />
          </span>
          <span style={{ fontSize: 10, color: "#c8d2ee" }}>Trusted by investors worldwide</span>
        </div>
      </PostCard>
      <Page n="27" />
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* Fillers for cards only ever glimpsed at the wall's edges             */
/* ------------------------------------------------------------------ */

export function TealCover() {
  return (
    <Slide bg="#b9d5d4">
      <div style={abs({ left: 1180, top: 300, fontSize: 560, fontWeight: 300, lineHeight: 1, color: "#233238", letterSpacing: "-0.04em" })}>100</div>
    </Slide>
  );
}

export function BlankSlide() {
  return (
    <Slide>
      <div style={abs({ left: 663, top: 238, width: 1217, height: 788, background: GRAY, borderRadius: 8 })} />
    </Slide>
  );
}

export function MarkSlide() {
  return (
    <Slide>
      <div style={abs({ left: 1500, top: 110, fontFamily: GEO, fontWeight: 900, fontSize: 150, color: "#0b5a45" })}>R</div>
    </Slide>
  );
}
