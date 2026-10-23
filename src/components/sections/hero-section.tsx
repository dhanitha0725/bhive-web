"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { useConsultation } from "@/components/providers/consultation-provider";
import { getWhatsAppUrl } from "@/config/site";
import { MessageSquare, ArrowRight, ShieldCheck, Check } from "lucide-react";

export function HeroSection() {
  const { openConsultation } = useConsultation();

  return (
    <div className="w-full max-w-none overflow-x-clip">
      <section className="relative flex w-full flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#0066cc] via-[#005bb8] to-[#004f9e] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        {/* Crisp static decorative backdrop (replaces heavy WebGL for mobile performance) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)",
            }}
          />
        </div>

        <Container className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center px-4 sm:px-6">
          {/* Top Category Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs sm:text-sm font-medium text-white/95 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Marketing for Sri Lankan Businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-tight text-white leading-[1.12] max-w-3xl">
            More customers for your business. Marketing that is planned, not guessed.
          </h1>

          {/* Subline: Who it is for + Outcome */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-[19px] text-white/90 font-normal leading-relaxed">
            We help small and medium business owners turn social posts and website visitors into steady sales—without wasting money on random boosting.
          </p>

          {/* Actions: One Primary CTA + Small WhatsApp Link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={openConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#0066cc] hover:bg-blue-50 px-7 py-4 text-base sm:text-[17px] font-semibold transition-all duration-150 active:scale-[0.97] shadow-lg shadow-black/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Get Free Growth Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/90 hover:text-white underline underline-offset-4 py-2 px-3 transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-emerald-300" />
              <span>Or chat on WhatsApp</span>
            </a>
          </div>

          {/* Trust Line & Micro-benefits */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-white/85">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span>Free. No obligation.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-300" />
              <span>Tailored to Sri Lankan market</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-300" />
              <span>Direct WhatsApp reply in 24 hours</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default HeroSection;
