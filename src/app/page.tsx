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
import { client } from "@/sanity/client";
import { LATEST_INSIGHTS_QUERY } from "@/sanity/queries";
import type { LATEST_INSIGHTS_QUERY_RESULT } from "../../sanity.types";
import { mapInsightSummary } from "@/lib/blog/map";

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

  return (
    <>
      {/* 1. Hero: Arched cylindrical video showcase & headline */}
      <HeroSection />

      {/* 2. Services: Interactive 2-column feature breakdown */}
      <ServicesSection />

      {/* 3. Consultation Callout: Contained growth recommendation banner */}
      <ConsultationCalloutSection />

      {/* 4. Selected Work: 8-column case image + 4-column metrics & story card */}
      <SelectedWorkSection />

      {/* 5. Process: Two-track starting points & engagement model */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* 6. Blog & Insights: 3 editorial insight cards */}
      <InsightsSection posts={posts} />

      {/* 7. Partner Proof: Clients We've Worked With */}
      <TrustedPartnersSection />

      {/* 8. Client Voices / Testimonials: 3 success stories */}
      <TestimonialsSection />

      {/* 9. Frequently Asked Questions: 5-col header + 7-col interactive accordion */}
      <FaqSection />

      {/* 10. Contact CTA: Full-bleed dark conversion section */}
      <FinalCtaSection />
    </>
  );
}
