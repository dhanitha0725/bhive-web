/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { BlogCard } from "@/components/blog/blog-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { createMetadata } from "@/seo/metadata";
import { client } from "@/sanity/client";
import {
  INSIGHT_BY_SLUG_QUERY,
  INSIGHT_COUNT_QUERY,
  INSIGHT_SLUGS_QUERY,
  INSIGHT_SUMMARIES_QUERY,
} from "@/sanity/queries";
import type {
  INSIGHT_BY_SLUG_QUERY_RESULT,
  INSIGHT_COUNT_QUERY_RESULT,
  INSIGHT_SLUGS_QUERY_RESULT,
  INSIGHT_SUMMARIES_QUERY_RESULT,
} from "../../../../sanity.types";
import { mapInsightArticle, mapInsightSummary } from "@/lib/blog/map";
import { ArticleBody } from "@/components/sanity/article-body";

export const dynamicParams = false;

export async function generateStaticParams() {
  const insights = await client.fetch<INSIGHT_SLUGS_QUERY_RESULT>(
    INSIGHT_SLUGS_QUERY,
    {},
    { useCdn: false }
  );
  return (insights || []).map((x) => ({ slug: x.slug ?? "" })).filter((x) => Boolean(x.slug));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawPost = await client.fetch<INSIGHT_BY_SLUG_QUERY_RESULT>(
    INSIGHT_BY_SLUG_QUERY,
    { slug },
    { useCdn: false }
  );
  if (!rawPost) return {};

  const post = mapInsightArticle(rawPost);
  const publishedCount = await client.fetch<INSIGHT_COUNT_QUERY_RESULT>(
    INSIGHT_COUNT_QUERY,
    {},
    { useCdn: false }
  );
  const isNoIndex = (publishedCount ?? 0) < 3;

  return createMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    path: `/insights/${post.slug}`,
    noIndex: isNoIndex,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawPost = await client.fetch<INSIGHT_BY_SLUG_QUERY_RESULT>(
    INSIGHT_BY_SLUG_QUERY,
    { slug },
    { useCdn: false }
  );
  if (!rawPost) notFound();

  const post = mapInsightArticle(rawPost);
  const relatedServiceHref = post.relatedService
    ? `/services#${post.relatedService.slug}`
    : "/services";

  // Fetch recent insights for the "Recent blogs" section (Figma node 193:418)
  const rawLatest = await client.fetch<INSIGHT_SUMMARIES_QUERY_RESULT>(
    INSIGHT_SUMMARIES_QUERY,
    {},
    { useCdn: false }
  );
  const allPosts = (rawLatest || []).map(mapInsightSummary);
  // Exclude current article from the recent list
  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="w-full bg-white text-[#0b1220]">
      {/* 1. Article Header Section (Figma node 192:349 & 192:304) */}
      <header className="pt-32 sm:pt-40 lg:pt-44 pb-6 sm:pb-8">
        <Container>
          <div className="flex flex-col items-center text-center max-w-[920px] mx-auto">
            {/* Metadata Eyebrow: Category • Reading time */}
            <p className="text-sm sm:text-base text-[#5b6475] font-normal leading-[1.6] mb-4 sm:mb-6">
              {post.pillarName ? `${post.pillarName}  •  ` : ""}
              {post.readingTime || "4 min read"}
            </p>

            {/* Main Headline: H2 scale in design system, 60px medium leading 1.05 */}
            <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.035em] leading-[1.05] text-[#0b1220]">
              {post.title}
            </h1>

            {/* Excerpt / Lead intro */}
            {post.excerpt ? (
              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-[#5b6475] leading-[1.6] max-w-[850px] font-normal">
                {post.excerpt}
              </p>
            ) : null}
          </div>

          {/* 2. Hero Featured Image (Figma node 192:348) */}
          {post.coverImage ? (
            <div className="mt-10 sm:mt-14 lg:mt-16 w-full">
              <div className="relative aspect-[16/8] sm:aspect-[2/1] w-full rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee]">
                <img
                  src={post.coverImage.url}
                  srcSet={post.coverImage.srcSet}
                  sizes="(max-width: 1440px) 100vw, 1280px"
                  alt={post.coverImage.alt || post.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </Container>
      </header>

      {/* 3. Article Body Content Column (Figma reading column width = 848px centered) */}
      <section className="pt-8 sm:pt-12 pb-20 sm:pb-28 lg:pb-32">
        <div className="max-w-[850px] mx-auto px-5 sm:px-8">
          <ArticleBody value={post.body} />

          {/* Related Service Anchor */}
          {post.relatedService ? (
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[#e5e8ee] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium tracking-[0.15em] text-[#3068f9] uppercase block mb-1">
                  RELATED SERVICE
                </span>
                <p className="text-base sm:text-lg font-medium text-[#0b1220]">
                  {post.relatedService.name}
                </p>
              </div>
              <Link
                href={relatedServiceHref}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#3068f9] hover:text-[#1f55e0] transition-colors group"
              >
                <span>Explore our services</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Recent Blogs Section (Figma node 193:418 - 193:433) */}
      {recentPosts.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-32 border-t border-[#e5e8ee] bg-[#f5f7fa]">
          <Container>
            {/* Header: Recent blogs title + View all insights button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase mb-3 block">
                  KEEP READING
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]">
                  Recent blogs
                </h2>
              </div>

              <PillButton treatment="outline" href="/insights" showArrow>
                View all insights
              </PillButton>
            </div>

            {/* 3-Column Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {recentPosts.map((recent) => (
                <div key={recent.slug || recent._id} className="h-full">
                  <BlogCard post={recent} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. Official Dark Conversion Section */}
      <FinalCtaSection />
    </article>
  );
}
