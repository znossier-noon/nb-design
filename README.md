# Noon Business Design

The official design reference for Noon Business. **Foundations** (principles, tokens, brand) and **Resources** (Figma, assets, downloads), versioned at v1.0.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Tina admin + production build (fully static)
npm run lint    # eslint
```

## Deploy and collaborate

- **[DEPLOY.md](./DEPLOY.md)**: GitHub, Vercel, and Tina Cloud setup checklist
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: content editing (Tina + MDX), new pages, PR workflow
- **Tina CMS**: `/admin` for visual content editing (design team)
- **Preview URLs**: every PR gets a Vercel preview link for review before merge

## Tech stack

- **Next.js 16** (App Router, static generation) + **TypeScript**
- **Tailwind CSS v4**, tokens as CSS custom properties via `@theme`
- **motion**, reduced-motion aware
- **MDX** via `next-mdx-remote` + `gray-matter`
- **cmdk**, ⌘K search over a build-time index
## Architecture

```
src/
  app/
    page.tsx                 Homepage: hero + foundations/resources index
    (docs)/[...slug]/        MDX docs (14 pages)
  components/
    ui/                      Button, Badge, Kbd
    layout/                  Header, Footer, Sidebar, TOC
    home/                    Hero, HeroCanvas, HomeSections
    docs/                    Interactive MDX components (swatches, logo tool, etc.)
  lib/
    navigation.ts            Nav tree (sidebar, search, sitemap)
    content.ts               MDX loading
    tokens.ts                Token data for docs
  content/
    foundations/             8 pages (done)
    resources/               6 pages (work in progress)
```

## Design tokens

Mirrored in `src/app/globals.css` (runtime) and `src/lib/tokens.ts` (documentation). The color swatches on `/foundations/color` render the same variables that style the site.

## Adding a page

1. Create `src/content/{section}/my-page.mdx` with frontmatter (`title`, `description`, `status`, `version`, `updated`). Status is one of `done`, `work-in-progress`, or `planned`.
2. Register in `src/lib/navigation.ts`

Sidebar, search, breadcrumbs, prev/next and sitemap update automatically.
