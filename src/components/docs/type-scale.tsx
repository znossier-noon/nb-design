"use client";

import * as React from "react";
import { arabicTypeScale, typeScale } from "@/lib/tokens";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

type Script = "latin" | "arabic";

export function TypeScale() {
  const [script, setScript] = React.useState<Script>("latin");
  const scale = script === "arabic" ? arabicTypeScale : typeScale;
  const { copied, copy } = useCopy();

  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/50 px-4 py-2">
        <p className="text-[11px] text-ink-muted">
          Click a class name to copy. Arabic uses the same utilities with different metrics.
        </p>
        <div className="flex items-center gap-0.5 rounded-[7px] bg-surface-sunken p-0.5">
          {(
            [
              { id: "latin" as const, label: "EN" },
              { id: "arabic" as const, label: "AR" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setScript(option.id)}
              className={cn(
                "h-6.5 cursor-pointer rounded-full px-2.5 text-xs font-medium transition-colors",
                script === option.id
                  ? "bg-background text-ink ring-1 ring-border"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        lang={script === "arabic" ? "ar" : "en"}
        dir={script === "arabic" ? "rtl" : "ltr"}
        className={cn(
          "flex flex-col divide-y divide-border",
          script === "arabic" && "font-arabic type-arabic",
        )}
      >
        {scale.map((style) => (
          <div
            key={style.name}
            className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-8"
          >
            <div className="flex w-52 shrink-0 flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-ink">{style.name}</span>
              <button
                type="button"
                onClick={() => copy(style.className, style.className)}
                className={cn(
                  "-mx-1 w-fit cursor-pointer rounded-full px-1 py-0.5 text-left font-mono text-[11px] transition-colors",
                  copied === style.className
                    ? "bg-success-soft text-success"
                    : "text-brand hover:bg-brand-soft",
                )}
              >
                {copied === style.className ? "Copied!" : style.className}
              </button>
              <span className="font-mono text-[11px] leading-relaxed text-ink-muted">
                {style.size}
                <br />
                {style.lineHeight} lh · {style.letterSpacing} ls · {style.weight}
              </span>
              <span className="text-xs text-ink-faint">{style.usage}</span>
            </div>
            <p
              className={cn(
                "min-w-0 flex-1 truncate text-ink",
                style.className,
                script === "latin" &&
                  style.name === "Caption" &&
                  "tracking-[0.08em] uppercase",
              )}
            >
              {style.sample}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
