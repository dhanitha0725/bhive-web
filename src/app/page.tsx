import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPartnersSection } from "@/components/sections/trusted-partners-section";
import { SystemSection } from "@/components/sections/system-section";
import { PathwaySection } from "@/components/sections/pathway-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (Dual Value Pathways) */}
      <HeroSection />

      {/* 2. Trusted Partners & Proof Grid (Proof Section) */}
      <TrustedPartnersSection />

      {/* 3. Proven Outcomes (Measurable Commercial Growth) */}
      <div id="outcomes">
        <div id="system">
          <SystemSection />
        </div>
      </div>

      {/* 4. What We Offer (Dynamic Services with Existing & New Business Tabs) */}
      <PathwaySection />

      {/* 7. Selected Work (Watermelon Showcase/Portfolio Grid) */}
      <SelectedWorkSection />

      {/* 8. Testimonials Section (Watermelon testimonials-1) */}
      <TestimonialsSection />

      {/* 9. BHive Insights (Watermelon blog-1) */}
      <InsightsSection />

      {/* 10. Final Call to Action */}
      <FinalCtaSection />
    </>
  );
}
