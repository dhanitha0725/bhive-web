"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { services, type Service, type ServiceSlug } from "@/content/services";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Rocket,
  Target,
  Layers,
  TrendingUp,
  Laptop,
  Megaphone,
  Check,
} from "lucide-react";

type AudienceType = "existing-business" | "new-venture";

interface ServiceStageConfig {
  step: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetryMath: {
    "existing-business": string;
    "new-venture": string;
  };
  stageFocus: {
    "existing-business": string;
    "new-venture": string;
  };
  keyDeliverables: {
    "existing-business": string[];
    "new-venture": string[];
  };
}

const SERVICE_CONFIGS: Record<ServiceSlug, ServiceStageConfig> = {
  "business-strategy": {
    step: "01",
    tag: "Diagnostic",
    icon: Target,
    telemetryMath: {
      "existing-business": "DIAGNOSTIC: ZERO GUESSWORK",
      "new-venture": "WHITESPACE: +44% MARKET GAP",
    },
    stageFocus: {
      "existing-business":
        "Audit unit economics, pricing models, and commercial bottlenecks that slow predictable scale.",
      "new-venture":
        "Define market whitespace, ideal buyer profile, and commercial offer architecture before investing.",
    },
    keyDeliverables: {
      "existing-business": [
        "Unit economics & pricing review",
        "Commercial bottleneck audit",
        "Prioritized revenue roadmap",
      ],
      "new-venture": [
        "Market opportunity & competitor audit",
        "Buyer psychology & ICP definition",
        "Go-to-market offer architecture",
      ],
    },
  },
  "brand-strategy-identity": {
    step: "02",
    tag: "Moat",
    icon: Layers,
    telemetryMath: {
      "existing-business": "MOAT: 98.4% DIFFERENTIATION",
      "new-venture": "MOAT: DAY-1 CATEGORY LEADER",
    },
    stageFocus: {
      "existing-business":
        "Unify fragmented touchpoints and elevate brand perception to support premium category pricing.",
      "new-venture":
        "Create an undeniable, high-trust brand system that looks established and credible from day one.",
    },
    keyDeliverables: {
      "existing-business": [
        "Unified visual identity consolidation",
        "High-conviction value proposition",
        "Multi-touchpoint brand standards",
      ],
      "new-venture": [
        "Foundational brand positioning",
        "Complete visual identity & logo system",
        "Category messaging hierarchy",
      ],
    },
  },
  "marketing-strategy": {
    step: "03",
    tag: "Acquisition",
    icon: TrendingUp,
    telemetryMath: {
      "existing-business": "TELEMETRY: -42% CAC PAYBACK",
      "new-venture": "SEQUENCE: CALIBRATED LAUNCH",
    },
    stageFocus: {
      "existing-business":
        "Replace disjointed campaign noise with attribution-backed funnels focused on qualified pipeline.",
      "new-venture":
        "Architect your go-to-market acquisition channels to validate traction and win early adopters.",
    },
    keyDeliverables: {
      "existing-business": [
        "Full-funnel attribution telemetry",
        "Conversion journey optimization",
        "High-intent channel prioritization",
      ],
      "new-venture": [
        "Early adopter acquisition sequence",
        "Channel role mapping & launch testing",
        "Customer journey blueprint",
      ],
    },
  },
  "web-design-development": {
    step: "04",
    tag: "Infrastructure",
    icon: Laptop,
    telemetryMath: {
      "existing-business": "ENGINE: +340% PIPELINE VELOCITY",
      "new-venture": "PLATFORM: ZERO REBUILDS",
    },
    stageFocus: {
      "existing-business":
        "Turn an underperforming brochure site into an active commercial engine that stops lead leakage.",
      "new-venture":
        "Deploy a fast, responsive digital architecture built to convert initial interest into signed revenue.",
    },
    keyDeliverables: {
      "existing-business": [
        "Conversion architecture & UX overhaul",
        "Performance & Core Web Vitals speed",
        "Frictionless lead capture pathways",
      ],
      "new-venture": [
        "Launchpad conversion website",
        "Modern responsive engineering stack",
        "Analytics & telemetry infrastructure",
      ],
    },
  },
  "content-social-launch": {
    step: "05",
    tag: "Activation",
    icon: Megaphone,
    telemetryMath: {
      "existing-business": "COMPOUNDING: 24/7 DEMAND LOOPS",
      "new-venture": "VELOCITY: DAY-1 MARKET IMPACT",
    },
    stageFocus: {
      "existing-business":
        "Transform random social posting into high-conviction demand loops that feed your commercial pipeline.",
      "new-venture":
        "Coordinate pre-launch anticipation, launch day impact, and immediate market recognition.",
    },
    keyDeliverables: {
      "existing-business": [
        "Commercial content pillars & strategy",
        "Systematic multi-channel distribution",
        "Direct pipeline engagement loops",
      ],
      "new-venture": [
        "Go-to-market launch campaigns",
        "Founder authority & social foundations",
        "Targeted launch momentum sequence",
      ],
    },
  },
};

