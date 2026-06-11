/**
 * iOS / Figma squircle helpers (corner smoothing at 100%).
 *
 * CSS: design-token radii stay unchanged; globals.css scales them up inside
 * `@supports (corner-shape: squircle)` so squircles match pre-squircle roundness.
 * SVG: pass the *design* radius into squirclePathForDesign() for the same match.
 */

/**
 * Scale factor so `corner-shape: squircle` matches circular `border-radius` footprint.
 * Maps to superellipse(2) / Figma 100% smoothing vs a circular arc.
 */
export const SQUIRCLE_RADIUS_SCALE =
  (1 - Math.SQRT1_2) / (1 - Math.pow(2, -0.25));

/** Add to any element that sets border-radius via inline style. */
export const SQUIRCLE_CLASS = "squircle";

/** Opt out of global squircle smoothing (true circles / pills). */
export const NO_SQUIRCLE_CLASS = "no-squircle";

/** Inline style props: design radius + CSS compensation (see globals.css). */
export function squircleRadiusStyle(designRadius: string): {
  "--squircle-r": string;
  borderRadius: string;
} {
  return {
    "--squircle-r": designRadius,
    borderRadius: "calc(var(--squircle-r) * var(--squircle-scale, 1))",
  };
}

/**
 * Cubic-bezier squircle path (superellipse n≈2) for a rounded rectangle.
 * `radius` is the rendered squircle radius (already compensated if needed).
 */
export function squirclePath(
  width: number,
  height: number,
  radius: number,
): string {
  const r = Math.min(radius, width / 2, height / 2);
  const c = r * 0.66;

  return [
    `M ${r} 0`,
    `H ${width - r}`,
    `C ${width - c} 0 ${width} ${c} ${width} ${r}`,
    `V ${height - r}`,
    `C ${width} ${height - c} ${width - c} ${height} ${width - r} ${height}`,
    `H ${r}`,
    `C ${c} ${height} 0 ${height - c} 0 ${height - r}`,
    `V ${r}`,
    `C 0 ${c} ${c} 0 ${r} 0`,
    "Z",
  ].join(" ");
}

/** Squircle path for a design-token corner radius (compensated for visual match). */
export function squirclePathForDesign(
  width: number,
  height: number,
  designRadius: number,
): string {
  return squirclePath(width, height, designRadius * SQUIRCLE_RADIUS_SCALE);
}

/** Lettermark tile in the 48×48 viewBox (design radius 10px). */
export const LOGO_TILE_SQUIRCLE = squirclePathForDesign(48, 48, 10);
