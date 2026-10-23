import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { caseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];

  const paths = [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...caseStudies.filter((x) => x.published).map((x) => `/work/${x.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date(),
  }));
}
