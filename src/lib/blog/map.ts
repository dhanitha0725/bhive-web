import { getImageSrcAndSrcSet } from "@/sanity/image";
import type {
  INSIGHT_BY_SLUG_QUERY_RESULT,
  INSIGHT_SUMMARIES_QUERY_RESULT,
  LATEST_INSIGHTS_QUERY_RESULT,
} from "../../../sanity.types";
import type { PortableTextBlock } from "next-sanity";
import type { InsightArticle, InsightSummary } from "./types";

export function estimateReadingMinutes(body?: unknown[]): number {
  if (!Array.isArray(body) || body.length === 0) return 3;
  let wordCount = 0;
  for (const block of body) {
    if (block && typeof block === "object" && "_type" in block && block._type === "block") {
      const children = (block as { children?: Array<{ text?: string }> }).children;
      if (Array.isArray(children)) {
        for (const child of children) {
          if (child?.text) {
            wordCount += child.text.trim().split(/\s+/).filter(Boolean).length;
          }
        }
      }
    }
  }
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toISOString().split("T")[0]!;
  } catch {
    return dateStr;
  }
}

type RawCoverImage = {
  asset?: unknown;
  alt?: string | null;
} | null | undefined;

function mapCoverImage(
  imageSource: RawCoverImage,
  fallbackAlt: string
): { url: string; srcSet: string; alt: string } | null {
  if (!imageSource?.asset) return null;
  const responsive = getImageSrcAndSrcSet(imageSource);
  if (!responsive) return null;
  const alt =
    typeof imageSource.alt === "string" && imageSource.alt.trim().length > 0
      ? imageSource.alt.trim()
      : fallbackAlt;
  return {
    url: responsive.url,
    srcSet: responsive.srcSet,
    alt,
  };
}

export type RawInsightSummary =
  | INSIGHT_SUMMARIES_QUERY_RESULT[number]
  | LATEST_INSIGHTS_QUERY_RESULT[number]
  | NonNullable<INSIGHT_BY_SLUG_QUERY_RESULT>;

export function mapInsightSummary(raw: RawInsightSummary): InsightSummary {
  const title = raw.title || "Untitled";
  const pillarName = raw.pillar?.name || "Insights";
  const pillarSlug = raw.pillar?.slug || "insights";
  const date = formatDate(raw.publishedAt);
  const minutes =
    typeof raw.readingTime === "number" && raw.readingTime > 0
      ? raw.readingTime
      : estimateReadingMinutes("body" in raw ? (raw.body as PortableTextBlock[]) : undefined);
  const readingTime = `${minutes} min read`;
  const coverImage = mapCoverImage(raw.coverImage, title);

  return {
    _id: raw._id ?? "",
    slug: raw.slug || "",
    title,
    excerpt: raw.excerpt || "",
    pillarName,
    pillarSlug,
    date,
    readingTime,
    coverImage,
  };
}

export function mapInsightArticle(raw: NonNullable<INSIGHT_BY_SLUG_QUERY_RESULT>): InsightArticle {
  const summary = mapInsightSummary(raw);
  const relatedService =
    raw.relatedService?.name && raw.relatedService?.slug
      ? {
          name: raw.relatedService.name,
          slug: raw.relatedService.slug,
        }
      : null;

  return {
    ...summary,
    body: (raw.body ?? []) as PortableTextBlock[],
    relatedService,
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle || undefined,
          metaDescription: raw.seo.metaDescription || undefined,
        }
      : null,
  };
}
