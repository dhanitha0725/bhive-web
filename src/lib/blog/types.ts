import type { PortableTextBlock } from "next-sanity";

export type InsightSummary = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  pillarName: string;
  pillarSlug: string;
  date: string;          // YYYY-MM-DD
  readingTime: string;   // "5 min read"
  coverImage: {
    url: string;
    srcSet: string;
    alt: string;
  } | null;
};

export type InsightArticle = InsightSummary & {
  body: PortableTextBlock[];
  relatedService: { name: string; slug: string } | null;
  seo: { metaTitle?: string; metaDescription?: string } | null;
};

