"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import {
  ACCENT_YELLOW,
  BRAND_BLACK,
  BRAND_BLUE,
  BRAND_GRADIENT,
} from "@/lib/brand";
import { LOGO_TILE_SQUIRCLE } from "@/lib/squircle";
import { cn } from "@/lib/utils";

const B_PATH =
  "M17 9v12.3a10.5 10.5 0 1 1-3.4 7.7V9h3.4Zm7.5 12.4a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8Z";
const SLASH_PATH = "M13.6 30.6 22 27l-5 9.8a10.6 10.6 0 0 1-3.4-6.2Z";

function MisuseMark({
  tile = BRAND_BLUE,
  slash = ACCENT_YELLOW,
  glyph = "#fff",
  scaleX = 1,
  rotate = 0,
  showSlash = true,
  outline = false,
  shadow = false,
  size = 56,
}: {
  tile?: string;
  slash?: string;
  glyph?: string;
  scaleX?: number;
  rotate?: number;
  showSlash?: boolean;
  outline?: boolean;
  shadow?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{
        transform: `scaleX(${scaleX}) rotate(${rotate}deg)`,
        filter: shadow ? "drop-shadow(0 6px 12px rgba(0,0,0,0.35))" : undefined,
      }}
    >
      <path
        d={LOGO_TILE_SQUIRCLE}
        fill={tile}
        stroke={outline ? "#fff" : undefined}
        strokeWidth={outline ? 3 : undefined}
      />
      <path d={B_PATH} fill={glyph} />
      {showSlash && <path d={SLASH_PATH} fill={slash} />}
    </svg>
  );
}

const MISUSES = [
  {
    id: "stretch",
    label: "Don't stretch",
    detail: "Keep the 1:1 tile. Never scale the lockup unevenly.",
    surface: "bg-white",
    render: <MisuseMark scaleX={1.55} />,
  },
  {
    id: "rotate",
    label: "Don't rotate",
    detail: "The lettermark is always upright, never tilted for effect.",
    surface: "bg-white",
    render: <MisuseMark rotate={18} />,
  },
  {
    id: "slash",
    label: "Don't drop the slash",
    detail: "The yellow slash is part of the noon inheritance, not optional.",
    surface: "bg-white",
    render: <MisuseMark showSlash={false} />,
  },
  {
    id: "recolor",
    label: "Don't recolor the tile",
    detail: "Tile stays #0928FF. Purple, green or gradient fills are off-brand.",
    surface: "bg-white",
    render: <MisuseMark tile="#7C3AED" slash="#FDE047" />,
  },
  {
    id: "effects",
    label: "Don't add effects",
    detail: "No outlines, glows or heavy shadows on the mark.",
    surface: "bg-white",
    render: <MisuseMark outline shadow />,
  },
  {
    id: "busy",
    label: "Don't bury on noise",
    detail: "Busy photos need a scrim or a monochrome variant with enough contrast.",
    surface: "bg-white",
    render: (
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 opacity-90"
          style={{
            backgroundImage: `repeating-conic-gradient(${ACCENT_YELLOW} 0% 10%, ${BRAND_BLUE} 10% 20%, #fff 20% 30%, ${BRAND_BLACK} 30% 40%)`,
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative">
          <LogoMark size={56} />
        </div>
      </div>
    ),
  },
  {
    id: "gradient-fill",
    label: "Don't gradient the tile",
    detail: "Gradients belong on hero surfaces, not inside the lettermark.",
    surface: "bg-white",
    render: (
      <svg width={56} height={56} viewBox="0 0 48 48" fill="none" aria-hidden>
        <defs>
          <linearGradient id="misuse-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0928FF" />
            <stop offset="100%" stopColor="#F3E008" />
          </linearGradient>
        </defs>
        <path d={LOGO_TILE_SQUIRCLE} fill="url(#misuse-grad)" />
        <path d={B_PATH} fill="#fff" />
        <path d={SLASH_PATH} fill={ACCENT_YELLOW} />
      </svg>
    ),
  },
  {
    id: "low-contrast",
    label: "Don't use wrong variant",
    detail: "Full-color on mid-gray fails legibility. Pick white or ink mono.",
    surface: "bg-[#B8B8C0]",
    render: <LogoMark size={56} />,
  },
] as const;

export function LogoMisuseGallery() {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = React.useState(0);
  const item = MISUSES[index];

  const prev = () => setIndex((i) => (i === 0 ? MISUSES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === MISUSES.length - 1 ? 0 : i + 1));

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i === 0 ? MISUSES.length - 1 : i - 1));
      }
      if (e.key === "ArrowRight") {
        setIndex((i) => (i === MISUSES.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">Incorrect usage</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous misuse example"
            className="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-surface-raised text-ink-muted transition-colors hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <span className="min-w-[3rem] text-center font-mono text-[11px] text-ink-faint">
            {index + 1}/{MISUSES.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next misuse example"
            className="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-surface-raised text-ink-muted transition-colors hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          key={item.id}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className={cn(
            "flex h-44 items-center justify-center",
            item.surface,
            item.id === "busy" && "overflow-hidden",
          )}
          style={
            item.id === "gradient-fill"
              ? { background: BRAND_GRADIENT }
              : undefined
          }
        >
          {item.render}
        </motion.div>
        <div className="absolute top-3 left-3 rounded-full bg-danger px-2.5 py-1 text-[11px] font-semibold text-white">
          {"Don't"}
        </div>
      </div>

      <div className="border-t border-border bg-surface-raised px-4 py-3">
        <p className="text-sm font-semibold text-ink">{item.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.detail}</p>
      </div>

      <div
        className="flex gap-1.5 overflow-x-auto border-t border-border px-4 py-3"
        role="tablist"
        aria-label="Misuse examples"
      >
        {MISUSES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
              i === index
                ? "bg-danger-soft text-danger"
                : "bg-surface text-ink-faint hover:text-ink-muted",
            )}
          >
            {m.label.replace("Don't ", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
