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
  const rawPosts = await client.fetch<LATEST_INSIGHTS_QUERY_RESULT>(
    LATEST_INSIGHTS_QUERY,
    {},
    { useCdn: false }
  );
  const posts = (rawPosts || []).map(mapInsightSummary);

  return (
    <>
      {/* 1. Hero: 12-Column Stretch Grid with 4 rhythmic photo cards */}
      <HeroSection />

      {/* 2. Partner Proof: 5 distributed partner badges */}
      <TrustedPartnersSection />

      {/* 3. Services: Interactive 2-column feature breakdown */}
      <ServicesSection />

      {/* 4. Consultation Callout: Contained growth recommendation banner */}
      <ConsultationCalloutSection />

      {/* 5. Selected Work: 8-column case image + 4-column metrics & story card */}
      <SelectedWorkSection />

      {/* 6. Process: 3-step getting started cards */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* 7. Blog & Insights: 3 editorial insight cards */}
      <InsightsSection posts={posts} />

      {/* 8. Client Voices / Testimonials: 3 success stories */}
      <TestimonialsSection />

      {/* 9. Frequently Asked Questions: 5-col header + 7-col interactive accordion */}
      <FaqSection />

      {/* 10. Contact CTA: Full-bleed dark conversion section */}
      <FinalCtaSection />
    </>
  );
}