export function PathwaySection() {
  const [activeTab, setActiveTab] = useState<AudienceType>("existing-business");

  // Dynamically filter services matching active tab audience
  const dynamicServices = services.filter(
    (service) => service.published && service.audiences.includes(activeTab)
  );

  return (
    <section
      id="what-we-offer"
      className="relative w-full py-20 lg:py-28 bg-slate-50/60 text-slate-900 border-b border-slate-200 transition-colors duration-200"
    >
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 1. Section Header (Matching System Section Top Flow) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>WHAT WE OFFER</span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-display tracking-tight text-slate-900 leading-[1.16]">
              Commercial capabilities built to grow.
              <span className="block text-blue-600 mt-1">
                Precision-tailored to your exact stage.
              </span>
            </h2>
          </div>

        </div>

        {/* 2. Fluid Tabs Switcher (Watermelon UI Inspired) */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative inline-flex items-center p-1.5 rounded-full bg-slate-200/70 border border-slate-300/80 shadow-inner">
            {/* Existing Business Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("existing-business")}
              className="relative z-10 flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors duration-200"
            >
              {activeTab === "existing-business" && (
                <motion.div
                  layoutId="offer-active-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_2px_12px_rgba(10,37,79,0.08)] border border-slate-200/90"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Building2
                  className={`h-4 w-4 transition-colors ${
                    activeTab === "existing-business"
                      ? "text-blue-600"
                      : "text-slate-500"
                  }`}
                />
                <span
                  className={
                    activeTab === "existing-business"
                      ? "text-slate-900 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }
                >
                  Existing Business
                </span>
             
              </span>
            </button>

            {/* New Business Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("new-venture")}
              className="relative z-10 flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors duration-200"
            >
              {activeTab === "new-venture" && (
                <motion.div
                  layoutId="offer-active-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_2px_12px_rgba(10,37,79,0.08)] border border-slate-200/90"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Rocket
                  className={`h-4 w-4 transition-colors ${
                    activeTab === "new-venture"
                      ? "text-blue-600"
                      : "text-slate-500"
                  }`}
                />
                <span
                  className={
                    activeTab === "new-venture"
                      ? "text-slate-900 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }
                >
                  New Business
                </span>
               
              </span>
            </button>
          </div>
        </div>

        {/* 3. Dynamic Services Grid (Clean Bento Layout Matching Top Flow) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          >
            {dynamicServices.map((service, index) => {
              const config = SERVICE_CONFIGS[service.slug];
              const Icon = config.icon;
              const telemetry = config.telemetryMath[activeTab];
              const stageFocus = config.stageFocus[activeTab];
              const deliverables = config.keyDeliverables[activeTab];

              // Bento layout: Top 2 cards take 6 cols each (balanced hero cards); bottom 3 cards take 4 cols each
              const isTopRow = index < 2;
              const colSpanClass = isTopRow
                ? "lg:col-span-6"
                : "lg:col-span-4";

              return (
                <article
                  key={service.slug}
                  className={`${colSpanClass} group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_10px_30px_-10px_rgba(10,37,79,0.06),0_2px_6px_-1px_rgba(10,37,79,0.03)] hover:border-blue-400/80 hover:shadow-[0_16px_40px_-8px_rgba(10,37,79,0.12)] transition-all duration-300`}
                >
                  <div>
                    {/* Card Header: Step Tag + Telemetry Math Indicator */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5 tracking-wider">
                          STEP {config.step}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {service.eyebrow}
                        </span>
                      </div>

                      {/* Math/Telemetry Tag (Matching System Section) */}
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50/90 border border-blue-200/80 rounded px-2 py-0.5 tracking-tight truncate">
                        {telemetry}
                      </span>
                    </div>

                    {/* Service Title with Icon */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200/90 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                    </div>

                    {/* High-Level Overview */}
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Stage-Specific Focus Box */}
                    <div className="mt-4 rounded-xl bg-slate-50/90 border border-slate-200/70 p-3.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        <Sparkles className="h-3 w-3 text-blue-600 shrink-0" />
                        <span>
                          {activeTab === "existing-business"
                            ? "Operational Scale Priority"
                            : "Venture Launch Priority"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stageFocus}
                      </p>
                    </div>

                    {/* Stage Deliverables Checklist */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Core Deliverables
                      </span>
                      {deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 stroke-[2.5]" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Capabilities Tags */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {service.capabilities.slice(0, isTopRow ? 5 : 4).map((cap) => (
                        <span
                          key={cap}
                          className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {cap}
                        </span>
                      ))}
                      {service.capabilities.length > (isTopRow ? 5 : 4) && (
                        <span className="text-[11px] font-mono text-slate-400 px-1 py-0.5">
                          +{service.capabilities.length - (isTopRow ? 5 : 4)} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Service Page Link */}
                  <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Explore {service.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-blue-600 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    <span className="text-[10px] font-mono text-slate-400">
                      SPECS & SCOPE
                    </span>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* 4. Bottom Directional Callout Card */}
        <div className="mt-14 rounded-2xl bg-gradient-to-br from-white via-blue-50/30 to-slate-50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>
                  {activeTab === "existing-business"
                    ? "COMMERCIAL AUDIT READY"
                    : "VENTURE BLUEPRINT READY"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                {activeTab === "existing-business"
                  ? "Unsure which capabilities your business needs first?"
                  : "Ready to launch with the right sequence from day one?"}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
                {activeTab === "existing-business"
                  ? "Get an independent diagnostic of your brand, positioning, website conversion rate, and marketing efficiency. Zero guesswork."
                  : "Walk through your concept, target audience, and initial commercial roadmap with a specialist before committing capital."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              {activeTab === "existing-business" ? (
                <>
                  <Link
                    href="/free-growth-audit"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]"
                  >
                    <span>Get Free Growth Audit</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/grow-your-business"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <span>Growth Packages</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/business-guidance-call"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]"
                  >
                    <span>Book Guidance Call</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/launch-your-business"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <span>Launch Blueprint</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const WhatWeOfferSection = PathwaySection;
export default PathwaySection;
