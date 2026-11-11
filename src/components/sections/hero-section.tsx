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
    <section className="relative w-full overflow-hidden border-b border-neutral-100 bg-white text-neutral-900">
      {/* Hero copy — stays in the normal flow so it can never collide with the showcase. */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-10 text-center select-none sm:px-6 sm:pt-14 lg:pt-16">
        {/* Agency Pill Badge */}
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 px-3 py-1 text-[10px] text-neutral-600 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-xs sm:mb-5 sm:px-3.5 sm:text-xs">
          <span className="shrink-0 rounded-full bg-[#0066cc] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Agency
          </span>
          <span className="truncate font-normal text-neutral-700">Strategic Brand &amp; Growth Marketing Agency</span>
        </div>

        {/* Display Headline */}
        <h1 className="max-w-3xl text-2xl font-semibold leading-[1.18] tracking-[-0.03em] text-[#1d1d1f] text-balance sm:text-4xl sm:leading-[1.14] lg:text-5xl">
          From First Step to Fully Scaled.
          <span className="mt-1 block font-serif font-normal italic text-[#0066cc] sm:mt-1.5">We’re With You.</span>
        </h1>

        {/* Action Group: 2 Side-by-Side CTAs */}
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row">
          <Link
            href="/free-growth-audit"
            className="inline-flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white px-5 py-2.5 text-[13.5px] font-medium text-[#1d1d1f] shadow-xs transition-all duration-150 hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.98] sm:w-auto sm:px-6"
          >
            <span>Get Free Growth Audit</span>
            <ArrowRight className="h-4 w-4 text-[#0066cc]" />
          </Link>

          <ConsultationTriggerButton
            location="hero"
            className="inline-flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_2px_14px_rgba(0,102,204,0.25)] transition-all duration-150 hover:bg-[#0055b3] active:scale-[0.98] sm:w-auto sm:px-6"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </ConsultationTriggerButton>
        </div>
      </div>

      {/* 3D curved showcase — a dedicated band below the copy, so the fan can
          never sit on top of the headline or the CTAs. The vertical mask only
          softens the outer cards that bleed past the band. */}
      <div
        className="relative mt-8 w-full sm:mt-10 lg:mt-12"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 9%, #000 91%, transparent 100%)",
        }}
      >
        <TiltedGridHero
          images={HERO_SHOWCASE_ITEMS}
          speed={5}
          aspectRatio={3 / 4}
          axis={50}
          curve={82}
          fade={4}
          className="h-[230px] w-full bg-transparent sm:h-[300px] lg:h-[360px] xl:h-[400px]"
        />
      </div>

      {/* Reassurance tagline — sits below the fan, never underneath it. */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-7 text-center sm:pb-8 lg:pb-10">
        <p className="mx-auto max-w-[20rem] text-balance font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-neutral-400 sm:max-w-none sm:text-[11px] sm:tracking-[0.16em] lg:text-xs lg:tracking-[0.18em]">
          Strategic Brand Systems • Digital Execution • Predictable Growth
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
