/**
 * Push to GitHub without the system git binary (macOS Xcode license workaround).
 * Usage: GITHUB_TOKEN=$(gh auth token) node scripts/push-to-github.mjs
 */
import fs from "node:fs";
import path from "node:path";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

const ROOT = path.resolve(import.meta.dirname, "..");
const REMOTE = "https://github.com/znossier-noon/nb-design.git";
const BRANCH = "main";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Missing GITHUB_TOKEN (run: export GITHUB_TOKEN=$(gh auth token))");
  process.exit(1);
}

function loadIgnorePatterns() {
  const ignorePath = path.join(ROOT, ".gitignore");
  if (!fs.existsSync(ignorePath)) return [];
  return fs
    .readFileSync(ignorePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function shouldIgnore(relativePath, patterns) {
  const normalized = relativePath.replace(/\\/g, "/");
  for (const pattern of patterns) {
    const p = pattern.replace(/^\//, "").replace(/\/$/, "");
    if (p.startsWith("*.")) {
      if (normalized.endsWith(p.slice(1))) return true;
    } else if (p.endsWith("/")) {
      if (normalized.startsWith(p) || normalized.includes(`/${p}`)) return true;
    } else if (normalized === p || normalized.startsWith(`${p}/`)) {
      return true;
    }
  }
  return false;
}

function walkFiles(dir, patterns, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (shouldIgnore(rel, patterns)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(abs, patterns, rel));
    } else if (entry.isFile()) {
      files.push(rel);
    }
  }
  return files;
}

async function main() {
  const patterns = loadIgnorePatterns();
  const files = walkFiles(ROOT, patterns).filter(
    (f) => f !== ".git" && !f.startsWith(".git/"),
  );

  await git.init({ fs, dir: ROOT, defaultBranch: BRANCH });

  try {
    await git.addRemote({ fs, dir: ROOT, remote: "origin", url: REMOTE, force: true });
  } catch {
    await git.addRemote({ fs, dir: ROOT, remote: "origin", url: REMOTE });
  }

  for (const filepath of files) {
    await git.add({ fs, dir: ROOT, filepath });
  }

  const sha = await git.commit({
    fs,
    dir: ROOT,
    message:
      "Initial commit: Noon Business Design platform\n\nDeployment, Tina CMS, and team collaboration setup.",
    author: {
      name: "znossier-noon",
      email: "znossier-noon@users.noreply.github.com",
    },
  });

  console.log(`Committed ${files.length} files (${sha.slice(0, 7)})`);

  await git.push({
    fs,
    http,
    dir: ROOT,
    remote: "origin",
    ref: BRANCH,
    force: true,
    onAuth: () => ({
      username: "znossier-noon",
      password: token,
    }),
  });

  console.log(`Pushed to ${REMOTE} (${BRANCH})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
