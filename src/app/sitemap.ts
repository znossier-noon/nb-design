import type { MetadataRoute } from "next";
import { flattenNavigation } from "@/lib/navigation";

const BASE_URL = "https://design.noon.partners";

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = flattenNavigation().map((page) => ({
    url: `${BASE_URL}${page.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [{ url: BASE_URL, changeFrequency: "weekly", priority: 1 }, ...docPages];
}
