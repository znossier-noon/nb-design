import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/docs/status-badge";
import type { DocFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";

function FigmaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 18" fill="none" aria-hidden>
      <path d="M3 0h3v6H3a3 3 0 1 1 0-6Z" fill="#F24E1E" />
      <path d="M6 0h3a3 3 0 1 1 0 6H6V0Z" fill="#FF7262" />
      <path d="M9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" fill="#1ABCFE" />
      <path d="M3 6h3v6H3a3 3 0 1 1 0-6Z" fill="#A259FF" />
      <path d="M3 12h3v3a3 3 0 1 1-3-3Z" fill="#0ACF83" />
    </svg>
  );
}

export function DocPageHeader({ frontmatter }: { frontmatter: DocFrontmatter }) {
  return (
    <header className="border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-headline text-ink">{frontmatter.title}</h1>
        {frontmatter.status && <StatusBadge status={frontmatter.status} />}
        {frontmatter.version && (
          <Badge variant="neutral" mono className="font-medium">
            v{frontmatter.version}
          </Badge>
        )}
      </div>
      <p className="mt-3 max-w-2xl text-body-lg text-ink-muted">
        {frontmatter.description}
      </p>
      {(frontmatter.updated || frontmatter.figma || frontmatter.source) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-muted">
          {frontmatter.updated && (
            <span>Updated {formatDate(frontmatter.updated)}</span>
          )}
          {frontmatter.figma && (
            <a
              href={frontmatter.figma}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink-secondary hover:text-brand"
            >
              <FigmaIcon />
              Open in Figma
            </a>
          )}
          {frontmatter.source && (
            <a
              href={frontmatter.source}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink-secondary hover:text-brand"
            >
              Source ↗
            </a>
          )}
        </div>
      )}
    </header>
  );
}
