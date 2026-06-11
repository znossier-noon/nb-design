"use client";

import * as React from "react";
import { colorGroups, type ColorToken } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const allTokens = colorGroups.flatMap((group) => group.tokens);

const FOREGROUNDS = [
  "--ink",
  "--ink-secondary",
  "--ink-muted",
  "--ink-faint",
  "--brand",
  "--brand-strong",
  "--success",
  "--warning",
  "--danger",
  "--accent",
];

const BACKGROUNDS = [
  "--background",
  "--surface",
  "--surface-raised",
  "--surface-sunken",
  "--brand-soft",
  "--brand",
  "--brand-strong",
];

function token(variable: string): ColorToken {
  return allTokens.find((t) => t.variable === variable)!;
}

/** WCAG 2.x relative luminance and contrast ratio. */
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgb.startsWith("#") ? rgb : "#000000";
  const [, r, g, b] = match;
  return `#${[r, g, b].map((channel) => Number(channel).toString(16).padStart(2, "0")).join("")}`;
}

/** Resolve a CSS variable to hex under :root or `.dark`. */
function resolveTokenHex(variable: string, theme: "light" | "dark"): string {
  if (typeof document === "undefined") {
    return token(variable).hex;
  }

  const host = document.createElement("div");
  host.style.cssText = "position:fixed;visibility:hidden;pointer-events:none";
  if (theme === "dark") host.className = "dark";

  const probe = document.createElement("div");
  probe.style.backgroundColor = `var(${variable})`;
  host.appendChild(probe);
  document.body.appendChild(host);

  const hex = rgbToHex(getComputedStyle(probe).backgroundColor);
  document.body.removeChild(host);
  return hex;
}

const CHECKS = [
  { label: "AA body text", threshold: 4.5 },
  { label: "AA large text", threshold: 3 },
  { label: "AAA body text", threshold: 7 },
];

function TokenSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 cursor-pointer rounded-[7px] border border-border-strong bg-surface-raised px-2.5 text-[13px] text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)"
      >
        {options.map((variable) => (
          <option key={variable} value={variable}>
            {token(variable).name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ContrastChecker() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [fg, setFg] = React.useState("--ink");
  const [bg, setBg] = React.useState("--background");

  const [fgHex, setFgHex] = React.useState(() => token(fg).hex);
  const [bgHex, setBgHex] = React.useState(() => token(bg).hex);

  React.useEffect(() => {
    setFgHex(resolveTokenHex(fg, theme));
    setBgHex(resolveTokenHex(bg, theme));
  }, [fg, bg, theme]);
  const ratio = contrast(fgHex, bgHex);
  const display = `${(Math.round(ratio * 100) / 100).toFixed(2)}:1`;

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex flex-wrap items-end gap-4 border-b border-border bg-surface/40 p-4">
        <TokenSelect label="Text" value={fg} options={FOREGROUNDS} onChange={setFg} />
        <TokenSelect label="Background" value={bg} options={BACKGROUNDS} onChange={setBg} />
        <div className="flex h-9 overflow-hidden rounded-[7px] border border-border-strong text-[13px]">
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTheme(mode)}
              aria-pressed={theme === mode}
              className={cn(
                "cursor-pointer px-3 font-medium capitalize transition-colors",
                theme === mode
                  ? "bg-ink text-background"
                  : "bg-surface-raised text-ink-muted hover:text-ink",
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div
          className="flex min-h-44 flex-1 flex-col justify-center gap-1 px-6 py-8 sm:px-8"
          style={{ background: bgHex, color: fgHex }}
        >
          <span className="text-4xl font-semibold tracking-[-0.02em]">Aa</span>
          <p className="text-[15px]">Payout of AED 12,400 arrived in your account.</p>
          <p className="text-[13px]">Processed Jun 10, 2026 · Reference NB-88210</p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 border-t border-border bg-surface/40 p-4 sm:w-56 sm:border-t-0 sm:border-l">
          <div>
            <div className="font-mono text-2xl font-semibold text-ink">{display}</div>
            <div className="text-xs text-ink-muted">
              {token(fg).name} on {token(bg).name.toLowerCase()}, {theme} theme
            </div>
          </div>
          <ul className="flex flex-col gap-1.5">
            {CHECKS.map((check) => {
              const pass = ratio >= check.threshold;
              return (
                <li
                  key={check.label}
                  className="flex items-center justify-between gap-2 text-[13px]"
                >
                  <span className="text-ink-secondary">{check.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      pass
                        ? "bg-success-soft text-success"
                        : "bg-danger-soft text-danger",
                    )}
                  >
                    {pass ? "Pass" : "Fail"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="border-t border-border bg-surface/40 px-4 py-2.5 text-xs text-ink-muted">
        Ratios are computed from the real token values. Try accent as text to
        see why yellow is never used for type.
      </p>
    </div>
  );
}
