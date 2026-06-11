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

/** Latin scale (NoonTree). Mirrors @theme tokens in globals.css. */
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
    usage: "Overlines and metadata labels (all caps). Not product badges.",
    sample: "FOUNDATIONS",
  },
];

/**
 * Arabic scale (Noon Arabic). Same class names; metrics differ.
 * Slightly larger sizes, looser line heights, zero letter-spacing.
 */
export const arabicTypeScale: TypeStyle[] = [
  {
    name: "Display XL",
    className: "text-display-xl",
    size: "clamp(52px, 8vw, 96px)",
    lineHeight: "1.12",
    letterSpacing: "0",
    weight: "600",
    usage: "Homepage hero, marketing (RTL)",
    sample: "قرار واحد، موثّق.",
  },
  {
    name: "Display",
    className: "text-display",
    size: "clamp(38px, 5.5vw, 64px)",
    lineHeight: "1.16",
    letterSpacing: "0",
    weight: "600",
    usage: "Section heroes, landing headers",
    sample: "مصمّم للنمو",
  },
  {
    name: "Headline",
    className: "text-headline",
    size: "clamp(30px, 3.5vw, 44px)",
    lineHeight: "1.22",
    letterSpacing: "0",
    weight: "600",
    usage: "Page titles, major section breaks",
    sample: "نظام الألوان",
  },
  {
    name: "Title",
    className: "text-title",
    size: "23px",
    lineHeight: "1.38",
    letterSpacing: "0",
    weight: "600",
    usage: "Card titles, subsection headers",
    sample: "المكوّنات المشتركة",
  },
  {
    name: "Body large",
    className: "text-body-lg",
    size: "19px",
    lineHeight: "1.75",
    letterSpacing: "0",
    weight: "400",
    usage: "Lede paragraphs, introductions",
    sample: "مصدر واحد لكل قرار تصميمي في المنتج.",
  },
  {
    name: "Body",
    className: "text-base",
    size: "17px",
    lineHeight: "1.85",
    letterSpacing: "0",
    weight: "400",
    usage: "Documentation copy, default UI text",
    sample: "استخدم حالة الجملة في كل مكان، بما في ذلك الأزرار.",
  },
  {
    name: "Small",
    className: "text-sm",
    size: "15px",
    lineHeight: "1.6",
    letterSpacing: "0",
    weight: "400/500",
    usage: "Dense UI, tables, controls, metadata",
    sample: "تم التحديث منذ يومين",
  },
  {
    name: "Caption",
    className: "text-xs",
    size: "13px",
    lineHeight: "1.5",
    letterSpacing: "0",
    weight: "500",
    usage: "Overlines in Arabic (avoid forced all caps)",
    sample: "الأساسيات",
  },
];
