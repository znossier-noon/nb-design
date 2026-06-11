import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getDoc, getAllDocSlugs } from "@/lib/content";
import { getBreadcrumbs, getPrevNext } from "@/lib/navigation";
import { mdxComponents } from "@/components/docs/mdx-components";
import { DocPageHeader } from "@/components/docs/page-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TableOfContents } from "@/components/layout/toc";
import { PageFooterNav } from "@/components/layout/page-footer-nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const crumbs = getBreadcrumbs(doc.href);
  const { prev, next } = getPrevNext(doc.href);

  return (
    <>
      <article className="min-w-0 flex-1 py-10 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <DocPageHeader frontmatter={doc.frontmatter} />
          <div className="prose mt-8">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug],
                  remarkPlugins: [remarkGfm],
                },
                // Content is first-party (lives in this repo), so JSX
                // expression props are safe to evaluate.
                blockJS: false,
                blockDangerousJS: true,
              }}
            />
          </div>
          <PageFooterNav prev={prev} next={next} />
        </div>
      </article>
      <TableOfContents headings={doc.headings} />
    </>
  );
}
