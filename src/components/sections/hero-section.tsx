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
    taller: false,
  },
  {
    src: "/images/figma/hero-2.png",
    alt: "BHive brand delivery showcase 2",
    taller: true,
  },
  {
    src: "/images/figma/hero-3.png",
    alt: "BHive marketing campaign showcase 3",
    taller: true,
  },
  {
    src: "/images/figma/hero-4.png",
    alt: "BHive customer connection showcase 4",
    taller: false,
  },
];

// Motion specification from Figma Board 03: 200ms ease-out, 12px translate
const motionFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" as const, delay },
});

export function HeroSection() {
  return (
    <section className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 lg:pb-14 bg-white">
      <Container>
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-[1280px] mx-auto">
          {/* Eyebrow: Label / Eyebrow 13px, weight 500, +2% tracking */}
          <motion.div {...motionFadeUp(0)} className="mb-3 sm:mb-4">
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY. BRAND. MARKETING.
            </span>
          </motion.div>

          {/* Display Headline: Display / H1 - Clean 2-line layout */}
          <motion.h1
            {...motionFadeUp(0.05)}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-medium tracking-[-0.04em] leading-[1.05] text-[#0b1220] max-w-[1100px]"
          >
            From First Step to Fully Scaled. <br className="hidden md:inline" />
            We’re With <span className="text-[#3068f9]">You.</span>
          </motion.h1>

          {/* Subheading: Concise, high-impact business message (Body / Large 18px · 400 · 160%) */}
          <motion.p
            {...motionFadeUp(0.1)}
            className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg lg:text-[18px] text-[#5b6475] leading-[1.6]"
          >
            Tailored strategy, brand, and marketing systems built to win real customers and scale
            your business.
          </motion.p>

          {/* Hero Actions (2 Pill Buttons, single line text with proper padding) */}
          <motion.div
            {...motionFadeUp(0.15)}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto"
          >
            <PillButton
              treatment="primary"
              href="/free-growth-audit"
              className="w-full sm:w-auto"
            >
              Get free growth audit
            </PillButton>

            <PillButton
              treatment="outline"
              isConsultation
              consultationLocation="hero"
              className="w-full sm:w-auto"
            >
              Book a growth consultation
            </PillButton>
          </motion.div>
        </div>

        {/* 12-Column Stretch Grid Showcase: 4 Cards (3 Cols each), Middle-Aligned */}
        <div className="mt-10 sm:mt-14 lg:mt-18">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
            {HERO_CARDS.map((card, idx) => (
              <motion.div
                key={card.src}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" as const, delay: 0.1 + idx * 0.05 }}
                className={`relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] transition-colors duration-200 ${
                  card.taller
                    ? "aspect-[2/3]"
                    : "aspect-[5/6]"
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
