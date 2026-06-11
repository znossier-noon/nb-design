import type { DocStatus } from "@/lib/content";
import { flattenNavigation } from "@/lib/navigation";
import { getDoc } from "@/lib/content";

export type SearchItem = {
  title: string;
  href: string;
  section: string;
  description?: string;
  keywords?: string;
  status?: DocStatus;
};

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    {
      title: "Home",
      href: "/",
      section: "Pages",
      description: "Noon Business Design",
    },
  ];

  for (const page of flattenNavigation()) {
    const slug = page.href.slice(1).split("/");
    const doc = getDoc(slug);
    const title =
      page.title === "Overview"
        ? (doc?.frontmatter.title ?? page.section)
        : page.title;
    items.push({
      title,
      href: page.href,
      section: page.section,
      description: doc?.frontmatter.description,
      keywords: doc?.headings.map((h) => h.text).join(" "),
      status: doc?.frontmatter.status,
    });
  }

  return items;
}
