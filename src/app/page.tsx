import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPartnersSection } from "@/components/sections/trusted-partners-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ConsultationCalloutSection } from "@/components/sections/consultation-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { createMetadata } from "@/seo/metadata";
import { siteConfig } from "@/config/site";
import { client } from "@/sanity/client";
import {
  CASE_STUDIES_QUERY,
  LATEST_INSIGHTS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import type {
  CASE_STUDIES_QUERY_RESULT,
  LATEST_INSIGHTS_QUERY_RESULT,
  TESTIMONIALS_QUERY_RESULT,
} from "../../sanity.types";
import type { CaseStudy } from "@/content/case-studies";
import { mapInsightSummary } from "@/lib/blog/map";
import { mapCaseStudies } from "@/lib/case-studies";
import { mapTestimonials, type TestimonialView } from "@/lib/testimonials";

export const metadata = createMetadata({
  title: "BHive — Marketing for Sri Lankan Businesses",
  description:
    "Helping businesses in Sri Lanka attract and close customers with tailored marketing, strategy, branding, and digital execution.",
  path: "/",
});

export default async function Home() {
  let posts: ReturnType<typeof mapInsightSummary>[] = [];
  try {
    const rawPosts = await client.fetch<LATEST_INSIGHTS_QUERY_RESULT>(
      LATEST_INSIGHTS_QUERY,
      {},
      { useCdn: false }
    );
    posts = (rawPosts || []).map(mapInsightSummary);
  } catch (error) {
    console.warn("Failed to fetch latest insights for homepage:", error);
  }

  let caseStudies: CaseStudy[] = [];
  if (siteConfig.showProof) {
    try {
      const rawCases = await client.fetch<CASE_STUDIES_QUERY_RESULT>(
        CASE_STUDIES_QUERY,
        {},
        { useCdn: false }
      );
      caseStudies = mapCaseStudies(rawCases);
    } catch (error) {
      console.warn("Failed to fetch case studies for homepage:", error);
    }
  }

  let testimonials: TestimonialView[] = [];
  if (siteConfig.showProof) {
    try {
      const rawTestimonials = await client.fetch<TESTIMONIALS_QUERY_RESULT>(
        TESTIMONIALS_QUERY,
        {},
        { useCdn: false }
      );
      testimonials = mapTestimonials(rawTestimonials);
    } catch (error) {
      console.warn("Failed to fetch testimonials for homepage:", error);
    }
  }

  return (
    <>
      {/* 1. Hero: Arched cylindrical video showcase & headline */}
      <HeroSection />

      {/* 2. Services: Interactive 2-column feature breakdown */}
      <ServicesSection />

      {/* 3. Consultation Callout: Contained growth recommendation banner */}
      <ConsultationCalloutSection />

      {/* 4. Selected Work: Multiple case cards */}
      {siteConfig.showProof ? <SelectedWorkSection caseStudies={caseStudies} /> : null}

      {/* 5. Process: Two-track starting points & engagement model */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* 6. Blog & Insights: 3 editorial insight cards */}
      <InsightsSection posts={posts} />

      {/* 7. Partner Proof: Clients We've Worked With */}
      <TrustedPartnersSection />

      {/* 8. Client Voices / Testimonials: 3 success stories */}
      {siteConfig.showProof ? <TestimonialsSection testimonials={testimonials} /> : null}

      {/* 9. Frequently Asked Questions: 5-col header + 7-col interactive accordion */}
      <FaqSection />

      {/* 10. Contact CTA: Full-bleed dark conversion section */}
      <FinalCtaSection />
    </>
  );
}
