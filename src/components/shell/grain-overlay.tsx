"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type GrainIntensity = "subtle" | "medium" | "strong";
export type GrainVariant = "light" | "dark" | "accent";

const intensityClass: Record<GrainIntensity, string> = {
  subtle: "grain--subtle",
  medium: "grain--medium",
  strong: "grain--strong",
};

const variantClass: Record<GrainVariant, string> = {
  light: "grain--light",
  dark: "grain--dark",
  accent: "grain--accent",
};

export function GrainOverlay({
  intensity = "medium",
  variant = "light",
  parallax = false,
  parallaxRange = 24,
  className,
}: {
  intensity?: GrainIntensity;
  variant?: GrainVariant;
  /** Slow vertical drift tied to section scroll */
  parallax?: boolean;
  parallaxRange?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxRange, -parallaxRange],
  );

  const grainClass = cn(
    "grain-overlay pointer-events-none absolute inset-0",
    intensityClass[intensity],
    variantClass[variant],
    className,
  );

  if (!parallax || reduced) {
    return (
      <div ref={ref} aria-hidden className={grainClass} />
    );
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div aria-hidden className={grainClass} style={{ y }} />
    </div>
  );
}

/** Fixed full-viewport grain for loaders and menus */
export function GrainBackdrop({
  intensity = "strong",
  variant = "light",
  className,
}: {
  intensity?: GrainIntensity;
  variant?: GrainVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "grain-overlay pointer-events-none absolute inset-0",
        intensityClass[intensity],
        variantClass[variant],
        className,
      )}
    />
  );
}
