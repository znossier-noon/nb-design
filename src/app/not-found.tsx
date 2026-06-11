import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-4 py-32 sm:px-6 lg:px-8">
      <p className="text-[13px] font-semibold tracking-[0.1em] text-ink-muted uppercase">
        404
      </p>
      <h1 className="mt-4 text-display text-ink">This page doesn&apos;t exist</h1>
      <p className="mt-5 max-w-md text-body-lg text-ink-secondary">
        The page you&apos;re looking for may have moved during a reorganization,
        or the link is simply wrong.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={buttonClasses()}>
          Back to home
        </Link>
        <Link href="/foundations" className={buttonClasses({ variant: "secondary" })}>
          Browse foundations
        </Link>
      </div>
    </div>
  );
}
