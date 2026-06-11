import Link from "next/link";

export type RelatedLink = {
  title: string;
  href: string;
  description?: string;
};

export function RelatedResources({ links }: { links: RelatedLink[] }) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group flex flex-col gap-1 rounded-md border border-border p-4 no-underline transition-all hover:border-border-strong hover:shadow-xs"
        >
          <span className="flex items-center justify-between gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand">
            {link.title}
            <span
              aria-hidden
              className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand"
            >
              →
            </span>
          </span>
          {link.description && (
            <span className="text-[13px] leading-relaxed text-ink-muted">
              {link.description}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
