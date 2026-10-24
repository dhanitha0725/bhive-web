import React from "react";
import { Container } from "@/components/ui/container";
import { ConsultationTriggerButton } from "@/components/ui/consultation-trigger-button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { MessageSquare, ArrowRight, Compass, Layers, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <div className="w-full max-w-none overflow-x-clip bg-[#07152f] text-white relative border-b border-white/10">
      {/* Precision ambient background lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #0066cc 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #0066cc 0%, transparent 70%)" }}
        />
      </div>

      <section className="relative z-10 w-full pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Integrated Editorial Meta Bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wider uppercase text-white/50 mb-8 sm:mb-10">
            <span className="text-white/80">Colombo, Sri Lanka</span>
            <span className="text-white/25">•</span>
            <span>For Business Owners & Founders</span>
            <span className="text-white/25">•</span>
            <span className="text-emerald-400 font-semibold">Direct WhatsApp System</span>
          </div>

          {/* Asymmetric 12-Column Architectural Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Column 1: Core Commercial Value Proposition (7 cols) */}
            <div className="lg:col-span-7 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-white leading-[1.08]">
                More customers for your business.
                <span className="block text-white/90 mt-2 sm:mt-3">
                  Marketing that is planned, not guessed.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg lg:text-[21px] text-white/75 font-normal leading-relaxed max-w-2xl">
                We connect strategy, brand identity, websites, and targeted acquisition into one reliable system—turning visitors into steady sales without wasted ad spend.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <ConsultationTriggerButton
                  location="hero"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#07152f] hover:bg-slate-100 px-8 py-4 text-base sm:text-[17px] font-semibold transition-all duration-150 active:scale-[0.98] shadow-xl shadow-black/20 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                >
                  <span>Get Free Growth Consultation</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </ConsultationTriggerButton>

                <WhatsAppLink
                  location="hero"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/30 px-6 py-4 text-base font-medium text-white transition-all cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </WhatsAppLink>
              </div>

              {/* Trust Line */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Free 15-minute consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>No commercial obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Reply within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Column 2: Minimalist Growth Architecture Ledger (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 sm:p-7 text-left shadow-2xl shadow-black/40">
                {/* Ledger Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      The Growth Architecture
                    </div>
                    <div className="text-sm font-medium text-white mt-0.5">3 Connected Phases</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active System</span>
                  </div>
                </div>

                {/* 3 Structured Ledger Rows */}
                <div className="divide-y divide-white/10">
                  {/* Phase 1 */}
                  <div className="py-4.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 shrink-0" />
                        <span>Phase 01 · Strategy</span>
                      </span>
                      <span className="text-white/40 font-normal">Step 1</span>
                    </div>
                    <div className="text-base font-semibold text-white">Business Strategy & Positioning</div>
                    <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                      Target customer profiling, competitor check, and profitable pricing. No guessing.
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="py-4.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 shrink-0" />
                        <span>Phase 02 · Brand & Digital</span>
                      </span>
                      <span className="text-white/40 font-normal">Step 2</span>
                    </div>
                    <div className="text-base font-semibold text-white">Credibility & Conversion Platform</div>
                    <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                      Trustworthy visual identity and a fast website engineered to turn visitors into buyers.
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="py-4.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-1">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                        <span>Phase 03 · Acquisition</span>
                      </span>
                      <span className="text-white/40 font-normal">Step 3</span>
                    </div>
                    <div className="text-base font-semibold text-white">Predictable Sales & Enquiries</div>
                    <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                      Structured campaigns that deliver qualified buyer enquiries directly to your WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Ledger Footer */}
                <div className="pt-4 mt-1 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>Built for Sri Lankan SMBs</span>
                  <span className="text-white/80 font-medium">English · Sinhala · Tamil</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default HeroSection;
