import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/reveal";
import { StatusBadge } from "@/components/docs/status-badge";
import { navigation } from "@/lib/navigation";
import { buildPageStatusMap } from "@/lib/content";
import type { DocStatus } from "@/lib/content";

const foundations = navigation[0].groups[0].items.filter(
  (item) => item.title !== "Overview",
);

const resources = navigation[1].groups[0].items.filter(
  (item) => item.title !== "Overview",
);

const swatches: Record<string, string> = {
  "Design principles": "bg-brand-soft text-brand",
  "Brand identity": "bg-brand text-white",
  Logo: "bg-accent text-accent-ink",
  Color: "bg-linear-to-br from-brand to-brand-bg text-white",
  Typography: "bg-surface text-ink",
  Iconography: "bg-surface-sunken text-ink-secondary",
  Motion: "bg-brand-soft text-brand",
  "Content guidelines": "bg-surface text-ink-muted",
};

function SectionHeader({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: DocStatus;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-display text-ink">{title}</h2>
          <StatusBadge status={status} />
        </div>
        <p className="mt-4 max-w-xl text-body-lg text-ink-secondary">{description}</p>
      </div>
    </div>
  );
}

export function HomeSections() {
  const pageStatuses = buildPageStatusMap();

  return (
    <>
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              title="Foundations"
              description="Principles, tokens and brand rules."
              status={pageStatuses["/foundations"] ?? "done"}
            />
          </FadeIn>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {foundations.map((item, index) => (
              <StaggerItem key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-sm"
                >
                  <div
                    className={`flex h-20 items-end p-4 text-xs font-semibold uppercase tracking-wide ${swatches[item.title] ?? "bg-surface text-ink-muted"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex flex-1 items-center justify-between px-4 py-3.5">
                    <span className="text-[15px] font-semibold text-ink">
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              title="Resources"
              description="Figma libraries, assets, downloads and engineering setup."
              status={pageStatuses["/resources"] ?? "work-in-progress"}
            />
          </FadeIn>
          <FadeIn delay={0.08} className="mt-10 divide-y divide-border rounded-lg border border-border">
            {resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface/60"
              >
                <span className="text-[15px] font-semibold text-ink">{item.title}</span>
                <span className="flex items-center gap-3">
                  {pageStatuses[item.href] && (
                    <StatusBadge
                      status={pageStatuses[item.href]}
                      compact
                      className="hidden text-[10px] sm:inline-flex"
                    />
                  )}
                  <span
                    aria-hidden
                    className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
