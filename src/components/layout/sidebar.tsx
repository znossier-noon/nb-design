"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findSection } from "@/lib/navigation";
import type { DocStatus } from "@/lib/content";
import { cn } from "@/lib/utils";
import { StatusBadge, StatusDot, STATUS_LABEL } from "@/components/docs/status-badge";

export function Sidebar({
  pageStatuses,
}: {
  pageStatuses: Record<string, DocStatus>;
}) {
  const pathname = usePathname();
  const section = findSection(pathname);
  if (!section) return null;

  const sectionStatus = pageStatuses[section.href];

  return (
    <aside className="sticky top-[3.75rem] hidden h-[calc(100dvh-3.75rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-8 pr-6 lg:block">
      <nav aria-label={`${section.title} navigation`}>
        <div className="mb-6 px-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-ink">{section.title}</p>
            {sectionStatus && (
              <StatusBadge status={sectionStatus} compact className="text-[10px]" />
            )}
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-faint">
            {section.description}
          </p>
        </div>
        <div className="flex flex-col gap-7">
          {section.groups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                {group.title}
              </h3>
              <ul className="mt-2 flex flex-col gap-px">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const status = pageStatuses[item.href];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-label={
                          status && item.title !== "Overview"
                            ? `${item.title}, ${STATUS_LABEL[status]}`
                            : undefined
                        }
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-[7px] px-3 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-brand-soft font-medium text-brand"
                            : "text-ink-muted hover:bg-surface hover:text-ink",
                        )}
                      >
                        <span>{item.title}</span>
                        {status && item.title !== "Overview" && (
                          <StatusDot status={status} />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
