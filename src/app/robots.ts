import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { client } from "@/sanity/client";
import { INSIGHT_COUNT_QUERY } from "@/sanity/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = siteConfig.url || "https://bhive.lk";
  let publishedInsights = 0;

  try {
    publishedInsights = (await client.fetch<number>(
      INSIGHT_COUNT_QUERY,
      {},
      { useCdn: false }
    )) ?? 0;
  } catch (error) {
    console.warn("Failed to query published insights for robots.txt:", error);
  }

  const disallowList: string[] = ["/api/"];

  if (publishedInsights < 3) {
    disallowList.push("/insights", "/insights/");
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowList,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
