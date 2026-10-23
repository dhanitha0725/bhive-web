import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CaseCard, FinalCta, PageHero, SectionTitle } from "@/components/sections/marketing";

export const metadata: Metadata = {
  title: "Client Case Studies & Real Results",
  description:
    "See how BHive solves real marketing roadblocks for Sri Lankan businesses with planned, practical execution.",
};

export default function WorkPage() {
  const publishedCases = caseStudies.filter((x) => x.published);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Real marketing challenges solved with clear, practical plans."
        body="Each case shows the exact challenge, what we built, and the real outcome achieved for the business."
      />

      <Section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            eyebrow="Proven Solutions"
            title="Challenge, action, and results."
            body="These examples illustrate how our 5 services combine to solve actual roadblocks for businesses across Sri Lanka."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedCases.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
