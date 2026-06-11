"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/brand/logo";
import {
  ACCENT_YELLOW,
  BRAND_BLACK,
  BRAND_BLUE,
  BRAND_GRADIENT,
} from "@/lib/brand";
import { cn } from "@/lib/utils";

const MISUSES = [
  {
    id: "stretch",
    label: "Don't stretch",
    detail: "Keep the approved artwork proportions. Never scale the logo unevenly.",
    surface: "bg-white",
    render: (
      <BrandLogo
        variant="primary"
        surface="light"
        className="h-16"
        style={{ transform: "scaleX(1.35)" }}
      />
    ),
  },
  {
    id: "rotate",
    label: "Don't rotate",
    detail: "The approved logo is always upright, never tilted for effect.",
    surface: "bg-white",
    render: (
      <BrandLogo
        variant="primary"
        surface="light"
        className="h-16"
        style={{ transform: "rotate(14deg)" }}
      />
    ),
  },
  {
    id: "crop",
    label: "Don't crop",
    detail: "Use the complete approved logo file. Never crop the wordmark or spacing.",
    surface: "bg-white",
    render: (
      <div className="w-34 overflow-hidden">
        <BrandLogo variant="primary" surface="light" className="h-16" />
      </div>
    ),
  },
  {
    id: "recolor",
    label: "Don't recolor",
    detail: "Do not recolor, tint or filter the approved logo artwork.",
    surface: "bg-white",
    render: (
      <BrandLogo
        variant="primary"
        surface="light"
        className="h-16"
        style={{ filter: "hue-rotate(110deg) saturate(1.4)" }}
      />
    ),
  },
  {
    id: "effects",
    label: "Don't add effects",
    detail: "No outlines, glows or heavy shadows on the logo.",
    surface: "bg-white",
    render: (
      <BrandLogo
        variant="primary"
        surface="light"
        className="h-16"
        style={{ filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.45))" }}
      />
    ),
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
          <BrandLogo variant="primary" surface="dark" className="h-16" />
        </div>
      </div>
    ),
  },
  {
    id: "gradient-fill",
    label: "Don't add treatments",
    detail: "Do not place the logo inside added graphic treatments or custom containers.",
    surface: "bg-white",
    render: (
      <div className="rounded-xl p-5" style={{ background: BRAND_GRADIENT }}>
        <BrandLogo variant="primary" surface="dark" className="h-14" />
      </div>
    ),
  },
  {
    id: "low-contrast",
    label: "Don't use wrong variant",
    detail: "Full-color on mid-gray fails legibility. Pick white or ink mono.",
    surface: "bg-[#B8B8C0]",
    render: <BrandLogo variant="primary" surface="light" className="h-16" />,
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
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-raised text-ink-muted transition-colors hover:text-ink"
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
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-raised text-ink-muted transition-colors hover:text-ink"
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
