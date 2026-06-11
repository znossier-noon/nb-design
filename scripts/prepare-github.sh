#!/usr/bin/env bash
# Prepare the repo for its first GitHub push.
# Run from the project root: ./scripts/prepare-github.sh

set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not available. On macOS, accept the Xcode license: sudo xcodebuild -license"
  exit 1
fi

if [[ -d .git ]]; then
  echo "Git repository already initialized."
else
  git init -b main
  echo "Initialized git repository on branch main."
fi

if [[ -n "$(git status --porcelain 2>/dev/null)" ]]; then
  git add .
  git commit -m "$(cat <<'EOF'
Add deployment, collaboration, and Tina CMS setup.

GitHub/Vercel workflow, content editing via Tina admin, and team docs.
EOF
)"
  echo "Created initial commit."
else
  echo "Working tree clean: nothing to commit."
fi

cat <<'EOF'

Next steps:
  1. Create an empty repo on GitHub (e.g. your-org/nb-design)
  2. git remote add origin git@github.com:YOUR_ORG/nb-design.git
  3. git push -u origin main
  4. Follow DEPLOY.md for Vercel and Tina Cloud

Replace @your-org/* in .github/CODEOWNERS with real teams or usernames.
EOF
