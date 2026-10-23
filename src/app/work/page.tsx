import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CaseCard, FinalCta, PageHero, SectionTitle } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Client Case Studies & Work",
  description:
    "See how BHive solves real marketing roadblocks for Sri Lankan businesses with planned, practical execution.",
  path: "/work",
  noIndex: !siteConfig.showProof,
});

export default function WorkPage() {
  const publishedCases = caseStudies.filter((x) => x.published);

  // When siteConfig.showProof is false, return simple "Case studies coming soon" state with CTA
  if (!siteConfig.showProof) {
    return (
      <>
        <PageHero
          eyebrow="Our Work"
          title="Case studies coming soon."
          body="We are currently documenting recent client transformations and compiling verified results. In the meantime, we'd love to review your business and show you relevant work examples directly."
        />

        <Section className="py-16 sm:py-20">
          <Container className="max-w-3xl mx-auto text-center">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-8 sm:p-12 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0066cc] bg-blue-50 px-3 py-1 rounded-full">
                Under Preparation
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold font-display text-slate-900">
                Want to see work relevant to your industry?
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
                Reach out for a free growth consultation. We&apos;ll walk you through specific marketing setups and strategies we&apos;ve used for businesses just like yours.
              </p>
            </div>
          </Container>
        </Section>

        <FinalCta />
      </>
    );
  }

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
