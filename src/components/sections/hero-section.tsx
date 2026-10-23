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

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per card switch

interface HeroCardData {
  id: "strategy" | "audit";
  badge: string;
  icon: typeof Rocket;
  title: string;
  description: string;
  points: string[];
  buttonText: string;
  buttonClass: string;
  dialogType: "strategy" | "audit";
}

const HERO_CARDS: HeroCardData[] = [
  {
    id: "strategy",
    badge: "FOR NEW BUSINESSES & FOUNDERS",
    icon: Rocket,
    title: "Book a Free 1-on-1 Strategy Call",
    description:
      "Building a new venture? Discuss your business model, brand identity, and go-to-market launch plan 1-on-1 with a senior strategist.",
    points: [
      "Market positioning & launch roadmap",
      "Brand identity & high-converting website direction",
      "30-minute tailored discovery session · 100% free guidance",
    ],
    buttonText: "BOOK A FREE STRATEGY CALL",
    buttonClass: "bg-[#0a254f] hover:bg-[#071a3a]",
    dialogType: "strategy",
  },
  {
    id: "audit",
    badge: "FOR EXISTING BUSINESSES",
    icon: TrendingUp,
    title: "Free Social Media & Growth Audit",
    description:
      "Already running a business? Uncover hidden revenue leaks and discover high-ROI channels across your social, ads, and web funnel.",
    points: [
      "Social media & paid ads performance review",
      "Website conversion funnel & SEO diagnostics",
      "Actionable growth roadmap delivered in 48h · 100% free",
    ],
    buttonText: "REQUEST MY FREE AUDIT",
    buttonClass: "bg-blue-600 hover:bg-blue-700",
    dialogType: "audit",
  },
];

export function HeroSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [strategyDialogOpen, setStrategyDialogOpen] = useState(false);
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);

  // Periodic card auto-switching with hover pause & modal pause
  useEffect(() => {
    if (isPaused || strategyDialogOpen || auditDialogOpen) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % HERO_CARDS.length);
      setTimerKey((k) => k + 1);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, strategyDialogOpen, auditDialogOpen, timerKey]);

  const handleSelectCard = (index: number) => {
    if (index === activeCardIndex) return;
    setActiveCardIndex(index);
    setTimerKey((k) => k + 1);
  };

  const activeCard = HERO_CARDS[activeCardIndex];

  return (
    <>
      {/* Outer wrapper: 100% width across all screens with zero outer margins or frames */}
      <div className="w-full max-w-none overflow-x-clip">
        <section className="relative flex w-full flex-col justify-center items-center overflow-hidden bg-[#0075FF] text-white rounded-none min-h-[100svh] pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
          {/* 1. Cloud Sky Background (Interactive WebGL Drifting Sky with 100% full-bleed coverage) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto rounded-none">
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
          <Container className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center px-4 sm:px-6">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 backdrop-blur-md px-4 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-white/90" />
              <span className="text-xs sm:text-sm font-semibold text-white/95">
                Strategic Brand &amp; Growth Marketing Agency
              </span>
            </motion.div>

            {/* Main Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-semibold tracking-[-0.28px] text-white leading-[1.07] max-w-5xl"
            >
              <span className="block">From First Step to Fully Scaled.</span>
              <span className="block mt-1 sm:mt-2 text-white/95">We’re With You.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-4 sm:mt-5 max-w-3xl text-base sm:text-[17px] text-white/90 font-normal leading-[1.47] tracking-[-0.374px]"
            >
              No cookie-cutter campaigns or chasing viral trends. We create tailored, authentic strategies that solve real challenges and drive real sales, whether you’re scaling an existing business or taking your very first step.
            </motion.p>

            {/* 3. FOCUSED AUTO-SWITCHING CARD CONTAINER */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-8 md:mt-10 w-full max-w-4xl mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Frosted Glass Outer Container */}
              <div className="rounded-[22px] sm:rounded-[26px] bg-white/20 backdrop-blur-2xl p-2 sm:p-2.5 border border-white/40 shadow-none">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCard.id}
                    initial={{ opacity: 0, y: 12, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[18px] sm:rounded-[22px] bg-white p-6 sm:p-8 md:p-8 text-slate-900 border border-white/90 shadow-none text-left"
                  >
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                      {/* Left Column: Pathway Badge, Title, Description, and Desktop CTA */}
                      <div className="order-1 lg:col-span-7 flex flex-col justify-between">
                        <div>
                          {/* Pathway Tag */}
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                            <activeCard.icon className="h-3.5 w-3.5 text-blue-600" />
                            <span>{activeCard.badge}</span>
                          </div>

                          {/* Title */}
                          <h3 className="mt-3.5 text-xl sm:text-2xl md:text-[28px] font-semibold font-display text-slate-900 tracking-[0.196px] leading-[1.14]">
                            {activeCard.title}
                          </h3>

                          {/* Description */}
                          <p className="mt-2 text-sm sm:text-[17px] text-slate-600 leading-[1.47] tracking-[-0.374px]">
                            {activeCard.description}
                          </p>
                        </div>

                        {/* Desktop Action Button */}
                        <div className="hidden lg:block mt-7 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              activeCard.dialogType === "strategy"
                                ? setStrategyDialogOpen(true)
                                : setAuditDialogOpen(true)
                            }
                            className={`group inline-flex items-center justify-center gap-2.5 rounded-full ${activeCard.buttonClass} px-7 py-3.5 text-[15px] sm:text-[17px] font-normal text-white transition-all duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[#0071e3]`}
                          >
                            <span>{activeCard.buttonText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Deliverables / Checklist highlights card */}
                      <div className="order-2 lg:col-span-5 bg-slate-50/90 rounded-[18px] p-5 sm:p-6 border border-slate-100 flex flex-col justify-center space-y-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Included in this session · 100% Free
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                          {activeCard.points.map((point, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </div>
                              <span className="leading-snug text-slate-800 font-medium">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Action Button (shown below checklist on small screens) */}
                      <div className="order-3 lg:hidden mt-2 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            activeCard.dialogType === "strategy"
                              ? setStrategyDialogOpen(true)
                              : setAuditDialogOpen(true)
                          }
                          className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-full ${activeCard.buttonClass} px-6 py-3.5 text-[15px] sm:text-[17px] font-normal text-white transition-all duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[#0071e3]`}
                        >
                          <span>{activeCard.buttonText}</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Switching UI - Dash Progress Indicators matching reference image rectangle */}
              <div className="flex flex-col items-center justify-center mt-5 sm:mt-6">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                  {HERO_CARDS.map((card, idx) => {
                    const isActive = activeCardIndex === idx;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleSelectCard(idx)}
                        aria-label={`Switch to ${card.badge}`}
                        title={card.badge}
                        className="group relative py-2 px-1 focus:outline-none cursor-pointer"
                      >
                        {/* Dash track */}
                        <div className="relative w-14 sm:w-20 h-1.5 sm:h-2 rounded-full bg-white/35 group-hover:bg-white/55 transition-colors overflow-hidden">
                          {isActive && (
                            isPaused ? (
                              <div className="absolute inset-y-0 left-0 w-full bg-white rounded-full" />
                            ) : (
                              <motion.div
                                key={`progress-${idx}-${timerKey}`}
                                className="absolute inset-y-0 left-0 bg-white rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                  duration: AUTOPLAY_INTERVAL / 1000,
                                  ease: "linear",
                                }}
                              />
                            )
                          )}
                        </div>
                      </button>
                    );
                  })}
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
