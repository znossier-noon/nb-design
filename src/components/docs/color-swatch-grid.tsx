"use client";

import { colorGroups, type ColorToken } from "@/lib/tokens";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

function SwatchCard({ token }: { token: ColorToken }) {
  const { copied, copy } = useCopy();
  const swatchBg = token.gradient ?? `var(${token.variable})`;
  const isGradient = Boolean(token.gradient);

  return (
    <div className="group overflow-hidden rounded-[5px] border border-border bg-surface-raised transition-colors duration-200 hover:border-border-strong">
      <button
        type="button"
        onClick={() => copy(isGradient ? token.gradient! : `var(${token.variable})`, "swatch")}
        aria-label={`Copy ${isGradient ? token.variable : `var(${token.variable})`}`}
        className="relative block h-24 w-full cursor-pointer"
        style={{ background: swatchBg }}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
            copied === "swatch" ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <span className="rounded-md bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {copied === "swatch"
              ? "Copied!"
              : isGradient
                ? token.variable
                : `var(${token.variable})`}
          </span>
        </span>
      </button>
      <div className="flex flex-col gap-1 border-t border-border p-3">
        <span className="text-[13px] font-semibold text-ink">{token.name}</span>
        {isGradient ? (
          <span className="font-mono text-[11px] text-ink-muted">{token.variable}</span>
        ) : (
          <button
            type="button"
            onClick={() => copy(token.hex, token.hex)}
            className={cn(
              "-mx-1.5 w-fit cursor-pointer rounded-full px-1.5 py-0.5 font-mono text-[11px] transition-colors",
              copied === token.hex
                ? "bg-success-soft text-success"
                : "text-ink-muted hover:bg-surface hover:text-ink",
            )}
          >
            {copied === token.hex ? "Copied!" : token.hex.toLowerCase()}
          </button>
        )}
        <p className="text-xs leading-relaxed text-ink-muted">{token.description}</p>
      </div>
    </div>
  );
}

export function ColorSwatchGrid({ group }: { group?: string }) {
  const groups = group
    ? colorGroups.filter((g) => g.title.toLowerCase() === group.toLowerCase())
    : colorGroups;

  return (
    <div className="my-6 flex flex-col gap-10">
      <p className="-mb-6 text-[13px] text-ink-muted">
        Click a swatch to copy its CSS variable, or click the hex to copy the
        value. Single palette, the Figma reference.
      </p>
      {groups.map((colorGroup) => (
        <section key={colorGroup.title}>
          <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">
            {colorGroup.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">
            {colorGroup.description}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {colorGroup.tokens.map((token) => (
              <SwatchCard key={token.variable} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
