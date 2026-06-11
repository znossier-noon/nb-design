"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const WEIGHTS = [
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semibold" },
] as const;

const LATIN_PRESETS = [
  { label: "Display", size: 72, weight: 600, tracking: -3.5 },
  { label: "Headline", size: 36, weight: 600, tracking: -2.2 },
  { label: "Body", size: 16, weight: 400, tracking: 0 },
] as const;

const ARABIC_PRESETS = [
  { label: "Display", size: 76, weight: 600, tracking: 0 },
  { label: "Headline", size: 38, weight: 600, tracking: 0 },
  { label: "Body", size: 17, weight: 400, tracking: 0 },
] as const;

const SAMPLES = {
  latin: "Every design decision, documented.",
  arabic: "كل قرار تصميمي، موثّق.",
} as const;

type Script = "latin" | "arabic";

export function TypeTester() {
  const [script, setScript] = React.useState<Script>("latin");
  const [size, setSize] = React.useState(72);
  const [weight, setWeight] = React.useState(600);
  const [tracking, setTracking] = React.useState(-3.5);

  const isArabic = script === "arabic";
  const presets = isArabic ? ARABIC_PRESETS : LATIN_PRESETS;

  React.useEffect(() => {
    const preset = (isArabic ? ARABIC_PRESETS : LATIN_PRESETS)[0];
    setSize(preset.size);
    setWeight(preset.weight);
    setTracking(preset.tracking);
  }, [isArabic]);

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border bg-surface/60 px-4 py-3">
        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {(
            [
              { id: "latin" as const, label: "EN" },
              { id: "arabic" as const, label: "AR" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setScript(option.id)}
              className={cn(
                "h-6.5 cursor-pointer rounded-full px-2.5 text-xs font-medium transition-colors",
                script === option.id
                  ? "bg-background text-ink ring-1 ring-border"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {presets.map((preset) => {
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
                  "h-6.5 cursor-pointer rounded-full px-2.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-background text-ink ring-1 ring-border"
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

        {!isArabic && (
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
        )}

        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {WEIGHTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWeight(option.value)}
              aria-pressed={weight === option.value}
              className={cn(
                "h-6.5 cursor-pointer rounded-full px-2.5 text-xs transition-colors",
                weight === option.value
                  ? "bg-background font-semibold text-ink ring-1 ring-border"
                  : "font-medium text-ink-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        lang={isArabic ? "ar" : "en"}
        dir={isArabic ? "rtl" : "ltr"}
        className={cn(
          "cursor-text bg-specimen px-6 py-10 sm:px-10",
          isArabic && "font-arabic",
        )}
      >
        <p
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          aria-label="Editable type specimen, type to replace the sample text"
          className="min-w-0 cursor-text select-text text-ink caret-(--brand) outline-none [overflow-wrap:anywhere] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--ring)"
          style={{
            fontSize: `${size}px`,
            fontWeight: weight,
            letterSpacing: isArabic ? 0 : `${tracking / 100}em`,
            lineHeight: isArabic
              ? size > 40
                ? 1.14
                : size > 24
                  ? 1.28
                  : 1.75
              : size > 40
                ? 1.05
                : size > 24
                  ? 1.2
                  : 1.6,
          }}
        >
          {SAMPLES[script]}
        </p>
      </div>

      <div className="border-t border-border bg-surface/50 px-4 py-2 text-[11px] text-ink-faint">
        {isArabic
          ? "Noon Arabic for RTL. No letter-spacing on Arabic text."
          : "NoonTree (Latin). Click the text to type your own copy."}
      </div>
    </div>
  );
}
