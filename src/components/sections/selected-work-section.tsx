"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import SpotlightCard from "@/components/SpotlightCard";
import BlurText from "@/components/BlurText";
import { caseStudies } from "@/content/case-studies";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Layers,
  Zap,
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Boxes,
} from "lucide-react";

export function SelectedWorkSection() {

  // We highlight the flagship case study as the large featured hero card,
  // and the remaining featured studies as sleek companion cards.
  const flagship = caseStudies.find((x) => x.slug === "northline-advisory") || caseStudies[0];
  const companionCases = caseStudies
    .filter((x) => x.featured && x.slug !== flagship.slug)
    .slice(0, 2);

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy-50/50 via-white to-navy-50/30 text-[var(--foreground)] overflow-hidden">
      {/* Subtle background ambient grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_20%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11, 76, 196, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11, 76, 196, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        {/* Section Header (Centered & Balanced) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto pb-10 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-mono font-medium tracking-wide">
            SELECTED WORK & PROOF
          </div>
          <h2 className="heading-2 mt-4 font-display tracking-tight text-[var(--foreground)] text-3xl sm:text-4xl lg:text-5xl font-bold">
            <BlurText
              text="Proof through transformation."
              animateBy="words"
              direction="bottom"
              delay={70}
              className="justify-center"
            />
          </h2>
        </div>

        {/* Asymmetric Bento Spotlight Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* ========================================================= */}
          {/* 1. LARGE HERO FLAGSHIP CARD (Northline Advisory)           */}
          {/* ========================================================= */}
          <Reveal y={24} delay={50} className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <div className="group relative h-full flex flex-col">
              <SpotlightCard
                theme="light"
                spotlightColor="rgba(11, 76, 196, 0.16)"
                spotlightSize={520}
                borderGlow={0.8}
                proximity={120}
                className="h-full flex flex-col justify-between rounded-3xl border border-blue-200/70 hover:border-blue-500/80 bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-9 shadow-none hover:shadow-[0_20px_48px_-10px_rgba(11,76,196,0.18)] transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Full-card accessible overlay link */}
                <Link
                  href={`/work/${flagship.slug}`}
                  className="absolute inset-0 z-20 rounded-3xl"
                  aria-label={`View ${flagship.client} case study`}
                />

                {/* Top Meta Bar */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-mono font-semibold uppercase tracking-wider">
                      <Sparkles className="h-3 w-3 fill-white/80" />
                      Featured Flagship
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-[11px] font-mono font-medium border border-[var(--border)]">
                      <Building2 className="h-3 w-3 text-blue-600" />
                      {flagship.industry}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50/80 border border-[var(--border)] text-muted-foreground transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Core Idea (Clear & Punchy) */}
                <div className="relative z-10 mt-6">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
                    {flagship.client}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
                    Reframed complex advisory services into an authoritative commercial proposition and unified digital authority engine.
                  </p>
                </div>

                {/* Visual Element: Watermelon/React-Bits Transformation Preview */}
                <div className="relative z-10 my-6 sm:my-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-navy-50/80 via-white to-blue-50/40 p-4 sm:p-5">
                  {/* Mock Browser Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-blue-100/80">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 font-mono text-[10px] text-muted-foreground/80 font-medium">
                        bhive://transformation-pipeline
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 text-[10px] font-mono font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      VERIFIED CONCEPT
                    </span>
                  </div>

                  {/* Transformation Nodes Vector */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
                    {/* Before Node */}
                    <div className="relative rounded-xl border border-dashed border-neutral-300 bg-white/70 p-3 sm:p-3.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground font-semibold">
                        <span className="text-neutral-500 uppercase tracking-wider">Before BHive</span>
                        <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Friction</span>
                      </div>
                      <p className="mt-2 text-xs font-medium text-neutral-600 line-clamp-2">
                        Unclear proposition, scattered practice areas, prospective clients hesitated at discovery.
                      </p>
                    </div>

                    {/* After Node */}
                    <div className="relative rounded-xl border border-blue-200 bg-blue-50/70 p-3 sm:p-3.5 group-hover:border-blue-400 transition-colors">
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-700 font-semibold">
                        <span className="uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-blue-600" />
                          Transformation
                        </span>
                        <span className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">Authority</span>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-blue-950 line-clamp-2">
                        Structured decision journeys, instant authority, and clear commercial service lines.
                      </p>
                    </div>
                  </div>

                  {/* Micro Metric Counters */}
                  <div className="mt-4 pt-3.5 border-t border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-foreground text-sm">3.4x</span>{" "}
                        <span className="text-muted-foreground font-mono text-[11px]">Decision Velocity</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-foreground text-sm">100%</span>{" "}
                        <span className="text-muted-foreground font-mono text-[11px]">Offer Clarity</span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                        <Zap className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-foreground text-sm">Zero</span>{" "}
                        <span className="text-muted-foreground font-mono text-[11px]">Onboarding Drag</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scope Pills & Outcome */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.scope.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-navy-50 border border-[var(--border)] px-2.5 py-1 text-[11px] font-mono font-medium text-navy-900 group-hover:border-blue-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                        Outcome Delivered
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                        {flagship.result}
                      </p>
                    </div>

                    <div className="relative z-30 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all">
                      <span>Explore Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </Reveal>

          {/* ========================================================= */}
          {/* 2. COMPANION CARDS (Haven & Co. and Vertex Works)          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {companionCases.map((item, idx) => {
              const isHospitality = item.slug === "haven-and-co";

              return (
                <Reveal key={item.slug} y={24} delay={150 + idx * 100} className="flex-1 flex flex-col">
                  <div className="group relative h-full flex flex-col">
                    <SpotlightCard
                      theme="light"
                      spotlightColor="rgba(11, 76, 196, 0.12)"
                      spotlightSize={380}
                      borderGlow={0.65}
                      proximity={100}
                      className="h-full flex flex-col justify-between rounded-3xl border border-[var(--border)] hover:border-blue-400/80 bg-white/90 backdrop-blur-sm p-6 sm:p-7 shadow-none hover:shadow-[0_16px_36px_-8px_rgba(11,76,196,0.14)] transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Full-card accessible overlay link */}
                      <Link
                        href={`/work/${item.slug}`}
                        className="absolute inset-0 z-20 rounded-3xl"
                        aria-label={`View ${item.client} case study`}
                      />

                      {/* Card Header */}
                      <div>
                        <div className="relative z-10 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-[11px] font-mono font-medium border border-[var(--border)]">
                              {isHospitality ? (
                                <UtensilsCrossed className="h-3 w-3 text-blue-600" />
                              ) : (
                                <Boxes className="h-3 w-3 text-blue-600" />
                              )}
                              {item.industry}
                            </span>
                          </div>

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50/80 border border-[var(--border)] text-muted-foreground transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-45">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        {/* Title & Concise Idea */}
                        <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
                          {item.client}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                          {item.transformation}
                        </p>
                      </div>

                      {/* Visual UI Element for each Companion Work */}
                      <div className="relative z-10 my-4 rounded-xl border border-blue-100/80 bg-navy-50/50 p-3.5">
                        {isHospitality ? (
                          /* Hospitality Guest Journey Preview */
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground font-semibold uppercase tracking-wider">
                              <span>Guest Journey</span>
                              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                                99.4% Flow Confidence
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="flex-1 rounded-md bg-white border border-blue-100 py-1 px-2 text-[11px] font-medium text-neutral-700 text-center">
                                Discovery
                              </span>
                              <span className="text-blue-500 font-bold">→</span>
                              <span className="flex-1 rounded-md bg-white border border-blue-100 py-1 px-2 text-[11px] font-medium text-neutral-700 text-center">
                                Curated Tier
                              </span>
                              <span className="text-blue-500 font-bold">→</span>
                              <span className="flex-1 rounded-md bg-blue-600 text-white py-1 px-2 text-[11px] font-bold text-center">
                                Direct Booking
                              </span>
                            </div>
                          </div>
                        ) : (
                          /* B2B Services Architecture Preview */
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground font-semibold uppercase tracking-wider">
                              <span>Service Line Matrix</span>
                              <span className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">
                                Synced Engine
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-center">
                              <div className="rounded-md bg-white border border-blue-100 py-1 text-[11px] font-medium text-neutral-700">
                                Strategy
                              </div>
                              <div className="rounded-md bg-white border border-blue-100 py-1 text-[11px] font-medium text-neutral-700">
                                Positioning
                              </div>
                              <div className="rounded-md bg-blue-600 text-white py-1 text-[11px] font-bold">
                                Channels
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer & Outcome */}
                      <div className="relative z-10 pt-3.5 border-t border-[var(--border)] flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-mono text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                            Outcome
                          </p>
                          <p className="text-xs font-semibold text-foreground line-clamp-1">
                            {item.result}
                          </p>
                        </div>

                        <div className="relative z-30 inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors shrink-0">
                          <span>View case study</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Section Bottom Reassurance Bar */}
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Each concept case shows how a connected system makes an offer easier to understand, trust, and choose.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            <span>Explore all case methodologies</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
