"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { ConsultationTriggerButton } from "@/components/ui/consultation-trigger-button";
import { ArrowRight } from "lucide-react";
import type { FlexCarouselItem } from "@/components/FlexCarousel";

// Dynamically import FlexCarousel to prevent WebGL SSR hydration mismatch
const FlexCarousel = dynamic(() => import("@/components/FlexCarousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] bg-neutral-50/70 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">Loading showcase...</div>
    </div>
  ),
});

const HERO_SHOWCASE_ITEMS: FlexCarouselItem[] = [
  {
    src: "/images/hero/hero-showcase-1.png",
    alt: "BHive Brand & Growth Showcase 1",
  },
  {
    src: "/images/hero/hero-showcase-2.png",
    alt: "BHive Digital Storefront Showcase 2",
  },
  {
    src: "/images/hero/hero-showcase-3.png",
    alt: "BHive Marketing Architecture Showcase 3",
  },
  {
    src: "/images/hero/hero-showcase-4.png",
    alt: "BHive Conversion Experience Showcase 4",
  },
  {
    src: "/images/hero/hero-showcase-5.png",
    alt: "BHive Mobile Interface Showcase 5",
  },
  {
    src: "/images/hero/hero-showcase-6.png",
    alt: "BHive System Growth Showcase 6",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 overflow-hidden border-b border-neutral-100">
      <Container className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Announcement / Pill Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200/90 bg-white px-3.5 py-1 text-xs text-neutral-600 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-neutral-300 transition-colors mb-6 sm:mb-8">
            <span className="rounded-full bg-[#0066cc] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              Agency
            </span>
            <span className="font-normal text-neutral-700">
              Strategic Brand &amp; Growth Marketing Agency
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.12] max-w-4xl mx-auto">
            From First Step to Fully Scaled.
            <span className="block font-serif italic font-normal text-[#0066cc] mt-1 sm:mt-2">
              We’re With You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-[17px] text-neutral-600 font-normal leading-[1.65] max-w-2xl mx-auto">
            No cookie-cutter campaigns or chasing viral trends. We create tailored, authentic strategies that solve real challenges and drive real sales, whether you’re scaling an existing business or taking your very first step.
          </p>

          {/* Action Group: 2 Side-by-Side CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
            <Link
              href="/free-growth-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white hover:bg-neutral-50 px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] font-medium text-[#1d1d1f] transition-all duration-150 shadow-xs hover:border-neutral-400 active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="h-4 w-4 text-[#0066cc]" />
            </Link>

            <ConsultationTriggerButton
              location="hero"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] font-medium transition-all duration-150 shadow-[0_2px_14px_rgba(0,102,204,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </ConsultationTriggerButton>
          </div>
        </div>

        {/* React Bits FlexCarousel — Automatic Loop Showcase */}
        <div className="mt-14 sm:mt-20 w-full h-[380px] sm:h-[460px] lg:h-[520px] overflow-hidden rounded-2xl relative select-none">
          <FlexCarousel
            items={HERO_SHOWCASE_ITEMS}
            autoplay={true}
            interval={3}
            preset="liquid"
            fit="portrait"
            cardHeight={0.78}
            gap={18}
            radius={18}
            captions={false}
            focusOnClick={true}
          />
        </div>

        {/* Reassurance Label */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium">
            Strategic Brand Systems • Digital Execution • Predictable Growth
          </p>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
