/**
 * B2B brand constants from noon business Brand guidelines, Seller Lab,
 * B2B Consumer App and Landing Page Figma sources.
 * @see https://anageeb.notion.site/noon-business-Brand-guidelines-37bfe4e1f81e80f386c1dbd1939bc417
 */

export const BRAND_BLUE = "#0928FF";
export const BRAND_BG = "#0036BD";
export const BRAND_BLACK = "#09090B";
export const ACCENT_YELLOW = "#F3E008";
export const BRAND_GRADIENT =
  "linear-gradient(180deg, #0036BD 0%, #00278A 100%)";

export type LogoVariant = "full" | "white" | "ink";

/** Pick the logo treatment that keeps the mark legible on a background. */
export function logoVariantForBackground(hex: string): LogoVariant {
  const { r, g, b } = parseHex(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Brand blues: full-color lettermark (preferred B2B expression)
  if (isBrandBlue(r, g, b)) return "full";

  // Dark surfaces: white monochrome
  if (luminance < 0.35) return "white";

  // Light surfaces: full color when very light, ink mono on mid tones
  if (luminance > 0.82) return "full";
  return "ink";
}

function parseHex(hex: string) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean.padEnd(6, "0").slice(0, 6);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function isBrandBlue(r: number, g: number, b: number) {
  return b > 140 && b > r && b > g && r < 60;
}
