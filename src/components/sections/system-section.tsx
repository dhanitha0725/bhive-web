"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { MessageCircle, Award, ShoppingCart, Repeat } from "lucide-react";

interface OutcomeItem {
  id: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  concreteMetric: string;
}

const OUTCOMES: OutcomeItem[] = [
  {
    id: "outcome-enquiries",
    tag: "OUTCOME 01",
    icon: MessageCircle,
    title: "More customer enquiries every week",
    description:
      "Clear marketing messages that speak directly to what your buyers need, making them message you on WhatsApp or call without hesitation.",
    // TODO: replace with verified client metric
    concreteMetric: "3x more qualified customer enquiries in 60 days",
  },
  {
    id: "outcome-brand",
    tag: "OUTCOME 02",
    icon: Award,
    title: "A strong brand that charges higher prices",
    description:
      "Look polished, professional, and credible from the first second. Stop getting undercut by competitors on cheap price alone.",
    // TODO: replace with verified client metric
    concreteMetric: "Higher customer trust and zero need to discount",
  },
  {
    id: "outcome-website",
    tag: "OUTCOME 03",
    icon: ShoppingCart,
    title: "A website that actually sells your offer",
    description:
      "Fast on Sri Lankan mobile networks with straightforward language and direct order buttons that turn visitors into paying clients.",
    // TODO: replace with verified client metric
    concreteMetric: "Under 1.5s mobile load time with direct WhatsApp ordering",
  },
  {
    id: "outcome-repeat",
    tag: "OUTCOME 04",
    icon: Repeat,
    title: "Steady repeat buyers who recommend you",
    description:
      "Simple follow-up systems and customer communication that keep existing buyers happy and bringing their friends back.",
    // TODO: replace with verified client metric
    concreteMetric: "Consistent monthly orders without paying for random ads",
  },
];

export function OutcomesSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/60 text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            What happens when your marketing is planned properly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t chase vanity likes or complicated buzzwords. Everything we build has one purpose: growing your actual business sales.
          </p>
        </div>

        {/* 4 Compact Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OUTCOMES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-[22px] bg-white border border-slate-200 p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {item.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-[22px] font-semibold font-display text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {siteConfig.showProof && (
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>Target outcome: {item.concreteMetric}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// Backward compatibility alias for page imports
export const SystemSection = OutcomesSection;

export default OutcomesSection;
