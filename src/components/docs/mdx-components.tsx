import * as React from "react";
import Link from "next/link";
import { highlight } from "sugar-high";
import { Callout } from "@/components/docs/callout";
import { DoDont, Do, Dont } from "@/components/docs/do-dont";
import { TokenTable } from "@/components/docs/token-table";
import { ColorSwatchGrid } from "@/components/docs/color-swatch-grid";
import { TypeScale } from "@/components/docs/type-scale";
import { TypeTester } from "@/components/docs/type-tester";
import { MotionPlayground } from "@/components/docs/motion-playground";
import { LogoShowcase } from "@/components/docs/logo-showcase";
import { IconGallery } from "@/components/docs/icon-gallery";
import { ContrastChecker } from "@/components/docs/contrast-checker";
import { BrandExpression } from "@/components/docs/brand-expression";
import { TokenLab } from "@/components/docs/token-lab";
import { VoiceFlip } from "@/components/docs/voice-flip";
import { PrinciplesExplorer } from "@/components/docs/principles-explorer";
import { LogoMisuseGallery } from "@/components/docs/logo-misuse-gallery";
import { RelatedResources } from "@/components/docs/related-resources";
import {
  ApplicationGallery,
  ColorSpecGrid,
  ComingSoonNotice,
  DraftNotice,
  FoundationCards,
  GuidelineAssetGrid,
  LogoSystemShowcase,
  PortalIntro,
  ProductUiShowcase,
  ResourceCards,
  SignatureGradientShowcase,
  TypeSpecimen,
} from "@/components/docs/brand-foundation-blocks";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import type { MDXComponents } from "mdx/types";

function Code({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const isBlock = typeof className === "string" && className.includes("language-");
  if (isBlock && typeof children === "string") {
    return (
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: highlight(children) }}
        {...props}
      />
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function Anchor({
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  code: Code,
  Callout,
  DoDont,
  Do,
  Dont,
  TokenTable,
  ColorSwatchGrid,
  TypeScale,
  TypeTester,
  MotionPlayground,
  LogoShowcase,
  IconGallery,
  ContrastChecker,
  BrandExpression,
  TokenLab,
  VoiceFlip,
  PrinciplesExplorer,
  LogoMisuseGallery,
  RelatedResources,
  ApplicationGallery,
  ColorSpecGrid,
  ComingSoonNotice,
  DraftNotice,
  FoundationCards,
  GuidelineAssetGrid,
  LogoSystemShowcase,
  PortalIntro,
  ProductUiShowcase,
  ResourceCards,
  SignatureGradientShowcase,
  TypeSpecimen,
  Badge,
  Kbd,
};
