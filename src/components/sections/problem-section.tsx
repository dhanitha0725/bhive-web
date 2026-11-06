"use client";

import React from "react";
import { Container } from "@/components/ui/container";

interface PairItem {
  id: string;
  number: string;
  problem: {
    label: string;
    title: string;
    description: string;
  };
  result: {
    label: string;
    title: string;
    description: string;
  };
}

const TRANSFORMATIONS: PairItem[] = [
  {
    id: "enquiries",
    number: "01",
    problem: {
      label: "Problem 01",
      title: "Posting regularly, but no enquiries",
      description:
        "You spend hours creating posts and reels on Facebook and Instagram, but only friends and family like them. No real customers reach out to ask for prices or place an order.",
    },
    result: {
      label: "Result 01",
      title: "More customer enquiries every week",
      description:
        "Clear marketing messages and positioning that speak directly to what buyers need, turning scrollers into warm inbound WhatsApp messages and phone calls without daily guesswork.",
    },
  },
  {
    id: "conversion",
    number: "02",
    problem: {
      label: "Problem 02",
      title: "Website looks good, but nobody buys",
      description:
        "You spent money building a modern website, but visitors bounce within seconds without calling, messaging, or buying. Confusing navigation and slow mobile loading lose you sales daily.",
    },
    result: {
      label: "Result 02",
      title: "A website that actually sells your offer",
      description:
        "Lightning-fast on Sri Lankan mobile networks with straightforward language, clear pricing transparency, and direct WhatsApp ordering that turns casual visitors into paying clients.",
    },
  },
  {
    id: "advertising",
    number: "03",
    problem: {
      label: "Problem 03",
      title: "Wasting money on random ad boosts",
      description:
        "Hitting 'Boost Post' delivers empty likes and random clicks from people who never buy. It feels like throwing money into a dark hole with zero trackable return on your investment.",
    },
    result: {
      label: "Result 03",
      title: "Targeted campaigns with measurable return",
      description:
        "Engineered ad funnels focused on verified buyer intent and commercial demand, ensuring every rupee spent directly attracts genuine prospects who can afford your product.",
    },
  },
  {
    id: "retention",
    number: "04",
    problem: {
      label: "Problem 04",
      title: "Unpredictable sales from month to month",
      description:
        "Some weeks are busy, other weeks are dead quiet. You rely mostly on unpredictable word of mouth without a steady, planned way to attract new buyers, causing constant cashflow stress.",
    },
    result: {
      label: "Result 04",
      title: "Steady repeat buyers who recommend you",
      description:
        "Simple follow-up systems and customer communication that keep existing buyers happy, driving repeat orders and natural word-of-mouth referrals every single month.",
    },
  },
];

export function ProblemSection() {
  return (
    <section
      id="problems"
      className="relative w-full py-20 sm:py-28 bg-white text-slate-900"
    >
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-slate-900 leading-[1.18]">
            What happens when your marketing is planned properly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Most businesses don&apos;t fail from bad products. They struggle because their marketing is guesswork. Here is the concrete shift we engineer.
          </p>
        </div>

        {/* 4 Paired Cards: Problem (Slate surface) + Result (Solid #0066cc primary) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {TRANSFORMATIONS.map((item) => (
            <React.Fragment key={item.id}>
              {/* Problem Card */}
              <div className="relative rounded-2xl bg-slate-50 border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-start transition-all duration-200 hover:border-slate-300">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  {item.problem.label}
                </span>

                <h3 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-slate-900 leading-snug">
                  {item.problem.title}
                </h3>

                <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.problem.description}
                </p>
              </div>

              {/* Result Card: Solid --color-primary (#0066cc) without gradient */}
              <div className="relative rounded-2xl bg-[var(--color-primary)] text-white p-7 sm:p-8 flex flex-col justify-start shadow-xs transition-all duration-200">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
                  {item.result.label}
                </span>

                <h3 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-white leading-snug">
                  {item.result.title}
                </h3>

                <p className="mt-3.5 text-sm sm:text-base text-white/85 leading-relaxed">
                  {item.result.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProblemSection;
