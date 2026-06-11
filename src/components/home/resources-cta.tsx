"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { GrainOverlay } from "@/components/shell/grain-overlay";
import { buttonClasses } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ResourcesCta() {
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const slashY = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const slashRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const arrowY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="resources-cta"
      data-chapter="resources"
      className="relative flex min-h-[70dvh] items-center overflow-hidden bg-accent"
    >
      <GrainOverlay intensity="medium" variant="accent" parallax parallaxRange={28} />

      {!reduced && (
        <>
          <motion.span
            aria-hidden
            style={{ y: slashY, rotate: slashRotate }}
            className="pointer-events-none absolute -right-8 top-1/4 inline-block h-48 w-72 -skew-x-12 rounded-2xl bg-ink/8"
          />
          <motion.span
            aria-hidden
            style={{ y: arrowY }}
            className="pointer-events-none absolute bottom-[15%] left-[5%] text-[clamp(6rem,18vw,14rem)] font-semibold leading-none text-ink/[0.06] select-none"
          >
            →
          </motion.span>
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {reduced ? (
          <div className="max-w-2xl">
            <CtaContent />
          </div>
        ) : (
          <motion.div style={{ y: contentY }} className="max-w-2xl">
            <CtaContent />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CtaContent() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="font-mono text-sm font-semibold tracking-widest text-ink/60 uppercase">
        Resources
      </p>
      <h2 className="mt-4 text-display text-ink">
        Figma libraries, assets and downloads.
      </h2>
      <p className="mt-4 text-body-lg text-ink/80">
        Everything your team needs to ship with the Noon Business design
        system.
      </p>
      <Link
        href="/resources"
        className={buttonClasses({
          size: "lg",
          className: "mt-8 bg-ink text-white hover:bg-ink/90",
        })}
      >
        Browse resources
      </Link>
    </motion.div>
  );
}
