"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type ScrollOffset = NonNullable<
  Parameters<typeof useScroll>[0]
>["offset"];

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  {
    y = [0, 0],
    x = [0, 0],
    opacity,
    scale,
    rotate,
    offset = ["start end", "end start"],
  }: {
    y?: [number, number];
    x?: [number, number];
    opacity?: [number, number];
    scale?: [number, number];
    rotate?: [number, number];
    offset?: ScrollOffset;
  } = {},
) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const xValue = useTransform(scrollYProgress, [0, 1], x);
  const opacityValue = useTransform(scrollYProgress, [0, 1], opacity ?? [1, 1]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], rotate ?? [0, 0]);

  if (reduced) {
    return {
      scrollYProgress,
      style: {} as React.CSSProperties,
      reduced: true,
    };
  }

  const style: Record<string, MotionValue<number>> = {};
  if (y[0] !== y[1]) style.y = yValue;
  if (x[0] !== x[1]) style.x = xValue;
  if (opacity) style.opacity = opacityValue;
  if (scale) style.scale = scaleValue;
  if (rotate) style.rotate = rotateValue;

  return { scrollYProgress, style, reduced: false };
}

export function Parallax({
  children,
  className,
  y = [24, -24],
  x,
  opacity,
  scale,
  rotate,
  offset,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: [number, number];
  x?: [number, number];
  opacity?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  offset?: ScrollOffset;
  as?: "div" | "span";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { style, reduced } = useParallax(ref, { y, x, opacity, scale, rotate, offset });
  const Component = motion[as];

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Component style={style}>{children}</Component>
    </div>
  );
}

/** Parallax tied to a parent section ref (e.g. hero exit fade). */
export function ParallaxInSection({
  sectionRef,
  children,
  className,
  y = [0, -60],
  opacity,
  scale,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  y?: [number, number];
  opacity?: [number, number];
  scale?: [number, number];
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const opacityValue = useTransform(scrollYProgress, [0, 1], opacity ?? [1, 1]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const style: Record<string, MotionValue<number>> = { y: yValue };
  if (opacity) style.opacity = opacityValue;
  if (scale) style.scale = scaleValue;

  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
}

/** Oversized background numeral with slow drift. */
export function ParallaxWatermark({
  children,
  className,
  speed = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  /** 0–1, lower = slower drift */
  speed?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [-20 * speed, 20 * speed]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {reduced ? (
        <div className={cn("absolute", className)} aria-hidden>
          {children}
        </div>
      ) : (
        <motion.div
          aria-hidden
          className={cn("absolute", className)}
          style={{ y, x }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
