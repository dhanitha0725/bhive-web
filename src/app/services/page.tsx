import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero, FinalCta } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";
import { Check } from "lucide-react";

export const metadata = createMetadata({
  title: "Marketing Services for Sri Lankan Businesses",
  description:
    "Explore our 5 core services: Business Strategy, Brand & Identity, Marketing Strategy, Website, and Content & Social.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Practical marketing services designed to bring real paying customers."
        body="No jargon or unnecessary complexity. Five focused services that solve specific business roadblocks and work together as a clear growth plan."
      />

      <Section className="py-12 sm:py-16">
        <Container>
          {/* 5 Anchored Service Sections */}
          <div className="space-y-16 sm:space-y-24">
            {services.map((service, index) => (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Left Column: Number, Title, Problem Solved */}
                  <div className="lg:max-w-md">
                    <span className="font-mono text-xs font-bold text-[#0066cc] uppercase tracking-wider">
                      Service 0{index + 1}
                    </span>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display text-slate-900">
                      {service.name}
                    </h2>

                    <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Problem It Solves
                      </p>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {service.problemSolved}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
                        Target Outcome
                      </p>
                      <p className="text-sm sm:text-base text-blue-900 font-medium leading-relaxed">
                        {service.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Scope Deliverables */}
                  <div className="flex-1 lg:pl-6 lg:border-l lg:border-slate-100">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 mb-4">
                      What is included in this service
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.scope.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 rounded-lg bg-slate-50/60 p-3 text-sm text-slate-700 border border-slate-100"
                        >
                          <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span className="font-medium text-slate-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
