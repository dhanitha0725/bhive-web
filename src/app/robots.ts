import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { insights } from "@/content/insights";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url || "https://bhive.lk";
  const publishedInsights = insights.filter((i) => i.published).length;
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
