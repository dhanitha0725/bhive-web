"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { MinimalGradientCard } from "@/components/ui/minimal-gradient-card";

interface OutcomeItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  concreteMetric: string;
}

const OUTCOMES: OutcomeItem[] = [
  {
    id: "outcome-enquiries",
    tag: "Outcome 01 • Enquiries",
    title: "More customer enquiries every week",
    description:
      "Clear marketing messages that speak directly to what your buyers need, making them message you on WhatsApp or call without hesitation.",
    // TODO: replace with verified client metric
    concreteMetric: "3x more qualified customer enquiries in 60 days",
  },
  {
    id: "outcome-brand",
    tag: "Outcome 02 • Brand Equity",
    title: "A strong brand that charges higher prices",
    description:
      "Look polished, professional, and credible from the first second. Stop getting undercut by competitors on cheap price alone.",
    // TODO: replace with verified client metric
    concreteMetric: "Higher customer trust and zero need to discount",
  },
  {
    id: "outcome-website",
    tag: "Outcome 03 • Conversion",
    title: "A website that actually sells your offer",
    description:
      "Fast on Sri Lankan mobile networks with straightforward language and direct order buttons that turn visitors into paying clients.",
    // TODO: replace with verified client metric
    concreteMetric: "Under 1.5s mobile load time with direct WhatsApp ordering",
  },
  {
    id: "outcome-repeat",
    tag: "Outcome 04 • Retention",
    title: "Steady repeat buyers who recommend you",
    description:
      "Simple follow-up systems and customer communication that keep existing buyers happy and bringing their friends back.",
    // TODO: replace with verified client metric
    concreteMetric: "Consistent monthly orders without paying for random ads",
  },
];

export function OutcomesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-slate-50/70 text-slate-900">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            What happens when your marketing is planned properly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t chase vanity likes or complicated buzzwords. Everything we build has one purpose: growing your actual business sales.
          </p>
        </div>

        {/* 4 Outcome Blocks — Minimal Borderless Cards without buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OUTCOMES.map((item) => (
            <MinimalGradientCard
              key={item.id}
              variant="outcome"
              eyebrow={item.tag}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// Backward compatibility alias for page imports
export const SystemSection = OutcomesSection;

export default OutcomesSection;
