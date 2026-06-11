"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNav } from "@/lib/navigation";
import type { DocStatus } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchButton } from "@/components/layout/search-button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header({
  pageStatuses,
}: {
  pageStatuses: Record<string, DocStatus>;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label="Noon Business Design home"
        >
          <BrandLogo variant="mono-dark" priority className="h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {headerNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-surface text-ink"
                        : "text-ink-muted hover:bg-surface hover:text-ink",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <SearchButton />
          <SearchButton compact />
          <ThemeToggle />
          <MobileNav pageStatuses={pageStatuses} />
        </div>
      </div>
    </header>
  );
}
