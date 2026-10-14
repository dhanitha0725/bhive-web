"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { ScrollStack, ScrollStackItem } from "@/components/ScrollStack";
import {
  Sparkles,
  CheckCircle2,
  Search,
  Compass,
  Target,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* ILLUSTRATION 1: RESEARCH                                                   */
/* -------------------------------------------------------------------------- */
function ResearchIllustration() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-white border border-slate-200/80 p-5 flex flex-col justify-between overflow-hidden">
      {/* Background Radar Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="research-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0b4cc4" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#research-grid)" />
      </svg>

      {/* Radar Sweep Circle */}
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-blue-200/60 pointer-events-none flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-blue-300/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100/50" />
        </div>
      </div>

      {/* Top Header Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-3 py-1 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-700 tracking-wide">
            TELEMETRY: ACTIVE AUDIT
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
          Q1 DIAGNOSTIC
        </span>
      </div>

      {/* Center Data Cards */}
      <div className="relative z-10 space-y-2.5 my-auto">
        <div className="rounded-xl bg-white/95 border border-slate-200/90 p-3 transition-transform hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Search className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-800">Market Whitespace</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +44% GAP IDENTIFIED
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full w-[82%]" />
          </div>
        </div>

        <div className="rounded-xl bg-white/95 border border-slate-200/90 p-3 transition-transform hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-800">Buyer Intent Signal</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              HIGH PURCHASE INTENT
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full w-[94%]" />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
        <span>Unit Economics Diagnostic</span>
        <span className="font-mono font-semibold text-slate-700">Zero Guesswork</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ILLUSTRATION 2: PLAN                                                       */
/* -------------------------------------------------------------------------- */
function PlanIllustration() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-white border border-slate-200/80 p-5 flex flex-col justify-between overflow-hidden">
      {/* Background Architectural Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="plan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#0b4cc4" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plan-grid)" />
      </svg>

      {/* Top Header Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-3 py-1 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          <span className="text-[11px] font-mono font-semibold text-slate-700 tracking-wide">
            ROADMAP BLUEPRINT
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
          PHASE SEQUENCE
        </span>
      </div>

      {/* Connected 3-Step Milestone Pipeline */}
      <div className="relative z-10 space-y-2.5 my-auto">
        {/* Phase 1 */}
        <div className="flex items-center gap-3 rounded-xl bg-white/95 border border-slate-200/90 p-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Phase 01: Commercial Foundation</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                COMPLETED
              </span>
            </div>
            <div className="mt-1 text-[11px] text-slate-500 truncate">
              Pricing model & conversion baseline
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="flex items-center gap-3 rounded-xl bg-white/95 border border-blue-200 p-2.5 ring-1 ring-blue-500/20">
          <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
            02
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Phase 02: Engine Architecture</span>
              <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                IN PROGRESS
              </span>
            </div>
            <div className="mt-1.5 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[80%]" />
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="flex items-center gap-3 rounded-xl bg-white/80 border border-slate-200 p-2.5 opacity-80">
          <div className="h-7 w-7 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0 font-mono text-xs font-semibold">
            03
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Phase 03: Scale & Compounding</span>
              <span className="text-[10px] font-mono text-slate-500 font-medium">QUEUED</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400 truncate">
              Targeted acquisition loops & telemetry
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
        <span>Channel Matrix</span>
        <span className="font-mono font-semibold text-blue-600">100% Calibrated</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ILLUSTRATION 3: STRATEGY                                                   */
/* -------------------------------------------------------------------------- */
function StrategyIllustration() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-white border border-slate-200/80 p-5 flex flex-col justify-between overflow-hidden">
      {/* Top Header Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-3 py-1 backdrop-blur-sm">
          <Target className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-[11px] font-mono font-semibold text-slate-700 tracking-wide">
            POSITIONING MATRIX
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
          CATEGORY MOAT
        </span>
      </div>

      {/* 2x2 Positioning Matrix Graphic */}
      <div className="relative z-10 my-auto h-40 w-full rounded-xl bg-white/95 border border-slate-200/90 p-4 flex flex-col justify-between">
        {/* Axis Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full border-t border-dashed border-slate-200" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full border-l border-dashed border-slate-200" />
        </div>

        {/* Quadrant Labels */}
        <div className="relative z-10 flex justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span>Low Trust</span>
          <span className="text-blue-600 font-bold">Category Defined</span>
        </div>

        {/* Graphic Points */}
        <div className="relative h-20 w-full">
          {/* Competitor Cluster (Lower Left) */}
          <div className="absolute bottom-2 left-4 flex items-center gap-1.5 opacity-60">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="text-[10px] font-sans text-slate-500 ml-1">Crowded Market</span>
          </div>

          {/* Divergence Arrow */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 60 50 Q 140 40 240 18"
              fill="none"
              stroke="#0b4cc4"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>

          {/* BHive Position (Top Right) */}
          <div className="absolute top-1 right-3 flex items-center gap-2 bg-blue-50/90 border border-blue-300 rounded-full px-2.5 py-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-[11px] font-bold text-blue-900 font-sans">
              Market Leader
            </span>
          </div>
        </div>

        {/* Bottom Matrix Labels */}
        <div className="relative z-10 flex justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span>Generic Offer</span>
          <span className="text-blue-600 font-bold">High Value</span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
        <span>Divergence Rating</span>
        <span className="font-mono font-semibold text-emerald-600">98.4% Differentiation</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ILLUSTRATION 4: EXECUTION                                                  */
/* -------------------------------------------------------------------------- */
function ExecutionIllustration() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-white border border-slate-200/80 p-5 flex flex-col justify-between overflow-hidden">
      {/* Top Header Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-3 py-1 backdrop-blur-sm">
          <Rocket className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-[11px] font-mono font-semibold text-slate-700 tracking-wide">
            GROWTH VELOCITY
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3 stroke-[3]" />
          ACTIVE DEPLOYMENT
        </span>
      </div>

      {/* Center Metrics & Growth Curve */}
      <div className="relative z-10 my-auto rounded-xl bg-white/95 border border-slate-200/90 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Pipeline Velocity
            </div>
            <div className="text-xl font-bold font-display text-slate-900 mt-0.5">
              +340% <span className="text-xs font-normal text-emerald-600 font-sans">Compounding</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              CAC Payback
            </div>
            <div className="text-base font-bold font-mono text-blue-600 mt-0.5">
              -42% Days
            </div>
          </div>
        </div>

        {/* Upward Growth Curve Vector */}
        <div className="relative h-16 w-full mt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b4cc4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0b4cc4" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 55 Q 60 50, 100 35 T 200 5 L 200 60 L 0 60 Z"
              fill="url(#curveGradient)"
            />
            <path
              d="M 0 55 Q 60 50, 100 35 T 200 5"
              fill="none"
              stroke="#0b4cc4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="200" cy="5" r="4" fill="#0b4cc4" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
        <span>Conversion Engine</span>
        <span className="font-mono font-semibold text-slate-800">Compounding 24/7</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SYSTEM PILLARS DATA (4 STEPS: RESEARCH, PLAN, STRATEGY, EXECUTION)         */
/* -------------------------------------------------------------------------- */
interface SystemStep {
  id: string;
  step: string;
  tag: string;
  title: string;
  summary: string;
  deliverables: string[];
  illustration: React.ReactNode;
}

const SYSTEM_STEPS: SystemStep[] = [
  {
    id: "step-1",
    step: "01",
    tag: "Diagnostic",
    title: "Research",
    summary:
      "Audit unit economics, competitive whitespace, and buyer intent to remove commercial guesswork.",
    deliverables: [
      "Market & competitor audit",
      "Buyer psychology & intent diagnostic",
      "Unit economics & pricing review",
    ],
    illustration: <ResearchIllustration />,
  },
  {
    id: "step-2",
    step: "02",
    tag: "Architecture",
    title: "Plan",
    summary:
      "Structure the commercial blueprint, channel priorities, and measurable growth milestones.",
    deliverables: [
      "End-to-end commercial blueprint",
      "Channel prioritization matrix",
      "Milestones & payback timeline",
    ],
    illustration: <PlanIllustration />,
  },
  {
    id: "step-3",
    step: "03",
    tag: "Positioning",
    title: "Strategy",
    summary:
      "Engineer undeniable market positioning, category differentiation, and high-conviction messaging.",
    deliverables: [
      "Category differentiation moat",
      "High-conviction messaging hierarchy",
      "Premium value proposition design",
    ],
    illustration: <StrategyIllustration />,
  },
  {
    id: "step-4",
    step: "04",
    tag: "Activation",
    title: "Execution",
    summary:
      "Deploy high-converting digital platforms, precision buyer acquisition, and compounding analytics.",
    deliverables: [
      "High-converting web & lead infrastructure",
      "Precision multi-channel acquisition funnels",
      "Real-time pipeline & revenue analytics",
    ],
    illustration: <ExecutionIllustration />,
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN SYSTEM SECTION COMPONENT                                              */
/* -------------------------------------------------------------------------- */
export function SystemSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 1. Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
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
            A 4-step commercial engine engineered to replace guesswork with
            predictable, compounding revenue.
          </p>
        </div>

        {/* 2. ScrollStack Component (4 Steps: Research, Plan, Strategy, Execution) */}
        <div className="w-full">
          <ScrollStack
            useWindowScroll={true}
            smoothScroll={false}
            stackPosition="125px"
            itemDistance={340}
            itemStackDistance={20}
            itemScale={0.035}
            baseScale={0.9}
            dimAmount={0.12}
            blurAmount={0}
            holdDistance={260}
          >
            {SYSTEM_STEPS.map((step) => (
              <ScrollStackItem
                key={step.id}
                itemClassName="min-h-[440px] md:min-h-[400px] p-6 sm:p-8 lg:p-10 bg-white border border-slate-200/90 shadow-none hover:border-blue-300 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
                  {/* Left Column: Minimal & Clean Content */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                    <div>
                      {/* Step Indicator & Tag */}
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5 tracking-wider">
                          STEP {step.step}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {step.tag}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                        {step.title}
                      </h3>

                      {/* Brief Punchy Summary */}
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>

                    {/* Concise Deliverables Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {step.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 stroke-[2.5]" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: High-End Custom Illustration */}
                  <div className="lg:col-span-6 flex justify-center items-center w-full">
                    {step.illustration}
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </Container>
    </section>
  );
}

export default SystemSection;
