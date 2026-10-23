"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/case-studies";
import { ArrowUpRight } from "lucide-react";

export function SelectedWorkSection() {
  const cases = caseStudies.filter((x) => x.published).slice(0, 3);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Case Studies
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            How we solve real business challenges
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical marketing systems built to solve specific roadblocks and bring measurable sales.
          </p>
        </div>

        {/* 3 Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {cases.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col justify-between rounded-[22px] border border-slate-200 bg-slate-50/70 p-6 sm:p-7 transition-all duration-200 hover:border-blue-400 hover:bg-white hover:shadow-md"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
                    {item.industry}
                  </span>
                  {item.isDemo && (
                    <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                      Example Case
                    </span>
                  )}
                </div>

                {/* Client Name */}
                <h3 className="text-xl font-semibold font-display text-slate-900">
                  {item.client}
                </h3>

                {/* Challenge -> What we did -> Result */}
                <div className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div className="border-l-2 border-red-300 pl-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-0.5">
                      Challenge
                    </p>
                    <p className="text-slate-600">{item.challenge}</p>
                  </div>

                  <div className="border-l-2 border-blue-300 pl-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-0.5">
                      What We Did
                    </p>
                    <p className="text-slate-600">{item.whatWeDid}</p>
                  </div>

                  <div className="border-l-2 border-emerald-400 pl-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 mb-0.5">
                      Result
                    </p>
                    <p className="text-slate-800 font-medium">{item.result}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <Link
                  href={`/work/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066cc] hover:text-[#0055b3] transition-colors"
                >
                  <span>Read case study</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0066cc] transition-colors underline underline-offset-4"
          >
            <span>View all work examples</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default SelectedWorkSection;
