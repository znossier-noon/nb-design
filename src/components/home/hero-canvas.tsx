"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Bounds = { left: number; right: number; top: number; bottom: number };

function Tile({
  bounds,
  className,
  style,
  delay,
  rotate = 0,
  children,
  label,
}: {
  bounds: Bounds;
  className?: string;
  style?: React.CSSProperties;
  delay: number;
  rotate?: number;
  children: React.ReactNode;
  label: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 10 }}
      whileHover={{ scale: 1.04 }}
      initial={reduced ? { rotate } : { opacity: 0, y: 28, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      aria-label={label}
      className={cn(
        "absolute flex cursor-grab touch-none items-center justify-center select-none active:cursor-grabbing",
        className,
      )}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function HeroCanvas({ className }: { className?: string }) {
  const { copied, copy } = useCopy();
  const [pressed, setPressed] = React.useState(0);
  const [toggled, setToggled] = React.useState(true);

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-105 w-100">
        <Tile
          bounds={{ left: -40, right: 250, top: -16, bottom: 295 }}
          delay={0.25}
          rotate={-6}
          label="Drag the noon business lettermark"
          className="top-4 left-10 rounded-[22px] shadow-md"
        >
          <LogoMark size={104} className="rounded-[22px]" />
        </Tile>

        <Tile
          bounds={{ left: -280, right: 28, top: -40, bottom: 330 }}
          delay={0.4}
          rotate={8}
          label="Drag the yellow accent chip"
          className="top-10 right-7 h-12 w-22 -skew-x-6 rounded-[10px] bg-accent shadow-sm"
        >
          <span className="skew-x-6 font-mono text-[11px] font-semibold text-accent-ink">
            #F3E008
          </span>
        </Tile>

        <Tile
          bounds={{ left: -285, right: 8, top: -176, bottom: 200 }}
          delay={0.5}
          rotate={-3}
          label="Drag or press the live button"
          className="top-44 right-2"
        >
          <Button size="lg" onClick={() => setPressed((n) => n + 1)}>
            {pressed === 0 ? "Press me" : pressed === 1 ? "Again!" : `${pressed} presses`}
          </Button>
        </Tile>

        <Tile
          bounds={{ left: -8, right: 295, top: -160, bottom: 160 }}
          delay={0.6}
          rotate={5}
          label="Click the brand blue chip to copy"
          className="top-40 left-2"
        >
          <button
            type="button"
            onClick={() => copy("#0928FF", "brand")}
            className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-md bg-brand text-white shadow-md transition-transform active:scale-95"
          >
            <span className="font-mono text-[11px] font-semibold">
              {copied === "brand" ? "Copied!" : "#0928FF"}
            </span>
          </button>
        </Tile>

        <Tile
          bounds={{ left: -64, right: 260, top: -265, bottom: 96 }}
          delay={0.7}
          rotate={-8}
          label="Drag or flip the toggle"
          className="bottom-24 left-16 rounded-full bg-surface-raised p-2.5 shadow-md ring-1 ring-border"
        >
          <button
            type="button"
            role="switch"
            aria-checked={toggled}
            aria-label="Demo toggle"
            onClick={() => setToggled((v) => !v)}
            className={cn(
              "relative h-7 w-12 cursor-pointer rounded-full transition-colors duration-200",
              toggled ? "bg-brand" : "bg-border-strong",
            )}
          >
            <span
              className={cn(
                "absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                toggled && "translate-x-5",
              )}
            />
          </button>
        </Tile>

        <Tile
          bounds={{ left: -265, right: 64, top: -270, bottom: 120 }}
          delay={0.8}
          rotate={4}
          label="Drag the status badge"
          className="right-16 bottom-30"
        >
          <Badge variant={toggled ? "success" : "neutral"} dot>
            {toggled ? "Active" : "Paused"}
          </Badge>
        </Tile>
      </div>
    </div>
  );
}
