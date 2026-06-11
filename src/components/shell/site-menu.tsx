"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { navigation } from "@/lib/navigation";
import { decorationByHref } from "@/lib/menu-decorations";
import type { DocStatus } from "@/lib/content";
import { MenuDecoration } from "@/components/shell/menu-decorations";
import { Kbd } from "@/components/ui/kbd";
import { openSearch } from "@/components/layout/search-button";
import { PLATFORM_VERSION } from "@/lib/platform";
import { GrainBackdrop } from "@/components/shell/grain-overlay";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteMenu({
  open,
  onClose,
  pageStatuses,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  pageStatuses: Record<string, DocStatus>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable?.length) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", trapFocus);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col bg-brand-strong text-white"
        >
          <GrainBackdrop intensity="strong" variant="light" />
          <div className="relative flex items-center justify-between px-4 py-5 sm:px-8">
            <p className="text-sm font-semibold tracking-[0.12em] text-white/70 uppercase">
              Brand Guidelines
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              Close
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
              {navigation.map((section, sectionIndex) => (
                <section key={section.href}>
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + sectionIndex * 0.08, ease: EASE }}
                    className="text-display text-white"
                  >
                    {section.title}
                  </motion.h2>
                  <p className="mt-2 text-body-lg text-white/60">{section.description}</p>
                  <ul className="mt-8 flex flex-col gap-1">
                    {section.groups
                      .flatMap((group) => group.items)
                      .map((item, i) => {
                        const active =
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/");
                        const decoration = decorationByHref[item.href] ?? "overview";
                        const isHovered = hoveredHref === item.href;

                        return (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + sectionIndex * 0.08 + i * 0.04,
                              ease: EASE,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={onClose}
                              onMouseEnter={() => setHoveredHref(item.href)}
                              onMouseLeave={() => setHoveredHref(null)}
                              onFocus={() => setHoveredHref(item.href)}
                              onBlur={() => setHoveredHref(null)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "group flex items-center gap-4 rounded-lg px-2 py-3 transition-colors",
                                active ? "bg-white/15" : "hover:bg-white/10",
                              )}
                            >
                              <MenuDecoration
                                kind={decoration}
                                active={isHovered || active}
                              />
                              <span className="flex flex-1 flex-col gap-0.5">
                                <span className="text-lg font-semibold text-white sm:text-xl">
                                  {item.title}
                                </span>
                                {pageStatuses[item.href] === "work-in-progress" && (
                                  <span className="text-xs text-white/50">In progress</span>
                                )}
                              </span>
                              <span
                                aria-hidden
                                className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white"
                              >
                                →
                              </span>
                            </Link>
                          </motion.li>
                        );
                      })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <div className="relative border-t border-white/15 px-4 py-4 sm:px-8">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <span
                  aria-hidden
                  className="inline-block h-3 w-5 -skew-x-12 rounded-[2px] bg-accent"
                />
                v{PLATFORM_VERSION}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openSearch();
                  }}
                  className="flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  Search
                  <span className="flex items-center gap-0.5">
                    <Kbd className="border-white/20 bg-white/10 text-white">⌘</Kbd>
                    <Kbd className="border-white/20 bg-white/10 text-white">K</Kbd>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
