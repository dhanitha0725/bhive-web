"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";

const HERO_CARDS = [
  {
    id: "01",
    src: "/images/figma/hero-1.png",
    alt: "BHive retail strategy showcase 1",
    taller: false,
    label: "Retail Strategy",
  },
  {
    id: "02",
    src: "/images/figma/hero-2.png",
    alt: "BHive brand delivery showcase 2",
    taller: true,
    label: "Brand Identity",
  },
  {
    id: "03",
    src: "/images/figma/hero-3.png",
    alt: "BHive marketing campaign showcase 3",
    taller: true,
    label: "Growth Marketing",
  },
  {
    id: "04",
    src: "/images/figma/hero-4.png",
    alt: "BHive customer connection showcase 4",
    taller: false,
    label: "Digital Systems",
  },
];

// 4 sets (16 cards total) for seamless continuous rightward loop on any screen width
const LOOP_CARDS = [...HERO_CARDS, ...HERO_CARDS, ...HERO_CARDS, ...HERO_CARDS];

// Motion specification from Figma Board 03: 200ms ease-out, 12px translate
const motionFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" as const, delay },
});

export function HeroSection() {
  return (
    <section className="relative w-full pt-10 sm:pt-14 md:pt-18 lg:pt-22 pb-8 sm:pb-12 lg:pb-16 bg-white overflow-hidden">
      {/* Top Header Block: Generous breathing room aligned with design system */}
      <Container>
        <div className="flex flex-col items-center text-center max-w-[1280px] mx-auto">
          {/* Eyebrow: Label / Eyebrow 13px, weight 500, +15% tracking */}
          <motion.div {...motionFadeUp(0)} className="mb-3 sm:mb-4">
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY. BRAND. MARKETING.
            </span>
          </motion.div>

          {/* Display Headline: Entire "We're With You." in brand blue */}
          <motion.h1
            {...motionFadeUp(0.05)}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] font-medium tracking-[-0.04em] leading-[1.08] sm:leading-[1.05] text-[#0b1220] max-w-[1080px]"
          >
            From First Step to Fully Scaled. <br className="hidden md:inline" />
            <span className="text-[#3068f9]">We’re With You.</span>
          </motion.h1>

          {/* Subheading: Concise, high-impact business message */}
          <motion.p
            {...motionFadeUp(0.1)}
            className="mt-4 sm:mt-5 max-w-xl text-[15px] sm:text-base lg:text-[17px] text-[#5b6475] leading-[1.6]"
          >
            Tailored strategy, brand, and marketing systems built to win real customers and scale your business.
          </motion.p>

          {/* Hero Actions (2 Pill Buttons, single line, proper padding) */}
          <motion.div
            {...motionFadeUp(0.15)}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
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
      </Container>

      {/* Automatic Looping Showcase: Moves images automatically to the right side in infinite loop */}
      <div className="w-full mt-10 sm:mt-14 md:mt-16 lg:mt-20 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] select-none">
        <div className="flex items-center gap-4 sm:gap-6 w-max animate-marquee-right hover:[animation-play-state:paused] py-2">
          {LOOP_CARDS.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className={`relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] shrink-0 transition-transform duration-200 hover:scale-[1.02] ${
                card.taller ? "aspect-[2/3]" : "aspect-[5/6]"
              } w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px]`}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-full object-cover block"
                loading={idx < 4 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
