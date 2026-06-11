import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/docs/status-badge";
import type { DocFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function DocPageHeader({ frontmatter }: { frontmatter: DocFrontmatter }) {
  return (
    <header className="border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-headline text-ink">{frontmatter.title}</h1>
        {frontmatter.status && frontmatter.status !== "done" && (
          <StatusBadge status={frontmatter.status} />
        )}
        {frontmatter.version && (
          <Badge variant="neutral">
            <span className="font-mono">v{frontmatter.version}</span>
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
              className="font-medium text-ink-secondary hover:text-brand"
            >
              Figma ↗
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
