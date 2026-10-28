import { insights } from "@/content/insights";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta, InsightCard, PageHero } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";

const publishedCount = insights.filter((x) => x.published).length;

export const metadata = createMetadata({
  title: "Marketing & Business Insights for Sri Lankan Owners",
  description:
    "Practical thinking about business strategy, brand, and marketing that brings real paying customers.",
  path: "/insights",
  noIndex: publishedCount < 3,
});

export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="BHive Insights"
        title="Better growth starts with better decisions."
        body="Practical thinking about business strategy, brand, marketing, and building something that can grow."
      />
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {insights.map((x) => (
              <InsightCard key={x.slug} item={x} />
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
