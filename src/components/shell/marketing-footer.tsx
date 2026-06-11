import { LogoMark } from "@/components/brand/logo";
import { GrainBackdrop } from "@/components/shell/grain-overlay";
import { PLATFORM_NAME, PLATFORM_VERSION } from "@/lib/platform";

export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background px-4 py-8 sm:px-6 lg:px-8">
      <GrainBackdrop intensity="subtle" variant="dark" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <LogoMark size={22} />
          <span className="text-sm font-semibold text-ink">
            noon <span className="text-brand">business</span> design
          </span>
        </div>
        <p className="font-mono text-xs text-ink-faint">
          {PLATFORM_NAME} · v{PLATFORM_VERSION}
        </p>
      </div>
    </footer>
  );
}
