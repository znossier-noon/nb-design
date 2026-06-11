import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { PLATFORM_NAME, PLATFORM_TAGLINE, PLATFORM_VERSION } from "@/lib/platform";
import { navigation } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={22} />
              <span className="text-sm font-semibold text-ink">
                noon <span className="text-brand">business</span> design
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">
              {PLATFORM_TAGLINE}
            </p>
            <p className="mt-2 font-mono text-xs text-ink-faint">
              v{PLATFORM_VERSION}
            </p>
          </div>
          <div className="flex gap-12">
            {navigation.map((section) => (
              <nav key={section.href} aria-label={section.title}>
                <h3 className="text-xs font-semibold text-ink">{section.title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {section.groups[0].items
                    .filter((item) => item.title !== "Overview")
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-ink-muted hover:text-ink"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-ink-faint">
          {PLATFORM_NAME}
        </p>
      </div>
    </footer>
  );
}
