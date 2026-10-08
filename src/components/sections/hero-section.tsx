"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Rocket,
  Building2,
  Lock,
  Sparkles,
} from "lucide-react";
import { CloudSky } from "@/components/ui/cloud-sky";
import { Container } from "@/components/ui/container";
import { Dialog } from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

const ROTATING_WORDS = ["Designs", "Grow", "Develop", "Scale", "Transform"];

const HELP_PILLS = ["Paid Ads", "SEO", "Social Media", "Website", "Consulting"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [strategyDialogOpen, setStrategyDialogOpen] = useState(false);
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);
  const [selectedPills, setSelectedPills] = useState<string[]>(["Social Media", "Paid Ads"]);
  const [auditUrl, setAuditUrl] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const togglePill = (pill: string) => {
    setSelectedPills((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditDialogOpen(true);
  };

  return (
    <>
      <section className="relative flex min-h-[calc(100vh-4.5rem)] min-h-[calc(100dvh-4.5rem)] w-full flex-col justify-center items-center overflow-hidden bg-[#0075FF] text-white py-12 sm:py-16 lg:py-20">
        {/* 1. Cloud Sky Background (Interactive WebGL Drifting Sky with #0075FF background) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
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
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 backdrop-blur-md p-2"
          >
            <span className="text-xs sm:text-sm font-semibold text-white/95">
              Commercial Growth &amp; Brand Systems
            </span>
          </motion.div>

          {/* Main Display Headline (Crisp, clean typography with no muddy drop shadows) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.14] max-w-4xl"
          >
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-2">
              <span>Innovative</span>

              {/* Clean Glass Word Capsule */}
              <span className="relative inline-flex items-center justify-center rounded-full border border-white/60 bg-white/20 px-4 sm:px-7 py-0.5 sm:py-1 backdrop-blur-md min-w-[130px] sm:min-w-[190px] md:min-w-[220px] h-[44px] sm:h-[58px] md:h-[66px] overflow-hidden align-middle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: 26, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -26, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-white font-bold tracking-tight whitespace-nowrap will-change-transform"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span>and Creative Ideas To Boost Your Brand!</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 max-w-2xl text-base sm:text-lg text-white/90 font-normal leading-relaxed text-balance"
          >
            Two dedicated commercial pathways: claim a free social media &amp; growth audit for
            your existing brand, or book a 1-on-1 strategy call to launch something new.
          </motion.p>

          {/* 3. DUAL PATHWAY CARDS CONTAINER (Transparent glass frame + clean white cards as shown in image) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 sm:mt-12 w-full rounded-[28px] sm:rounded-[34px] bg-white/20 backdrop-blur-2xl p-2 sm:p-4 lg:p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 text-left">
              {/* Card 1: For New Businesses & Founders (Free Strategy Call) */}
              <div className="rounded-2xl sm:rounded-[22px] bg-white p-6 sm:p-8 text-slate-900 border border-white/80 flex flex-col justify-between transition-colors">
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
                    Building something new? Don't build in the dark. Discuss your business model,
                    target audience, and go-to-market direction 1-on-1 with a senior strategist.
                  </p>

                  {/* Clean Metric Proof Badges */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1 text-xs font-mono font-bold text-blue-800 tracking-wide">
                      + 40–60% QUALIFIED LEADS
                    </span>
                    <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50/90 px-3 py-1 text-xs font-mono font-bold text-purple-800 tracking-wide">
                      ↑ 2–4× ROAS
                    </span>
                  </div>

                  {/* Clean Checkmarks List */}
                  <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span>Proven ROI — sustainable growth, not vanity metrics</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span>Full-stack architecture: SEO, Google Ads &amp; web funnel</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span>30-min tailored discovery session · 100% free guidance</span>
                    </div>
                  </div>
                </div>

                {/* Clean Flat Action Button */}
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setStrategyDialogOpen(true)}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0a254f] hover:bg-[#071a3a] px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>BOOK A FREE STRATEGY CALL</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Card 2: For Existing Businesses (Free Social Media & Growth Audit Card) */}
              <div className="rounded-2xl sm:rounded-[22px] bg-white p-6 sm:p-8 text-slate-900 border border-white/80 flex flex-col justify-between transition-colors">
                <div>
                  {/* Pathway Tag */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                    <Building2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>FOR EXISTING BUSINESSES</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                    Free Social Media &amp; Growth Audit
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Already running a business? Uncover hidden leaks and low-converting channels.
                    We inspect your social accounts, ads, and conversion flow to unlock growth.
                  </p>

                  {/* "WHAT DO YOU NEED HELP WITH?" Interactive Selector */}
                  <div className="mt-5">
                    <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                      WHAT DO YOU NEED HELP WITH?
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {HELP_PILLS.map((pill) => {
                        const isSelected = selectedPills.includes(pill);
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => togglePill(pill)}
                            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors duration-150 ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clean Input Form */}
                  <form onSubmit={handleAuditSubmit} className="mt-4 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Website URL or Social Profile:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="e.g. yourbrand.com or @instagram"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </form>
                </div>

                {/* Clean Flat Action Button & Guarantee */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setAuditDialogOpen(true)}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>REQUEST MY AUDIT →</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Subtle Scroll Down Prompt (pure CSS animation: zero main-thread cost while scrolling) */}
        <div className="animate-scroll-cue mt-12 hidden sm:flex flex-col items-center gap-1 text-white/80 text-xs pointer-events-none">
          <span className="tracking-widest uppercase text-[10px] font-mono font-medium opacity-80">
            Scroll to explore
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* Dialog for New Businesses: 1-on-1 Free Strategy Call */}
      <Dialog
        open={strategyDialogOpen}
        onClose={() => setStrategyDialogOpen(false)}
        title="Book Your Free Strategy Call"
      >
        <div className="text-sm text-slate-600 -mt-2 mb-4 space-y-1">
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
        title="Request Your Free Social Media Audit"
      >
        <div className="text-sm text-slate-600 -mt-2 mb-4 space-y-1">
          <p>
            We will conduct an objective, diagnostic audit of your social channels, content
            cadence, and conversion funnels, delivered with actionable insights in 48 hours.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] font-mono uppercase text-slate-500">Selected focus:</span>
            {selectedPills.map((pill) => (
              <span
                key={pill}
                className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
        <LeadForm type="growth-audit" />
      </Dialog>
    </>
  );
}
