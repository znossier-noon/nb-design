#!/usr/bin/env bash
# Deploy nb-design to Vercel (team: zosman-noon).
# Requires: vercel login OR VERCEL_TOKEN in the environment.
set -euo pipefail

cd "$(dirname "$0")/.."

SCOPE="zosman-noon"
PROJECT="nb-design"

if ! vercel whoami >/dev/null 2>&1; then
  echo "Not logged in to Vercel. Run: vercel login"
  echo "Or set VERCEL_TOKEN from https://vercel.com/account/tokens"
  exit 1
fi

if [[ ! -f .vercel/project.json ]]; then
  vercel link --yes --scope "$SCOPE" --project "$PROJECT"
fi

vercel deploy --prod --scope "$SCOPE"
echo ""
echo "Production deploy complete. Check the URL above or run: vercel ls --scope $SCOPE"
