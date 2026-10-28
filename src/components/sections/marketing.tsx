"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { CaseStudy } from "@/content/case-studies";
import type { Insight } from "@/content/insights";
import { useConsultation } from "@/components/providers/consultation-provider";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { MessageSquare, ArrowRight, ArrowUpRight } from "lucide-react";

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
  const { openConsultation } = useConsultation();

  return (
    <Section className="bg-gradient-to-b from-[#0066cc] to-[#004f9e] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-mono uppercase tracking-wider text-white">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white leading-[1.15] max-w-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed font-normal">
          {body}
        </p>

        {showCta && (
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={(e) => openConsultation("page_hero", e.currentTarget)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0066cc] hover:bg-blue-50 px-6 py-3.5 text-sm sm:text-base font-semibold transition-all active:scale-[0.97] shadow-sm"
            >
              <span>Get Free Growth Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <WhatsAppLink
              location="page_hero"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-sm sm:text-base font-medium text-white hover:bg-white/10 transition-all active:scale-[0.97]"
            >
              <MessageSquare className="h-4 w-4 text-emerald-300" />
              <span>WhatsApp Us</span>
            </WhatsAppLink>
          </div>
        )}
      </Container>
    </Section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display text-slate-900 tracking-tight">
        {title}
      </h2>
      {body ? (
        <p className="mt-3 text-base text-slate-600 leading-relaxed">{body}</p>
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
    <ol className="mt-8 grid gap-5 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
            {item.industry}
          </span>
          {item.isDemo && (
            <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              Example Case
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold font-display text-slate-900">
          {item.client}
        </h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <div className="border-l-2 border-red-300 pl-3">
            <span className="text-xs font-semibold uppercase text-red-600 block">
              Challenge
            </span>
            <span className="text-slate-600">{item.challenge}</span>
          </div>

          <div className="border-l-2 border-blue-300 pl-3">
            <span className="text-xs font-semibold uppercase text-blue-600 block">
              What We Did
            </span>
            <span className="text-slate-600">{item.whatWeDid}</span>
          </div>

          <div className="border-l-2 border-emerald-400 pl-3">
            <span className="text-xs font-semibold uppercase text-emerald-700 block">
              Result
            </span>
            <span className="text-slate-800 font-medium">{item.result}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066cc] hover:text-[#0055b3] transition-colors"
        >
          <span>View case study</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export function InsightCard({ item }: { item: Insight }) {
  return (
    <article className="border-t border-slate-200 pt-5">
      <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
        {item.pillar.replaceAll("-", " ")}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-900">
        <Link
          href={`/insights/${item.slug}`}
          className="hover:text-[#0066cc] transition-colors"
        >
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.excerpt}</p>
      <p className="mt-3 font-mono text-xs text-slate-400">
        {item.readingTime} · {item.date}
      </p>
    </article>
  );
}

export function FinalCta() {
  const { openConsultation } = useConsultation();

  return (
    <Section className="bg-[#0a254f] py-16 sm:py-20 text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full">
            Start Here
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold font-display text-white">
            Ready to grow your business?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-blue-100 max-w-xl mx-auto">
            Stop guessing with random social posts or ads. Let&apos;s build a marketing plan that brings paying customers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={(e) => openConsultation("marketing_final_cta", e.currentTarget)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0a254f] hover:bg-blue-50 px-7 py-3.5 text-base font-semibold transition-all active:scale-[0.97]"
            >
              <span>Get Free Growth Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <WhatsAppLink
              location="marketing_final_cta"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-all active:scale-[0.97]"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
