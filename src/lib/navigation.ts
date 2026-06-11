export type NavLeaf = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  items: NavLeaf[];
};

export type NavSection = {
  title: string;
  href: string;
  description: string;
  groups: NavGroup[];
};

export const navigation: NavSection[] = [
  {
    title: "Foundations",
    href: "/foundations",
    description: "Principles, tokens and brand rules",
    groups: [
      {
        title: "Foundations",
        items: [
          { title: "Overview", href: "/foundations" },
          { title: "Design principles", href: "/foundations/principles" },
          { title: "Brand identity", href: "/foundations/brand-identity" },
          { title: "Logo", href: "/foundations/logo" },
          { title: "Color", href: "/foundations/color" },
          { title: "Typography", href: "/foundations/typography" },
          { title: "Iconography", href: "/foundations/iconography" },
          { title: "Motion", href: "/foundations/motion" },
          {
            title: "Content guidelines",
            href: "/foundations/content-guidelines",
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Figma, assets and downloads",
    groups: [
      {
        title: "Resources",
        items: [
          { title: "Overview", href: "/resources" },
          { title: "Figma libraries", href: "/resources/figma-libraries" },
          { title: "Brand assets", href: "/resources/brand-assets" },
          { title: "Downloads", href: "/resources/downloads" },
          { title: "Documentation", href: "/resources/documentation" },
        ],
      },
    ],
  },
];

export const headerNav = navigation.map((s) => ({
  title: s.title,
  href: s.href,
}));

export function flattenNavigation(): (NavLeaf & { section: string })[] {
  return navigation.flatMap((section) =>
    section.groups.flatMap((group) =>
      group.items.map((item) => ({ ...item, section: section.title })),
    ),
  );
}

export function findSection(pathname: string): NavSection | undefined {
  return navigation.find(
    (section) =>
      pathname === section.href || pathname.startsWith(section.href + "/"),
  );
}

export function getPrevNext(pathname: string) {
  const flat = flattenNavigation();
  const index = flat.findIndex((item) => item.href === pathname);
  return {
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}

export function getBreadcrumbs(pathname: string): NavLeaf[] {
  const section = findSection(pathname);
  if (!section) return [];
  const crumbs: NavLeaf[] = [{ title: section.title, href: section.href }];
  if (pathname === section.href) return crumbs;
  for (const group of section.groups) {
    const leaf = group.items.find((item) => item.href === pathname);
    if (leaf) {
      const groupOverview = group.items.find((i) => i.title === "Overview");
      if (
        groupOverview &&
        groupOverview.href !== pathname &&
        groupOverview.href !== section.href
      ) {
        crumbs.push({ title: group.title, href: groupOverview.href });
      }
      crumbs.push(leaf);
      return crumbs;
    }
  }
  return crumbs;
}
