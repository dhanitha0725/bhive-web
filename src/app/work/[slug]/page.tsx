import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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

  // If proof is disabled, ensure demo case studies are marked as noindex
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
    <>
      <PageHero
        eyebrow={`Case Study · ${x.industry}`}
        title={x.client}
        body={x.result}
      />

      <Section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {x.isDemo && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-mono text-amber-900">
                {/* TODO: replace with verified client engagement data */}
                Example case study for demonstration. Real client engagement data will be displayed upon verification.
              </div>
            )}

            {/* 1. Challenge */}
            <div className="rounded-[22px] border border-red-200/80 bg-red-50/40 p-6 sm:p-8">
              <SectionTitle
                eyebrow="The Roadblock"
                title="The Challenge"
                body={x.challenge}
              />
            </div>

            {/* 2. What We Did */}
            <div className="rounded-[22px] border border-blue-200/80 bg-blue-50/40 p-6 sm:p-8">
              <SectionTitle
                eyebrow="The Action"
                title="What We Did"
                body={x.whatWeDid}
              />

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
                  Scope of work delivered:
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {x.scope.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-medium text-blue-900"
                    >
                      <Check className="h-3.5 w-3.5 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. The Result */}
            <div className="rounded-[22px] border border-emerald-200/80 bg-emerald-50/40 p-6 sm:p-8">
              <SectionTitle
                eyebrow="The Outcome"
                title="The Result"
                body={x.result}
              />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
