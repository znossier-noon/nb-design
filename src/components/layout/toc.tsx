"use client";

import * as React from "react";
import type { TocHeading } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[3.75rem] hidden h-[calc(100dvh-3.75rem)] w-56 shrink-0 overflow-y-auto py-8 pl-6 xl:block"
    >
      <h2 className="text-overline">
        On this page
      </h2>
      <ul className="mt-3 flex flex-col gap-px border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l py-1 text-[13px] leading-snug transition-colors",
                heading.depth === 3 ? "pl-7" : "pl-4",
                activeId === heading.id
                  ? "border-brand font-medium text-brand"
                  : "border-transparent text-ink-muted hover:border-border-strong hover:text-ink",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
