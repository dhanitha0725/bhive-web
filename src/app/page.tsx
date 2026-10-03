import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPartnersSection } from "@/components/sections/trusted-partners-section";
import { BentoOutcomes } from "@/components/sections/bento-outcomes";
import { PathwaySection } from "@/components/sections/pathway-section";
import { SystemSection } from "@/components/sections/system-section";
import { ExistingBusinessSection } from "@/components/sections/existing-business-section";
import { FoundersSection } from "@/components/sections/founders-section";
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

      {/* 3. Built for Business Outcomes (Watermelon bento-01) */}
      <div id="outcomes">
        <BentoOutcomes />
      </div>

      {/* 3. Choose Your Path (Watermelon Pathway Cards) */}
      <PathwaySection />

      {/* 4. The BHive System (Watermelon feature-1) */}
      <div id="system">
        <SystemSection />
      </div>

      {/* 5. For Existing Businesses (Watermelon Split Transformation Card) */}
      <ExistingBusinessSection />

      {/* 6. For Founders (Watermelon Stepper/Process Progression) */}
      <FoundersSection />

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
