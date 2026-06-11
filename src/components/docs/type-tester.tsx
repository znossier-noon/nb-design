"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const WEIGHTS = [
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semibold" },
] as const;

const PRESETS = [
  { label: "Display", size: 72, weight: 600, tracking: -3.5 },
  { label: "Headline", size: 36, weight: 600, tracking: -2.2 },
  { label: "Body", size: 16, weight: 400, tracking: 0 },
] as const;

export function TypeTester() {
  const [size, setSize] = React.useState(72);
  const [weight, setWeight] = React.useState(600);
  const [tracking, setTracking] = React.useState(-3.5);

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border bg-surface/60 px-4 py-3">
        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {PRESETS.map((preset) => {
            const active =
              size === preset.size &&
              weight === preset.weight &&
              tracking === preset.tracking;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setSize(preset.size);
                  setWeight(preset.weight);
                  setTracking(preset.tracking);
                }}
                className={cn(
                  "h-6.5 cursor-pointer rounded-[6px] px-2.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-background text-ink shadow-xs"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-ink-muted">
          Size
          <input
            type="range"
            min={13}
            max={96}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-24 accent-(--brand)"
          />
          <span className="w-9 font-mono text-[11px] tabular-nums">{size}px</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-ink-muted">
          Tracking
          <input
            type="range"
            min={-5}
            max={4}
            step={0.5}
            value={tracking}
            onChange={(event) => setTracking(Number(event.target.value))}
            className="w-20 accent-(--brand)"
          />
          <span className="w-11 font-mono text-[11px] tabular-nums">
            {tracking.toFixed(1)}%
          </span>
        </label>

        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {WEIGHTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWeight(option.value)}
              aria-pressed={weight === option.value}
              className={cn(
                "h-6.5 cursor-pointer rounded-[6px] px-2.5 text-xs transition-colors",
                weight === option.value
                  ? "bg-background font-semibold text-ink shadow-xs"
                  : "font-medium text-ink-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[20px_20px] px-6 py-10 sm:px-10">
        <p
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          aria-label="Editable type specimen, type to replace the sample text"
          className="min-w-0 text-ink outline-none [overflow-wrap:anywhere] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--ring)"
          style={{
            fontSize: `${size}px`,
            fontWeight: weight,
            letterSpacing: `${tracking / 100}em`,
            lineHeight: size > 40 ? 1.05 : size > 24 ? 1.2 : 1.6,
          }}
        >
          Every design decision, documented.
        </p>
      </div>

      <div className="border-t border-border bg-surface/50 px-4 py-2 text-[11px] text-ink-faint">
        Click the specimen and type your own text. Set in the primary noontree
        stack, with the current web fallback when noontree is unavailable.
      </div>
    </div>
  );
}
