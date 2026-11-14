"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

export function ConsultationCalloutSection() {
  return (
    <section className="relative w-full py-6 sm:py-10 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full rounded-2xl bg-[#f5f7fa] border border-[#e5e8ee] p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#0b1220]">
              Not sure which service your business needs first?
            </h3>

            <p className="mt-2.5 sm:mt-3 text-base sm:text-lg text-[#5b6475] leading-[1.6]">
              We&apos;ll review your current setup and give you a straightforward recommendation.
            </p>
          </div>

          <div className="shrink-0">
            <PillButton
              treatment="primary"
              isConsultation
              consultationLocation="consultation-callout"
              showArrow
            >
              Book a growth consultation
            </PillButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
