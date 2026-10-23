"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { MessageSquareOff, EyeOff, DollarSign, Shuffle } from "lucide-react";

const OWNER_PAINS = [
  {
    icon: MessageSquareOff,
    title: "Posting regularly, but no enquiries",
    description:
      "You spend hours creating posts on Facebook and Instagram, but the only likes come from friends. No real customers are asking about prices or ordering.",
  },
  {
    icon: EyeOff,
    title: "Website looks good, but nobody buys",
    description:
      "You spent money building a website, but visitors leave within seconds without calling, sending a message, or purchasing your products.",
  },
  {
    icon: DollarSign,
    title: "Wasting money on random ad boosts",
    description:
      "Boosting posts brings random likes and empty clicks, but very few paying customers. It feels like throwing money into the dark.",
  },
  {
    icon: Shuffle,
    title: "Unpredictable sales from month to month",
    description:
      "Some weeks are busy, other weeks are dead quiet. You rely mostly on word of mouth without a steady, planned way to attract new buyers.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold uppercase tracking-wider">
            Sound Familiar?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold font-display tracking-tight text-slate-900 leading-[1.2]">
            Most businesses don&apos;t fail from bad products. They struggle because their marketing is guesswork.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Running a business in Sri Lanka is tough enough. You shouldn&apos;t have to guess how to get customers through your doors.
          </p>
        </div>

        {/* 4 Pains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OWNER_PAINS.map((pain, index) => {
            const Icon = pain.icon;
            return (
              <div
                key={index}
                className="rounded-[20px] bg-slate-50 border border-slate-200/90 p-6 sm:p-7 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold font-display text-slate-900">
                      {pain.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {pain.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ProblemSection;
