"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { CaseStudy } from "@/content/case-studies";
import { getCaseStudyImage } from "@/lib/case-studies";

interface CaseStudyCardProps {
  item: CaseStudy;
  index?: number;
  onOpen: () => void;
  className?: string;
}

export function CaseStudyCard({ item, index = 0, onOpen, className = "" }: CaseStudyCardProps) {
  const isDemo = item.isDemo || siteConfig.proofIsDemo;

  return (
    <article className={`h-full ${className}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View the ${item.client} case study`}
        className="group flex h-full w-full flex-col rounded-2xl border border-[#e5e8ee] bg-white p-6 text-left transition-colors duration-200 ease-out hover:border-[#c5cbe0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3068f9] focus-visible:ring-offset-4 sm:p-7"
      >
        {/* Visual preview */}
        <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#e5e8ee] bg-[#f5f7fa]">
          <img
            src={getCaseStudyImage(item, index)}
            alt={`${item.client} case study`}
            className="h-full w-full object-cover"
          />
          {item.outcomeMetric ? (
            <span className="absolute right-3.5 top-3.5 rounded-full bg-[#0b1220] px-3 py-1 text-xs font-semibold text-white">
              {item.outcomeMetric}
            </span>
          ) : null}
        </div>

        {/* Industry and demo marker */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#3068f9]">
            {item.industry}
          </span>
          {isDemo ? (
            <span className="rounded-full border border-[#dce6fb] bg-[#eef3ff] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1f55e0]">
              Illustrative example
            </span>
          ) : null}
        </div>

        {/* Client */}
        <h3 className="text-xl font-medium tracking-tight text-[#0b1220] transition-colors duration-200 group-hover:text-[#3068f9] sm:text-2xl">
          {item.client}
        </h3>

        {/* Story */}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5b6475]">{item.challenge}</p>

        {/* Result */}
        <div className="mt-5 rounded-xl border border-[#e5e8ee] bg-[#f5f7fa] p-4">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#3068f9]">
            Result delivered
          </span>
          <p className="text-sm font-medium leading-snug text-[#0b1220]">{item.result}</p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e5e8ee] pt-6">
          <div className="flex flex-wrap gap-1.5">
            {(item.scope || []).slice(0, 2).map((scope) => (
              <span
                key={scope}
                className="rounded-md border border-[#dce6fb] bg-[#eef3ff] px-2 py-0.5 text-[11px] font-medium text-[#1f55e0]"
              >
                {scope}
              </span>
            ))}
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#0b1220] transition-colors duration-200 group-hover:text-[#3068f9]">
            <span>View case study</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
    </article>
  );
}
