/**
 * Noon Business Design, design token source of truth.
 *
 * These values are mirrored as CSS custom properties in `src/app/globals.css`
 * and surfaced throughout the documentation (swatch grids, token tables,
 * type-scale specimens). Changing a value here should always be paired with
 * the corresponding CSS variable update.
 */

export type ColorToken = {
  name: string;
  variable: string;
  light: string;
  dark: string;
  description: string;
  /** When set, the swatch renders this CSS background instead of a flat variable. */
  gradient?: string;
};

export type ColorGroup = {
  title: string;
  description: string;
  tokens: ColorToken[];
};

export const colorGroups: ColorGroup[] = [
  {
    title: "Brand",
    description:
      "B2B brand blue and noon yellow. Blue is trust and interaction; yellow is the inherited slash accent.",
    tokens: [
      {
        name: "Brand",
        variable: "--brand",
        light: "#0928FF",
        dark: "#4D6BFF",
        description: "Logo, links, primary actions, key brand moments",
      },
      {
        name: "Brand strong",
        variable: "--brand-strong",
        light: "#0036BD",
        dark: "#2A4FD4",
        description: "Hover and pressed states on brand surfaces",
      },
      {
        name: "Brand background",
        variable: "--brand-bg",
        light: "#0036BD",
        dark: "#0036BD",
        description: "Hero sections, marketing covers, large brand fields",
      },
      {
        name: "Brand soft",
        variable: "--brand-soft",
        light: "#EEF0FF",
        dark: "#111B3A",
        description: "Tinted backgrounds: selected rows, info surfaces",
      },
      {
        name: "Accent",
        variable: "--accent",
        light: "#F3E008",
        dark: "#F3E008",
        description: "Inherited noon yellow. Logo slash, highlights, never text",
      },
      {
        name: "Brand gradient",
        variable: "--brand-gradient",
        light: "gradient",
        dark: "gradient",
        gradient:
          "linear-gradient(165deg, #0928FF 0%, #0036BD 55%, #061DBF 100%)",
        description: "Marketing heroes and presentation covers, never logos or type",
      },
    ],
  },
  {
    title: "Surfaces",
    description:
      "Three elevation steps. Most interfaces only ever need background and surface.",
    tokens: [
      {
        name: "Background",
        variable: "--background",
        light: "#FFFFFF",
        dark: "#0A0A0C",
        description: "App canvas, page background",
      },
      {
        name: "Surface",
        variable: "--surface",
        light: "#F6F7F9",
        dark: "#121216",
        description: "Cards, wells, secondary panels",
      },
      {
        name: "Surface raised",
        variable: "--surface-raised",
        light: "#FFFFFF",
        dark: "#17171C",
        description: "Popovers, dialogs, dropdowns, paired with shadow",
      },
      {
        name: "Surface sunken",
        variable: "--surface-sunken",
        light: "#F1F2F5",
        dark: "#0E0E11",
        description: "Code blocks, inset areas, input wells",
      },
    ],
  },
  {
    title: "Ink",
    description:
      "Four text steps from primary ink to faint. Never use faint ink for content that must be read.",
    tokens: [
      {
        name: "Ink",
        variable: "--ink",
        light: "#09090B",
        dark: "#F4F4F6",
        description: "Headings, primary content, high-emphasis text",
      },
      {
        name: "Ink secondary",
        variable: "--ink-secondary",
        light: "#43454D",
        dark: "#B6B8C2",
        description: "Body copy, descriptions",
      },
      {
        name: "Ink muted",
        variable: "--ink-muted",
        light: "#6B7280",
        dark: "#898B96",
        description: "Captions, metadata, supporting labels",
      },
      {
        name: "Ink faint",
        variable: "--ink-faint",
        light: "#9CA3AF",
        dark: "#5D5F6A",
        description: "Placeholders, disabled text, decorative only",
      },
    ],
  },
  {
    title: "Borders",
    description: "Hairlines defining structure without adding visual weight.",
    tokens: [
      {
        name: "Border",
        variable: "--border",
        light: "#E6E8EC",
        dark: "#24242B",
        description: "Default dividers, card outlines, table rules",
      },
      {
        name: "Border strong",
        variable: "--border-strong",
        light: "#D2D5DB",
        dark: "#33333C",
        description: "Inputs, interactive outlines, emphasized rules",
      },
    ],
  },
  {
    title: "Semantic",
    description:
      "Status colors communicate outcomes, never decoration. Each has a soft surface pair.",
    tokens: [
      {
        name: "Success",
        variable: "--success",
        light: "#16A34A",
        dark: "#34D27B",
        description: "Confirmation, completed states, positive deltas",
      },
      {
        name: "Warning",
        variable: "--warning",
        light: "#D97706",
        dark: "#F5A623",
        description: "Caution, degraded states, attention required",
      },
      {
        name: "Danger",
        variable: "--danger",
        light: "#DC2626",
        dark: "#F4665F",
        description: "Errors, destructive actions, failures",
      },
    ],
  },
];

