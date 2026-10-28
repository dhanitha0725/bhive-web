"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import { useConsultation } from "@/components/providers/consultation-provider";
import {
  Compass,
  Palette,
  Target,
  Globe,
  Share2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const SERVICE_ICONS = {
  "business-strategy": Compass,
  "brand-identity": Palette,
  "marketing-strategy": Target,
  website: Globe,
  "content-social": Share2,
};

export function PathwaySection() {
  const { openConsultation } = useConsultation();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            Everything your business needs to attract and close customers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Choose what you need most right now, or let us connect all five pieces into one seamless plan.
          </p>
        </div>

        {/* 5 Plain-Named Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.slug] || Compass;
            return (
              <div
                key={service.slug}
                className={`group flex flex-col justify-between rounded-[22px] border border-slate-200 bg-slate-50/70 p-6 sm:p-7 transition-all duration-200 hover:border-blue-400 hover:bg-white hover:shadow-lg ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold font-display text-slate-900 group-hover:text-[#0066cc] transition-colors">
                    {service.name}
                  </h3>

                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Problem Solved
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {service.problemSolved}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      What You Get
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.outcome}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066cc] hover:text-[#0055b3] transition-colors group/link"
                  >
                    <span>See full scope</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner after services */}
        <div className="mt-14 rounded-[22px] bg-gradient-to-r from-blue-900 to-[#0066cc] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold font-display text-white">
              Not sure which service your business needs first?
            </h3>
            <p className="mt-1.5 text-sm sm:text-base text-blue-100">
              We&apos;ll review your current setup and give you a straightforward recommendation.
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => openConsultation("pathway", e.currentTarget)}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0066cc] hover:bg-blue-50 px-6 py-3.5 text-sm sm:text-base font-semibold transition-all duration-150 active:scale-[0.97] shadow-sm"
          >
            <span>Get Free Growth Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}

export default PathwaySection;
