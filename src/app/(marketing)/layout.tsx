import { SiteNav } from "@/components/shell/site-nav";
import { MarketingFooter } from "@/components/shell/marketing-footer";
import { buildPageStatusMap } from "@/lib/content";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNav variant="immersive" pageStatuses={buildPageStatusMap()} />
      {children}
      <MarketingFooter />
    </>
  );
}
