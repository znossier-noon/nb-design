"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonClasses } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { openSearch } from "@/components/layout/search-button";
import { HeroCanvas } from "@/components/home/hero-canvas";
import { PLATFORM_TAGLINE, PLATFORM_VERSION } from "@/lib/platform";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_72%_-8%,var(--brand-soft),transparent)]"
      />
      <div className="relative mx-auto flex max-w-7xl items-center gap-10 px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
        <div className="min-w-0 flex-1">
          <motion.p
            {...reveal(0)}
            className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.1em] text-ink-muted uppercase"
          >
            <span aria-hidden className="inline-block h-3.5 w-6 -skew-x-12 rounded-[2px] bg-accent" />
            v{PLATFORM_VERSION}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            className="mt-7 max-w-4xl text-display-xl text-ink"
          >
            The design standard
            <br />
            for Noon Business.
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-7 max-w-xl text-body-lg text-ink-secondary"
          >
            {PLATFORM_TAGLINE} Foundations and resources, versioned in one place.
          </motion.p>

          <motion.div
            {...reveal(0.24)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link href="/foundations" className={buttonClasses({ size: "lg" })}>
              Explore foundations
            </Link>
            <Link
              href="/resources"
              className={buttonClasses({ size: "lg", variant: "secondary" })}
            >
              Resources
            </Link>
            <button
              type="button"
              onClick={openSearch}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-[15px] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Search
              <span className="flex items-center gap-0.5">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </button>
          </motion.div>
        </div>

        <HeroCanvas className="hidden shrink-0 xl:block" />
      </div>
    </section>
  );
}
