"use client";

import * as React from "react";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

/**
 * Every icon is drawn to the documented spec: 16x16 grid, 1.5px stroke,
 * round caps and joins, currentColor. The inner markup is the source of
 * truth for both rendering and the copied SVG.
 */
type IconDef = { name: string; inner: string };

const ICONS: IconDef[] = [
  { name: "search", inner: '<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3.5 3.5"/>' },
  { name: "filter", inner: '<path d="M3 4.5h10M5 8h6M7 11.5h2"/>' },
  { name: "settings", inner: '<path d="M2.5 5h5.25M12 5h1.5M2.5 11h1.5M8.25 11h5.25"/><circle cx="9.75" cy="5" r="2"/><circle cx="5.25" cy="11" r="2"/>' },
  { name: "close", inner: '<path d="m4 4 8 8M12 4l-8 8"/>' },
  { name: "plus", inner: '<path d="M8 3v10M3 8h10"/>' },
  { name: "check", inner: '<path d="m3 8.5 3.5 3.5L13 5"/>' },
  { name: "chevron-down", inner: '<path d="m3.5 6 4.5 4.5L12.5 6"/>' },
  { name: "arrow-right", inner: '<path d="M2.5 8h11M9.5 3.5 14 8l-4.5 4.5"/>' },
  { name: "download", inner: '<path d="M8 2.5V10M4.5 7 8 10.5 11.5 7M3 13.5h10"/>' },
  { name: "upload", inner: '<path d="M8 10.5V3M4.5 6.5 8 3l3.5 3.5M3 13.5h10"/>' },
  { name: "edit", inner: '<path d="M9.75 2.75 13.25 6.25 6.75 12.75H3.25V9.25L9.75 2.75Z"/>' },
  { name: "trash", inner: '<path d="M3 4.5h10M6.5 4.5V3h3v1.5M5 4.5l.5 8.5h5l.5-8.5"/>' },
  { name: "eye", inner: '<path d="M1.75 8C3 5.25 5.25 3.5 8 3.5S13 5.25 14.25 8C13 10.75 10.75 12.5 8 12.5S3 10.75 1.75 8Z"/><circle cx="8" cy="8" r="2"/>' },
  { name: "bell", inner: '<path d="M4 9.5v-3a4 4 0 0 1 8 0v3l1.5 2.25h-11L4 9.5Z"/><path d="M6.75 13.75a1.5 1.5 0 0 0 2.5 0"/>' },
  { name: "calendar", inner: '<rect x="2.5" y="3.5" width="11" height="10" rx="1.5"/><path d="M2.5 6.75h11M5.5 2v2.5M10.5 2v2.5"/>' },
  { name: "user", inner: '<circle cx="8" cy="5.5" r="2.75"/><path d="M2.75 13.5a5.25 5.25 0 0 1 10.5 0"/>' },
];

function iconSvg(icon: IconDef, size = 16): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon.inner}</svg>`;
}

function Glyph({ icon, size = 16 }: { icon: IconDef; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: icon.inner }}
    />
  );
}

const SIZES = [
  { px: 14, label: "Inline, tables" },
  { px: 16, label: "Default" },
  { px: 20, label: "Headers" },
  { px: 24, label: "Feature" },
];

export function IconGallery() {
  const { copied, copy } = useCopy();

  return (
    <div className="my-6 flex flex-col gap-3">
      <p className="text-[13px] text-ink-muted">
        Click any icon to copy production-ready SVG. 1.5px stroke on a 16px
        grid, round caps, currentColor.
      </p>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
        {ICONS.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => copy(iconSvg(icon), icon.name)}
            aria-label={`Copy ${icon.name} icon SVG`}
            className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-raised text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-sm"
          >
            <Glyph icon={icon} size={20} />
            <span
              className={cn(
                "max-w-full truncate px-1.5 font-mono text-[10px] transition-colors",
                copied === icon.name
                  ? "text-success"
                  : "text-ink-faint group-hover:text-ink-muted",
              )}
            >
              {copied === icon.name ? "Copied!" : icon.name}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <div className="flex items-center justify-between border-b border-border bg-surface/40 px-4 py-2.5">
          <span className="text-[13px] font-medium text-ink">
            One drawing, four sizes
          </span>
          <span className="text-xs text-ink-muted">
            Stroke scales with the viewBox
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-around gap-6 bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[20px_20px] px-6 py-8">
          {SIZES.map((size) => (
            <div key={size.px} className="flex flex-col items-center gap-2.5 text-ink">
              <Glyph icon={ICONS[0]} size={size.px} />
              <span className="font-mono text-[11px] text-ink-muted">{size.px}px</span>
              <span className="text-[11px] text-ink-faint">{size.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
