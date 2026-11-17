import type { CaseStudy } from "@/content/case-studies";
import { caseStudies as fallbackCaseStudies } from "@/content/case-studies";
import { Container } from "@/components/ui/container";
import { CaseStudyGrid } from "@/components/work/case-study-grid";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { createMetadata } from "@/seo/metadata";
import { siteConfig } from "@/config/site";
import { client } from "@/sanity/client";
import { CASE_STUDIES_QUERY } from "@/sanity/queries";
import { mapCaseStudies } from "@/lib/case-studies";
import type { CASE_STUDIES_QUERY_RESULT } from "../../../sanity.types";

export const metadata = createMetadata({
  title: "Case Studies & Client Work | BHive Marketing",
  description:
    "See how BHive solves real marketing challenges for Sri Lankan businesses with planned, practical execution and measurable growth.",
  path: "/work",
  noIndex: siteConfig.proofIsDemo,
});

export default async function WorkPage() {
  let studies: CaseStudy[] = [];

  if (siteConfig.showProof) {
    const sanityCases = await client
      .fetch<CASE_STUDIES_QUERY_RESULT>(CASE_STUDIES_QUERY, {}, { useCdn: false })
      .catch(() => []);

    studies = mapCaseStudies(sanityCases).filter((item) => item.published);

    if (studies.length === 0) {
      studies = fallbackCaseStudies.filter((item) => item.published);
    }
  }

  return (
    <div className="w-full bg-white text-[#0b1220]">
      {/* 1. Hero / Header Section */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
        <Container>
          <div className="mx-auto flex max-w-[840px] flex-col items-center text-center">
            <span className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9] sm:mb-4 sm:text-[13px]">
              SELECTED CLIENT WORK
            </span>

            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-[#0b1220] sm:text-6xl lg:text-[72px]">
              Case Studies &amp; Work
            </h1>

            <p className="mt-4 max-w-[640px] text-base font-normal leading-[1.6] text-[#5b6475] sm:mt-5 sm:text-lg">
              Real marketing challenges solved with structured systems, predictable customer
              acquisition, and zero agency fluff.
            </p>

            {siteConfig.proofIsDemo && studies.length > 0 ? (
              <p className="mt-5 max-w-[620px] rounded-xl border border-[#e5e8ee] bg-[#f5f7fa] px-4 py-3 text-xs leading-relaxed text-[#5b6475] sm:text-[13px]">
                These are illustrative examples built to demonstrate the format. Verified client
                results will replace them.
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* 2. Case Studies Grid */}
      <section className="pb-24 sm:pb-32 lg:pb-40">
        <Container>
          {studies.length === 0 ? (
            <div className="mx-auto max-w-md py-20 text-center">
              <p className="text-xl font-medium text-[#0b1220]">Case studies coming soon.</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6475]">
                We are currently documenting recent client transformations and compiling verified
                results.
              </p>
            </div>
          ) : (
            <CaseStudyGrid studies={studies} />
          )}
        </Container>
      </section>

      {/* 3. Final Conversion CTA */}
      <FinalCtaSection />
    </div>
  );
}
