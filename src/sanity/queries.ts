import { defineQuery } from "next-sanity";

export const INSIGHT_SUMMARIES_QUERY = defineQuery(/* groq */ `
  *[_type == "insight" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "pillar": pillar->{ name, "slug": slug.current },
    "coverImage": coverImage{ ..., "alt": alt },
    publishedAt,
    readingTime
  }
`);

export const LATEST_INSIGHTS_QUERY = defineQuery(/* groq */ `
  *[_type == "insight" && defined(slug.current)] | order(publishedAt desc, _createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "pillar": pillar->{ name, "slug": slug.current },
    "coverImage": coverImage{ ..., "alt": alt },
    publishedAt,
    readingTime
  }
`);

export const INSIGHT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "insight" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "pillar": pillar->{ name, "slug": slug.current },
    "coverImage": coverImage{ ..., "alt": alt },
    publishedAt,
    readingTime,
    body,
    "relatedService": relatedService->{ name, "slug": slug.current },
    seo
  }
`);

export const INSIGHT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "insight" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`);

export const INSIGHT_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[_type == "insight" && defined(slug.current)])
`);

export const PILLARS_QUERY = defineQuery(/* groq */ `
  *[_type == "pillar"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }
`);

export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    problemSolved,
    scope,
    outcome,
    seo
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0] {
    siteName,
    description,
    contactEmail,
    whatsappNumber,
    whatsappDisplayNumber,
    whatsappMessage,
    showProof
  }
`);
