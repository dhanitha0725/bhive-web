"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

export function FinalCtaSection() {
  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 lg:py-28 bg-white">
      <Container>
        <div className="rounded-3xl bg-[#0b1220] text-white px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="flex flex-col items-center text-center max-w-[880px] mx-auto">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-4 sm:mb-5"
            >
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-white/64 uppercase">
                LET’S FIND YOUR NEXT STEP
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.03em] leading-[1.06] text-white"
            >
              Ready to stop guessing and start getting real customers?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
              className="mt-5 max-w-[680px] text-base sm:text-lg text-white/64 leading-[1.6]"
            >
              Tell us about your business. We will review your current marketing and send you a
              practical 3-month action plan.
            </motion.p>

            {/* Two Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
              className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <PillButton
                treatment="primary"
                isConsultation
                consultationLocation="final-cta-growth-audit"
                consultationType="growth-audit"
                showArrow
                className="w-full sm:w-auto"
              >
                Get free growth audit
              </PillButton>

              <PillButton
                treatment="filled"
                isConsultation
                consultationLocation="final-cta-consultation"
                consultationType="consultation"
                className="w-full sm:w-auto"
              >
                Book a growth consultation
              </PillButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
