"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { ConsultationTriggerButton } from "@/components/ui/consultation-trigger-button";
import { ArrowRight } from "lucide-react";

// Dynamically import GradientWaves to prevent WebGL SSR hydration mismatch
const GradientWaves = dynamic(() => import("@/components/GradientWaves"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-white" />,
});

export function HeroSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 overflow-hidden min-h-[85vh] flex items-center justify-center border-b border-neutral-100">
      {/* React Bits GradientWaves WebGL Surface */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <GradientWaves
          horizonColor="#006eff"
          waveColor="#0073ff"
          crestColor="#0055ff"
          backgroundColor="#ffffff"
          lightMode={true}
          speed={0.32}
          amplitude={3}
          waveScale={0.65}
          waveRatio={0.95}
          swell={28}
          turbulence={20}
          tilt={75}
          zoom={1.85}
          height={5}
          fogDepth={18}
          relief={0.9}
          lightAngle={110}
          sheen={0.35}
          brightness={1.05}
          opacity={0.9}
          grain={0.18}
          quality="medium"
          mouseInteraction={true}
          swellOnClick={true}
          className="w-full h-full"
        />
        {/* Soft atmospheric gradient scrim for flawless contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/70 pointer-events-none" />
      </div>

      {/* 12-Column Grid Architectural Container */}
      <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
          <div className="lg:col-span-12 text-center max-w-4xl mx-auto">
            {/* Display Headline with Blue & Black Contrast */}
            <h1 className="text-[38px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.04]">
              More customers for your business.
              <span className="block text-[#0066cc] font-medium mt-2 sm:mt-3">
                Marketing planned, not guessed.
              </span>
            </h1>

            {/* Subtitle - exactly 2 clean lines */}
            <p className="mt-6 text-base sm:text-lg lg:text-[18px] text-[#1d1d1f]/75 font-normal leading-[1.65] max-w-2xl mx-auto">
              We connect brand strategy, high-converting websites, and targeted customer acquisition
              <br className="hidden sm:inline" /> into one reliable system—turning visitors into steady sales without wasted ad spend.
            </p>

            {/* Action Group */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              {/* Primary Action Button */}
              <ConsultationTriggerButton
                location="hero"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-8 py-3.5 text-[15px] font-medium transition-all duration-150 shadow-[0_4px_16px_rgba(0,102,204,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Free Growth Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </ConsultationTriggerButton>

              {/* Free Audit Button */}
              <Link
                href="/free-growth-audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white/95 hover:bg-neutral-50 px-8 py-3.5 text-[15px] font-medium text-[#1d1d1f] transition-all duration-150 shadow-sm active:scale-[0.98] cursor-pointer backdrop-blur-md"
              >
                <span>Get Free Growth Audit</span>
                <ArrowRight className="h-4 w-4 text-[#0066cc]" />
              </Link>
            </div>

            {/* Generously Spaced Micro Trust Line */}
            <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-xs sm:text-[13px] text-neutral-500 font-normal">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
                Free 15-minute consultation
              </span>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
                No commercial obligation
              </span>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
                Direct WhatsApp response
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
