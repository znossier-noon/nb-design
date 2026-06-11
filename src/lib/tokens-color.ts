export type ColorToken = {
  name: string;
  variable: string;
  /** Canonical hex value for docs and Figma. */
  hex: string;
  description: string;
  /** When set, the swatch renders this CSS background instead of a flat variable. */
  gradient?: string;
};

export type ColorGroup = {
  title: string;
  description: string;
  tokens: ColorToken[];
};

/** Color groups, mirrored in globals.css and Figma variable collections. */
export const colorGroups: ColorGroup[] = [
  {
    title: "Brand",
    description:
      "B2B brand blue and noon yellow. Blue is trust and interaction; yellow is the inherited slash accent.",
    tokens: [
      {
        name: "Brand",
        variable: "--brand",
        hex: "#0928FF",
        description: "Logo, links, primary actions, key brand moments",
      },
      {
        name: "Brand strong",
        variable: "--brand-strong",
        hex: "#0036BD",
        description: "Deeper brand blue: hover states, heroes, marketing fields",
      },
      {
        name: "Brand soft",
        variable: "--brand-soft",
        hex: "#EEF0FF",
        description: "Tinted backgrounds: selected rows, info surfaces",
      },
      {
        name: "Accent",
        variable: "--accent",
        hex: "#F3E008",
        description: "Inherited noon yellow. Logo slash, highlights, never body text",
      },
      {
        name: "Brand gradient",
        variable: "--brand-gradient",
        hex: "gradient",
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
        hex: "#FFFFFF",
        description: "App canvas, page background",
      },
      {
        name: "Surface",
        variable: "--surface",
        hex: "#F6F7F9",
        description: "Cards, wells, secondary panels",
      },
      {
        name: "Surface raised",
        variable: "--surface-raised",
        hex: "#FFFFFF",
        description: "Popovers, dialogs, dropdowns",
      },
      {
        name: "Surface sunken",
        variable: "--surface-sunken",
        hex: "#F1F2F5",
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
        hex: "#09090B",
        description: "Headings, primary content, high-emphasis text",
      },
      {
        name: "Ink secondary",
        variable: "--ink-secondary",
        hex: "#43454D",
        description: "Body copy, descriptions",
      },
      {
        name: "Ink muted",
        variable: "--ink-muted",
        hex: "#6B7280",
        description: "Captions, metadata, supporting labels",
      },
      {
        name: "Ink faint",
        variable: "--ink-faint",
        hex: "#9CA3AF",
        description: "Placeholders, disabled text, decorative only",
      },
      {
        name: "Ink inverse",
        variable: "--ink-inverse",
        hex: "#FFFFFF",
        description: "Text on brand or dark photography",
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
        hex: "#E6E8EC",
        description: "Default dividers, card outlines, table rules",
      },
      {
        name: "Border strong",
        variable: "--border-strong",
        hex: "#D2D5DB",
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
        hex: "#00C17C",
        description: "Confirmation, completed states, positive deltas",
      },
      {
        name: "Success soft",
        variable: "--success-soft",
        hex: "#E5FBF3",
        description: "Success badges, tinted rows, positive callouts",
      },
      {
        name: "Warning",
        variable: "--warning",
        hex: "#FF9F1A",
        description: "Caution, degraded states, attention required",
      },
      {
        name: "Warning soft",
        variable: "--warning-soft",
        hex: "#FFF5E6",
        description: "Warning badges, pending states, caution surfaces",
      },
      {
        name: "Danger",
        variable: "--danger",
        hex: "#FF4245",
        description: "Errors, destructive actions, failures",
      },
      {
        name: "Danger soft",
        variable: "--danger-soft",
        hex: "#FFEDEE",
        description: "Error badges, validation surfaces, destructive hints",
      },
    ],
  },
];
