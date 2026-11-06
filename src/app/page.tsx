import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPartnersSection } from "@/components/sections/trusted-partners-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { PathwaySection } from "@/components/sections/pathway-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "BHive — Marketing for Sri Lankan Businesses",
  description:
    "Helping small and medium businesses in Sri Lanka get more customers with planned, practical marketing. Strategy, branding, web development, content, and growth.",
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* 1. Hero: Plain headline, subline, primary CTA + WhatsApp */}
      <HeroSection />

      {/* 2. Logo & Stat Strip: Slim stat counters with TODO placeholders */}
      <TrustedPartnersSection />

      {/* 3. The Transformation: Merged Problems & Results in one unified section */}
      <div id="outcomes">
        <ProblemSection />
      </div>

      {/* 4. Services: 5 plain-named cards linking to /services#slug */}
      <PathwaySection />

      {/* 6. How it works: 3 steps */}
      <HowItWorksSection />

      {/* 7. Work: 2-3 case cards in Challenge -> What we did -> Result */}
      <SelectedWorkSection />

      {/* 8. Testimonials: Placed directly before final CTA */}
      <TestimonialsSection />

      {/* 9. FAQ: Pricing, timeline, process, Sinhala/Tamil/English */}
      <FaqSection />

      {/* 10. Final Call to Action */}
      <FinalCtaSection />
    </>
  );
}
