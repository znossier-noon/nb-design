"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export function ScrollChapterDecoration({
  children,
  className,
  speed = 1,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Multiplier for drift distance */
  speed?: number;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = 56 * speed;
  const yRange: [number, number] = reverse ? [drift, -drift] : [-drift, drift];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [6, -6] : [-6, 6],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y, rotate, scale }}>{children}</motion.div>
    </div>
  );
}

export function ScrollChapterCopy({
  children,
  className,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
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
    reverse ? [20, -28] : [-20, 28],
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
