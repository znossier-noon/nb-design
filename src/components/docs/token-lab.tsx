"use client";

import * as React from "react";
import { useCopy } from "@/lib/use-copy";
import { NO_SQUIRCLE_CLASS, SQUIRCLE_CLASS } from "@/lib/squircle";
import { cn } from "@/lib/utils";

/**
 * Pick spacing and radius tokens and watch one card morph.
 */
const SPACING = [
  { token: "space-2", px: 8, className: "p-2" },
  { token: "space-3", px: 12, className: "p-3" },
  { token: "space-4", px: 16, className: "p-4" },
  { token: "space-6", px: 24, className: "p-6" },
  { token: "space-8", px: 32, className: "p-8" },
];

const RADIUS = [
  { token: "radius-xs", value: "4px", className: "rounded-xs", pill: false },
  { token: "radius-sm", value: "8px", className: "rounded-sm", pill: false },
  { token: "radius-md", value: "12px", className: "rounded-md", pill: false },
  { token: "radius-lg", value: "16px", className: "rounded-lg", pill: false },
  { token: "radius-xl", value: "24px", className: "rounded-xl", pill: false },
  { token: "radius-full", value: "9999px", className: "rounded-full", pill: true },
];

function ChipRow<T extends { token: string }>({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: T[];
  active: T;
  onSelect: (option: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-overline">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((option) => (
          <button
            key={option.token}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={active.token === option.token}
            className={cn(
              "cursor-pointer rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              active.token === option.token
                ? "border-brand bg-brand-soft text-brand"
                : "border-border-strong bg-surface-raised text-ink-muted hover:text-ink",
            )}
          >
            {option.token}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TokenLab() {
  const [spacing, setSpacing] = React.useState(SPACING[2]);
  const [radius, setRadius] = React.useState(RADIUS[2]);
  const { copied, copy } = useCopy();

  const classes = `${radius.className} ${spacing.className}`;

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex flex-col gap-4 border-b border-border bg-surface/40 p-4 sm:flex-row sm:gap-8">
        <ChipRow label="Spacing" options={SPACING} active={spacing} onSelect={setSpacing} />
        <ChipRow label="Radius" options={RADIUS} active={radius} onSelect={setRadius} />
      </div>

      <div className="flex min-h-56 items-center justify-center bg-specimen p-8">
        {radius.pill ? (
          <div
            className={cn(
              "flex items-center gap-3 border border-border bg-surface-raised transition-all duration-300 ease-out",
              NO_SQUIRCLE_CLASS,
            )}
            style={{
              padding: `${spacing.px / 2}px ${spacing.px}px`,
              borderRadius: "var(--radius-full)",
            }}
          >
            <span className="font-mono text-sm font-semibold text-ink">AED 12,400</span>
            <span className="text-xs text-ink-muted">Paid</span>
          </div>
        ) : (
          <div
            className={cn(
              "w-full max-w-xs border border-border bg-surface-raised transition-all duration-300 ease-out",
              SQUIRCLE_CLASS,
            )}
            style={{
              padding: spacing.px,
              borderRadius: radius.value,
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: spacing.px / 2 }}
            >
              <span className="text-sm font-semibold text-ink">Weekly payout</span>
              <span
                className={cn(
                  "bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success",
                  NO_SQUIRCLE_CLASS,
                )}
                style={{ borderRadius: "var(--radius-full)" }}
              >
                Paid
              </span>
            </div>
            <p className="font-mono text-xl text-ink">AED 12,400.00</p>
            <p className="mt-1 text-xs text-ink-muted">
              Every card is spacing and radius. No elevation shadows in this system.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => copy(classes)}
        className="flex w-full cursor-pointer items-center justify-between border-t border-border bg-surface/40 px-4 py-2.5 text-left transition-colors hover:bg-surface"
      >
        <code className="font-mono text-[13px] text-ink">{classes}</code>
        <span className={cn("text-xs", copied ? "text-success" : "text-ink-muted")}>
          {copied ? "Copied!" : "Copy classes"}
        </span>
      </button>
    </div>
  );
}
