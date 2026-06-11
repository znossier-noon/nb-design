"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { navigation } from "@/lib/navigation";
import {
  chapterDescriptions,
  chapterThemes,
  decorationByHref,
} from "@/lib/menu-decorations";
import { MenuDecoration } from "@/components/shell/menu-decorations";
import {
  ScrollChapterCopy,
  ScrollChapterDecoration,
} from "@/components/motion/scroll-chapter";
import { ParallaxWatermark } from "@/components/motion/parallax";
import { GrainOverlay } from "@/components/shell/grain-overlay";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const foundations = navigation[0].groups[0].items.filter(
  (item) => item.title !== "Overview",
);

export function FoundationChapters() {
  const reduced = useReducedMotion();

  return (
    <div id="foundations">
      {foundations.map((item, index) => {
        const theme = chapterThemes[item.title] ?? {
          surface: "bg-surface",
          accent: "text-ink",
        };
        const decoration = decorationByHref[item.href] ?? "overview";
        const description =
          chapterDescriptions[item.title] ?? "Explore the foundation.";
        const isEven = index % 2 === 0;
        const chapterNum = String(index + 1).padStart(2, "0");

        return (
          <section
            key={item.href}
            id={`chapter-${index + 1}`}
            data-chapter={index}
            className={cn(
              "relative flex min-h-dvh items-center overflow-hidden scroll-mt-0",
              theme.surface,
            )}
          >
            <GrainOverlay
              intensity={theme.onBrand ? "medium" : "subtle"}
              variant={theme.onBrand ? "light" : "dark"}
              parallax
              parallaxRange={theme.onBrand ? 22 : 16}
            />
            <ParallaxWatermark
              speed={0.4 + (index % 3) * 0.1}
              className={cn(
                "-top-[12%] font-semibold leading-none select-none",
                isEven ? "-right-[4%] text-right" : "-left-[4%]",
                theme.onBrand
                  ? "text-[clamp(12rem,28vw,22rem)] text-white/[0.06]"
                  : "text-[clamp(12rem,28vw,22rem)] text-ink/[0.04]",
              )}
            >
              {chapterNum}
            </ParallaxWatermark>

            {!theme.onBrand && (
              <ParallaxWatermark
                speed={0.25}
                className={cn(
                  "top-[20%] inline-block h-20 w-32 -skew-x-12 rounded-lg",
                  isEven ? "right-[6%] bg-accent/20" : "left-[6%] bg-brand/10",
                )}
              >
                <span />
              </ParallaxWatermark>
            )}

            <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
              <ScrollChapterCopy reverse={!isEven}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: isEven ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <p
                    className={cn(
                      "font-mono text-sm font-semibold tracking-widest uppercase",
                      theme.onBrand ? "text-white/60" : "text-ink-muted",
                    )}
                  >
                    {chapterNum}
                  </p>
                  <h2
                    className={cn(
                      "mt-4 text-display",
                      theme.onBrand ? "text-white" : theme.accent,
                    )}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-4 max-w-md text-body-lg",
                      theme.onBrand ? "text-white/75" : "text-ink-secondary",
                    )}
                  >
                    {description}
                  </p>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonClasses({
                        size: "lg",
                        variant: theme.onBrand ? "secondary" : "primary",
                      }),
                      "mt-8 inline-flex",
                    )}
                  >
                    Read more
                  </Link>
                </motion.div>
              </ScrollChapterCopy>

              <ScrollChapterDecoration
                reverse={isEven}
                speed={1 + (index % 4) * 0.15}
                className="flex justify-center lg:justify-end"
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                  className={cn(
                    "relative flex size-48 items-center justify-center overflow-hidden rounded-2xl sm:size-56",
                    theme.onBrand
                      ? "bg-white/15"
                      : "bg-background ring-1 ring-border",
                  )}
                >
                  <GrainOverlay
                    intensity="subtle"
                    variant={theme.onBrand ? "light" : "dark"}
                    className="rounded-2xl"
                  />
                  <MenuDecoration
                    kind={decoration}
                    active
                    className={cn(
                      "size-28 sm:size-32",
                      !theme.onBrand && "bg-surface",
                    )}
                  />
                </motion.div>
              </ScrollChapterDecoration>
            </div>
          </section>
        );
      })}
    </div>
  );
}
