import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/blog/blog-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
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
    <div className="w-full bg-white text-[#0b1220]">
      {/* Hero / Header Section: Centered typography aligned with Figma node 189:140 */}
      <section className="pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
            {/* Eyebrow */}
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase mb-3 sm:mb-4">
              IDEAS THAT MOVE BUSINESS
            </span>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium tracking-[-0.035em] leading-[1.08] text-[#0b1220]">
              Blog &amp; Insights
            </h1>

            {/* Subline */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5b6475] leading-[1.6] max-w-[620px] font-normal">
              Practical thinking about business strategy, brand, and marketing that brings real paying customers.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Listing Grid */}
      <section className="pb-24 sm:pb-32 lg:pb-40">
        <Container>
          {posts.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <p className="text-xl font-medium text-[#0b1220]">First insight coming soon.</p>
              <p className="mt-2 text-sm text-[#5b6475] leading-relaxed">
                Practical thinking about business strategy, brand, and marketing is on the way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {posts.map((post, index) => (
                <div key={post.slug || post._id} className="h-full">
                  <BlogCard post={post} priority={index === 0} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Conversion Section: Official dark ink CTA band leading into footer */}
      <FinalCtaSection />
    </div>
  );
}
