"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Rocket,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CloudSky } from "@/components/ui/cloud-sky";
import { Container } from "@/components/ui/container";
import { Dialog } from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

const ROTATING_WORDS = ["Scale", "Launch", "Build", "Grow", "Transform"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [strategyDialogOpen, setStrategyDialogOpen] = useState(false);
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Outer wrapper: full viewport width. Mobile = 100% (no frame).
          md+ = uniform inset frame: same margin on top/left/right/bottom.
          12px on md, 16px on lg+ (small, responsive, no max-width cap so
          side gutters can never grow larger than top/bottom). */}
      <div className="w-full max-w-none bg-white p-0 md:p-3 lg:p-4 overflow-x-clip">
        {/* Rounded rectangle frame: mobile = full-bleed square; md+ = inset rounded.
            min-h is viewport-relative minus the outer inset (12px*2=24px on md,
            16px*2=32px on lg+) so top AND bottom edges sit equally inside the
            initial viewport. Content taller than viewport will still expand
            naturally — bottom rounded corners then appear after a short scroll
            with the same margin. */}
        <section className="relative flex w-full flex-col justify-center items-center overflow-hidden bg-[#0075FF] text-white rounded-none md:rounded-[32px] lg:rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,100,255,0.28)] md:border md:border-black/[0.04] min-h-[100svh] md:min-h-[calc(100dvh-24px)] lg:min-h-[calc(100dvh-32px)] pt-24 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12">
          {/* 1. Cloud Sky Background (Interactive WebGL Drifting Sky with #0075FF background) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto rounded-none md:rounded-[32px] lg:rounded-[40px]">
            <CloudSky
              background="#0075FF"
              baseColor="#B4D2F0"
              accentColor="#FFFFFF"
              density={85}
              speed={45}
              size={130}
              clouds={{ softness: 160, shadow: 65, cirrus: 65 }}
              sun={{ x: 92, y: 94, glow: "#FFFFFF" }}
              pointer={{ wind: 220, damping: 40, parallax: 240 }}
              style={{ width: "100%", height: "100%", minWidth: "100%", minHeight: "100%" }}
            />
            {/* Soft atmospheric gradient to maintain high legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0075FF]/35 via-transparent to-[#0075FF]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-[#0060df]/30 pointer-events-none" />
          </div>

          {/* 2. Main Hero Content Container */}
          <Container className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center px-5 sm:px-6">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 backdrop-blur-md px-4 py-1.5 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-white/90" />
              <span className="text-xs sm:text-sm font-semibold text-white/95">
                Strategic Brand &amp; Growth Marketing Agency
              </span>
            </motion.div>

            {/* Main Display Headline (Marketing-focused, strictly 2 lines) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] font-bold tracking-tight text-white leading-[1.18] max-w-6xl"
            >
              <span className="block sm:whitespace-nowrap">
                <span>We</span>{" "}
                {/* Clean Glass Word Capsule */}
                <span className="relative inline-flex items-center justify-center rounded-full border border-white/60 bg-white/20 px-3 sm:px-5 py-0.5 backdrop-blur-md min-w-[120px] sm:min-w-[160px] md:min-w-[190px] h-[40px] sm:h-[50px] md:h-[58px] overflow-hidden align-middle mx-1 sm:mx-1.5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-white font-bold tracking-tight whitespace-nowrap will-change-transform"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                <span>High-Impact</span>
              </span>
              <span className="block mt-1 sm:mt-2.5 sm:whitespace-nowrap">
                Brands, Websites &amp; Growth Systems
              </span>
            </motion.h1>

            {/* Subtitle - strictly 2 lines */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg text-white/90 font-normal leading-relaxed"
            >
              <span className="block sm:whitespace-nowrap">
                From strategic branding and high-converting websites to paid ads and SEO—
              </span>
              <span className="block sm:whitespace-nowrap mt-0.5">
                we build connected growth systems that turn vision into measurable revenue.
              </span>
            </motion.p>

          {/* 3. DUAL PATHWAY CARDS CONTAINER (Clean, simple, high-converting) */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-8 md:mt-10 w-full rounded-[28px] sm:rounded-[34px] bg-white/20 backdrop-blur-2xl p-2 sm:p-3 lg:p-4"
            >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 text-left">
                {/* Card 1: For New Businesses & Founders (Free Strategy Call) */}
              <div className="rounded-2xl sm:rounded-[22px] bg-white p-6 sm:p-8 text-slate-900 border border-white/80 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
                  <div>
                    {/* Pathway Tag */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                      <Rocket className="h-3.5 w-3.5 text-blue-600" />
                      <span>FOR NEW BUSINESSES &amp; FOUNDERS</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                      Book a Free 1-on-1 Strategy Call
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Building a new venture? Discuss your business model, brand identity, and go-to-market launch plan 1-on-1 with a senior strategist.
                    </p>

                    {/* Clean Checkmarks List */}
                    <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>Market positioning &amp; launch roadmap</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>Brand identity &amp; high-converting website direction</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>30-minute tailored discovery session · 100% free guidance</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Action Button */}
                  <div className="mt-7 pt-1">
                    <button
                      type="button"
                      onClick={() => setStrategyDialogOpen(true)}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0a254f] hover:bg-[#071a3a] px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg"
                    >
                      <span>BOOK A FREE STRATEGY CALL</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Card 2: For Existing Businesses (Free Growth Audit) */}
                <div className="rounded-2xl sm:rounded-[24px] bg-white p-7 sm:p-8 text-slate-900 border border-white/90 flex flex-col justify-between shadow-[0_16px_45px_rgba(0,25,90,0.14)] hover:shadow-[0_22px_55px_rgba(0,25,90,0.2)] transition-all duration-300">
                  <div>
                    {/* Pathway Tag */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                      <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                      <span>FOR EXISTING BUSINESSES</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                      Free Social Media &amp; Growth Audit
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Already running a business? Uncover hidden revenue leaks and discover high-ROI channels across your social, ads, and web funnel.
                    </p>

                    {/* Clean Checkmarks List */}
                    <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>Social media &amp; paid ads performance review</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>Website conversion funnel &amp; SEO diagnostics</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span>Actionable growth roadmap delivered in 48h · 100% free</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Action Button */}
                  <div className="mt-7 pt-1">
                    <button
                      type="button"
                      onClick={() => setAuditDialogOpen(true)}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg"
                    >
                      <span>REQUEST MY FREE AUDIT</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>

      {/* Dialog for New Businesses: 1-on-1 Free Strategy Call */}
      <Dialog
        open={strategyDialogOpen}
        onClose={() => setStrategyDialogOpen(false)}
        title="Book Your Free Strategy Call"
      >
        <div className="text-sm text-slate-600 -mt-2 mb-4 space-y-1.5">
          <p>
            Connect 1-on-1 with a senior commercial strategist. We will discuss your business
            concept, target market, and map out a high-converting launch roadmap.
          </p>
          <p className="text-xs font-semibold text-blue-600">
            ✓ 30 minutes · 100% confidential · Zero sales pressure
          </p>
        </div>
        <LeadForm type="business-guidance" />
      </Dialog>

      {/* Dialog for Existing Businesses: Free Social Media & Growth Audit */}
      <Dialog
        open={auditDialogOpen}
        onClose={() => setAuditDialogOpen(false)}
        title="Request Your Free Growth & Marketing Audit"
      >
        <div className="text-sm text-slate-600 -mt-2 mb-4 space-y-1.5">
          <p>
            We will conduct an objective, diagnostic audit of your channels, website, and
            conversion funnels, delivered with actionable insights in 48 hours.
          </p>
          <p className="text-xs font-semibold text-blue-600">
            ✓ 100% free audit · Objective analysis · Zero obligation
          </p>
        </div>
        <LeadForm type="growth-audit" />
      </Dialog>
    </>
  );
}
