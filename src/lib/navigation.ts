export type NavLeaf = {
  title: string;
  href: string;
  visible?: boolean;
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
  visible?: boolean;
};

const rawNavigation: NavSection[] = [
  {
    title: "Foundations",
    href: "/foundations",
    description: "Brand and product design foundations",
    groups: [
      {
        title: "",
        items: [
          { title: "Introduction", href: "/foundations" },
        ],
      },
      {
        title: "Core identity",
        items: [
          { title: "Logo", href: "/foundations/logo" },
          { title: "Colors", href: "/foundations/colors" },
          { title: "Typography", href: "/foundations/typography" },
          { title: "Visual Language", href: "/foundations/visual-language" },
        ],
      },
      {
        title: "Experience",
        items: [
          { title: "Product UI", href: "/foundations/product-ui" },
          { title: "Packaging", href: "/foundations/packaging" },
          { title: "Marketing Assets", href: "/foundations/marketing-assets" },
          { title: "Brand Applications", href: "/foundations/brand-applications" },
          { title: "Resources", href: "/foundations/resources" },
        ],
      },
      {
        title: "Future sections",
        items: [
          { title: "Illustration", href: "/foundations/illustration", visible: false },
          { title: "Photography", href: "/foundations/photography", visible: false },
          { title: "Motion", href: "/foundations/motion", visible: false },
          { title: "Iconography", href: "/foundations/iconography", visible: false },
          { title: "Tone of Voice", href: "/foundations/tone-of-voice", visible: false },
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
          { title: "Templates", href: "/resources/templates" },
          { title: "Brand assets", href: "/resources/brand-assets" },
          { title: "Downloads", href: "/resources/downloads" },
          { title: "Documentation", href: "/resources/documentation" },
        ],
      },
    ],
  },
];

function isVisible(item: { visible?: boolean }) {
  return item.visible !== false;
}

export const navigation: NavSection[] = rawNavigation
  .filter(isVisible)
  .map((section) => ({
    ...section,
    groups: section.groups
      .map((group) => ({
        ...group,
        items: group.items.filter(isVisible),
      }))
      .filter((group) => group.items.length > 0),
  }));

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
