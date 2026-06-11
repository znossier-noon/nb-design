"use client";

import { CurrencyGlyphMark } from "@/components/brand/currency-glyph-mark";
import { useCopy } from "@/lib/use-copy";
import { BRAND_FONTS, BRAND_GLYPHS } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function BrandGlyphs() {
  const { copied, copy } = useCopy();

  return (
    <div className="my-6 flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border border-border">
        <p className="border-b border-border bg-surface/60 px-4 py-3 text-sm font-semibold text-ink">
          Brand glyphs
        </p>
        {BRAND_GLYPHS.map((glyph) => (
          <div
            key={glyph.glyphName}
            className="flex flex-col gap-4 border-b border-border px-4 py-4 last:border-0"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-specimen text-ink">
                <CurrencyGlyphMark glyph={glyph.glyphName} className="size-9" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">
                  {glyph.label}{" "}
                  <span className="font-normal text-ink-muted">({glyph.currency})</span>
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-ink-muted">
                  glyph <span className="text-ink-secondary">{glyph.glyphName}</span> ·{" "}
                  {glyph.codepoint}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{glyph.note}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => copy(glyph.char, glyph.codepoint)}
                  className="cursor-pointer font-mono text-[11px] text-brand hover:underline"
                >
                  {copied === glyph.codepoint ? "Copied!" : "Copy character"}
                </button>
                <button
                  type="button"
                  onClick={() => copy(glyph.glyphName, `${glyph.glyphName}-name`)}
                  className="cursor-pointer font-mono text-[11px] text-brand hover:underline"
                >
                  {copied === `${glyph.glyphName}-name` ? "Copied!" : "Copy glyph name"}
                </button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {BRAND_FONTS.map((font) => (
                <div
                  key={font.id}
                  className="rounded-md border border-border bg-surface/50 px-3 py-2.5"
                >
                  <p className="text-[10px] font-medium text-ink-muted">{font.label}</p>
                  <p
                    className={cn(
                      "mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink",
                      font.className,
                    )}
                  >
                    <CurrencyGlyphMark glyph={glyph.glyphName} className="size-4 shrink-0" />
                    {glyph.exampleAmount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-ink-muted">
        All three families encode <code className="font-mono text-[11px]">dhm</code> and{" "}
        <code className="font-mono text-[11px]">sar</code>, mapped to Unicode{" "}
        <code className="font-mono text-[11px]">U+20C3</code> and{" "}
        <code className="font-mono text-[11px]">U+20C1</code>. In product code always use the
        codepoints, never letter prefixes or legacy ﷼.
      </p>
    </div>
  );
}
