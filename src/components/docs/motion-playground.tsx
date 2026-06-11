"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Ease = readonly [number, number, number, number];

const EASE_SWIFT: Ease = [0.4, 0, 0.2, 1];
const EASE_OUT_EXPO: Ease = [0.16, 1, 0.3, 1];

const DURATIONS = [
  { token: "duration-fast", ms: 120, usage: "Hover states, color changes" },
  { token: "duration-base", ms: 200, usage: "Toggles, micro-interactions" },
  { token: "duration-slow", ms: 320, usage: "Panels, dialogs" },
  { token: "duration-editorial", ms: 600, usage: "Hero and page entrances" },
] as const;

const EASINGS = [
  {
    token: "ease-swift",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    ease: EASE_SWIFT,
    usage: "Standard UI state changes",
  },
  {
    token: "ease-out-expo",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    ease: EASE_OUT_EXPO,
    usage: "Entrances, editorial reveals",
  },
] as const;

function Track({
  run,
  duration,
  ease,
  reduced,
}: {
  run: number;
  duration: number;
  ease: Ease;
  reduced: boolean;
}) {
  return (
    <div className="relative h-4 rounded-full bg-surface-sunken">
      {/* Rail is inset by the ball width so left:100% lands flush at the end */}
      <div className="absolute inset-y-0 left-0 w-[calc(100%-16px)]">
        <motion.span
          key={run}
          initial={reduced ? false : { left: "0%" }}
          animate={{ left: "100%" }}
          transition={
            reduced ? { duration: 0 } : { duration: duration / 1000, ease, delay: 0.15 }
          }
          className="absolute top-0 block size-4 rounded-full bg-brand"
        />
      </div>
    </div>
  );
}

export function MotionPlayground() {
  const reduced = useReducedMotion() ?? false;
  const [run, setRun] = React.useState(0);
  const replay = () => setRun((r) => r + 1);

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">
          Durations &amp; easings, live
        </span>
        <button
          type="button"
          onClick={replay}
          className="flex h-7 cursor-pointer items-center gap-1.5 rounded-[6px] bg-background px-2.5 text-xs font-medium text-ink shadow-xs transition-colors hover:bg-brand-soft hover:text-brand"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M10.5 6a4.5 4.5 0 1 1-1.32-3.18M10.5 1v2.5H8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Replay
        </button>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        {DURATIONS.map((duration) => (
          <button
            key={duration.token}
            type="button"
            onClick={replay}
            aria-label={`Replay ${duration.token} animation`}
            className="cursor-pointer bg-background p-4 text-left transition-colors hover:bg-surface/60"
          >
            <Track
              run={run}
              duration={duration.ms}
              ease={EASE_SWIFT}
              reduced={reduced}
            />
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <code className="font-mono text-[12px] font-medium text-brand">
                {duration.token}
              </code>
              <span className="font-mono text-[11px] text-ink-muted">
                {duration.ms}ms
              </span>
            </div>
            <p className="mt-0.5 text-xs text-ink-muted">{duration.usage}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
        {EASINGS.map((easing) => (
          <button
            key={easing.token}
            type="button"
            onClick={replay}
            aria-label={`Replay ${easing.token} animation`}
            className="cursor-pointer bg-background p-4 text-left transition-colors hover:bg-surface/60"
          >
            <Track run={run} duration={600} ease={easing.ease} reduced={reduced} />
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <code className="font-mono text-[12px] font-medium text-brand">
                {easing.token}
              </code>
              <span className="hidden font-mono text-[11px] text-ink-muted lg:inline">
                {easing.value}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-ink-muted">{easing.usage}</p>
          </button>
        ))}
      </div>

      <div
        className={cn(
          "border-t border-border bg-surface/50 px-4 py-2 text-[11px] text-ink-faint",
        )}
      >
        {reduced
          ? "Reduced motion is on: animations resolve instantly, exactly as they do in product."
          : "Click any tile to replay. Both easings run at 600ms for comparison."}
      </div>
    </div>
  );
}
