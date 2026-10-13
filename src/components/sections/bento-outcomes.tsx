"use client";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import {
  Compass,
  Layers,
  Zap,
  TrendingUp,
  Check,
  X,
  Sparkles,
} from "lucide-react";

interface ProcessStep {
  step: string;
  number: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  icon: typeof Compass;
  details: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "STEP ONE",
    number: "01",
    tag: "Zero Guesswork",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Commercial Diagnostic & Positioning",
    description:
      "We diagnose your unit economics, audience psychology, and competitor gaps to build an undeniable market positioning strategy.",
    icon: Compass,
    details: [
      "Audience & offer diagnostic",
      "Unit economics & pricing review",
      "Commercial positioning roadmap",
    ],
  },
  {
    step: "STEP TWO",
    number: "02",
    tag: "Built to Convert",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Conversion-Focused Digital Engine",
    description:
      "We build fast, high-converting websites, landing pages, and brand assets engineered specifically to turn visitors into qualified buyers.",
    icon: Layers,
    details: [
      "High-speed modern web architecture",
      "Clear commercial value messaging",
      "Frictionless lead capture funnels",
    ],
  },
  {
    step: "STEP THREE",
    number: "03",
    tag: "High-Intent Buyers",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Targeted Multi-Channel Demand",
    description:
      "We deploy precision paid campaigns (Meta, Google, LinkedIn) and targeted content funnels directed at decision-makers ready to buy.",
    icon: Zap,
    details: [
      "Precision search & paid social",
      "High-intent audience targeting",
      "Dedicated conversion retargeting",
    ],
  },
  {
    step: "STEP FOUR",
    number: "04",
    tag: "Compounding ROI",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Revenue Analytics & Scaled Growth",
    description:
      "We track real pipeline, customer acquisition cost (CAC), and closed deals—continually optimizing winning channels to scale predictably.",
    icon: TrendingUp,
    details: [
      "Real-time pipeline & deal tracking",
      "CAC & LTV payback metrics",
      "Predictable, compounding revenue",
    ],
  },
];

export function BentoOutcomes() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>HOW OUR SYSTEM WORKS</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-display tracking-tight text-slate-900 leading-[1.16]">
            We don’t just do social media marketing.
            <span className="block text-blue-600 mt-1">
              We build systems that grow businesses.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Likes and vanity reach don’t pay payroll. We replace isolated social
            posts with a connected commercial engine—uniting strategic
            positioning, high-converting digital platforms, and targeted customer
            acquisition into measurable revenue.
          </p>
        </div>

        {/* 2. THE PROCESS FLOW CURVE (Clean wave inspired by reference diagram) */}
        <div className="hidden lg:block relative mt-14 mb-4">
          <svg
            className="w-full h-12 text-blue-500 overflow-visible"
            viewBox="0 0 1100 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth continuous wave curve connecting all 4 steps */}
            <path
              d="M 30 24 C 180 2, 220 46, 360 24 C 500 2, 540 46, 730 24 C 880 2, 920 46, 1070 24"
              stroke="#0075FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="none"
            />
            {/* Step Node Dots */}
            <circle cx="140" cy="14" r="6" fill="#0075FF" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="415" cy="34" r="6" fill="#0075FF" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="685" cy="14" r="6" fill="#0075FF" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="955" cy="34" r="6" fill="#0075FF" stroke="#FFFFFF" strokeWidth="3" />
          </svg>
        </div>

        {/* 3. STEP-BY-STEP SYSTEM CARDS (Clean, flat, zero drop shadows) */}
        <div className="mt-8 lg:mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.step}
                y={18}
                delay={idx * 80}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-blue-300 hover:bg-slate-50/50"
              >
                <div>
                  {/* Top Bar: Step Number + Icon + Arrow Connector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 tracking-wider">
                        {step.step}
                      </span>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Watermark Number in background */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="font-mono text-3xl font-extrabold text-slate-200 tracking-tight select-none">
                      {step.number}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${step.tagColor}`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Minimalist Micro-Diagram Schematic per step (Zero drop shadows) */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  {idx === 0 && (
                    /* Step 1 Diagram: Diagnostic Alignment Grid */
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 mb-2">
                        <span>MARKET FIT</span>
                        <span className="text-emerald-600 font-bold">100% ALIGNED</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Unit Economics</span>
                          <span className="font-mono font-bold text-blue-600">Verified</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Buyer Persona</span>
                          <span className="font-mono font-bold text-blue-600">Targeted</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    /* Step 2 Diagram: High-Converting Web Funnel */
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 mb-2">
                        <span>DIGITAL ENGINE</span>
                        <span className="text-blue-600 font-bold">4.8% CONV.</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Landing Experience</span>
                          <span className="font-mono font-bold text-emerald-600">&lt; 0.8s</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Conversion Rate</span>
                          <span className="font-mono font-bold text-emerald-600">+240%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    /* Step 3 Diagram: Multi-Channel Traffic Funnel */
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 mb-2">
                        <span>ACQUISITION</span>
                        <span className="text-blue-600 font-bold">HIGH INTENT</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Search &amp; Paid Social</span>
                          <span className="font-mono font-bold text-blue-600">Active</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Qualified Inquiries</span>
                          <span className="font-mono font-bold text-emerald-600">Daily Flow</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 3 && (
                    /* Step 4 Diagram: Revenue Compounding Scale */
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 mb-2">
                        <span>PIPELINE IMPACT</span>
                        <span className="text-emerald-600 font-bold">COMPOUNDING</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>LTV to CAC Ratio</span>
                          <span className="font-mono font-bold text-blue-600">3.8x</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-white px-2 py-1 border border-slate-200 text-[11px] text-slate-700">
                          <span>Revenue Growth</span>
                          <span className="font-mono font-bold text-emerald-600">Predictable</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bullet Points */}
                  <div className="mt-4 space-y-1.5 text-[11px] text-slate-600">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-blue-600 shrink-0 stroke-[2.5]" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 4. THE SHIFT: COMPARISON BANNER (Clean, minimal contrast strip without drop shadows) */}
        <Reveal y={16} delay={240} className="mt-12 sm:mt-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest">
                  THE STRATEGIC SHIFT
                </span>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Typical Social Media Agency vs. The BHive System
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Structured for commercial outcomes, not vanity metrics
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Typical Social Media Agency */}
              <div className="rounded-xl border border-rose-200/80 bg-white p-5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <X className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>Random Social Media Agency</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Posts reels &amp; carousels without commercial positioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Celebrates vanity views and likes that never convert into sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>No integration with your website, landing page, or lead funnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Unpredictable results with zero attribution or revenue accountability</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: The BHive System */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>The BHive Connected Growth Engine</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Starts with commercial diagnostic and validated value positioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>High-converting digital infrastructure built to close qualified buyers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Multi-channel paid &amp; organic funnels targeted at high-intent clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Strict CAC, pipeline, and revenue tracking with compounding ROI</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
