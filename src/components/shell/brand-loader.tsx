"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import { GrainBackdrop } from "@/components/shell/grain-overlay";

const STORAGE_KEY = "nb-loader-seen";
const EASE = [0.16, 1, 0.3, 1] as const;

type TileKind = "logo" | "slash" | "block";

const TILES: { kind: TileKind; delay: number }[] = [
  { kind: "block", delay: 0 },
  { kind: "logo", delay: 0.04 },
  { kind: "slash", delay: 0.08 },
  { kind: "block", delay: 0.1 },
  { kind: "logo", delay: 0.14 },
  { kind: "slash", delay: 0.18 },
  { kind: "block", delay: 0.2 },
  { kind: "logo", delay: 0.24 },
  { kind: "slash", delay: 0.28 },
  { kind: "block", delay: 0.3 },
  { kind: "logo", delay: 0.34 },
  { kind: "slash", delay: 0.38 },
  { kind: "block", delay: 0.4 },
  { kind: "logo", delay: 0.44 },
  { kind: "slash", delay: 0.48 },
  { kind: "block", delay: 0.5 },
];

function LoaderTile({ kind, delay }: { kind: TileKind; delay: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="flex aspect-square items-center justify-center rounded-lg bg-white/10"
    >
      {kind === "logo" && <LogoMark size={36} />}
      {kind === "slash" && (
        <span
          aria-hidden
          className="inline-block h-8 w-14 -skew-x-12 rounded-[4px] bg-accent"
        />
      )}
      {kind === "block" && (
        <span
          aria-hidden
          className="size-8 rounded-md bg-brand/60 ring-1 ring-white/20"
        />
      )}
    </motion.div>
  );
}

export function BrandLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = React.useState(false);
  const canSkip = React.useRef(false);

  React.useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    setShow(true);
    const skipTimer = window.setTimeout(() => {
      canSkip.current = true;
    }, 400);

    const exitTimer = window.setTimeout(
      () => setShow(false),
      reduced ? 200 : 1800,
    );

    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(exitTimer);
    };
  }, [reduced]);

  const dismiss = React.useCallback(() => {
    if (!canSkip.current && !reduced) return;
    setShow(false);
  }, [reduced]);

  const handleExitComplete = React.useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { opacity: 0, scale: 1.08, transition: { duration: 0.55, ease: EASE } }
          }
          onClick={dismiss}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-brand-strong"
        >
          <GrainBackdrop intensity="strong" variant="light" />
          <div className="relative grid w-[min(88vw,22rem)] grid-cols-4 gap-2 sm:gap-3">
            {TILES.map((tile, i) => (
              <LoaderTile key={i} kind={tile.kind} delay={tile.delay} />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute bottom-10 text-xs font-medium tracking-widest text-white/70 uppercase"
          >
            Noon Business Design
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
