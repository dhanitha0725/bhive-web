/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";
import { client } from "@/sanity/client";
import {
  INSIGHT_BY_SLUG_QUERY,
  INSIGHT_COUNT_QUERY,
  INSIGHT_SLUGS_QUERY,
} from "@/sanity/queries";
import type {
  INSIGHT_BY_SLUG_QUERY_RESULT,
  INSIGHT_COUNT_QUERY_RESULT,
  INSIGHT_SLUGS_QUERY_RESULT,
} from "../../../../sanity.types";
import { mapInsightArticle } from "@/lib/blog/map";
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

  return (
    <>
      <article>
        <Section className="bg-[#0066cc] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Container className="max-w-4xl">
            <span className="eyebrow eyebrow-light text-white/80">
              {post.pillarName}
            </span>
            <h1 className="display mt-4 text-white">{post.title}</h1>
            <p className="mt-5 text-blue-100 text-lg leading-relaxed">{post.excerpt}</p>
            <p className="mt-5 font-mono text-xs text-blue-200">
              {post.date} · {post.readingTime}
            </p>
          </Container>
        </Section>

        {post.coverImage ? (
          <Section className="pt-8 pb-0 sm:pt-12">
            <Container className="max-w-4xl">
              <img
                src={post.coverImage.url}
                srcSet={post.coverImage.srcSet}
                sizes="(max-width: 896px) 100vw, 896px"
                alt={post.coverImage.alt}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/9] object-cover rounded-2xl border border-neutral-200"
              />
            </Container>
          </Section>
        ) : null}

        <Section className="py-12 sm:py-16">
          <Container className="max-w-3xl">
            <ArticleBody value={post.body} />
            <Link
              href={relatedServiceHref}
              className="mt-10 inline-block border-l-2 border-[#0066cc] pl-4 font-semibold text-[#0066cc] hover:underline"
            >
              Explore our services
            </Link>
          </Container>
        </Section>
      </article>
      <FinalCta />
    </>
  );
}
