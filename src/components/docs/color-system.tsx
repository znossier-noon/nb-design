"use client";

import { colorGroups } from "@/lib/tokens";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

const FIGMA_COLLECTIONS = [
  {
    collection: "Brand",
    variables: "brand, brand-strong, brand-soft, accent, brand-gradient",
  },
  { collection: "Surface", variables: "background, surface, surface-raised, surface-sunken" },
  {
    collection: "Ink",
    variables: "ink, ink-secondary, ink-muted, ink-faint, ink-inverse",
  },
  { collection: "Border", variables: "border, border-strong" },
  {
    collection: "Semantic",
    variables: "success, success-soft, warning, warning-soft, danger, danger-soft",
  },
];

export function ColorSystem() {
  const { copied, copy } = useCopy();
  const allTokens = colorGroups.flatMap((g) => g.tokens);

  return (
    <div className="my-6 flex flex-col gap-6">
      <div className="overflow-hidden rounded-md border border-border">
        <div className="border-b border-border bg-surface/60 px-4 py-3">
          <p className="text-sm font-semibold text-ink">Figma variable collections</p>
          <p className="mt-1 text-xs text-ink-muted">
            Mirror these in NB Foundations. One variable per token, same names as CSS.
          </p>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-left">
              <th className="text-overline px-4 py-2.5">
                Collection
              </th>
              <th className="text-overline px-4 py-2.5">
                Variables
              </th>
            </tr>
          </thead>
          <tbody>
            {FIGMA_COLLECTIONS.map((row) => (
              <tr key={row.collection} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{row.collection}</td>
                <td className="px-4 py-3 text-ink-secondary">{row.variables}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-3">
          <p className="text-sm font-semibold text-ink">Full token list</p>
          <button
            type="button"
            onClick={() =>
              copy(
                allTokens
                  .map((t) => `${t.variable}\t${t.gradient ?? t.hex}`)
                  .join("\n"),
                "all-tokens",
              )
            }
            className={cn(
              "cursor-pointer rounded-[6px] border border-border px-2.5 py-1 text-[11px] font-medium transition-colors",
              copied === "all-tokens"
                ? "text-success"
                : "text-ink-muted hover:text-ink",
            )}
          >
            {copied === "all-tokens" ? "Copied!" : "Copy all"}
          </button>
        </div>
        {colorGroups.map((group) => (
          <div key={group.title} className="border-b border-border last:border-0">
            <p className="text-overline bg-surface/30 px-4 py-2">
              {group.title}
            </p>
            <div className="divide-y divide-border">
              {group.tokens.map((token) => (
                <div
                  key={token.variable}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span
                    className="size-8 shrink-0 rounded-md border border-border"
                    style={{
                      background: token.gradient ?? token.hex,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{token.name}</p>
                    <p className="truncate text-xs text-ink-muted">{token.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(token.variable, token.variable)}
                    className="shrink-0 cursor-pointer font-mono text-[11px] text-brand hover:underline"
                  >
                    {copied === token.variable ? "Copied!" : token.variable}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(token.gradient ?? token.hex, `${token.variable}-hex`)}
                    className="hidden shrink-0 cursor-pointer font-mono text-[11px] text-ink-muted hover:text-ink sm:block"
                  >
                    {copied === `${token.variable}-hex`
                      ? "Copied!"
                      : token.gradient
                        ? "gradient"
                        : token.hex.toLowerCase()}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
