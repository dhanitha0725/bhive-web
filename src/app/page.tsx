import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPartnersSection } from "@/components/sections/trusted-partners-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { OutcomesSection } from "@/components/sections/system-section";
import { PathwaySection } from "@/components/sections/pathway-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero: Plain headline, subline, primary CTA + WhatsApp */}
      <HeroSection />

      {/* 2. Logo & Stat Strip: Slim stat counters with TODO placeholders */}
      <TrustedPartnersSection />

      {/* 3. Problem: 4 business owner pains */}
      <ProblemSection />

      {/* 4. Outcomes: 4 compact blocks in owner language */}
      <div id="outcomes">
        <OutcomesSection />
      </div>

      {/* 5. Services: 5 plain-named cards linking to /services#slug */}
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
