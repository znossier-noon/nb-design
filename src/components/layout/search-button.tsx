"use client";

import { Kbd } from "@/components/ui/kbd";

export const OPEN_SEARCH_EVENT = "nbd:open-search";

export function openSearch() {
  document.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
}

export function SearchButton({
  compact,
  inverse,
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  if (compact) {
    return (
      <button
        type="button"
        aria-label="Search documentation"
        onClick={openSearch}
        className={
          inverse
            ? "flex size-8 cursor-pointer items-center justify-center rounded-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            : "flex size-8 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink md:hidden"
        }
      >
        <SearchIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className={
        inverse
          ? "hidden h-8 w-56 cursor-pointer items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-2.5 text-[13px] text-white/70 transition-colors hover:border-white/30 hover:bg-white/15 md:flex"
          : "hidden h-8 w-56 cursor-pointer items-center gap-2 rounded-sm border border-border bg-surface/60 px-2.5 text-[13px] text-ink-faint transition-colors hover:border-border-strong hover:bg-surface md:flex"
      }
    >
      <SearchIcon />
      <span className="flex-1 text-left">Search foundations…</span>
      <span className="flex items-center gap-0.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
