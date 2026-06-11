import { cn } from "@/lib/utils";

function Panel({
  kind,
  title,
  children,
}: {
  kind: "do" | "dont";
  title?: string;
  children: React.ReactNode;
}) {
  const isDo = kind === "do";
  return (
    <figure
      className={cn(
        "flex flex-col overflow-hidden rounded-md border",
        isDo ? "border-success/25" : "border-danger/25",
      )}
    >
      <div className="flex-1 bg-surface/60 p-5 text-sm text-ink-secondary [&_p]:leading-relaxed">
        {children}
      </div>
      <figcaption
        className={cn(
          "flex items-center gap-2 border-t px-5 py-3",
          isDo
            ? "border-success/25 bg-success-soft/50"
            : "border-danger/25 bg-danger-soft/50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex size-4 items-center justify-center rounded-full text-white",
            isDo ? "bg-success" : "bg-danger",
          )}
        >
          {isDo ? (
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5.5l2.3 2.3L8.5 2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 1.5l7 7m0-7l-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span
          className={cn(
            "text-[13px] font-semibold",
            isDo ? "text-success" : "text-danger",
          )}
        >
          {title ?? (isDo ? "Do" : "Don't")}
        </span>
      </figcaption>
    </figure>
  );
}

export function Do(props: { title?: string; children: React.ReactNode }) {
  return <Panel kind="do" {...props} />;
}

export function Dont(props: { title?: string; children: React.ReactNode }) {
  return <Panel kind="dont" {...props} />;
}

export function DoDont({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2">{children}</div>;
}
