import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
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
    <div className="w-full bg-white text-[#0b1220]">
      <PageHero
        eyebrow="What We Do"
        title="Practical marketing services designed to bring real paying customers."
        body="No jargon or unnecessary complexity. Five focused services that solve specific business roadblocks and work together as a clear growth plan."
      />

      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          {/* 5 Anchored Service Sections */}
          <div className="space-y-8 sm:space-y-10">
            {services.map((service, index) => (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-10 lg:p-12"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
                  {/* Left Column: Number, Title, Problem Solved */}
                  <div className="lg:max-w-md shrink-0">
                    <span className="text-xs font-medium text-[#3068f9] uppercase tracking-[0.15em]">
                      Service 0{index + 1}
                    </span>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#0b1220]">
                      {service.name}
                    </h2>

                    <div className="mt-5 rounded-xl bg-[#f5f7fa] border border-[#e5e8ee] p-4 sm:p-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5b6475] mb-1.5">
                        Problem It Solves
                      </p>
                      <p className="text-sm sm:text-base text-[#0b1220] leading-[1.6]">
                        {service.problemSolved}
                      </p>
                    </div>

                    <div className="mt-3.5 rounded-xl bg-[#eef3ff] border border-[#dce6fb] p-4 sm:p-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#3068f9] mb-1.5">
                        Target Outcome
                      </p>
                      <p className="text-sm sm:text-base text-[#0b1220] font-medium leading-[1.6]">
                        {service.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Scope Deliverables */}
                  <div className="flex-1 lg:pl-10 lg:border-l lg:border-[#e5e8ee]">
                    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#5b6475] mb-5">
                      What is included in this service
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.scope.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl bg-[#f5f7fa] p-3.5 text-sm text-[#0b1220] border border-[#e5e8ee]"
                        >
                          <div className="h-5 w-5 rounded-full bg-[#eef3ff] text-[#3068f9] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span className="font-medium leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
