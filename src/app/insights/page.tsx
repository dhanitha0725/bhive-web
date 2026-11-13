import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta, InsightCard, PageHero } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";
import { client } from "@/sanity/client";
import { INSIGHT_COUNT_QUERY, INSIGHT_SUMMARIES_QUERY } from "@/sanity/queries";
import type {
  INSIGHT_COUNT_QUERY_RESULT,
  INSIGHT_SUMMARIES_QUERY_RESULT,
} from "../../../sanity.types";
import { mapInsightSummary } from "@/lib/blog/map";

export async function generateMetadata(): Promise<Metadata> {
  const publishedCount = await client.fetch<INSIGHT_COUNT_QUERY_RESULT>(
    INSIGHT_COUNT_QUERY,
    {},
    { useCdn: false }
  );

  return createMetadata({
    title: "Marketing & Business Insights for Sri Lankan Owners",
    description:
      "Practical thinking about business strategy, brand, and marketing that brings real paying customers.",
    path: "/insights",
    noIndex: (publishedCount ?? 0) < 3,
  });
}

export default async function Insights() {
  const rawPosts = await client.fetch<INSIGHT_SUMMARIES_QUERY_RESULT>(
    INSIGHT_SUMMARIES_QUERY,
    {},
    { useCdn: false }
  );
  const posts = (rawPosts || []).map(mapInsightSummary);

  return (
    <>
      <PageHero
        eyebrow="BHive Insights"
        title="Better growth starts with better decisions."
        body="Practical thinking about business strategy, brand, marketing, and building something that can grow."
      />
      <Section className="py-12 sm:py-16">
        <Container>
          {posts.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-lg">First insight coming soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {posts.map((x) => (
                <InsightCard key={x.slug} item={x} />
              ))}
            </div>
          )}
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
