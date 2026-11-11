"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Message us your business details",
    description:
      "Send a quick note on WhatsApp or fill out our 30-second form with your business name and main goal.",
  },
  {
    number: "02",
    title: "We review your current marketing",
    description:
      "Before we talk, our team analyzes your website, social channels, and competitors to see where sales are leaking.",
  },
  {
    number: "03",
    title: "Short call with a clear, honest plan",
    description:
      "We walk you through a tailored 3-month action plan. If we're a good fit, we can work together. If not, the plan is 100% yours to keep.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              HOW IT WORKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.08] text-[#0b1220]"
          >
            How we get started together
          </motion.h2>
        </div>

        {/* 12-Column Stretch Grid: 3 Cards (4 Cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-white border border-[#e5e8ee] p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:border-[#c5cbe0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <span className="text-3xl sm:text-4xl font-medium text-[#3068f9] mb-6 block">
                {step.number}
              </span>

              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#0b1220] mb-4">
                {step.title}
              </h3>

              <p className="text-sm sm:text-base text-[#5b6475] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
