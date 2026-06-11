"use client";

import * as React from "react";
import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/brand/logo";
import { SearchButton } from "@/components/layout/search-button";
import { SiteMenu } from "@/components/shell/site-menu";
import type { DocStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteNav({
  variant = "docs",
  pageStatuses,
}: {
  variant?: "immersive" | "docs";
  pageStatuses: Record<string, DocStatus>;
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const menuTriggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (variant !== "immersive") return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const immersiveOverHero = variant === "immersive" && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
          immersiveOverHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-background/90 backdrop-blur-lg",
          menuOpen && "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2.5 rounded-sm",
              immersiveOverHero && "text-white",
            )}
            aria-label="Noon Business Design home"
          >
            <LogoMark size={26} />
            <Wordmark
              className={cn(
                "text-[15px]",
                immersiveOverHero && "[&_span]:text-white [&_.text-brand]:text-accent",
              )}
            />
          </Link>

          <p
            className={cn(
              "hidden text-xs font-semibold tracking-[0.14em] uppercase sm:block",
              immersiveOverHero ? "text-white/70" : "text-ink-muted",
            )}
          >
            Brand Guidelines
          </p>

          <div className="ml-auto flex items-center gap-1.5">
            <SearchButton inverse={immersiveOverHero} />
            <SearchButton compact inverse={immersiveOverHero} />
            <button
              ref={menuTriggerRef}
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                immersiveOverHero
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-surface text-ink hover:bg-surface-sunken",
              )}
            >
              Menu
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M2 5h12M2 8h12M2 11h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <SiteMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pageStatuses={pageStatuses}
        triggerRef={menuTriggerRef}
      />

      {/* Spacer for fixed header on docs pages */}
      {variant === "docs" && <div className="h-[3.75rem]" aria-hidden />}
    </>
  );
}
