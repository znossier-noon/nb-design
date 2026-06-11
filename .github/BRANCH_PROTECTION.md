# Branch protection for `main`

Apply these in **GitHub → Repository → Settings → Branches → Add branch protection rule** (or via org rulesets).

## Recommended rule: `main`

| Setting | Recommendation | Why |
| --- | --- | --- |
| **Require a pull request before merging** | On | No direct pushes to production content/code |
| **Required approvals** | 1 (2 for infra/token changes) | Design or eng review depending on PR type |
| **Dismiss stale pull request approvals** | On | Re-review after meaningful changes |
| **Require status checks to pass** | On | Add **Vercel** deployment check when available |
| **Require branches to be up to date** | On (optional) | Reduces merge skew; can slow hotfixes |
| **Do not allow bypassing** | On for admins | Keeps `main` aligned with what shipped |

## Status checks (after Vercel is connected)

1. Merge one PR so Vercel registers checks on the repo.
2. Return to branch protection → **Require status checks** → select the Vercel check (often `Vercel` or `Vercel – nb-design`).

## CODEOWNERS

[`.github/CODEOWNERS`](./CODEOWNERS) auto-requests reviewers. Replace `@your-org/design-leads` and `@your-org/engineering` with real GitHub teams or usernames.

## Suggested merge strategy

- **Squash merge** for content PRs (clean history, one preview per PR).
- **Merge commit** optional for large feature branches if you want to preserve commit history.

## Environments (optional)

For stricter control, add a GitHub **environment** named `production` tied to `main` and require approval from a release manager before Vercel production deploys. Most teams rely on Vercel’s default “merge to main = production” flow first.

## Tina Cloud branch

In [app.tina.io](https://app.tina.io), set the indexed branch to `main`. Content editors working on PR branches use Vercel preview URLs; Tina saves to the branch configured in the admin session.
