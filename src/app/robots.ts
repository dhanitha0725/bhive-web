import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { client } from "@/sanity/client";
import { INSIGHT_COUNT_QUERY } from "@/sanity/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = siteConfig.url || "https://bhive.lk";
  const publishedInsights = await client.fetch<number>(
    INSIGHT_COUNT_QUERY,
    {},
    { useCdn: false }
  );
  const disallowList: string[] = ["/api/"];

  if ((publishedInsights ?? 0) < 3) {
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
