"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

export function SelectedWorkSection() {
  return (
    <section id="work" className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY INTO RESULTS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]"
          >
            Selected work
          </motion.h2>
        </div>

        {/* 12-Column Stretch Grid: 8 Cols Left (Image) + 4 Cols Right (Story Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 8 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] min-h-[300px] sm:min-h-[420px] lg:min-h-[480px]"
          >
            <img
              src="/images/figma/case-halegrove.png"
              alt="Halegrove Case Study"
              className="w-full h-full object-cover block"
            />
          </motion.div>

          {/* Right Column: 4 Columns (Dark Ink Card #0B1220) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-4 rounded-2xl bg-[#0b1220] p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white"
          >
            {/* Top Story */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Halegrove
              </h3>
              <p className="mt-3 text-sm sm:text-base text-white/64 leading-relaxed">
                Rebuilt the creative testing engine and consolidated spend around three hero angles.
              </p>
            </div>

            {/* Bottom Outcome & Action */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-2xl sm:text-[32px] font-medium tracking-tight text-white mb-6">
                x3 Sale Growth
              </p>

              <PillButton
                treatment="filled"
                href="/work"
                className="w-full"
                showArrow
              >
                View full case study
              </PillButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
