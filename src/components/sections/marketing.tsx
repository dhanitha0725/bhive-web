"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import type { CaseStudy } from "@/content/case-studies";
import type { InsightSummary } from "@/lib/blog/types";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { BlogCard } from "@/components/blog/blog-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  body,
  showCta = true,
}: {
  eyebrow: string;
  title: string;
  body: string;
  showCta?: boolean;
}) {
  return (
    <section className="w-full bg-white text-[#0b1220] pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 lg:pb-20 border-b border-[#e5e8ee]">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[840px] mx-auto">
          <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase mb-3 sm:mb-4">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-medium tracking-[-0.035em] leading-[1.06] text-[#0b1220]">
            {title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5b6475] leading-[1.6] max-w-[640px] font-normal">
            {body}
          </p>

          {showCta && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <PillButton
                treatment="primary"
                isConsultation
                consultationLocation="page_hero"
                showArrow
                className="w-full sm:w-auto"
              >
                Get free growth consultation
              </PillButton>

              <WhatsAppLink
                location="page_hero"
                className="inline-flex items-center justify-center gap-2 h-13 sm:h-[60px] px-6 sm:px-8 rounded-full border border-[#e5e8ee] bg-white hover:border-[#c5cbe0] hover:bg-[#f5f7fa] text-[15px] font-medium text-[#0b1220] transition-colors duration-200 w-full sm:w-auto"
              >
                <MessageSquare className="h-4 w-4 text-[#3068f9]" strokeWidth={1.75} />
                <span>WhatsApp us</span>
              </WhatsAppLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "max-w-3xl mx-auto text-center" : "max-w-3xl"}>
      <span className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.15em] text-[#3068f9]">
        {eyebrow}
      </span>
      <h2 className="mt-2.5 text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-[-0.03em] leading-[1.1] text-[#0b1220]">
        {title}
      </h2>
      {body ? (
        <p className="mt-3.5 text-base sm:text-lg text-[#5b6475] leading-[1.6]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function SystemSteps({
  steps,
}: {
  steps: Array<{ title: string; body: string }>;
}) {
  return (
    <ol className="mt-10 grid gap-6 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-8"
        >
          <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#eef3ff] text-xs font-medium text-[#3068f9] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-xl font-medium tracking-[-0.02em] text-[#0b1220]">
            {step.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-[#5b6475] leading-[1.6]">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-8 hover:border-[#c5cbe0] transition-colors duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#5b6475]">
            {item.industry}
          </span>
          {item.isDemo && (
            <span className="text-[11px] font-medium bg-[#eef3ff] text-[#3068f9] px-2.5 py-0.5 rounded-full">
              Example Case
            </span>
          )}
        </div>

        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[#0b1220]">
          {item.client}
        </h3>

        <div className="mt-5 space-y-4 text-sm leading-[1.6]">
          <div className="border-l-2 border-[#e5e8ee] pl-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#5b6475] block mb-0.5">
              Challenge
            </span>
            <span className="text-[#5b6475]">{item.challenge}</span>
          </div>

          <div className="border-l-2 border-[#3068f9]/40 pl-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#3068f9] block mb-0.5">
              What We Did
            </span>
            <span className="text-[#5b6475]">{item.whatWeDid}</span>
          </div>

          <div className="border-l-2 border-[#3068f9] pl-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#0b1220] block mb-0.5">
              Result
            </span>
            <span className="text-[#0b1220] font-medium">{item.result}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-[#e5e8ee] flex items-center justify-between">
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3068f9] hover:text-[#1f55e0] transition-colors"
        >
          <span>View case study</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </Card>
  );
}

export function InsightCard({ item }: { item: InsightSummary }) {
  return <BlogCard post={item} />;
}

export function FinalCta() {
  return <FinalCtaSection />;
}
