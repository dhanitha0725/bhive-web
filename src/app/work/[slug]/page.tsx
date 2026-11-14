import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { FinalCta, PageHero, SectionTitle } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.filter((x) => x.published).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const x = getCaseStudy(resolvedParams.slug);
  if (!x) return {};

  const baseMeta = createMetadata({
    title: `${x.client} Case Study`,
    description: x.result,
    path: `/work/${x.slug}`,
  });

  if (!siteConfig.showProof) {
    return {
      ...baseMeta,
      robots: { index: false, follow: false },
    };
  }

  return baseMeta;
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const x = getCaseStudy(resolvedParams.slug);
  if (!x) notFound();

  return (
    <div className="w-full bg-white text-[#0b1220]">
      <PageHero
        eyebrow={`Case Study · ${x.industry}`}
        title={x.client}
        body={x.result}
      />

      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            {x.isDemo && (
              <div className="rounded-xl border border-[#e5e8ee] bg-[#f5f7fa] p-4 text-xs text-[#5b6475]">
                Example case study for demonstration. Real client engagement data will be displayed upon verification.
              </div>
            )}

            {/* 1. Challenge */}
            <div className="rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-9">
              <SectionTitle
                eyebrow="The Roadblock"
                title="The Challenge"
                body={x.challenge}
              />
            </div>

            {/* 2. What We Did */}
            <div className="rounded-2xl border border-[#e5e8ee] bg-[#f5f7fa] p-7 sm:p-9">
              <SectionTitle
                eyebrow="The Action"
                title="What We Did"
                body={x.whatWeDid}
              />

              <div className="mt-6 pt-6 border-t border-[#e5e8ee]">
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#5b6475] mb-3.5">
                  Scope of work delivered
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {x.scope.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#e5e8ee] px-3.5 py-1.5 text-xs font-medium text-[#0b1220]"
                    >
                      <Check className="h-3.5 w-3.5 text-[#3068f9]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. The Result */}
            <div className="rounded-2xl border border-[#dce6fb] bg-[#eef3ff] p-7 sm:p-9">
              <SectionTitle
                eyebrow="The Outcome"
                title="The Result"
                body={x.result}
              />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
