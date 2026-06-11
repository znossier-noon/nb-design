"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import { BRAND_BLUE, ACCENT_YELLOW } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Principle = {
  rank: number;
  title: string;
  tagline: string;
  invoke: string;
  panel: React.ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    rank: 1,
    title: "Clarity over cleverness",
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
    tagline: "Storefront and console share foundations, not identical layouts.",
    invoke: "This breaks one platform, two systems",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border">
          <div className="border-b border-border bg-brand-soft/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
            Merchant storefront
          </div>
          <div className="space-y-2 bg-background p-3">
            <div className="h-2 w-2/3 rounded-full bg-ink/10" />
            <div className="h-16 rounded-md bg-surface" />
            <div className="h-8 w-24 rounded-full bg-brand" />
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-border">
          <div className="border-b border-border bg-brand-soft/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
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
        <p className="sm:col-span-2 text-xs leading-relaxed text-ink-muted">
          Same blues, type and motion. Different density and components per
          surface.
        </p>
      </div>
    ),
  },
  {
    rank: 3,
    title: "Documentation is the product",
    tagline: "If it isn't written here, it isn't done.",
    invoke: "This isn't documented yet",
    panel: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-success/25 bg-success-soft/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-success">
            Done
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              Usage guidance
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              Props table
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              Live preview
            </li>
          </ul>
        </div>
        <div className="rounded-md border border-danger/25 bg-danger-soft/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-danger">
            Work in progress
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-danger" />
              Figma-only frame
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-danger" />
              Slack thread decision
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-danger" />
              {"We'll document it later"}
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    rank: 4,
    title: "Accessible by default",
    tagline: "Contrast and keyboard behavior ship with the token, not as a ticket.",
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
            Approved pairing · brand on white ink
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
    tagline: "Use the system component unless it genuinely blocks you.",
    invoke: "This forks the system without cause",
    panel: (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 flex-col justify-between rounded-md border border-success/25 bg-surface p-4">
          <div className="flex flex-wrap gap-2">
            {["Button", "Badge", "Input"].map((name) => (
              <span
                key={name}
                className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-medium text-ink"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Compose from primitives. One fix updates every screen.
          </p>
        </div>
        <div className="flex items-center justify-center text-ink-faint sm:px-1">
          <span className="text-lg" aria-hidden>
            vs
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-md border border-danger/25 bg-surface p-4">
          <div className="flex flex-wrap gap-2">
            {["CustomBtn", "Pill v2", "Field++"].map((name) => (
              <span
                key={name}
                className="rounded-full border border-dashed border-danger/40 px-2.5 py-1 text-[11px] font-medium text-danger"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Fork multiplies review, a11y and drift. Propose a change instead.
          </p>
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
      <div className="flex flex-wrap gap-2 border-b border-border bg-surface/40 p-3">
        {PRINCIPLES.map((p) => (
          <button
            key={p.rank}
            type="button"
            onClick={() => setActive(p.rank)}
            aria-pressed={active === p.rank}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-left text-[13px] font-medium transition-colors",
              active === p.rank
                ? "bg-brand text-white"
                : "bg-surface-raised text-ink-muted hover:text-ink",
            )}
          >
            <span className="mr-1.5 font-mono text-[11px] opacity-80">{p.rank}</span>
            {p.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          className="p-4 sm:p-5"
        >
          <p className="text-sm leading-relaxed text-ink-secondary">{principle.tagline}</p>
          <div className="mt-4">{principle.panel}</div>
          <div className="mt-4 flex flex-col gap-2 rounded-md border border-border bg-surface-sunken/60 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
              In critique, say
            </span>
            <code className="font-mono text-[12px] text-brand">{principle.invoke}</code>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Lower rank wins when principles conflict. Rank {principle.rank} beats
            everything below it.
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 border-t border-border bg-background px-4 py-3">
        <LogoMark size={20} />
        <p className="text-xs text-ink-muted">
          Tiebreaker order is intentional. Clarity is always first.
        </p>
      </div>
    </div>
  );
}
