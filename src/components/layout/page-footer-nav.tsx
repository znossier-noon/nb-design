import Link from "next/link";
import type { NavLeaf } from "@/lib/navigation";

export function PageFooterNav({
  prev,
  next,
}: {
  prev?: NavLeaf & { section?: string };
  next?: NavLeaf & { section?: string };
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-md border border-border p-4 transition-colors hover:border-border-strong"
        >
          <span className="text-xs text-ink-faint">← Previous</span>
          <span className="text-sm font-medium text-ink transition-colors group-hover:text-brand">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next && (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-md border border-border p-4 text-right transition-colors hover:border-border-strong"
        >
          <span className="text-xs text-ink-faint">Next →</span>
          <span className="text-sm font-medium text-ink transition-colors group-hover:text-brand">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
