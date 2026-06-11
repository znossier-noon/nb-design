"use client";

import { cn } from "@/lib/utils";

const RULES = [
  {
    id: "neutral",
    label: "Neutral by default",
    detail: "Most of the screen is background, surface and ink.",
    preview: (
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="h-2 w-3/4 rounded-full bg-ink/10" />
        <div className="flex-1 rounded-md bg-surface" />
        <div className="h-2 w-1/2 rounded-full bg-ink/8" />
      </div>
    ),
  },
  {
    id: "blue",
    label: "Blue means interactive",
    detail: "Links, primary buttons, focus and selected states.",
    preview: (
      <div className="flex h-full flex-col items-start justify-center gap-2 p-3">
        <span className="text-sm font-medium text-brand">View payout</span>
        <button
          type="button"
          className="cursor-default rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-white"
        >
          Primary action
        </button>
      </div>
    ),
  },
  {
    id: "yellow",
    label: "Yellow means look here",
    detail: "One highlight per view. Never body text or warnings.",
    preview: (
      <div className="flex h-full items-center justify-center p-3">
        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-ink">
          New
        </span>
      </div>
    ),
  },
  {
    id: "semantic",
    label: "Semantic means outcome",
    detail: "Green, amber and red only for status. Always pair with a label.",
    preview: (
      <div className="flex h-full flex-col justify-center gap-2 p-3">
        {[
          { label: "Paid", className: "bg-success-soft text-success" },
          { label: "Pending", className: "bg-warning-soft text-warning" },
          { label: "Failed", className: "bg-danger-soft text-danger" },
        ].map((item) => (
          <span
            key={item.label}
            className={cn(
              "inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-normal normal-case",
              item.className,
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    ),
  },
];

export function ColorUsage() {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {RULES.map((rule) => (
        <div
          key={rule.id}
          className="overflow-hidden rounded-md border border-border bg-surface-raised"
        >
          <div className="h-28 border-b border-border bg-specimen">{rule.preview}</div>
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-ink">{rule.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{rule.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
