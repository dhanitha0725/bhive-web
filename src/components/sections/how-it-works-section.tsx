"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TRACKS = [
  {
    badge: "For Established Businesses",
    badgeVariant: "tint", // blue-tint (#EEF3FF)
    title: "Scale an Active Business",
    subtitle:
      "Revenue exists, but customer acquisition is fragmented, social channels underperform, or sales are leaking.",
    steps: [
      {
        num: "01",
        label: "Free Growth & Social Audit",
        tag: "FREE",
        desc: "A thorough 24–48h analysis of your website, marketing channels, and competitor gaps to diagnose where sales leak.",
      },
      {
        num: "02",
        label: "Funnel & Touchpoint Optimization",
        desc: "Rebuild high-dropoff touchpoints, optimize conversion pages, and connect accurate customer attribution.",
      },
      {
        num: "03",
        label: "Monthly Growth Retainer",
        desc: "Ongoing execution across paid campaigns, social media management, content production, and weekly optimization.",
      },
    ],
    commercialModel: "Ongoing monthly retainer · Cancel anytime",
    ctaText: "Claim free growth audit",
    ctaTreatment: "primary" as const,
    consultationLocation: "how-it-works-growth",
  },
  {
    badge: "For Founders & New Ventures",
    badgeVariant: "surface", // surface (#F5F7FA) + border
    title: "Launch a New Brand or Idea",
    subtitle:
      "You have a validated idea or product, but need a credible brand identity, a conversion storefront, and first customers.",
    steps: [
      {
        num: "01",
        label: "Business Guidance Call",
        tag: "FREE",
        desc: "A 30-minute validation session reviewing your business model, target buyers, pricing, and launch channels.",
      },
      {
        num: "02",
        label: "Brand & Storefront Build",
        desc: "Complete visual identity system, high-speed website or WhatsApp storefront, and launch creative assets.",
      },
      {
        num: "03",
        label: "First-Customer Campaign",
        desc: "Targeted launch push to secure your first 100 paying customers, backed by a clear 90-day execution roadmap.",
      },
    ],
    commercialModel: "Fixed-scope launch build · Zero retainer lock-in",
    ctaText: "Book launch consultation",
    ctaTreatment: "outline" as const,
    consultationLocation: "how-it-works-launch",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-[1100px] mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              HOW WE WORK
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]"
          >
            Two starting points. One growth system.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5b6475] max-w-2xl leading-[1.6]"
          >
            We don&apos;t sell retainers to unvalidated ideas, and we don&apos;t sell generic launch packages to established brands. Every partnership starts with a clear diagnosis before a single rupee is committed.
          </motion.p>
        </div>

        {/* 12-Column Stretch Grid: Two 6-Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {TRACKS.map((track, idx) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: idx * 0.08 }}
              className="lg:col-span-6 rounded-2xl bg-white border border-[#e5e8ee] p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#c5cbe0] transition-colors duration-200 ease-out"
            >
              {/* Card Header & Content */}
              <div>
                {/* Badge */}
                <div className="mb-5 sm:mb-6">
                  <span
                    className={`inline-flex items-center text-xs sm:text-[13px] font-medium px-3.5 py-1 rounded-full ${
                      track.badgeVariant === "tint"
                        ? "bg-[#eef3ff] text-[#3068f9]"
                        : "bg-[#f5f7fa] text-[#0b1220] border border-[#e5e8ee]"
                    }`}
                  >
                    {track.badge}
                  </span>
                </div>

                {/* Headline & Problem Statement */}
                <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#0b1220] mb-3 leading-snug">
                  {track.title}
                </h3>
                <p className="text-sm sm:text-base text-[#5b6475] leading-relaxed mb-8">
                  {track.subtitle}
                </p>

                {/* Milestones / Sequential Process */}
                <div className="space-y-5 border-t border-[#e5e8ee] pt-6 mb-8">
                  {track.steps.map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <span className="text-sm font-medium text-[#3068f9] shrink-0 mt-0.5 w-6">
                        {step.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-medium text-[#0b1220] tracking-tight">
                            {step.label}
                          </h4>
                          {step.tag && (
                            <span className="text-[11px] font-medium tracking-wider px-2 py-0.5 rounded-full bg-[#eef3ff] text-[#3068f9] uppercase">
                              {step.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#5b6475] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Commercial Model + Action */}
              <div className="border-t border-[#e5e8ee] pt-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#5b6475]">
                  <span className="font-medium text-[#0b1220]">Investment shape:</span>
                  <span>{track.commercialModel}</span>
                </div>

                <PillButton
                  treatment={track.ctaTreatment}
                  isConsultation
                  consultationLocation={track.consultationLocation}
                  showArrow
                  className="w-full sm:w-auto self-start"
                >
                  {track.ctaText}
                </PillButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Row / Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
          className="mt-6 rounded-2xl bg-[#f5f7fa] border border-[#e5e8ee] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3 sm:gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-full bg-[#eef3ff] flex items-center justify-center shrink-0 mt-0.5 text-[#3068f9]">
              <Check className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-medium text-[#0b1220]">
                Zero-risk diagnostic commitment
              </h4>
              <p className="text-xs sm:text-sm text-[#5b6475] mt-0.5 leading-relaxed">
                Both paths start with a diagnostic consultation. If we&apos;re not the right fit for your business stage, our analysis and 90-day roadmap are 100% yours to keep — no sales pressure, no hidden fees.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <PillButton
              treatment="outline"
              isConsultation
              consultationLocation="how-it-works-banner"
              className="w-full sm:w-auto !h-11 sm:!h-12 !px-5 text-sm"
            >
              Start conversation
            </PillButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
