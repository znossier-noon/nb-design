/**
 * Noon Business font stack.
 *
 * NoonTree is a custom Figtree build (OFL). Drop woff2 files in
 * public/fonts/noontree/ and switch layout.tsx from the Figtree stand-in to
 * localFont.
 *
 * Noon Arabic is Cairo (SIL OFL) under the brand name. Drop renamed woff2
 * files in public/fonts/noon-arabic/ and switch layout.tsx to localFont.
 *
 * Noon Mono is JetBrains Mono (SIL OFL) under the brand name. Drop renamed
 * woff2 files in public/fonts/noon-mono/ and switch layout.tsx to localFont.
 *
 * NoonTree and Noon Arabic ship brand currency glyphs `dhm` and `sar`.
 */

export const FONT_LATIN = "NoonTree";
export const FONT_ARABIC = "Noon Arabic";
/** Upstream family Noon Arabic is sourced from. */
export const FONT_ARABIC_SOURCE = "Cairo";
export const FONT_MONO = "Noon Mono";
/** Upstream family Noon Mono is sourced from. */
export const FONT_MONO_SOURCE = "JetBrains Mono";

export const BRAND_FONTS = [
  { id: "latin", label: FONT_LATIN, className: "font-sans" },
  { id: "arabic", label: FONT_ARABIC, className: "font-arabic" },
  { id: "mono", label: FONT_MONO, className: "font-mono" },
] as const;

/** UAE Dirham sign (Unicode 18.0, U+20C3). Production glyph name: `dhm`. */
export const DIRHAM_SIGN = "\u20C3";

/** Saudi Riyal sign (Unicode 17.0, U+20C1). Production glyph name: `sar`. */
export const RIYAL_SIGN = "\u20C1";

export type BrandCurrencyGlyph = {
  char: string;
  glyphName: "dhm" | "sar";
  label: string;
  currency: string;
  codepoint: string;
  exampleAmount: string;
  note: string;
};

export const BRAND_GLYPHS: readonly BrandCurrencyGlyph[] = [
  {
    char: DIRHAM_SIGN,
    glyphName: "dhm",
    label: "UAE Dirham",
    currency: "AED",
    codepoint: "U+20C3",
    exampleAmount: "1,234.50",
    note: "Official UAE Dirham sign. Use U+20C3, not a styled D, Dh, or AED prefix in product UI.",
  },
  {
    char: RIYAL_SIGN,
    glyphName: "sar",
    label: "Saudi Riyal",
    currency: "SAR",
    codepoint: "U+20C1",
    exampleAmount: "1,234.50",
    note: "Official Saudi Riyal sign. Use U+20C1, not ﷼ (U+FDFC), SR, or SAR prefix in product UI.",
  },
] as const;

/** Lookup by production glyph name. */
export const BRAND_GLYPH_BY_NAME = Object.fromEntries(
  BRAND_GLYPHS.map((glyph) => [glyph.glyphName, glyph.char]),
) as Record<BrandCurrencyGlyph["glyphName"], string>;
