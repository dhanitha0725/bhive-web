"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

const HERO_CARDS = [
  {
    src: "/images/figma/hero-1.png",
    alt: "BHive retail strategy showcase 1",
    elevated: false,
  },
  {
    src: "/images/figma/hero-2.png",
    alt: "BHive brand delivery showcase 2",
    elevated: true,
  },
  {
    src: "/images/figma/hero-3.png",
    alt: "BHive marketing campaign showcase 3",
    elevated: true,
  },
  {
    src: "/images/figma/hero-4.png",
    alt: "BHive customer connection showcase 4",
    elevated: false,
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full pt-8 sm:pt-14 md:pt-18 pb-16 sm:pb-24 lg:pb-32 overflow-hidden bg-white">
      <Container>
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-[1280px] mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY. BRAND. MARKETING.
            </span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[94px] font-medium tracking-[-0.04em] leading-[1.04] text-[#0b1220] max-w-[1280px]"
          >
            From First Step <br className="hidden sm:inline" />
            to Fully Scaled. <br className="hidden sm:inline" />
            We’re With <span className="text-[#3068f9]">You.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-[832px] text-base sm:text-lg lg:text-[18px] text-[#5b6475] leading-[1.6]"
          >
            No cookie-cutter campaigns or chasing viral trends. We create tailored, authentic
            strategies that solve real challenges and drive real sales, whether you&apos;re scaling
            an existing business or taking your very first step.
          </motion.p>

          {/* Hero Actions (2 Pill Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <PillButton
              variant="primary"
              href="/free-growth-audit"
              className="w-full sm:w-[248px]"
            >
              Get free growth audit
            </PillButton>

            <PillButton
              variant="secondary"
              isConsultation
              consultationLocation="hero"
              className="w-full sm:w-[248px]"
            >
              Book a growth consultation
            </PillButton>
          </motion.div>
        </div>

        {/* 12-Column Stretch Grid Showcase: 4 Cards (3 Cols each) */}
        <div className="mt-14 sm:mt-18 lg:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-end">
            {HERO_CARDS.map((card, idx) => (
              <motion.div
                key={card.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className={`relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 ${
                  card.elevated
                    ? "aspect-[302/396] sm:-translate-y-6 lg:-translate-y-8"
                    : "aspect-[302/336]"
                }`}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover block"
                  loading={idx < 2 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
