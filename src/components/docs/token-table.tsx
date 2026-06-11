"use client";

import {
  radiusScale,
  spacingScale,
  motionTokens,
  type ScaleToken,
} from "@/lib/tokens";
import { useCopy } from "@/lib/use-copy";
import {
  NO_SQUIRCLE_CLASS,
  SQUIRCLE_CLASS,
  squircleRadiusStyle,
} from "@/lib/squircle";
import { cn } from "@/lib/utils";

const sources: Record<string, ScaleToken[]> = {
  radius: radiusScale,
  spacing: spacingScale,
  motion: motionTokens,
};

export function TokenTable({ scale }: { scale: keyof typeof sources }) {
  const tokens = sources[scale];
  const { copied, copy } = useCopy();
  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface/60 text-left">
            <th className="px-4 py-2.5 font-semibold text-ink">Token</th>
            <th className="px-4 py-2.5 font-semibold text-ink">Value</th>
            {scale !== "motion" && (
              <th className="hidden px-4 py-2.5 font-semibold text-ink sm:table-cell">
                Preview
              </th>
            )}
            <th className="px-4 py-2.5 font-semibold text-ink">Usage</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b border-border last:border-0">
              <td className="px-4 py-3 align-middle">
                <button
                  type="button"
                  onClick={() => copy(`var(--${token.name})`, token.name)}
                  aria-label={`Copy var(--${token.name})`}
                  className={cn(
                    "-mx-1.5 cursor-pointer rounded-[5px] px-1.5 py-0.5 font-mono text-[13px] font-medium transition-colors",
                    copied === token.name
                      ? "bg-success-soft text-success"
                      : "text-brand hover:bg-brand-soft",
                  )}
                >
                  {copied === token.name ? "Copied!" : token.name}
                </button>
              </td>
              <td className="px-4 py-3 align-middle">
                <code className="font-mono text-xs whitespace-nowrap text-ink-muted">
                  {token.value}
                </code>
              </td>
              {scale !== "motion" && (
                <td className="hidden px-4 py-3 align-middle sm:table-cell">
                  <TokenPreview scale={scale} token={token} />
                </td>
              )}
              <td className="px-4 py-3 align-middle text-ink-secondary">
                {token.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TokenPreview({ scale, token }: { scale: string; token: ScaleToken }) {
  if (scale === "radius") {
    const full = token.name === "radius-full";
    return (
      <span
        className={cn(
          "block border border-brand/40 bg-brand-soft",
          full ? "h-6 w-14" : "size-9",
          full ? NO_SQUIRCLE_CLASS : SQUIRCLE_CLASS,
        )}
        style={
          full
            ? { borderRadius: "var(--radius-full)" }
            : squircleRadiusStyle(token.value)
        }
      />
    );
  }
  if (scale === "spacing") {
    return (
      <span className="flex h-9 items-center">
        <span
          className="block h-3 rounded-[2px] bg-brand"
          style={{ width: token.value }}
        />
      </span>
    );
  }
  return null;
}
