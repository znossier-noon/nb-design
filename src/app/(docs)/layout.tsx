import { SiteNav } from "@/components/shell/site-nav";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { buildPageStatusMap } from "@/lib/content";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pageStatuses = buildPageStatusMap();

  return (
    <>
      <SiteNav variant="docs" pageStatuses={pageStatuses} />
      <div className="mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Sidebar pageStatuses={pageStatuses} />
        {children}
      </div>
      <Footer />
    </>
  );
}
