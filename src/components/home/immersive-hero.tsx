"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HeroCanvas } from "@/components/home/hero-canvas";
import { ParallaxInSection } from "@/components/motion/parallax";
import { GrainOverlay } from "@/components/shell/grain-overlay";
import { buttonClasses } from "@/components/ui/button";
import { PLATFORM_TAGLINE, PLATFORM_VERSION } from "@/lib/platform";

const EASE = [0.16, 1, 0.3, 1] as const;

function HeroParallaxOrbs({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const slashRotate = useTransform(scrollYProgress, [0, 1], [-12, 24]);
  const slashY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const slash2Y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-24 -right-24 size-96 rounded-full bg-brand/30 blur-3xl"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-1/3 -left-32 size-72 rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="absolute right-1/4 -bottom-32 size-80 rounded-full bg-white/5 blur-3xl"
      />
      <motion.span
        style={{ y: slashY, rotate: slashRotate }}
        className="absolute top-[18%] right-[12%] inline-block h-24 w-40 -skew-x-12 rounded-lg bg-accent/20"
      />
      <motion.span
        style={{ y: slash2Y }}
        className="absolute bottom-[22%] left-[8%] inline-block h-16 w-28 -skew-x-12 rounded-lg bg-white/10"
      />
    </div>
  );
}

export function ImmersiveHero() {
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-brand-gradient text-white"
    >
      <HeroParallaxOrbs sectionRef={sectionRef} />
      <GrainOverlay intensity="strong" variant="light" parallax parallaxRange={32} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-10 px-4 pt-24 pb-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pt-28">
        <ParallaxInSection
          sectionRef={sectionRef}
          y={[0, -100]}
          opacity={[1, 0.35]}
          scale={[1, 0.96]}
          className="z-10 min-w-0 flex-1 text-center lg:text-left"
        >
          <motion.p
            {...reveal(0)}
            className="flex items-center justify-center gap-2.5 text-[13px] font-semibold tracking-[0.12em] text-white/70 uppercase lg:justify-start"
          >
            <span
              aria-hidden
              className="inline-block h-3.5 w-6 -skew-x-12 rounded-lg bg-accent"
            />
            v{PLATFORM_VERSION}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            className="mt-6 text-hero text-white"
          >
            The design
            <br />
            standard.
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mx-auto mt-6 max-w-lg text-body-lg text-white/75 lg:mx-0"
          >
            {PLATFORM_TAGLINE} Explore foundations, tokens and resources in one
            living reference.
          </motion.p>

          <motion.div
            {...reveal(0.24)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#foundations" className={buttonClasses({ size: "lg" })}>
              Explore foundations
            </a>
            <Link
              href="/resources"
              className={buttonClasses({ size: "lg", variant: "secondary" })}
            >
              Resources
            </Link>
          </motion.div>
        </ParallaxInSection>

        <ParallaxInSection
          sectionRef={sectionRef}
          y={[0, -160]}
          scale={[1, 1.06]}
          className="relative z-10 hidden shrink-0 lg:block"
        >
          <motion.div {...reveal(0.32)}>
            <HeroCanvas />
          </motion.div>
        </ParallaxInSection>
      </div>

      <ParallaxInSection
        sectionRef={sectionRef}
        y={[0, -40]}
        opacity={[1, 0]}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-hidden
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-medium tracking-widest uppercase">Scroll</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-white/40"
          />
        </motion.div>
      </ParallaxInSection>
    </section>
  );
}
