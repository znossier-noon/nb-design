import Link from "next/link";
import type { NavLeaf } from "@/lib/navigation";

export function Breadcrumbs({ crumbs }: { crumbs: NavLeaf[] }) {
  if (crumbs.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        <li>
          <Link href="/" className="text-ink-faint transition-colors hover:text-ink">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.href}-${index}`} className="flex items-center gap-1.5">
              <span aria-hidden className="text-ink-faint/60">
                /
              </span>
              {last ? (
                <span aria-current="page" className="font-medium text-ink-muted">
                  {crumb.title}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-ink-faint transition-colors hover:text-ink"
                >
                  {crumb.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
