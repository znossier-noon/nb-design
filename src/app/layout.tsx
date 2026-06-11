import type { Metadata } from "next";
import { Cairo, Figtree, JetBrains_Mono } from "next/font/google";
import { BrandLoader } from "@/components/shell/brand-loader";
import { CommandPalette } from "@/components/search/command-palette";
import { buildSearchIndex } from "@/lib/search";
import "./globals.css";

// NoonTree is a custom Figtree build. Figtree stands in until woff2 files land in
// public/fonts/noontree/ and layout switches to next/font/local.
const noontree = Figtree({
  variable: "--font-noontree",
  subsets: ["latin"],
  display: "swap",
});

// Noon Arabic is Cairo under the brand name. Cairo stands in via next/font/google
// until woff2 files land in public/fonts/noon-arabic/ — then switch to localFont.
const noonArabic = Cairo({
  variable: "--font-noon-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Noon Mono is JetBrains Mono under the brand name. JetBrains_Mono stands in via
// next/font/google until woff2 files land in public/fonts/noon-mono/ — then switch to localFont.
const noonMono = JetBrains_Mono({
  variable: "--font-noon-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Noon Business Design",
    template: "%s · Noon Business Design",
  },
  description:
    "The official design reference for Noon Business. Foundations and resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = buildSearchIndex();

  return (
    <html
      lang="en"
      className={`${noontree.variable} ${noonArabic.variable} ${noonMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-inverse"
        >
          Skip to content
        </a>
        <BrandLoader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <CommandPalette index={searchIndex} />
      </body>
    </html>
  );
}
