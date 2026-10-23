"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { useConsultation } from "@/components/providers/consultation-provider";
import { getWhatsAppUrl } from "@/config/site";
import { MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export function FinalCtaSection() {
  const { openConsultation } = useConsultation();

  return (
    <section className="bg-gradient-to-b from-[#0a254f] to-[#071a3a] py-16 sm:py-20 lg:py-24 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-200">
            Take The Next Step
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold font-display tracking-tight text-white leading-[1.15]">
            Ready to stop guessing and start getting real customers?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-blue-100 leading-relaxed font-normal">
            Tell us about your business. We will review your current marketing and send you a practical 3-month action plan.
          </p>

          {/* Action Buttons: Single Primary CTA + WhatsApp */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={openConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#0a254f] hover:bg-blue-50 px-7 py-4 text-base sm:text-[17px] font-semibold transition-all duration-150 active:scale-[0.97] shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Get Free Growth Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-all duration-150 active:scale-[0.97]"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Micro trust assurances */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm text-blue-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Free 1-on-1 business review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>No pushy sales calls</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Reply within 24 hours</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCtaSection;
