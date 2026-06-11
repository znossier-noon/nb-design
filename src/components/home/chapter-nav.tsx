"use client";

import * as React from "react";
import { navigation } from "@/lib/navigation";
import { GrainOverlay } from "@/components/shell/grain-overlay";
import { cn } from "@/lib/utils";

const chapterCount =
  navigation[0].groups[0].items.filter((item) => item.title !== "Overview")
    .length + 1;

export function ChapterNav() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-chapter]",
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const chapter = visible[0].target.getAttribute("data-chapter");
        if (chapter === "resources") {
          setActive(chapterCount - 1);
        } else if (chapter != null) {
          setActive(Number(chapter));
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (index: number) => {
    if (index === chapterCount - 1) {
      document.getElementById("resources-cta")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    document.getElementById(`chapter-${index + 1}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: right edge dots */}
      <nav
        aria-label="Chapter navigation"
        className="fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {Array.from({ length: chapterCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to chapter ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => scrollToChapter(i)}
            className={cn(
              "size-2.5 cursor-pointer rounded-full transition-all",
              active === i
                ? "scale-125 bg-brand"
                : "bg-ink-faint/40 hover:bg-ink-muted",
            )}
          />
        ))}
      </nav>

      {/* Mobile: bottom pill */}
      <nav
        aria-label="Chapter navigation"
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 overflow-hidden rounded-md border border-border bg-background/90 px-3 py-2 backdrop-blur-lg lg:hidden"
      >
        <GrainOverlay intensity="subtle" variant="dark" className="rounded-full" />
        {Array.from({ length: chapterCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to chapter ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => scrollToChapter(i)}
            className={cn(
              "relative z-10 size-2 cursor-pointer rounded-full transition-all",
              active === i ? "bg-brand" : "bg-ink-faint/50",
            )}
          />
        ))}
      </nav>
    </>
  );
}