export type TypeStyle = {
  name: string;
  className: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  weight: string;
  usage: string;
  sample: string;
};

export const typeScale: TypeStyle[] = [
  {
    name: "Display XL",
    className: "text-display-xl",
    size: "clamp(48px, 7.5vw, 88px)",
    lineHeight: "1.02",
    letterSpacing: "-0.035em",
    weight: "600",
    usage: "Homepage hero, marketing moments",
    sample: "Design once.",
  },
  {
    name: "Display",
    className: "text-display",
    size: "clamp(36px, 5vw, 60px)",
    lineHeight: "1.06",
    letterSpacing: "-0.03em",
    weight: "600",
    usage: "Section heroes, landing headers",
    sample: "Built for scale",
  },
  {
    name: "Headline",
    className: "text-headline",
    size: "clamp(28px, 3.2vw, 40px)",
    lineHeight: "1.12",
    letterSpacing: "-0.022em",
    weight: "600",
    usage: "Page titles, major section breaks",
    sample: "Color system",
  },
  {
    name: "Title",
    className: "text-title",
    size: "22px",
    lineHeight: "1.3",
    letterSpacing: "-0.014em",
    weight: "600",
    usage: "Card titles, subsection headers",
    sample: "Shared components",
  },
  {
    name: "Body large",
    className: "text-body-lg",
    size: "18px",
    lineHeight: "1.65",
    letterSpacing: "0",
    weight: "400",
    usage: "Lede paragraphs, introductions",
    sample: "A single source of truth for every product decision.",
  },
  {
    name: "Body",
    className: "text-base",
    size: "16px",
    lineHeight: "1.75",
    letterSpacing: "0",
    weight: "400",
    usage: "Documentation copy, default UI text",
    sample: "Use sentence case everywhere, including buttons.",
  },
  {
    name: "Small",
    className: "text-sm",
    size: "14px",
    lineHeight: "1.5",
    letterSpacing: "0",
    weight: "400/500",
    usage: "Dense UI, tables, controls, metadata",
    sample: "Updated 2 days ago",
  },
  {
    name: "Caption",
    className: "text-xs",
    size: "12px",
    lineHeight: "1.4",
    letterSpacing: "0.01em",
    weight: "500",
    usage: "Labels, badges, overlines, timestamps",
    sample: "FOUNDATIONS",
  },
];

export type ScaleToken = {
  name: string;
  value: string;
  usage: string;
};

export const radiusScale: ScaleToken[] = [
  { name: "radius-xs", value: "4px", usage: "Checkboxes, tags, inline code" },
  { name: "radius-sm", value: "8px", usage: "Buttons, inputs, controls" },
  { name: "radius-md", value: "12px", usage: "Cards, popovers, dropdowns" },
  { name: "radius-lg", value: "16px", usage: "Modals, large containers" },
  { name: "radius-xl", value: "24px", usage: "Hero modules, feature panels" },
  {
    name: "radius-full",
    value: "9999px",
    usage: "iOS-style 100% pill rounding: badges, avatars, chips, toggles",
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

export const shadowScale: ScaleToken[] = [
  { name: "shadow-xs", value: "0 1px 2px", usage: "Inputs, subtle lift on cards" },
  { name: "shadow-sm", value: "0 2px 8px", usage: "Cards, hover states" },
  { name: "shadow-md", value: "0 8px 24px", usage: "Dropdowns, popovers" },
  { name: "shadow-lg", value: "0 20px 48px", usage: "Modals, command palette" },
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
