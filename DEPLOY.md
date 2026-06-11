# Deploy checklist

Step-by-step guide to put **nb-design** on GitHub and Vercel, enable team previews, and wire up Tina CMS for content editing.

## Prerequisites

- GitHub org or account with permission to create repos
- [Vercel](https://vercel.com) account (team or personal)
- [Tina Cloud](https://app.tina.io) account (free tier works for small teams)

---

## Phase 1 — GitHub

### 1. Create the repository

1. On GitHub: **New repository** → name e.g. `nb-design` → private (recommended for internal design docs).
2. Do **not** initialize with a README (this repo already has one).

### 2. Push this project

Run the helper script (initializes git, commits, prints next steps):

```bash
./scripts/prepare-github.sh
```

Or manually:

```bash
git init -b main
git add .
git commit -m "Initial commit: Noon Business Design platform"
git remote add origin git@github.com:znossier-noon/nb-design.git
git push -u origin main
```

> **macOS:** If `git init` fails, accept the Xcode license first: `sudo xcodebuild -license`

Replace `YOUR_ORG/nb-design` with your repo path.

### 3. Add collaborators

**Settings → Collaborators and teams** (or manage via a GitHub team). Give design leads write access for content PRs; engineers maintain admin settings.

### 4. Branch protection on `main`

Configure in **Settings → Branches → Add rule** for `main`. See [`.github/BRANCH_PROTECTION.md`](./.github/BRANCH_PROTECTION.md) for recommended settings.

---

## Phase 2 — Vercel

### 1. Import the repo

1. [vercel.com/new](https://vercel.com/new) → import `nb-design` from GitHub.
2. Framework preset: **Next.js** (auto-detected).
3. Build settings (should match `vercel.json`):
   - **Build command:** `npm run build`
   - **Install command:** `npm install`
   - **Output:** Next.js default (`.next`)

### 2. Environment variables

Add these in **Project → Settings → Environment Variables** for Production, Preview, and Development:

| Variable | Where to get it | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | [app.tina.io](https://app.tina.io) → your project | Public; embedded in admin build |
| `TINA_TOKEN` | Tina Cloud project → tokens | **Secret** — server/build only |

Copy from [`.env.example`](./.env.example). You can deploy once without Tina vars; `/admin` will not authenticate until they are set.

### 3. First deploy

- Push to `main` → **production** URL (e.g. `nb-design.vercel.app`).
- Open a PR → **preview** URL on every push (Vercel bot comments on the PR).

Share preview links with the design team for review before merge.

### 4. Custom domain (optional)

**Project → Settings → Domains** → add e.g. `design.noon.business` and follow DNS instructions.

---

## Phase 3 — Tina Cloud

Tina provides the `/admin` UI and commits content changes back to GitHub.

### 1. Create a Tina project

1. [app.tina.io](https://app.tina.io) → **New project**.
2. Connect GitHub and select the `nb-design` repository.
3. Set branch to `main` (or your default branch).

### 2. Local credentials

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN from Tina Cloud
```

### 3. Generate / update the Tina lockfile

The lockfile (`tina/tina-lock.json`) is committed to the repo. Tina Cloud uses it to index your schema.

- **First time:** already generated when Tina was set up; commit it with the rest of the repo.
- **After schema changes:** run `npm run dev` once locally, then commit any changes to `tina/tina-lock.json`.

The build script (`scripts/tina-build.mjs`) uses Tina Cloud credentials when `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set (Vercel production/preview). Without them, it falls back to a local admin build for offline `npm run build`.

### 4. Team access

In Tina Cloud → **Project → Collaborators**, invite design team members. They sign in at `/admin` on preview or production.

### 5. Verify the flow

1. `npm run dev` → open `/admin` → edit a page → save.
2. Confirm the MDX file changed locally (or on your branch in GitHub when using Tina Cloud in production).
3. Merge to `main` → Vercel rebuilds → live site updates.

---

## Phase 4 — Day-to-day workflow

```
Design edits in Tina or GitHub  →  PR opened  →  Vercel preview URL
       →  Review  →  Merge to main  →  Production deploy
```

- **Content:** Tina `/admin` or MDX edits via PR ([CONTRIBUTING.md](./CONTRIBUTING.md)).
- **Code:** feature branches + PR review ([CODEOWNERS](./.github/CODEOWNERS)).
- **Rollback:** Vercel → Deployments → previous deployment → **Promote to Production**.

---

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Build fails on Vercel | Check build logs; run `npm run build` locally. Ensure `TINA_TOKEN` is set for Production and Preview. |
| `/admin` blank or auth error | Verify `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`; redeploy after adding env vars. |
| Tina schema changes not picked up | Run `npm run tina:build`, commit `tina/tina-lock.json`, push, reconnect branch in Tina Cloud if needed. |
| Preview shows old content | Hard refresh; Tina saves to the PR branch — confirm you are on the right preview URL. |
| `git` fails on macOS | Accept Xcode license: `sudo xcodebuild -license` |

---

## Quick reference

| URL | Purpose |
| --- | --- |
| Production | `https://<project>.vercel.app` or custom domain |
| PR preview | Comment from Vercel bot on each pull request |
| Tina admin | `https://<host>/admin` |
| Local dev | `http://localhost:3000` |
