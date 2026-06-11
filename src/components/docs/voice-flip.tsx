"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Before/after copy examples. The master switch rewrites everything;
 * clicking a single row flips just that one.
 */
const EXAMPLES = [
  { rule: "Sentence case", off: "Create New Order", on: "Create order" },
  { rule: "Errors aren't cute", off: "Oops! Something went wrong.", on: "We couldn't save your changes. Retry or copy your edits." },
  { rule: "Outcome only", off: "Your settings were successfully updated!", on: "Settings saved" },
  { rule: "Cut the padding", off: "Please simply enter a valid email address.", on: "Enter an email address with an @, like name@store.com." },
  { rule: "Numerals and currency", off: "You earned twelve hundred dirhams", on: "You earned AED 1,200.00" },
  { rule: "Relative time", off: "Last updated on June 10th, 2026 at 4:03 PM", on: "Updated 2h ago" },
];

export function VoiceFlip() {
  const reduced = useReducedMotion() ?? false;
  const [rows, setRows] = React.useState<boolean[]>(EXAMPLES.map(() => false));
  const allOn = rows.every(Boolean);
  const allOff = rows.every((row) => !row);

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">
          Flip a row, or rewrite everything
        </span>
        <div className="flex overflow-hidden rounded-[7px] border border-border-strong text-[13px]">
          <button
            type="button"
            onClick={() => setRows(EXAMPLES.map(() => false))}
            aria-pressed={allOff}
            className={cn(
              "cursor-pointer px-3 py-1.5 font-medium transition-colors",
              allOff
                ? "bg-ink text-background"
                : "bg-surface-raised text-ink-muted hover:text-ink",
            )}
          >
            Off voice
          </button>
          <button
            type="button"
            onClick={() => setRows(EXAMPLES.map(() => true))}
            aria-pressed={allOn}
            className={cn(
              "cursor-pointer px-3 py-1.5 font-medium transition-colors",
              allOn
                ? "bg-brand text-white"
                : "bg-surface-raised text-ink-muted hover:text-ink",
            )}
          >
            Noon voice
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {EXAMPLES.map((example, index) => {
          const on = rows[index];
          return (
            <div key={example.rule}>
              <button
                type="button"
                onClick={() =>
                  setRows((prev) => prev.map((row, i) => (i === index ? !row : row)))
                }
                aria-pressed={on}
                aria-label={`${example.rule}: toggle between off-voice and noon-voice example`}
                className="flex w-full cursor-pointer flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-surface/60 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="w-44 shrink-0 text-[11px] font-semibold tracking-[0.06em] text-ink-faint uppercase">
                  {example.rule}
                </span>
                <span className="relative min-w-0 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={on ? "on" : "off"}
                      initial={reduced ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: reduced ? 0 : 0.15 }}
                      className={cn(
                        "block text-sm",
                        on ? "text-ink" : "text-ink-muted line-through decoration-danger/40",
                      )}
                    >
                      {on ? example.on : example.off}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    on ? "bg-success-soft text-success" : "bg-surface text-ink-faint",
                  )}
                >
                  {on ? "Noon" : "Off"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
