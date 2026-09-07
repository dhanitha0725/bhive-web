# BHive Content and Data Model

## Principles

Marketing HTML and SEO-critical copy remain server-rendered. Repeated content belongs in typed local modules; editorial articles use local MDX. All proof records have `published: false` by default and are omitted unless explicitly approved.

## Proposed locations

```text
src/config/site.ts
src/content/services.ts
src/content/packages.ts
src/content/case-studies.ts
src/content/navigation.ts
src/content/insights.ts
content/insights/*.mdx
src/leads/*
src/analytics/*
src/seo/*
```

## Core schemas

`SiteConfig`: business name, canonical URL, contact channels, verified social URLs, default metadata, and operational feature flags such as `auditTurnaroundClaim`.

`Service`: `slug`, `name`, `shortDescription`, `problem`, `outcome`, `capabilities[]`, `audiences[]`, `relatedCaseStudySlugs[]`, `seo`, and `published`.

`Package`: `id`, editable `name`, `audience`, `for`, `businessProblem`, `outcome`, `capabilityGroups[]`, `cta`, `featured`, and `published`. No price field is rendered unless the owner later supplies one.

`CaseStudy`: `slug`, `client`, `industry`, `summary`, `challenge`, `scope[]`, `process[]`, `transformation`, `beforeAssets[]`, `afterAssets[]`, `results[]`, optional `testimonial`, `services[]`, `featured`, `published`, and `seo`. A result is `{ metric, value, context, source }`; incomplete or unverified results are omitted.

`Insight`: title, excerpt, author, published/updated dates, cover image, pillar, reading time, related service slugs, related post slugs, SEO title/description, and `published`. Fixed pillars are Business Architecture, Brand Strategy, Modern Marketing, Entrepreneurial Leadership, and Sustainable Growth.

## Lead boundary

The Growth Audit form collects name, business name, email, optional phone, optional website/social URL, business stage, main challenge, consent where required, and attribution context. The Founder Guidance form collects name, email, optional phone, business idea/category, current stage, biggest question/challenge, and attribution context.

Use Zod schemas on the server and a `LeadProvider` adapter with a clearly typed success/failure result. The production provider is not selected yet. Development may log or return a clearly labelled development-only result; production must fail truthfully when credentials/configuration are absent. Required environment variables will be documented with the selected provider, never committed.

## Analytics contract

Provide a provider-neutral `track(event, properties)` helper which no-ops safely when no provider is configured. Required events: `audience_path_selected`, `cta_clicked`, `growth_audit_started`, `growth_audit_submitted`, `guidance_call_started`, `guidance_call_submitted`, `service_viewed`, `package_viewed`, `case_study_viewed`, and `insight_viewed`.

Common properties: `placement`, `audience`, optional `service`, and captured campaign/referral values (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, referrer). Form submissions should include an idempotency-safe correlation ID, not raw form content in analytics.

## Asset policy

`public/` currently contains only Next.js starter SVGs and no BHive assets. Replace starter assets when brand assets arrive. Use `next/image` for approved photographs/renders and local SVG/DOM for the growth-system diagram. Keep temporary placeholder proof out of production rather than inventing a client, outcome, or logo.

