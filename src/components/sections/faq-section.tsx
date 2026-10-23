"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How much does it cost?",
    a: "We don't believe in one-size-fits-all agency retainers. After our initial free consultation, we provide a transparent, fixed-price quote based strictly on what your business actually needs—whether that's a quick website refresh, branding, or an ongoing monthly marketing plan. There are zero hidden fees.",
  },
  {
    q: "How long does it take to see results?",
    a: "Quick fixes like improving your WhatsApp inquiry links or launching focused campaigns usually start producing customer enquiries within 2 to 3 weeks. Complete rebrands and website projects typically take 4 to 6 weeks from kickoff to launch.",
  },
  {
    q: "How does working with BHive actually work?",
    a: "We start with a quick WhatsApp chat or 20-minute call to understand your business and review your current marketing. Next, we give you a clear, written 3-month action plan. If you choose to work with us, we execute the plan step-by-step while giving you weekly updates in plain English, Sinhala, or Tamil.",
  },
  {
    q: "Can our team communicate in Sinhala or Tamil?",
    a: "Yes, absolutely! We understand that most businesses in Sri Lanka operate smoothly in local languages. Our team is fully comfortable discussing strategy and preparing social content in English, Sinhala, and Tamil.",
  },
  {
    q: "What do I get in the Free Growth Consultation?",
    a: "You get a direct 1-on-1 review of your existing marketing, social media, and website. We point out exactly where you are losing potential buyers and outline 3 practical changes you can make immediately. It is 100% free with zero obligation.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <Container className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our pricing, process, and communication.
          </p>
        </div>

        {/* Accordion List (5 items max) */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-[18px] border border-slate-200 bg-slate-50/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-semibold text-base sm:text-lg text-slate-900 hover:text-[#0066cc] transition-colors focus-visible:outline-2 focus-visible:outline-[#0071e3]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0066cc]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
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

export default FaqSection;
