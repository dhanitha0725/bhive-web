import type { CASE_STUDIES_QUERY_RESULT } from "../../sanity.types";
import {
  caseStudies as localCaseStudies,
  type CaseStudy,
  type CaseStudyMetric,
} from "@/content/case-studies";

type SanityCaseStudy = CASE_STUDIES_QUERY_RESULT[number];

const FALLBACK_IMAGES: Record<string, string> = {
  halegrove: "/images/figma/case-halegrove.png",
  "retail-brand-growth": "/images/hero/hero-showcase-1.png",
  "hospitality-booking-growth": "/images/hero/hero-showcase-2.png",
  "b2b-services-growth": "/images/hero/hero-showcase-3.png",
};

const HERO_FALLBACKS = [
  "/images/figma/case-halegrove.png",
  "/images/hero/hero-showcase-1.png",
  "/images/hero/hero-showcase-2.png",
  "/images/hero/hero-showcase-3.png",
];

export function getCaseStudyImage(item: Pick<CaseStudy, "slug" | "image">, index = 0): string {
  if (item.image) return item.image;
  return FALLBACK_IMAGES[item.slug] ?? HERO_FALLBACKS[index % HERO_FALLBACKS.length]!;
}

function mapResults(raw: SanityCaseStudy["results"]): CaseStudyMetric[] {
  return (raw ?? [])
    .filter((metric): metric is { value: string; label: string } =>
      Boolean(metric?.value && metric?.label)
    )
    .map((metric) => ({ value: metric.value, label: metric.label }));
}

export function mapCaseStudy(raw: SanityCaseStudy): CaseStudy | null {
  if (!raw?.slug || !raw?.client) return null;

  const scope = (raw.scope ?? []).flatMap((item) =>
    typeof item === "string" && item.length > 0 ? [item] : []
  );

  // The current Sanity documents are illustrative seeds and predate the
  // `results` field. Fall back to the matching local demo metrics so the
  // dialog renders its full layout until real metrics are entered in Studio.
  const results = mapResults(raw.results);
  const localResults = localCaseStudies.find((item) => item.slug === raw.slug)?.results ?? [];

  return {
    slug: raw.slug,
    client: raw.client,
    industry: raw.industry || "",
    challenge: raw.challenge || "",
    whatWeDid: raw.whatWeDid || "",
    result: raw.result || "",
    outcomeMetric: raw.outcomeMetric || undefined,
    results: results.length > 0 ? results : localResults,
    image: raw.coverImage?.url || undefined,
    scope,
    featured: Boolean(raw.featured),
    published: true,
    isDemo: Boolean(raw.isDemo),
  };
}

export function mapCaseStudies(raw: CASE_STUDIES_QUERY_RESULT | null | undefined): CaseStudy[] {
  return (raw ?? []).map(mapCaseStudy).filter((item): item is CaseStudy => item !== null);
}
