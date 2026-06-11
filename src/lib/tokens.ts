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
        dark: "#0928FF",
        description: "Logo, links, primary actions, key brand moments",
      },
      {
        name: "Brand strong",
        variable: "--brand-strong",
        light: "#0036BD",
        dark: "#0036BD",
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
          "linear-gradient(180deg, #0036BD 0%, #00278A 100%)",
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
    name: "Title1",
    className: "text-[44px] leading-[48px] tracking-[-0.8px] font-extrabold",
    size: "44px",
    lineHeight: "48px",
    letterSpacing: "-0.8px",
    weight: "800",
    usage: "Hero titles and strongest brand/product moments",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "Title2",
    className: "text-[40px] leading-[42px] tracking-[-0.64px] font-bold",
    size: "40px",
    lineHeight: "42px",
    letterSpacing: "-0.64px",
    weight: "700",
    usage: "Large section titles and high-emphasis product messages",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "Title3",
    className: "text-[32px] leading-[34px] tracking-[-0.64px] font-bold",
    size: "32px",
    lineHeight: "34px",
    letterSpacing: "-0.64px",
    weight: "700",
    usage: "Feature headers and prominent editorial blocks",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "H1",
    className: "text-[28px] leading-[32px] tracking-[-0.56px] font-bold",
    size: "28px",
    lineHeight: "32px",
    letterSpacing: "-0.56px",
    weight: "700",
    usage: "Page headings and primary content titles",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "H2",
    className: "text-[26px] leading-[30px] tracking-[-0.26px] font-bold",
    size: "26px",
    lineHeight: "30px",
    letterSpacing: "-0.26px",
    weight: "700",
    usage: "Major sections and dense product page headings",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "H3",
    className: "text-[24px] leading-[28px] tracking-[-0.24px] font-bold",
    size: "24px",
    lineHeight: "28px",
    letterSpacing: "-0.24px",
    weight: "700",
    usage: "Subsections, panels and card groups",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "H4",
    className: "text-[20px] leading-[24px] tracking-[-0.2px] font-bold",
    size: "20px",
    lineHeight: "24px",
    letterSpacing: "-0.2px",
    weight: "700",
    usage: "Compact headings and component section labels",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    name: "Label1",
    className: "text-[18px] leading-[24px] tracking-[-0.18px] font-semibold",
    size: "18px",
    lineHeight: "24px",
    letterSpacing: "-0.18px",
    weight: "600",
    usage: "Large labels, tabs and key control text",
    sample: "Business account",
  },
  {
    name: "Label2",
    className: "text-[16px] leading-[20px] tracking-[-0.16px] font-semibold",
    size: "16px",
    lineHeight: "20px",
    letterSpacing: "-0.16px",
    weight: "600",
    usage: "Default labels, buttons and form controls",
    sample: "Create shipment",
  },
  {
    name: "Label3",
    className: "text-[14px] leading-[18px] tracking-[-0.14px] font-semibold",
    size: "14px",
    lineHeight: "18px",
    letterSpacing: "-0.14px",
    weight: "600",
    usage: "Dense labels, chips and table controls",
    sample: "Awaiting pickup",
  },
  {
    name: "Label4",
    className: "text-[12px] leading-[14px] tracking-[-0.12px] font-semibold",
    size: "12px",
    lineHeight: "14px",
    letterSpacing: "-0.12px",
    weight: "600",
    usage: "Badges, secondary labels and compact metadata",
    sample: "In transit",
  },
  {
    name: "Label5",
    className: "text-[11px] leading-[12px] tracking-[-0.12px] font-semibold",
    size: "11px",
    lineHeight: "12px",
    letterSpacing: "-0.12px",
    weight: "600",
    usage: "Small labels and compressed system UI",
    sample: "Updated",
  },
  {
    name: "Body1",
    className: "text-[16px] leading-[20px] tracking-[0px] font-normal",
    size: "16px",
    lineHeight: "20px",
    letterSpacing: "0",
    weight: "400",
    usage: "Primary product copy and default body text",
    sample: "Track orders, payouts and invoices from one business account.",
  },
  {
    name: "Body2",
    className: "text-[14px] leading-[18px] tracking-[0px] font-normal",
    size: "14px",
    lineHeight: "18px",
    letterSpacing: "0",
    weight: "400",
    usage: "Secondary product copy, helper text and table content",
    sample: "Use this account for procurement and wholesale orders.",
  },
  {
    name: "Body3",
    className: "text-[12px] leading-[16px] tracking-[0px] font-normal",
    size: "12px",
    lineHeight: "16px",
    letterSpacing: "0",
    weight: "400",
    usage: "Captions, legal support and compact descriptions",
    sample: "Prices exclude VAT and delivery fees.",
  },
  {
    name: "Tiny",
    className: "text-[10px] leading-[12px] tracking-[0px] font-medium",
    size: "10px",
    lineHeight: "12px",
    letterSpacing: "0",
    weight: "500",
    usage: "Microcopy, counters and dense metadata",
    sample: "SKU 2048",
  },
  {
    name: "Tiny Extended",
    className: "text-[10px] leading-[12px] tracking-[1px] font-semibold uppercase",
    size: "10px",
    lineHeight: "12px",
    letterSpacing: "1px",
    weight: "600",
    usage: "Overlines and short uppercase labels",
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
