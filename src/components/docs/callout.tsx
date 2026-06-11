import { cn } from "@/lib/utils";

type CalloutTone = "info" | "success" | "warning" | "danger";

const tones: Record<CalloutTone, { bar: string; bg: string; label: string }> = {
  info: { bar: "bg-brand", bg: "bg-brand-soft/60", label: "Note" },
  success: { bar: "bg-success", bg: "bg-success-soft/60", label: "Tip" },
  warning: { bar: "bg-warning", bg: "bg-warning-soft/60", label: "Caution" },
  danger: { bar: "bg-danger", bg: "bg-danger-soft/60", label: "Important" },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
}) {
  const config = tones[tone];
  return (
    <div className={cn("relative my-6 overflow-hidden rounded-md", config.bg)}>
      <div className={cn("absolute inset-y-0 left-0 w-[3px]", config.bar)} />
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-ink">{title ?? config.label}</p>
        <div className="mt-1 text-sm leading-relaxed text-ink-secondary [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_code]:rounded-[4px] [&_code]:bg-background/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]">
          {children}
        </div>
      </div>
    </div>
  );
}
