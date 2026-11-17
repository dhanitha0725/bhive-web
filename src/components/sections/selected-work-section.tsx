"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudyDialog } from "@/components/work/case-study-dialog";
import { siteConfig } from "@/config/site";
import { caseStudies as fallbackCaseStudies, type CaseStudy } from "@/content/case-studies";
import { getCaseStudyImage } from "@/lib/case-studies";

interface SelectedWorkSectionProps {
  caseStudies?: CaseStudy[];
}

export function SelectedWorkSection({ caseStudies }: SelectedWorkSectionProps = {}) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  const items = (caseStudies && caseStudies.length > 0 ? caseStudies : fallbackCaseStudies).filter(
    (item) => item.published
  );

  const heroCase = items[0];
  const secondaryCases = items.slice(1, 4);

  if (!heroCase) return null;

  const heroIsDemo = heroCase.isDemo || siteConfig.proofIsDemo;

  return (
    <section id="work" className="relative w-full bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between sm:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 sm:mb-4"
            >
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9] sm:text-[13px]">
                STRATEGY INTO RESULTS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
              className="text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b1220] sm:text-5xl lg:text-[60px]"
            >
              Selected work
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-3 md:items-end"
          >
            {siteConfig.proofIsDemo ? (
              <span className="text-xs text-[#5b6475]">
                Illustrative examples — verified client work will replace these.
              </span>
            ) : null}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3068f9] transition-colors hover:text-[#1f55e0] sm:text-base"
            >
              <span>View all case studies</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* 1. Lead case: image + story card */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[#e5e8ee] bg-[#f5f7fa] sm:min-h-[420px] lg:col-span-8 lg:min-h-[480px]"
          >
            <button
              type="button"
              onClick={() => setActiveStudy(heroCase)}
              aria-label={`View the ${heroCase.client} case study`}
              className="group relative block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3068f9] focus-visible:ring-offset-4"
            >
              <img
                src={getCaseStudyImage(heroCase)}
                alt={`${heroCase.client} case study`}
                className="block h-full w-full object-cover"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#0b1220] px-4 py-2 text-xs font-medium text-white transition-colors duration-200 group-hover:bg-[#1f55e0]">
                View case study
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col justify-between rounded-2xl bg-[#0b1220] p-6 text-white sm:p-8 lg:col-span-4 lg:p-10"
          >
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/64">
                  {heroCase.industry}
                </span>
                {heroIsDemo ? (
                  <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/64">
                    Illustrative example
                  </span>
                ) : null}
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                {heroCase.client}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/64 sm:text-base">
                {heroCase.whatWeDid}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-6 text-2xl font-medium tracking-tight text-white sm:text-[32px]">
                {heroCase.outcomeMetric || heroCase.result}
              </p>

              <PillButton
                treatment="filled"
                onClick={() => setActiveStudy(heroCase)}
                className="w-full"
                showArrow
              >
                View full case study
              </PillButton>
            </div>
          </motion.div>
        </div>

        {/* 2. Supporting cases */}
        {secondaryCases.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryCases.map((item, index) => {
              const isDemo = item.isDemo || siteConfig.proofIsDemo;

              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() => setActiveStudy(item)}
                    aria-label={`View the ${item.client} case study`}
                    className="group flex h-full w-full flex-col justify-between rounded-2xl border border-[#e5e8ee] bg-white p-6 text-left transition-colors duration-200 ease-out hover:border-[#c5cbe0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3068f9] focus-visible:ring-offset-4 sm:p-7"
                  >
                    <div>
                      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#e5e8ee] bg-[#f5f7fa]">
                        <img
                          src={getCaseStudyImage(item, index + 1)}
                          alt={`${item.client} case study`}
                          className="h-full w-full object-cover"
                        />
                        {item.outcomeMetric ? (
                          <span className="absolute right-3 top-3 rounded-full bg-[#0b1220] px-3 py-1 text-xs font-semibold text-white">
                            {item.outcomeMetric}
                          </span>
                        ) : null}
                      </div>

                      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#3068f9]">
                          {item.industry}
                        </span>
                        {isDemo ? (
                          <span className="rounded-full border border-[#dce6fb] bg-[#eef3ff] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1f55e0]">
                            Illustrative example
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-xl font-medium tracking-tight text-[#0b1220] transition-colors duration-200 group-hover:text-[#3068f9] sm:text-[22px]">
                        {item.client}
                      </h3>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#5b6475]">
                        {item.challenge}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e5e8ee] pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {(item.scope || []).slice(0, 2).map((scope) => (
                          <span
                            key={scope}
                            className="rounded-md border border-[#e5e8ee] bg-[#f5f7fa] px-2 py-0.5 text-[11px] font-medium text-[#5b6475]"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>

                      <span className="ml-2 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#0b1220] transition-colors duration-200 group-hover:text-[#3068f9]">
                        <span>Read case</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </Container>

      <CaseStudyDialog study={activeStudy} onClose={() => setActiveStudy(null)} />
    </section>
  );
}
