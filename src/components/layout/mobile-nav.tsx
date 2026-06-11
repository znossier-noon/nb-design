"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import type { DocStatus } from "@/lib/content";
import { StatusBadge, StatusDot, STATUS_LABEL } from "@/components/docs/status-badge";
import { cn } from "@/lib/utils";

export function MobileNav({
  pageStatuses,
}: {
  pageStatuses: Record<string, DocStatus>;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex size-8 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
      >
        {open ? (
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M1.5 4h13M1.5 8h13M1.5 12h13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-x-0 top-[3.75rem] bottom-0 z-40 overflow-y-auto bg-background lg:hidden">
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <ul className="flex flex-col gap-8 pb-16">
                {navigation.map((section) => {
                  const sectionStatus = pageStatuses[section.href];
                  return (
                    <li key={section.href}>
                      <div className="flex items-center gap-2">
                        <Link
                          href={section.href}
                          className="text-base font-semibold text-ink"
                        >
                          {section.title}
                        </Link>
                        {sectionStatus && sectionStatus !== "done" && (
                          <StatusDot status={sectionStatus} />
                        )}
                      </div>
                      <ul className="mt-3 flex flex-col border-l border-border">
                        {section.groups
                          .flatMap((group) => group.items)
                          .filter((item) => item.href !== section.href)
                          .map((item) => {
                            const status = pageStatuses[item.href];
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  aria-current={pathname === item.href ? "page" : undefined}
                                  aria-label={
                                    status ? `${item.title}, ${STATUS_LABEL[status]}` : undefined
                                  }
                                  className={cn(
                                    "-ml-px flex items-center justify-between gap-2 border-l py-1.5 pr-2 pl-4 text-sm transition-colors",
                                    pathname === item.href
                                      ? "border-brand font-medium text-brand"
                                      : "border-transparent text-ink-muted hover:border-border-strong hover:text-ink",
                                  )}
                                >
                                  <span>{item.title}</span>
                                  {status === "planned" ? (
                                    <StatusBadge status={status} compact className="text-[10px]" />
                                  ) : status && status !== "done" ? (
                                    <StatusDot status={status} />
                                  ) : null}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
