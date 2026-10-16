import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const canonical = siteConfig.url ? new URL(path, siteConfig.url).toString() : undefined;
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
