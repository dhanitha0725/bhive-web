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
    <section className="relative w-full bg-white text-neutral-900 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden min-h-[82vh] flex items-center justify-center border-b border-neutral-100">
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

      {/* Hero Architectural Container */}
      <Container className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="text-center max-w-4xl mx-auto pointer-events-auto">
          {/* Top Announcement / Pill Badge (AgentFrame style) */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200/90 bg-white/85 backdrop-blur-md px-3.5 py-1 text-xs text-neutral-600 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-neutral-300 transition-colors mb-6 sm:mb-8">
            <span className="rounded-full bg-[#0066cc] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              Agency
            </span>
            <span className="font-normal text-neutral-700">
              Strategic Brand &amp; Growth Marketing Agency
            </span>
          </div>

          {/* Display Headline with Serif Italic Accent (AgentFrame style) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.12] max-w-4xl mx-auto">
            From First Step to Fully Scaled.
            <span className="block font-serif italic font-normal text-[#0066cc] mt-1 sm:mt-2">
              We’re With You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-[17px] text-neutral-600 font-normal leading-[1.65] max-w-2xl mx-auto">
            No cookie-cutter campaigns or chasing viral trends. We create tailored, authentic strategies that solve real challenges and drive real sales, whether you’re scaling an existing business or taking your very first step.
          </p>

          {/* Action Group: 2 Side-by-Side CTAs with perfect proportions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
            {/* Outline / Secondary Button on Left (AgentFrame layout) */}
            <Link
              href="/free-growth-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white/95 hover:bg-neutral-50 px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] font-medium text-[#1d1d1f] transition-all duration-150 shadow-xs hover:border-neutral-400 active:scale-[0.98] cursor-pointer backdrop-blur-sm"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="h-4 w-4 text-[#0066cc]" />
            </Link>

            {/* Solid Primary Button on Right (AgentFrame layout) */}
            <ConsultationTriggerButton
              location="hero"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] font-medium transition-all duration-150 shadow-[0_2px_14px_rgba(0,102,204,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </ConsultationTriggerButton>
          </div>

          {/* Client Proof Section */}
          <div className="mt-14 sm:mt-16 pt-1">
            {/* Secondary Font Label */}
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium">
              Trusted by clients &amp; growing businesses
            </p>

            {/* Dummy Client Logos */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4">
              {/* Halcyon */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <span className="font-serif italic text-[18px] sm:text-[20px] text-neutral-700 tracking-wide">
                  Halcyon
                </span>
              </div>

              {/* VERTEX */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <svg className="h-3.5 w-3.5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 22 20 2 20" />
                </svg>
                <span className="font-sans font-bold text-[13px] sm:text-[14px] tracking-[0.24em] text-neutral-700 uppercase">
                  VERTEX
                </span>
              </div>

              {/* loopwork */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <svg className="h-4 w-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.267-8-12.362-8-5.096 0-5.096 8 0 8 5.095 0 7.267-8 12.362-8z" />
                </svg>
                <span className="font-sans font-semibold text-[15px] sm:text-[16px] tracking-tight text-neutral-700">
                  loopwork
                </span>
              </div>

              {/* Nimbus */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <svg className="h-4 w-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
                <span className="font-sans font-medium text-[16px] sm:text-[17px] tracking-normal text-neutral-700">
                  Nimbus
                </span>
              </div>

              {/* FORMA */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <span className="font-sans font-black text-[13px] sm:text-[14px] tracking-[0.22em] text-neutral-700 uppercase">
                  FORMA
                </span>
              </div>

              {/* arcline */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity cursor-default">
                <svg className="h-3.5 w-3.5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 20A16 16 0 0 1 20 4" />
                </svg>
                <span className="font-sans font-medium text-[15px] sm:text-[16px] tracking-wide text-neutral-700 lowercase">
                  arcline
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
