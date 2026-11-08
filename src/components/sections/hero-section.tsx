"use client";

import React from "react";
import Link from "next/link";
import { ConsultationTriggerButton } from "@/components/ui/consultation-trigger-button";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";
import { ArrowRight } from "lucide-react";

// Local showcase images from public/images/hero
const HERO_SHOWCASE_ITEMS: TiltedGridImage[] = [
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
    <section className="relative w-full bg-white text-neutral-900 border-b border-neutral-100 overflow-hidden">
      <TiltedGridHero
        images={HERO_SHOWCASE_ITEMS}
        speed={5}
        aspectRatio={3 / 4}
        axis={64}
        curve={76}
        fade={3}
        className="h-[580px] sm:h-[640px] lg:h-[700px] w-full bg-white"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between pt-16 sm:pt-20 pb-10 sm:pb-12 lg:pb-14 text-center px-4 max-w-5xl mx-auto pointer-events-none select-none">
          {/* Top Block: Badge, Headline, and CTAs */}
          <div className="flex flex-col items-center">
            {/* Agency Pill Badge */}
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-xs px-3.5 py-1 text-xs text-neutral-600 shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-4 sm:mb-5">
              <span className="rounded-full bg-[#0066cc] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Agency
              </span>
              <span className="font-normal text-neutral-700">Strategic Brand &amp; Growth Marketing Agency</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.14] max-w-3xl">
              From First Step to Fully Scaled.
              <span className="block font-serif italic font-normal text-[#0066cc] mt-1 sm:mt-1.5">We’re With You.</span>
            </h1>

            {/* Action Group: 2 Side-by-Side CTAs */}
            <div className="pointer-events-auto mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/free-growth-audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white hover:bg-neutral-50 px-5 py-2.5 sm:px-6 sm:py-2.5 text-[13.5px] font-medium text-[#1d1d1f] transition-all duration-150 shadow-xs hover:border-neutral-400 active:scale-[0.98] cursor-pointer"
              >
                <span>Get Free Growth Audit</span>
                <ArrowRight className="h-4 w-4 text-[#0066cc]" />
              </Link>

              <ConsultationTriggerButton
                location="hero"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-5 py-2.5 sm:px-6 sm:py-2.5 text-[13.5px] font-medium transition-all duration-150 shadow-[0_2px_14px_rgba(0,102,204,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </ConsultationTriggerButton>
            </div>
          </div>

          {/* Bottom Block: Reassurance */}
          <div className="mt-auto pt-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium">
              Strategic Brand Systems • Digital Execution • Predictable Growth
            </p>
          </div>
        </div>
      </TiltedGridHero>
    </section>
  );
}

export default HeroSection;
