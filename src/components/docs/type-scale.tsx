import { typeScale } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function TypeScale() {
  return (
    <div className="my-6 flex flex-col divide-y divide-border rounded-md border border-border">
      {typeScale.map((style) => (
        <div
          key={style.name}
          className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-8"
        >
          <div className="flex w-44 shrink-0 flex-col gap-1">
            <span className="text-[13px] font-semibold text-ink">{style.name}</span>
            <span className="font-mono text-[11px] leading-relaxed text-ink-muted">
              {style.size}
              <br />
              {style.lineHeight} lh · {style.letterSpacing} ls · {style.weight}
            </span>
            <span className="text-xs text-ink-faint">{style.usage}</span>
          </div>
          <p
            className={cn(
              "min-w-0 truncate text-ink",
              style.className,
              style.name === "Caption" && "tracking-[0.08em] uppercase",
            )}
          >
            {style.sample}
          </p>
        </div>
      ))}
    </div>
  );
}
