"use client";

import * as React from "react";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

export function CopyCodeBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const { copied, copy } = useCopy();
  const text = extractText(children).trim();

  return (
    <div className="group relative">
      <pre className={cn("pr-14", className)} {...props}>
        {children}
      </pre>
      {text && (
        <button
          type="button"
          onClick={() => copy(text, "code-block")}
          className={cn(
            "absolute top-2.5 right-2.5 cursor-pointer rounded-[6px] border border-border bg-surface-raised px-2 py-1 text-[11px] font-medium transition-colors",
            copied === "code-block"
              ? "text-success"
              : "text-ink-muted opacity-0 group-hover:opacity-100 hover:text-ink focus-visible:opacity-100",
          )}
        >
          {copied === "code-block" ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
