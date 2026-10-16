import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { insights, pillars } from "@/content/insights";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const paths = [
    "/",
    "/grow-your-business",
    "/launch-your-business",
    "/services",
    "/work",
    "/insights",
    "/about",
    "/contact",
    "/free-growth-audit",
    "/business-guidance-call",
    "/privacy",
    "/terms",
    ...services.filter((x) => x.published).map((x) => `/services/${x.slug}`),
    ...caseStudies.filter((x) => x.published).map((x) => `/work/${x.slug}`),
    ...insights.filter((x) => x.published).map((x) => `/insights/${x.slug}`),
    ...Object.keys(pillars).map((x) => `/insights/category/${x}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteConfig.url).toString(), lastModified: new Date() }));
}
