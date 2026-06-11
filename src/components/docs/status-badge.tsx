import type { DocStatus } from "@/lib/content";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const STATUS_LABEL: Record<DocStatus, string> = {
  done: "Done",
  "work-in-progress": "WIP",
  planned: "Planned",
};

export const STATUS_VARIANT: Record<DocStatus, BadgeVariant> = {
  done: "success",
  "work-in-progress": "warning",
  planned: "neutral",
};

export function StatusDot({ status }: { status: DocStatus }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        status === "done" && "bg-success",
        status === "work-in-progress" && "bg-warning",
        status === "planned" && "bg-ink-faint",
      )}
    />
  );
}

/** Doc-platform status: sentence case, mono, color + dot. */
export function StatusBadge({
  status,
  className,
}: {
  status: DocStatus;
  className?: string;
}) {
  return (
    <Badge
      variant={STATUS_VARIANT[status]}
      dot
      mono
      className={cn("font-semibold", className)}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
