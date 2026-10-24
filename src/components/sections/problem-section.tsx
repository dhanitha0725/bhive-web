"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { MinimalGradientCard } from "@/components/ui/minimal-gradient-card";

const OWNER_PAINS = [
  {
    tag: "Problem 01 • Organic Reach",
    title: "Posting regularly, but no enquiries",
    description:
      "You spend hours creating posts on Facebook and Instagram, but the only likes come from friends. No real customers are asking about prices or ordering.",
  },
  {
    tag: "Problem 02 • Website Conversion",
    title: "Website looks good, but nobody buys",
    description:
      "You spent money building a website, but visitors leave within seconds without calling, sending a message, or purchasing your products.",
  },
  {
    tag: "Problem 03 • Paid Advertising",
    title: "Wasting money on random ad boosts",
    description:
      "Boosting posts brings random likes and empty clicks, but very few paying customers. It feels like throwing money into the dark.",
  },
  {
    tag: "Problem 04 • Revenue Stability",
    title: "Unpredictable sales from month to month",
    description:
      "Some weeks are busy, other weeks are dead quiet. You rely mostly on word of mouth without a steady, planned way to attract new buyers.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-slate-900">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider">
            Sound Familiar?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.18]">
            Most businesses don&apos;t fail from bad products. They struggle because their marketing is guesswork.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Running a business in Sri Lanka is tough enough. You shouldn&apos;t have to guess how to get customers through your doors.
          </p>
        </div>

        {/* 4 Pains Grid — Minimal Borderless Linear Gradient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OWNER_PAINS.map((pain, index) => (
            <MinimalGradientCard
              key={index}
              variant="problem"
              eyebrow={pain.tag}
              title={pain.title}
              description={pain.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProblemSection;
