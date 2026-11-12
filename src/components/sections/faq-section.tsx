"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Do you take freelance commissions?",
    a: "We work on structured project engagements and monthly growth partnerships. We do not do one-off hourly freelancing because our work focuses on end-to-end commercial outcomes rather than disconnected design tasks.",
  },
  {
    q: "What industries or clients do you usually work with?",
    a: "We work primarily with established SMEs, retail brands, exporters, hospitality groups, and ambitious venture founders across Sri Lanka and regional markets looking to build sustainable customer growth.",
  },
  {
    q: "How long does a typical project take?",
    a: "Brand and strategic foundations typically take 4 to 6 weeks. Full website architecture and custom digital deployment take 6 to 8 weeks. Growth optimization runs on quarterly cycles.",
  },
  {
    q: "What file formats will I receive?",
    a: "You receive full, unrestricted ownership of all raw design files (Figma, vectors, SVG, PDF), brand design guidelines, production-ready code repositories, and complete deployment credentials.",
  },
  {
    q: "How do we get started working together?",
    a: "Start with a 15-minute introductory call or free growth audit. We evaluate your current marketing, determine if we are the right fit, and provide a clear 3-month action plan before any commitment.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* 12-Column Stretch Grid: 5 Cols Left (Header + CTA) + 7 Cols Right (Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: 5 Columns */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 sm:mb-4"
            >
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
                GOOD QUESTIONS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="mt-8 sm:mt-12">
              <PillButton
                treatment="primary"
                isConsultation
                consultationLocation="faq"
                showArrow
              >
                Let&apos;s talk
              </PillButton>
            </div>
          </div>

          {/* Right Column: 7 Columns Accordion */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#e5e8ee] border-t border-b border-[#e5e8ee]">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-[#0b1220] group-hover:text-[#3068f9] transition-colors duration-200 leading-[1.3]">
                      {faq.q}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-[#f5f7fa] flex items-center justify-center shrink-0 text-[#0b1220] group-hover:bg-[#eef3ff] group-hover:text-[#3068f9] transition-colors duration-200">
                      <Plus
                        className={`h-4 w-4 transition-transform duration-200 ease-out ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 sm:pt-4 text-sm sm:text-base text-[#5b6475] leading-relaxed pr-6 sm:pr-10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
