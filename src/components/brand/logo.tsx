import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type BrandLogoVariant = "primary" | "compact" | "mono-dark" | "mono-light";

const logoSources: Record<BrandLogoVariant, { dark: string; light: string }> = {
  primary: {
    dark: "/brand-guidelines/logos/en/Primary%20Dark.svg",
    light: "/brand-guidelines/logos/en/Primary%20Light.svg",
  },
  compact: {
    dark: "/brand-guidelines/logos/en/Compact%20Dark.svg",
    light: "/brand-guidelines/logos/en/Compact%20Light.svg",
  },
  "mono-dark": {
    dark: "/brand-guidelines/logos/en/Primary%20Monochrome%20Dark.svg",
    light: "/brand-guidelines/logos/en/Primary%20Monochrome%20Dark.svg",
  },
  "mono-light": {
    dark: "/brand-guidelines/logos/en/Primary%20Monochrome%20Light.svg",
    light: "/brand-guidelines/logos/en/Primary%20Monochrome%20Light.svg",
  },
};

const logoSize = {
  primary: { width: 340, height: 126 },
  compact: { width: 280, height: 137 },
  "mono-dark": { width: 340, height: 126 },
  "mono-light": { width: 340, height: 126 },
} satisfies Record<BrandLogoVariant, { width: number; height: number }>;

export function BrandLogo({
  variant = "primary",
  surface = "theme",
  className,
  style,
  priority = false,
}: {
  variant?: BrandLogoVariant;
  surface?: "theme" | "light" | "dark";
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  const sources = logoSources[variant];
  const size = logoSize[variant];
  const singleSource =
    surface === "light" ? sources.dark : surface === "dark" ? sources.light : null;

  if (singleSource) {
    return (
      <span className={cn("relative inline-block", className)} style={style}>
        <Image
          src={singleSource}
          alt="Noon Business"
          width={size.width}
          height={size.height}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span className={cn("relative inline-block", className)} style={style}>
      <Image
        src={sources.dark}
        alt="Noon Business"
        width={size.width}
        height={size.height}
        priority={priority}
        className="h-full w-auto object-contain dark:hidden"
      />
      <Image
        src={sources.light}
        alt="Noon Business"
        width={size.width}
        height={size.height}
        priority={priority}
        className="hidden h-full w-auto object-contain dark:block"
      />
    </span>
  );
}

export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return <BrandLogo variant="compact" className={cn("shrink-0", className)} style={{ height: size }} />;
}

export function Wordmark({ className }: { className?: string }) {
  return <BrandLogo variant="primary" className={cn("h-8", className)} />;
}
