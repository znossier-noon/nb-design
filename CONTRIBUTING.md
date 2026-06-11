# Contributing to Noon Business Design

This site is a static Next.js documentation platform. Content lives in MDX files; the UI and tokens live in React/TypeScript. Use the workflow that matches what you are changing.

## Who does what

| Change type | Who | How |
| --- | --- | --- |
| Copy, page metadata, prose | Design / content | Tina CMS (`/admin`) or MDX PR |
| New doc page | Design + dev review | MDX file + nav entry (see below) |
| Components, tokens, layout | Engineering | Code PR |
| Figma source files | Design | Figma (link from page frontmatter) |

## Editing content with Tina CMS (recommended for design)

1. Copy `.env.example` to `.env.local` and add Tina Cloud credentials (see [DEPLOY.md](./DEPLOY.md)).
2. Run `npm run dev` and open [http://localhost:3000/admin](http://localhost:3000/admin).
3. Sign in with Tina Cloud, pick **Documentation pages**, edit, and save.
4. In production, saves go to GitHub on your branch; open a PR to merge to `main`.

Tina edits **frontmatter** (title, description, status, Figma link, etc.) and **page body** prose. Interactive blocks already on a page — for example `<ColorSwatchGrid />`, `<PrinciplesExplorer />` — stay in the MDX file. Edit the markdown around them; ask engineering if you need a new block type.

### Frontmatter reference

Every page in `src/content/` starts with YAML frontmatter:

```yaml
---
title: Page title
description: One-line summary for search and meta tags.
status: shipped          # shipped | in-progress | planned
version: "1.0.0"           # optional
updated: 2026-06-10        # optional, ISO date
figma: https://figma.com/...  # optional
source: https://github.com/... # optional
---
```

## Editing content without Tina (GitHub web UI)

1. Find the page under `src/content/` (path mirrors the URL).
   - `/foundations/color` → `src/content/foundations/color.mdx`
   - `/resources` → `src/content/resources/index.mdx`
2. Edit the file on a branch.
3. Open a pull request. Vercel posts a **preview URL** on the PR — share that for review.
4. Merge to `main` when approved; production updates automatically.

## Adding a new page

Two steps — both are required:

### 1. Create the MDX file

Mirror the URL in the folder structure:

```
src/content/foundations/my-new-page.mdx
```

Use an existing page as a template. Section overviews use `index.mdx`:

```
src/content/foundations/index.mdx   →  /foundations
```

### 2. Register it in navigation

Add an entry in [`src/lib/navigation.ts`](./src/lib/navigation.ts) inside the right section group. Sidebar, search, breadcrumbs, prev/next links, and `sitemap.xml` all read from this file.

```ts
{ title: "My new page", href: "/foundations/my-new-page" },
```

Run `npm run build` locally before opening a PR if you changed nav or added pages.

## Branch naming

- `content/update-color-copy` — MDX-only changes
- `feat/hero-animation` — UI or feature work
- `fix/contrast-table` — bug fixes

Keep content PRs small and focused when possible.

## Pull request checklist

- [ ] Preview URL checked (Vercel bot comment on the PR)
- [ ] New pages registered in `navigation.ts`
- [ ] Frontmatter `title` and `description` filled in
- [ ] `status` and `updated` set appropriately
- [ ] Figma link added if the page has a design source
- [ ] `npm run build` passes locally for structural changes

## Local development

```bash
npm install
cp .env.example .env.local   # optional until using Tina
npm run dev                  # site + Tina admin
```

- Site: [http://localhost:3000](http://localhost:3000)
- Tina admin: [http://localhost:3000/admin](http://localhost:3000/admin)
- Next.js only (no Tina): `npm run dev:next`

## Questions

Open a GitHub issue or ask in your team channel. For access to Tina Cloud or the GitHub repo, contact the repo admin.
