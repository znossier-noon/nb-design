"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import type { SearchItem } from "@/lib/search";
import { OPEN_SEARCH_EVENT } from "@/components/layout/search-button";
import { Kbd } from "@/components/ui/kbd";
import { StatusBadge } from "@/components/docs/status-badge";

// Substring matching with title > section > keyword weighting is far more
// precise for docs search than cmdk's scattered-letter fuzzy scorer.
function score(item: SearchItem, query: string): number {
  const title = item.title.toLowerCase();
  const section = item.section.toLowerCase();
  if (title.startsWith(query)) return 4;
  if (title.includes(query)) return 3;
  if (section.includes(query)) return 2;
  const kw = `${item.description ?? ""} ${item.keywords ?? ""}`.toLowerCase();
  const words = query.split(/\s+/);
  if (words.every((word) => title.includes(word) || kw.includes(word))) return 1;
  return 0;
}

export function CommandPalette({ index }: { index: SearchItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  // Filtering, ranking and grouping are handled here (shouldFilter is off):
  // sections are ordered by their best-scoring item, items by score.
  const sections = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    const scored = q
      ? index
          .map((item) => ({ item, score: score(item, q) }))
          .filter((entry) => entry.score > 0)
      : index.map((item) => ({ item, score: 0 }));

    const grouped = new Map<
      string,
      { best: number; items: { item: SearchItem; score: number }[] }
    >();
    for (const entry of scored) {
      const group = grouped.get(entry.item.section) ?? { best: 0, items: [] };
      group.items.push(entry);
      group.best = Math.max(group.best, entry.score);
      grouped.set(entry.item.section, group);
    }
    return Array.from(grouped.entries())
      .sort((a, b) => b[1].best - a[1].best)
      .map(
        ([section, group]) =>
          [
            section,
            group.items
              .sort((a, b) => b.score - a.score)
              .map((entry) => entry.item),
          ] as const,
      );
  }, [index, query]);

  // Lock page scroll while the palette is open.
  React.useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const navigate = (href: string) => {
    close();
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      className="fixed inset-0 z-50"
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] dark:bg-black/60"
        onClick={close}
        aria-hidden
      />
      <Command
        shouldFilter={false}
        className="fixed inset-x-4 top-[12vh] mx-auto max-w-xl overflow-hidden rounded-lg border border-border bg-surface-raised shadow-lg animate-fade-up [animation-duration:200ms]"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="shrink-0 text-ink-faint"
          >
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search foundations and resources…"
            className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <Kbd>esc</Kbd>
        </div>
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          {sections.length === 0 && (
            <div className="px-3 py-10 text-center text-sm text-ink-muted">
              No results found.
            </div>
          )}
          {sections.map(([section, items]) => (
            <Command.Group
              key={section}
              heading={section}
              className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-ink-faint [&_[cmdk-group-heading]]:uppercase"
            >
              {items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.href}
                  onSelect={() => navigate(item.href)}
                  className="flex cursor-pointer items-start justify-between gap-3 rounded-[7px] px-3 py-2 data-[selected=true]:bg-brand-soft"
                >
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-ink">{item.title}</span>
                    {item.description && (
                      <span className="line-clamp-1 text-xs text-ink-muted">
                        {item.description}
                      </span>
                    )}
                  </div>
                  {item.status && (
                    <StatusBadge status={item.status} compact className="shrink-0 text-[10px]" />
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
        <div className="flex items-center gap-4 border-t border-border bg-surface/50 px-4 py-2.5 text-[11px] text-ink-faint">
          <span className="flex items-center gap-1">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <Kbd>↵</Kbd> open
          </span>
        </div>
      </Command>
    </div>
  );
}
