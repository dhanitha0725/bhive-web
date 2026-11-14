import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
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

  if (!siteConfig.showProof) {
    return (
      <div className="w-full bg-white text-[#0b1220]">
        <PageHero
          eyebrow="Our Work"
          title="Case studies coming soon."
          body="We are currently documenting recent client transformations and compiling verified results. In the meantime, we'd love to review your business and show you relevant work examples directly."
        />

        <section className="w-full py-16 sm:py-24 bg-white">
          <Container className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-[#e5e8ee] bg-[#f5f7fa] p-8 sm:p-12">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eef3ff] text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9]">
                Under Preparation
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#0b1220]">
                Want to see work relevant to your industry?
              </h2>
              <p className="mt-3 text-base text-[#5b6475] leading-[1.6] max-w-xl mx-auto">
                Reach out for a free growth consultation. We&apos;ll walk you through specific marketing setups and strategies we&apos;ve used for businesses just like yours.
              </p>
            </div>
          </Container>
        </section>

        <FinalCta />
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-[#0b1220]">
      <PageHero
        eyebrow="Our Work"
        title="Real marketing challenges solved with clear, practical plans."
        body="Each case shows the exact challenge, what we built, and the real outcome achieved for the business."
      />

      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          <SectionTitle
            eyebrow="Proven Solutions"
            title="Challenge, action, and results."
            body="These examples illustrate how our services combine to solve actual roadblocks for businesses across Sri Lanka."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedCases.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
