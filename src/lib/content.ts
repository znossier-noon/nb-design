import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export type DocStatus = "done" | "work-in-progress" | "planned";

export type DocFrontmatter = {
  title: string;
  description: string;
  status?: DocStatus;
  /** Platform version this page ships in, e.g. "1.0.0". */
  version?: string;
  updated?: string;
  figma?: string;
  source?: string;
};

export type TocHeading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type Doc = {
  slug: string[];
  href: string;
  frontmatter: DocFrontmatter;
  headings: TocHeading[];
  content: string;
};

function resolveDocPath(slug: string[]): string | null {
  const direct = path.join(CONTENT_DIR, ...slug) + ".mdx";
  if (fs.existsSync(direct)) return direct;
  const index = path.join(CONTENT_DIR, ...slug, "index.mdx");
  if (fs.existsSync(index)) return index;
  return null;
}

export function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  // Strip fenced code blocks so `## comments` inside code aren't picked up.
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }
  return headings;
}

export function getDoc(slug: string[]): Doc | null {
  const filePath = resolveDocPath(slug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    href: "/" + slug.join("/"),
    frontmatter: data as DocFrontmatter,
    headings: extractHeadings(content),
    content,
  };
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];
  function walk(dir: string, parts: string[]) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...parts, entry.name]);
      } else if (entry.name.endsWith(".mdx")) {
        const base = entry.name.replace(/\.mdx$/, "");
        slugs.push(base === "index" ? parts : [...parts, base]);
      }
    }
  }
  walk(CONTENT_DIR, []);
  return slugs.filter((s) => s.length > 0);
}

/** href → status, read from frontmatter at build time. */
export function buildPageStatusMap(): Record<string, DocStatus> {
  const map: Record<string, DocStatus> = {};
  for (const slug of getAllDocSlugs()) {
    const doc = getDoc(slug);
    if (doc?.frontmatter.status) {
      map[doc.href] = doc.frontmatter.status;
    }
  }
  return map;
}
