"use client";

import * as React from "react";
import Image from "next/image";
import { BrandLogo, LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type ShowcaseItem = {
  title: string;
  description?: string;
  label?: string;
  tone?: "blue" | "yellow" | "dark" | "light";
};

type ColorSpec = {
  name: string;
  value: string;
  description: string;
  pantone?: string;
};

type ResourceItem = {
  title: string;
  description: string;
  href?: string;
};

type AssetItem = {
  title: string;
  description?: string;
  src: string;
  alt?: string;
  tone?: "contain" | "cover";
};

function toneClass(tone: ShowcaseItem["tone"]) {
  if (tone === "yellow") return "bg-accent text-accent-ink";
  if (tone === "dark") return "bg-ink text-ink-inverse";
  if (tone === "light") return "bg-white text-[#09090B]";
  return "bg-brand-bg text-brand-ink";
}

export function PortalIntro({
  eyebrow,
  title,
  description,
  items = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  items?: ShowcaseItem[];
}) {
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-surface-raised shadow-sm">
      <div className="relative min-h-[360px] bg-[linear-gradient(180deg,#0036BD_0%,#00278A_100%)] p-7 text-white sm:p-10">
        <div className="relative flex min-h-[300px] flex-col justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-2xl text-display text-white">{title}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
              {description}
            </p>
          </div>
          {items.length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/16 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-xs leading-5 text-white/68">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FoundationCards({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-border bg-surface-raised p-5 shadow-xs"
        >
          {item.label && (
            <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
              {item.label}
            </p>
          )}
          <h3 className="text-title text-ink">{item.title}</h3>
          {item.description && (
            <p className="mt-2 text-sm leading-6 text-ink-muted">{item.description}</p>
          )}
        </article>
      ))}
    </div>
  );
}

export function LogoSystemShowcase() {
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-surface-raised shadow-sm">
      <div className="bg-[linear-gradient(180deg,#0036BD_0%,#00278A_100%)] p-6 text-white sm:p-8">
        <div className="flex min-h-64 flex-col justify-between gap-10 rounded-lg border border-white/12 bg-white/8 p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-white/68 uppercase">
              Preferred expression
            </span>
            <span className="rounded-full border border-white/18 px-3 py-1 text-xs text-white/70">
              Primary logo
            </span>
          </div>
          <div>
            <BrandLogo variant="primary" surface="dark" className="h-20 max-w-full" />
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/72">
              Use the full-color Primary logo on Noon Business Blue whenever
              practical. This is the clearest and most recognizable brand expression.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-3">
        <article className="bg-surface-raised p-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
            Limited space
          </p>
          <div className="mt-5 flex h-24 items-center justify-center rounded-lg bg-surface">
            <BrandLogo variant="compact" surface="light" className="h-14 max-w-[80%]" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-ink">Compact logo</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            App icons, social profiles, small placements and mobile-first layouts.
          </p>
        </article>

        <article className="bg-surface-raised p-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
            Single color
          </p>
          <div className="mt-5 flex h-24 items-center justify-center rounded-lg bg-white">
            <BrandLogo variant="mono-dark" surface="light" className="h-12 max-w-[84%]" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-ink">Monochrome dark</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            Light backgrounds, print limitations and single-color applications.
          </p>
        </article>

        <article className="bg-surface-raised p-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
            Dark surface
          </p>
          <div className="mt-5 flex h-24 items-center justify-center rounded-lg bg-ink">
            <BrandLogo variant="mono-light" surface="dark" className="h-12 max-w-[84%]" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-ink">Monochrome light</h3>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            Dark fields, constrained production and high-contrast placements.
          </p>
        </article>
      </div>
    </section>
  );
}

