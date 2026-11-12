"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

export function ConsultationCalloutSection() {
  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-16 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full rounded-3xl bg-[#f5f7fa] border border-[#e5e8ee] p-8 sm:p-12 lg:p-16 flex flex-col items-start justify-center"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#0b1220]">
            Not sure which service your business needs first?
          </h3>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#5b6475] max-w-3xl leading-[1.6]">
            We&apos;ll review your current setup and give you a straightforward recommendation.
          </p>

          <div className="mt-6 sm:mt-8">
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
