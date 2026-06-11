import { ACCENT_YELLOW, BRAND_BLUE } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The noon business "b" lettermark, blue tile, white b, yellow slash.
 */
export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <rect width="48" height="48" rx="10" fill={BRAND_BLUE} />
      <path
        d="M17 9v12.3a10.5 10.5 0 1 1-3.4 7.7V9h3.4Zm7.5 12.4a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8Z"
        fill="#fff"
      />
      <path d="M13.6 30.6 22 27l-5 9.8a10.6 10.6 0 0 1-3.4-6.2Z" fill={ACCENT_YELLOW} />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-baseline gap-1 font-semibold tracking-[-0.02em]",
        className,
      )}
    >
      <span className="text-ink">noon</span>
      <span className="text-brand">business</span>
      <span className="ml-1 hidden text-ink-muted font-medium sm:inline">design</span>
    </span>
  );
}
