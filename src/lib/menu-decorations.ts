export type DecorationKey =
  | "principles"
  | "brand"
  | "logo"
  | "color"
  | "typography"
  | "iconography"
  | "motion"
  | "content"
  | "figma"
  | "assets"
  | "downloads"
  | "documentation"
  | "overview";

export const decorationByHref: Record<string, DecorationKey> = {
  "/foundations": "overview",
  "/foundations/principles": "principles",
  "/foundations/brand-identity": "brand",
  "/foundations/logo": "logo",
  "/foundations/color": "color",
  "/foundations/typography": "typography",
  "/foundations/iconography": "iconography",
  "/foundations/motion": "motion",
  "/foundations/content-guidelines": "content",
  "/resources": "overview",
  "/resources/figma-libraries": "figma",
  "/resources/brand-assets": "assets",
  "/resources/downloads": "downloads",
  "/resources/documentation": "documentation",
};

export const chapterDescriptions: Record<string, string> = {
  "Design principles": "How we decide what good looks like.",
  "Brand identity": "Voice, personality and visual expression.",
  Logo: "The lettermark, slash and usage rules.",
  Color: "B2B blues, noon yellow and semantic palettes.",
  Typography: "NoonTree and Noon Arabic scales.",
  Iconography: "Stroke, grid and product icon rules.",
  Motion: "Timing, easing and interaction feel.",
  "Content guidelines": "Words, tone and microcopy standards.",
};

export const chapterThemes: Record<
  string,
  { surface: string; accent: string; onBrand?: boolean }
> = {
  "Design principles": {
    surface: "bg-brand-soft",
    accent: "text-brand",
  },
  "Brand identity": {
    surface: "bg-brand",
    accent: "text-white",
    onBrand: true,
  },
  Logo: {
    surface: "bg-accent",
    accent: "text-ink",
  },
  Color: {
    surface: "bg-linear-to-br from-brand to-brand-strong",
    accent: "text-white",
    onBrand: true,
  },
  Typography: {
    surface: "bg-surface",
    accent: "text-ink",
  },
  Iconography: {
    surface: "bg-surface-sunken",
    accent: "text-ink-secondary",
  },
  Motion: {
    surface: "bg-brand-soft",
    accent: "text-brand",
  },
  "Content guidelines": {
    surface: "bg-background",
    accent: "text-ink-muted",
  },
};
