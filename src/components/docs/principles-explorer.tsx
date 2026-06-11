"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BRAND_BLUE, ACCENT_YELLOW } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Principle = {
  rank: number;
  title: string;
  short: string;
  tagline: string;
  invoke: string;
  panel: React.ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    rank: 1,
    title: "Clarity over cleverness",
    short: "Clarity",
    tagline: "The primary action should be obvious in under a second.",
    invoke: "This violates clarity over cleverness",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-md border border-success/25">
          <div className="flex h-28 items-center justify-center bg-surface p-4">
            <button
              type="button"
              className="cursor-default rounded-full bg-brand px-4 py-2 text-sm font-medium text-white"
            >
              Download VAT report
            </button>
          </div>
          <figcaption className="border-t border-success/25 bg-success-soft/50 px-3 py-2 text-xs font-medium text-success">
            Do · labeled action
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-md border border-danger/25">
          <div className="flex h-28 items-center justify-center bg-surface p-4">
            <button
              type="button"
              aria-label="Download"
              className="flex size-10 cursor-default items-center justify-center rounded-full border border-border text-ink-muted"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <figcaption className="border-t border-danger/25 bg-danger-soft/50 px-3 py-2 text-xs font-medium text-danger">
            {"Don't · icon without a label"}
          </figcaption>
        </figure>
      </div>
    ),
  },
  {
    rank: 2,
    title: "One platform, two systems",
    short: "Two systems",
    tagline: "Storefront and console share foundations, not identical layouts.",
    invoke: "This breaks one platform, two systems",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border">
          <div className="text-overline border-b border-border bg-surface px-3 py-1.5 text-ink-muted">
            Merchant storefront
          </div>
          <div className="space-y-2 bg-background p-3">
            <div className="h-2 w-2/3 rounded-full bg-ink/10" />
            <div className="h-16 rounded-md bg-surface" />
            <div className="h-8 w-24 rounded-full bg-brand" />
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-border">
          <div className="text-overline border-b border-border bg-surface px-3 py-1.5 text-ink-muted">
            Operator console
          </div>
          <div className="space-y-1.5 bg-background p-3">
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-6 rounded bg-surface" />
              ))}
            </div>
            <div className="h-20 rounded-md border border-border bg-surface-raised" />
          </div>
        </div>
      </div>
    ),
  },
  {
    rank: 3,
    title: "Documentation is the product",
    short: "Documentation",
    tagline: "If it isn't written here, it isn't done.",
    invoke: "This isn't documented yet",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-success/25 bg-success-soft/30 p-4">
          <p className="font-mono text-[11px] font-semibold text-success">Done</p>
          <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary">
            <li>Usage guidance</li>
            <li>Live examples</li>
            <li>Version and status</li>
          </ul>
        </div>
        <div className="rounded-md border border-danger/25 bg-danger-soft/30 p-4">
          <p className="font-mono text-[11px] font-semibold text-danger">WIP</p>
          <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary">
            <li>Figma-only frame</li>
            <li>Slack thread decision</li>
            <li>{"We'll document it later"}</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    rank: 4,
    title: "Accessible by default",
    short: "Accessible",
    tagline: "Contrast and keyboard behavior ship with the token.",
    invoke: "This fails accessible by default",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-success/25">
          <div
            className="flex h-20 items-center justify-center text-sm font-medium"
            style={{ background: BRAND_BLUE, color: "#fff" }}
          >
            AA pass · 8.9:1
          </div>
          <p className="border-t border-success/25 bg-success-soft/50 px-3 py-2 text-xs text-success">
            Brand on white ink
          </p>
        </div>
        <div className="overflow-hidden rounded-md border border-danger/25">
          <div
            className="flex h-20 items-center justify-center text-sm font-medium"
            style={{ background: ACCENT_YELLOW, color: "#fff" }}
          >
            AA fail · 1.4:1
          </div>
          <p className="border-t border-danger/25 bg-danger-soft/50 px-3 py-2 text-xs text-danger">
            Yellow is never body text
          </p>
        </div>
      </div>
    ),
  },
  {
    rank: 5,
    title: "Move fast on rails",
    short: "On rails",
    tagline: "Use the system unless it genuinely blocks you.",
    invoke: "This forks the system without cause",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-success/25 bg-surface p-4">
          <p className="text-xs font-medium text-ink">System primitives</p>
          <p className="mt-2 text-xs text-ink-muted">One fix updates every screen.</p>
        </div>
        <div className="rounded-md border border-danger/25 bg-surface p-4">
          <p className="text-xs font-medium text-ink">One-off forks</p>
          <p className="mt-2 text-xs text-ink-muted">Multiply review, a11y and drift.</p>
        </div>
      </div>
    ),
  },
];

export function PrinciplesExplorer() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = React.useState(1);
  const principle = PRINCIPLES.find((p) => p.rank === active)!;

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="grid lg:grid-cols-[13rem_1fr]">
        <div
          className="flex flex-col border-b border-border bg-surface/30 lg:border-r lg:border-b-0"
          role="tablist"
          aria-label="Design principles"
        >
          {PRINCIPLES.map((p) => {
            const selected = active === p.rank;
            return (
              <button
                key={p.rank}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(p.rank)}
                className={cn(
                  "flex cursor-pointer items-start gap-3 border-l-2 px-4 py-3.5 text-left transition-colors",
                  selected
                    ? "border-l-brand bg-background text-ink"
                    : "border-l-transparent text-ink-muted hover:bg-surface/80 hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 font-mono text-[11px] tabular-nums",
                    selected ? "text-brand" : "text-ink-faint",
                  )}
                >
                  {String(p.rank).padStart(2, "0")}
                </span>
                <span className="text-[13px] leading-snug font-medium">{p.short}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            role="tabpanel"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15 }}
            className="p-5 sm:p-6"
          >
            <h3 className="text-base font-semibold text-ink">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {principle.tagline}
            </p>
            <div className="mt-5">{principle.panel}</div>
            <p className="mt-5 text-xs text-ink-muted">
              In critique: <span className="font-medium text-ink-secondary">{principle.invoke}</span>
              {" · "}Rank {principle.rank} wins over lower ranks.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
