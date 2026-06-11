"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Mode = "marketing" | "product";

/** Approximate share of each color family on the surface, for the ratio bar. */
const RATIOS: Record<Mode, { neutral: number; blue: number; yellow: number }> = {
  marketing: { neutral: 24, blue: 71, yellow: 5 },
  product: { neutral: 91, blue: 7, yellow: 2 },
};

function MarketingMock() {
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[10px] p-6 text-white"
      style={{ background: BRAND_GRADIENT }}
    >
      <span
        aria-hidden
        className="absolute -top-3 right-8 h-10 w-24 -skew-x-[24deg] bg-(--accent)"
      />
      <p className="max-w-60 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em]">
        Shop for your business with ease.
      </p>
      <div className="flex items-center gap-3">
        <span className="rounded-[7px] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-(--brand)">
          Request account
        </span>
        <span className="text-[13px] font-medium text-white/70">
          B2B landing
        </span>
      </div>
    </div>
  );
}

function ProductMock() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-[10px] border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ink">Bulk order</span>
        <span className="rounded-[7px] bg-(--brand) px-3 py-1.5 text-xs font-semibold text-white">
          Request quote
        </span>
      </div>
      {[
        { label: "AED 12,400", meta: "Jun 10", fresh: true },
        { label: "AED 8,150", meta: "Jun 3", fresh: false },
        { label: "AED 9,720", meta: "May 27", fresh: false },
      ].map((row) => (
        <div
          key={row.meta}
          className="flex items-center justify-between rounded-[7px] bg-surface px-3 py-2"
        >
          <span className="font-mono text-[13px] text-ink">{row.label}</span>
          <span className="flex items-center gap-2 text-xs text-ink-muted">
            {row.fresh && (
              <span className="rounded-full bg-(--accent) px-1.5 py-px text-[10px] font-semibold text-black">
                New
              </span>
            )}
            {row.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

const SEGMENTS = [
  { key: "neutral", label: "Neutral", className: "bg-(--ink-faint)" },
  { key: "blue", label: "Blue", className: "bg-(--brand)" },
  { key: "yellow", label: "Yellow", className: "bg-(--accent)" },
] as const;

export function BrandExpression() {
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = React.useState<Mode>("marketing");
  const ratio = RATIOS[mode];

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">
          One ratio, two expressions
        </span>
        <div className="flex overflow-hidden rounded-[7px] border border-border-strong text-[13px]">
          {(["marketing", "product"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              aria-pressed={mode === option}
              className={cn(
                "cursor-pointer px-3 py-1.5 font-medium capitalize transition-colors",
                mode === option
                  ? "bg-ink text-background"
                  : "bg-surface-raised text-ink-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[20px_20px] p-5 sm:p-7">
        <div className="mx-auto h-56 max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              className="h-full"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {mode === "marketing" ? <MarketingMock /> : <ProductMock />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-border bg-surface/40 p-4">
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {SEGMENTS.map((segment) => (
            <motion.span
              key={segment.key}
              className={segment.className}
              animate={{ width: `${ratio[segment.key]}%` }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
          {SEGMENTS.map((segment) => (
            <span key={segment.key} className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span aria-hidden className={cn("size-2 rounded-full", segment.className)} />
              {segment.label}
              <span className="font-mono text-[11px] text-ink-faint">
                {ratio[segment.key]}%
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Marketing leads with the blue field; product inverts it so blue means
          interactive. The yellow cut stays rare in both.
        </p>
      </div>
    </div>
  );
}
