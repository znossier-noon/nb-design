/**
 * Noon Business Design, design token source of truth.
 *
 * These values are mirrored as CSS custom properties in `src/app/globals.css`
 * and surfaced throughout the documentation (swatch grids, token tables,
 * type-scale specimens). Changing a value here should always be paired with
 * the corresponding CSS variable update.
 */

export type { ColorToken, ColorGroup } from "./tokens-color";
export { colorGroups } from "./tokens-color";

export type { TypeStyle } from "./tokens-typography";
export { typeScale, arabicTypeScale } from "./tokens-typography";

export type ScaleToken = {
  name: string;
  value: string;
  usage: string;
};

/**
 * Corner radius tokens (visual / design targets). Squircle smoothing at 100% is
 * applied globally in globals.css; supporting browsers auto-scale radii so the
 * footprint matches these values.
 */
export const radiusScale: ScaleToken[] = [
  {
    name: "radius-xs",
    value: "4px",
    usage: "Checkboxes, tags, inline code. Squircle smoothed.",
  },
  {
    name: "radius-sm",
    value: "8px",
    usage: "Buttons, inputs, controls. Squircle smoothed.",
  },
  {
    name: "radius-md",
    value: "12px",
    usage: "Cards, popovers, dropdowns. Squircle smoothed.",
  },
  {
    name: "radius-lg",
    value: "16px",
    usage: "Modals, large containers. Squircle smoothed.",
  },
  {
    name: "radius-xl",
    value: "24px",
    usage: "Hero modules, feature panels. Squircle smoothed.",
  },
  {
    name: "radius-full",
    value: "9999px",
    usage: "Pill controls only: badges, chips, toggles. No squircle.",
  },
];

export const spacingScale: ScaleToken[] = [
  { name: "space-1", value: "4px", usage: "Icon-to-label gaps, tight pairs" },
  { name: "space-2", value: "8px", usage: "Within controls, chip gaps" },
  { name: "space-3", value: "12px", usage: "Between related controls" },
  { name: "space-4", value: "16px", usage: "Card padding, form rows" },
  { name: "space-6", value: "24px", usage: "Between content groups" },
  { name: "space-8", value: "32px", usage: "Section padding, card grids" },
  { name: "space-12", value: "48px", usage: "Between page sections" },
  { name: "space-16", value: "64px", usage: "Major landmarks" },
  { name: "space-24", value: "96px", usage: "Editorial / marketing rhythm" },
];

export const motionTokens = [
  {
    name: "duration-fast",
    value: "120ms",
    usage: "Hover states, color and opacity changes",
  },
  {
    name: "duration-base",
    value: "200ms",
    usage: "Toggles, reveals, most micro-interactions",
  },
  {
    name: "duration-slow",
    value: "320ms",
    usage: "Panels, dialogs, layout transitions",
  },
  {
    name: "duration-editorial",
    value: "600ms",
    usage: "Page-level entrances, hero reveals",
  },
  {
    name: "ease-swift",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    usage: "Standard easing for UI state changes",
  },
  {
    name: "ease-out-expo",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    usage: "Entrances and editorial reveals",
  },
];
