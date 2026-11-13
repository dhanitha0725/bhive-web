import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { caseStudies } from "@/content/case-studies";
import { client } from "@/sanity/client";
import { INSIGHT_COUNT_QUERY, INSIGHT_SLUGS_QUERY } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.url) return [];

  const basePaths: MetadataRoute.Sitemap = [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...(siteConfig.showProof
      ? caseStudies.filter((x) => x.published).map((x) => `/work/${x.slug}`)
      : []),
  ].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date(),
  }));

  const insightCount = await client.fetch<number>(
    INSIGHT_COUNT_QUERY,
    {},
    { useCdn: false }
  );

  if ((insightCount ?? 0) < 3) {
    return basePaths;
  }

  const insights = await client.fetch<Array<{ slug: string; _updatedAt: string }>>(
    INSIGHT_SLUGS_QUERY,
    {},
    { useCdn: false }
  );

  const insightEntries: MetadataRoute.Sitemap = [
    {
      url: new URL("/insights", siteConfig.url).toString(),
      lastModified: new Date(),
    },
    ...(insights || []).map((x) => ({
      url: new URL(`/insights/${x.slug}`, siteConfig.url).toString(),
      lastModified: x._updatedAt ? new Date(x._updatedAt) : new Date(),
    })),
  ];

  return [...basePaths, ...insightEntries];
}
