"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { MessageSquare, Search, PhoneCall } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: MessageSquare,
    title: "1. Message us your business details",
    description:
      "Send a quick note on WhatsApp or fill out our 30-second form with your business name and main goal.",
  },
  {
    step: "02",
    icon: Search,
    title: "2. We review your current marketing",
    description:
      "Before we talk, our team analyzes your website, social channels, and competitors to see where sales are leaking.",
  },
  {
    step: "03",
    icon: PhoneCall,
    title: "3. Short call with a clear, honest plan",
    description:
      "We walk you through a tailored 3-month action plan. If we're a good fit, we can work together. If not, the plan is 100% yours to keep.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/70 text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            How we get started together
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            No endless sales pitches or complicated onboarding. We keep it direct and practical.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-[22px] bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      STEP {item.step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#0066cc]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold font-display text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;
