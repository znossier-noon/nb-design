"use client";

import * as React from "react";
import { LogoMark, Wordmark } from "@/components/brand/logo";
import {
  ACCENT_YELLOW,
  BRAND_BG,
  BRAND_BLACK,
  BRAND_BLUE,
  BRAND_GRADIENT,
  logoVariantForBackground,
  type LogoVariant,
} from "@/lib/brand";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

const B_PATH =
  "M17 9v12.3a10.5 10.5 0 1 1-3.4 7.7V9h3.4Zm7.5 12.4a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8Z";
const SLASH_PATH = "M13.6 30.6 22 27l-5 9.8a10.6 10.6 0 0 1-3.4-6.2Z";

function lettermarkSvg(variant: LogoVariant) {
  const glyphs =
    variant === "full"
      ? `<rect width="48" height="48" rx="10" fill="${BRAND_BLUE}"/><path d="${B_PATH}" fill="#fff"/><path d="${SLASH_PATH}" fill="${ACCENT_YELLOW}"/>`
      : `<path d="${B_PATH}" fill="${variant === "white" ? "#fff" : BRAND_BLACK}"/><path d="${SLASH_PATH}" fill="${variant === "white" ? "#fff" : BRAND_BLACK}"/>`;
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${glyphs}</svg>`;
}

function MonoMark({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d={B_PATH} fill={color} />
      <path d={SLASH_PATH} fill={color} />
    </svg>
  );
}

function LogoRender({
  variant,
  lockup,
  size = 56,
}: {
  variant: LogoVariant;
  lockup: "primary" | "compact";
  size?: number;
}) {
  if (lockup === "compact") {
    if (variant === "full") return <LogoMark size={size} />;
    return <MonoMark color={variant === "white" ? "#fff" : BRAND_BLACK} size={size} />;
  }

  if (variant === "full") {
    return (
      <span className="inline-flex items-center gap-2.5">
        <LogoMark size={size * 0.65} />
        <Wordmark className={size > 50 ? "text-xl" : "text-base"} />
      </span>
    );
  }

  const color = variant === "white" ? "#fff" : BRAND_BLACK;
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]" style={{ color }}>
      <MonoMark color={color} size={size * 0.65} />
      <span>
        noon <span className={variant === "white" ? "opacity-90" : "text-brand"}>business</span>
      </span>
    </span>
  );
}

const PRESETS = [
  { id: "white", label: "White", hex: "#FFFFFF", gradient: false },
  { id: "brand", label: "Brand blue", hex: BRAND_BLUE, gradient: false },
  { id: "hero", label: "Hero blue", hex: BRAND_BG, gradient: false },
  { id: "gradient", label: "Signature", hex: BRAND_BLUE, gradient: true },
  { id: "ink", label: "Ink", hex: BRAND_BLACK, gradient: false },
  { id: "accent", label: "Yellow", hex: ACCENT_YELLOW, gradient: false },
] as const;

const PLACEMENTS = [
  { product: "B2B landing", lockup: "primary" as const, surface: BRAND_BG },
  { product: "Consumer app", lockup: "primary" as const, surface: "#FFFFFF" },
  { product: "Seller Lab", lockup: "primary" as const, surface: "#F9F9FB" },
  { product: "App icon", lockup: "compact" as const, surface: BRAND_BLUE },
];

const VARIANT_LABEL: Record<LogoVariant, string> = {
  full: "Full color",
  white: "White monochrome",
  ink: "Ink monochrome",
};

function VariantSelector() {
  const [preset, setPreset] = React.useState<(typeof PRESETS)[number]["id"]>("brand");
  const [customHex, setCustomHex] = React.useState("");
  const [lockup, setLockup] = React.useState<"primary" | "compact">("primary");
  const [hue, setHue] = React.useState(228);
  const [light, setLight] = React.useState(42);

  const activePreset = PRESETS.find((p) => p.id === preset)!;
  const useCustom = preset === "brand" && customHex.length >= 4;
  const bgHex = useCustom ? (customHex.startsWith("#") ? customHex : `#${customHex}`) : activePreset.hex;
  const isGradient = activePreset.gradient && !useCustom;
  const variant = logoVariantForBackground(isGradient ? BRAND_BG : bgHex);

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">Logo variant selector</span>
        <div className="flex overflow-hidden rounded-[7px] border border-border-strong text-[13px]">
          {(["primary", "compact"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLockup(option)}
              aria-pressed={lockup === option}
              className={cn(
                "cursor-pointer px-3 py-1.5 font-medium capitalize transition-colors",
                lockup === option
                  ? "bg-ink text-background"
                  : "bg-surface-raised text-ink-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative flex min-h-52 items-center justify-center p-10 transition-colors duration-300"
        style={{
          background: isGradient ? BRAND_GRADIENT : bgHex,
        }}
      >
        <LogoRender variant={variant} lockup={lockup} size={lockup === "compact" ? 72 : 64} />
      </div>

      <div className="grid gap-px border-t border-border bg-border sm:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-1.5 bg-surface/40 p-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              aria-pressed={preset === p.id}
              className={cn(
                "cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                preset === p.id
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-border-strong bg-surface-raised text-ink-muted hover:text-ink",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex min-w-48 flex-col justify-center gap-1 bg-surface/40 px-4 py-3">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
            Use this variant
          </span>
          <span className="text-sm font-semibold text-ink">{VARIANT_LABEL[variant]}</span>
          <span className="font-mono text-[11px] text-ink-muted">
            {isGradient ? "signature gradient" : bgHex.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface/40 px-4 py-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
            Custom hex
          </span>
          <input
            type="text"
            value={customHex}
            onChange={(e) => setCustomHex(e.target.value)}
            placeholder="#0928FF"
            className="h-9 rounded-[7px] border border-border-strong bg-surface-raised px-3 font-mono text-[13px] text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)"
          />
        </label>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
            Tune background
          </span>
          <input
            type="range"
            min={200}
            max={260}
            value={hue}
            onChange={(e) => {
              const h = Number(e.target.value);
              setHue(h);
              setPreset("brand");
              setCustomHex(hslToHex(h, light));
            }}
            className="w-full accent-brand"
            aria-label="Background hue"
          />
          <input
            type="range"
            min={8}
            max={92}
            value={light}
            onChange={(e) => {
              const l = Number(e.target.value);
              setLight(l);
              setPreset("brand");
              setCustomHex(hslToHex(hue, l));
            }}
            className="w-full accent-brand"
            aria-label="Background lightness"
          />
        </div>
      </div>
    </div>
  );
}

function PlacementRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PLACEMENTS.map((place) => {
        const variant = logoVariantForBackground(place.surface);
        return (
          <div key={place.product} className="overflow-hidden rounded-md border border-border">
            <div
              className="flex h-28 items-center justify-center px-4"
              style={{ background: place.surface }}
            >
              <LogoRender
                variant={variant}
                lockup={place.lockup}
                size={place.lockup === "compact" ? 48 : 40}
              />
            </div>
            <div className="border-t border-border bg-surface-raised px-3 py-2">
              <div className="text-xs font-semibold text-ink">{place.product}</div>
              <div className="text-[11px] text-ink-muted">
                {place.lockup} · {VARIANT_LABEL[variant]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type Tile = {
  id: string;
  label: string;
  surface: string;
  svg?: string;
  render: React.ReactNode;
};

const TILES: Tile[] = [
  {
    id: "primary",
    label: "Full color · preferred",
    surface: "bg-brand",
    svg: lettermarkSvg("full"),
    render: <LogoMark size={56} />,
  },
  {
    id: "on-white",
    label: "Full color · on white",
    surface: "bg-white",
    svg: lettermarkSvg("full"),
    render: <LogoMark size={56} />,
  },
  {
    id: "white",
    label: "Monochrome · white",
    surface: "bg-brand-bg",
    svg: lettermarkSvg("white"),
    render: <MonoMark color="#ffffff" size={56} />,
  },
  {
    id: "ink",
    label: "Monochrome · ink",
    surface: "bg-white",
    svg: lettermarkSvg("ink"),
    render: <MonoMark color={BRAND_BLACK} size={56} />,
  },
];

function ShowcaseTile({ tile }: { tile: Tile }) {
  const { copied, copy } = useCopy();
  return (
    <div className="group overflow-hidden rounded-md border border-border">
      <div className={cn("relative flex h-36 items-center justify-center", tile.surface)}>
        {tile.render}
        {tile.svg && (
          <button
            type="button"
            onClick={() => copy(tile.svg!, tile.id)}
            className={cn(
              "absolute right-2 bottom-2 cursor-pointer rounded-[6px] px-2 py-1 text-[11px] font-medium backdrop-blur-sm transition-opacity",
              "bg-black/70 text-white",
              copied === tile.id
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
            )}
          >
            {copied === tile.id ? "Copied!" : "Copy SVG"}
          </button>
        )}
      </div>
      <div className="border-t border-border bg-surface-raised px-3 py-2 text-xs font-medium text-ink-muted">
        {tile.label}
      </div>
    </div>
  );
}

function LockupTile() {
  const [showClearSpace, setShowClearSpace] = React.useState(false);
  return (
    <div className="overflow-hidden rounded-md border border-border sm:col-span-2">
      <div className="relative flex h-36 items-center justify-center bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[20px_20px]">
        <span className="relative inline-flex items-center gap-2.5">
          {showClearSpace && (
            <span
              aria-hidden
              className="absolute -inset-7 rounded-sm border border-dashed border-brand/50 bg-brand-soft/40"
            />
          )}
          <LogoMark size={32} className="relative" />
          <Wordmark className="relative text-lg" />
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-surface-raised px-3 py-2">
        <span className="text-xs font-medium text-ink-muted">Primary lockup</span>
        <button
          type="button"
          onClick={() => setShowClearSpace((v) => !v)}
          aria-pressed={showClearSpace}
          className={cn(
            "cursor-pointer rounded-[6px] px-2 py-1 text-[11px] font-medium transition-colors",
            showClearSpace
              ? "bg-brand-soft text-brand"
              : "bg-surface text-ink-muted hover:text-ink",
          )}
        >
          {showClearSpace ? "Hide clear space" : "Show clear space"}
        </button>
      </div>
    </div>
  );
}

function MinSizeRow() {
  const sizes = [16, 24, 32, 48, 64];
  return (
    <div className="overflow-hidden rounded-md border border-border sm:col-span-2">
      <div className="flex h-36 items-end justify-center gap-8 bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[20px_20px] px-6 pb-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <LogoMark size={size} className={size < 24 ? "opacity-40" : undefined} />
            <span
              className={cn(
                "font-mono text-[10px]",
                size < 24
                  ? "text-danger"
                  : size === 24
                    ? "font-semibold text-brand"
                    : "text-ink-faint",
              )}
            >
              {size}px{size === 24 ? " min" : size < 24 ? " ✕" : ""}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-surface-raised px-3 py-2 text-xs font-medium text-ink-muted">
        Minimum size · 24px digital, 8mm print. Below that, the slash disappears
      </div>
    </div>
  );
}

function hslToHex(h: number, l: number) {
  const s = 85;
  const a = (s * Math.min(l, 100 - l)) / 100 / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function LogoShowcase() {
  return (
    <div className="my-6 flex flex-col gap-6">
      <VariantSelector />

      <div>
        <p className="mb-3 text-[13px] font-medium text-ink">Where it ships</p>
        <PlacementRow />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile) => (
          <ShowcaseTile key={tile.id} tile={tile} />
        ))}
        <LockupTile />
        <MinSizeRow />
      </div>
    </div>
  );
}
