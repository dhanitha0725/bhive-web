"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import BlurText from "@/components/BlurText";
import { Reveal } from "@/components/motion/reveal";

/* -------------------------------------------------------------------------- */
/* TYPES & DATA                                                               */
/* -------------------------------------------------------------------------- */
interface OutcomeItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const OUTCOMES_DATA: OutcomeItem[] = [
  {
    id: "outcome-1",
    number: "OUTCOME 01",
    title: "Brand positioning that commands premium pricing",
    description:
      "We engineer distinctive brand systems, messaging frameworks, and category authority that justify premium price points and build immediate trust with high-value buyers.",
  },
  {
    id: "outcome-2",
    number: "OUTCOME 02",
    title: "Digital experiences and products people genuinely love",
    description:
      "Understand what people actually need, remove unnecessary friction, and turn messy flows into experiences that feel simple, natural, and genuinely world-class.",
  },
  {
    id: "outcome-3",
    number: "OUTCOME 03",
    title: "Customer journeys engineered for compounding retention",
    description:
      "Acquisition without retention is an expensive illusion. We build integrated lifecycle flows, automated re-engagement triggers, and habit-forming loyalty loops.",
  },
  {
    id: "outcome-4",
    number: "OUTCOME 04",
    title: "Predictable revenue telemetry and unit-economic scale",
    description:
      "Eliminate commercial guesswork. We establish end-to-end attribution, real-time revenue telemetry, and full-funnel diagnostics so you know your exact CAC-to-LTV payback velocity.",
  },
];

/* -------------------------------------------------------------------------- */
/* OUTCOME CARD COMPONENT                                                     */
/* -------------------------------------------------------------------------- */
function OutcomeCard({ outcome }: { outcome: OutcomeItem }) {
  return (
    <div className="group relative flex-1 flex flex-col justify-center rounded-[24px] sm:rounded-[28px] bg-[#f4f7fb] border border-[#e2eaf4] p-6 sm:p-7 lg:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_-12px_rgba(11,76,196,0.12)] hover:border-blue-300/60">
      {/* Pill Badge */}
      <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-white/95 border border-blue-500/25 text-blue-600 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase shadow-xs mb-3.5 sm:mb-4">
        {outcome.number}
      </div>

      {/* Outcome Title */}
      <h3 className="text-xl sm:text-[22px] font-semibold font-display text-slate-900 tracking-tight leading-[1.3] mb-2.5 sm:mb-3 group-hover:text-blue-900 transition-colors">
        {outcome.title}
      </h3>

      {/* Outcome Description */}
      <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-[1.55] tracking-[-0.2px]">
        {outcome.description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN OUTCOMES COMPONENT (ALL-IN-ONE SECTION)                               */
/* -------------------------------------------------------------------------- */
export function OutcomesSection() {
  const leftOutcomes = OUTCOMES_DATA.slice(0, 2);
  const rightOutcomes = OUTCOMES_DATA.slice(2, 4);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header: Clean, spacious, centered headline in Light Theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Reveal delay={0}>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.12]">
              <BlurText
                text="Measurable outcomes that compound commercial growth"
                animateBy="words"
                direction="bottom"
                delay={50}
                className="justify-center"
              />
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-4 sm:mt-5 text-base sm:text-[17px] text-slate-600 font-normal leading-[1.5] tracking-[-0.3px] max-w-2xl">
              We don’t settle for vanity metrics or superficial redesigns. Here is the concrete business
              impact we engineer for scaling brands and visionary founders.
            </p>
          </Reveal>
        </div>

        {/* All-in-One 3-Column UI Layout (Matching UI Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: Outcomes 01 & 02 */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 order-1">
            <Reveal delay={120} className="h-full flex-1 flex flex-col">
              <OutcomeCard outcome={leftOutcomes[0]} />
            </Reveal>
            <Reveal delay={180} className="h-full flex-1 flex flex-col">
              <OutcomeCard outcome={leftOutcomes[1]} />
            </Reveal>
          </div>

          {/* Center Column: Team Collaboration Image */}
          <div className="lg:col-span-4 order-2 min-h-[380px] sm:min-h-[460px] lg:min-h-0 flex flex-col">
            <Reveal delay={240} className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-0 flex-1 flex flex-col">
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-0 rounded-[28px] overflow-hidden border border-slate-200/90 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.12)]">
                <Image
                  src="/images/system/outcome-collaboration.jpg"
                  alt="BHive business builders collaborating around commercial outcomes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[28px] pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Outcomes 03 & 04 */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 order-3">
            <Reveal delay={300} className="h-full flex-1 flex flex-col">
              <OutcomeCard outcome={rightOutcomes[0]} />
            </Reveal>
            <Reveal delay={360} className="h-full flex-1 flex flex-col">
              <OutcomeCard outcome={rightOutcomes[1]} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing imports
export const SystemSection = OutcomesSection;

export default OutcomesSection;