export function GuidelineAssetGrid({
  items,
  layout = "grid",
}: {
  items: AssetItem[];
  layout?: "grid" | "stack";
}) {
  const [selectedAsset, setSelectedAsset] = React.useState<AssetItem | null>(null);
  const isSingleAsset = items.length === 1;
  const isStacked = layout === "stack";

  React.useEffect(() => {
    if (!selectedAsset) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedAsset(null);
    };

    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedAsset]);

  return (
    <>
      <div
        className={cn(
          "not-prose grid gap-4",
          !isSingleAsset && !isStacked && "sm:grid-cols-2",
        )}
      >
        {items.map((item) => (
          <figure
            key={item.src}
            className="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs"
          >
            <button
              type="button"
              onClick={() => setSelectedAsset(item)}
              className={cn(
                "group relative block w-full cursor-zoom-in bg-surface",
                isSingleAsset || isStacked ? "aspect-[16/8]" : "aspect-[16/10]",
              )}
              aria-label={`Enlarge ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt ?? item.title}
                fill
                sizes={
                  isSingleAsset || isStacked
                    ? "(min-width: 1024px) 720px, 100vw"
                    : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                }
                className={cn(
                  "p-3 transition-transform duration-300 group-hover:scale-[1.015]",
                  item.tone === "cover" ? "object-cover p-0" : "object-contain",
                )}
              />
              <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-ink-inverse opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                Click to enlarge
              </span>
            </button>
            <figcaption className="border-t border-border p-4">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-xs leading-5 text-ink-muted">{item.description}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {selectedAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedAsset.title}
          className="fixed inset-0 z-50 bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAsset(null)}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-3">
            <div className="flex items-center justify-between gap-4 text-white">
              <p className="text-sm font-semibold">{selectedAsset.title}</p>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <button
              type="button"
              className="relative min-h-0 flex-1 cursor-zoom-out overflow-hidden rounded-xl bg-white/8"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedAsset(null);
              }}
              aria-label={`Close enlarged ${selectedAsset.title}`}
            >
              <Image
                src={selectedAsset.src}
                alt={selectedAsset.alt ?? selectedAsset.title}
                fill
                sizes="100vw"
                className={cn(
                  selectedAsset.tone === "cover" ? "object-contain" : "object-contain p-4",
                )}
                priority
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ColorSpecGrid({ colors }: { colors: ColorSpec[] }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {colors.map((color) => (
        <article
          key={color.name}
          className="overflow-hidden rounded-lg border border-border bg-surface-raised"
        >
          <div
            className="h-28 border-b border-border"
            style={{ background: color.value }}
            aria-label={`${color.name} swatch`}
          />
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">{color.name}</h3>
              <code className="rounded-xs bg-surface-sunken px-2 py-1 text-xs text-ink-secondary">
                {color.value}
              </code>
            </div>
            {color.pantone && (
              <p className="mt-1 text-xs font-medium text-ink-muted">{color.pantone}</p>
            )}
            <p className="mt-3 text-sm leading-6 text-ink-muted">{color.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SignatureGradientShowcase() {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border bg-surface-raised">
      <div className="min-h-[340px] bg-[linear-gradient(180deg,#0036BD_0%,#00278A_100%)] p-8 text-white sm:p-10">
        <div className="flex h-full min-h-[260px] flex-col justify-between">
          <div className="flex items-center justify-between">
            <LogoMark size={42} />
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/72">
              Signature Gradient
            </span>
          </div>
          <div>
            <p className="max-w-lg text-display text-white">
              Built for business scale.
            </p>
            <code className="mt-6 block max-w-md rounded-lg bg-white/10 p-4 text-xs leading-6 text-white/78">
              linear-gradient(180deg, #0036BD 0%, #00278A 100%)
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="not-prose rounded-xl border border-border bg-surface-raised p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
        noontree type system
      </p>
      <div className="mt-6 space-y-5">
        <div>
          <p className="text-[44px] leading-[48px] tracking-[-0.8px] text-ink font-extrabold">
            Business moves faster here.
          </p>
          <p className="mt-2 text-xs text-ink-muted">Title1 / 44 · 48 · -0.8</p>
        </div>
        <div>
          <p className="text-[28px] leading-[32px] tracking-[-0.56px] text-ink font-bold">
            Manage orders, payouts and growth.
          </p>
          <p className="mt-2 text-xs text-ink-muted">H1 / 28 · 32 · -0.56</p>
        </div>
        <div>
          <p className="text-[16px] leading-[20px] tracking-[-0.16px] text-ink font-semibold">
            Create shipment
          </p>
          <p className="mt-2 text-xs text-ink-muted">Label2 / 16 · 20 · -0.16</p>
        </div>
        <div>
          <p className="max-w-xl text-[16px] leading-[20px] tracking-[0px] text-ink-secondary">
            Body copy is practical, compact and readable. It explains the next action
            without turning the interface into a manual.
          </p>
          <p className="mt-2 text-xs text-ink-muted">Body1 / 16 · 20 · 0</p>
        </div>
      </div>
    </div>
  );
}

export function ProductUiShowcase() {
  return (
    <div className="not-prose rounded-xl border border-border bg-surface p-4">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg bg-brand-bg p-5 text-white">
          <p className="text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
            Mobile App
          </p>
          <div className="mt-8 rounded-[2rem] bg-white p-3 text-[#09090B] shadow-lg">
            <div className="rounded-[1.5rem] border border-[#E6E8EC] p-4">
              <p className="text-sm font-semibold">Today&apos;s orders</p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">128</p>
              <button className="mt-5 w-full rounded-full bg-[#0928FF] px-4 py-3 text-sm font-semibold text-white">
                Create shipment
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface-raised p-5">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm font-semibold text-ink">Web Portal</p>
              <p className="text-xs text-ink-muted">Orders table, focused actions</p>
            </div>
            <button className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-ink">
              Export
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {["Awaiting pickup", "In transit", "Delivered"].map((status, index) => (
              <div
                key={status}
                className="grid grid-cols-[1fr_auto] items-center rounded-md border border-border bg-background px-4 py-3"
              >
                <span className="text-sm font-medium text-ink">Order #{2400 + index}</span>
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs text-brand">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApplicationGallery({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.title}
          className={cn(
            "flex min-h-48 flex-col justify-between rounded-xl p-5",
            toneClass(item.tone ?? (index % 3 === 0 ? "blue" : index % 3 === 1 ? "light" : "dark")),
          )}
        >
          <div className="flex items-center justify-between">
            <LogoMark size={28} />
            {item.label && <span className="text-xs font-medium opacity-70">{item.label}</span>}
          </div>
          <div>
            <h3 className="text-title">{item.title}</h3>
            {item.description && (
              <p className="mt-2 text-sm leading-6 opacity-72">{item.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ResourceCards({ items }: { items: ResourceItem[] }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const content = (
          <article className="h-full rounded-lg border border-border bg-surface-raised p-5 transition-colors hover:border-border-strong">
            <h3 className="text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{item.description}</p>
          </article>
        );

        if (!item.href) return <React.Fragment key={item.title}>{content}</React.Fragment>;
        return (
          <a key={item.title} href={item.href} className="block no-underline">
            {content}
          </a>
        );
      })}
    </div>
  );
}

export function DraftNotice({ title }: { title: string }) {
  return (
    <div className="not-prose rounded-xl border border-dashed border-border-strong bg-surface p-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
        Draft / Hidden
      </p>
      <h2 className="mt-3 text-title text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        This route exists so the foundation portal can scale without restructuring.
        It is intentionally excluded from navigation, search and sitemap until content
        is approved.
      </p>
    </div>
  );
}

export function ComingSoonNotice({ title }: { title: string }) {
  return (
    <div className="not-prose rounded-xl border border-dashed border-border-strong bg-surface p-8">
      <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
        Coming soon
      </p>
      <h2 className="mt-3 text-title text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        This section is intentionally hidden until the content and examples are
        finalized. The tab remains visible so the foundation structure is clear.
      </p>
    </div>
  );
}
