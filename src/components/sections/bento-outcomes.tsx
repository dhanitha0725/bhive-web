"use client";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import {
  Compass,
  Layers,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function BentoOutcomes() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
            Built for business outcomes
          </p>
          <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
            Built around business outcomes—not vanity metrics.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Businesses do not grow on isolated tactics. We structure every
            engagement around commercial impact, coherent brand experience, and
            sustainable customer momentum.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          {/* Card 1: Strategy before execution (Span 7 cols) */}
          <Reveal
            y={16}
            className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-navy-50/50 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-[var(--foreground)]">
                Strategy before execution
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
                Every action starts with diagnosing what the business actually
                needs. We eliminate wasteful guesswork before writing a single
                line of copy or code.
              </p>
            </div>

            {/* Diagnostic Interactive Flow Preview */}
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-xs font-mono text-muted-foreground">
                <span className="font-semibold text-[var(--foreground)]">
                  Diagnostic Framework
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  {
                    step: "01",
                    label: "Offer & Audience Diagnostic",
                    status: "Completed",
                  },
                  {
                    step: "02",
                    label: "Commercial Positioning Architecture",
                    status: "Actionable",
                  },
                  {
                    step: "03",
                    label: "Execution Roadmap & Channel Roles",
                    status: "Ready",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center justify-between rounded-lg bg-navy-50/70 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-600 font-bold">
                        {item.step}
                      </span>
                      <span className="font-medium text-[var(--foreground)]">
                        {item.label}
                      </span>
                    </div>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 2: One connected system (Span 5 cols) */}
          <Reveal
            y={16}
            delay={100}
            className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-navy-50/50 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-[var(--foreground)]">
                One connected system
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Brand, marketing, website, and content should strengthen each
                other—reinforcing a single clear commercial promise at every
                touchpoint.
              </p>
            </div>

            {/* Visual Connected System Hub */}
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Brand Voice", icon: ShieldCheck },
                  { name: "High-Conv Web", icon: Zap },
                  { name: "Targeted Demand", icon: TrendingUp },
                  { name: "Content Direction", icon: Compass },
                ].map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={pill.name}
                      className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-navy-50/50 p-2.5 text-left transition-colors hover:bg-blue-500/5 hover:border-blue-400/50"
                    >
                      <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-semibold text-[var(--foreground)]">
                        {pill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[10px] text-muted-foreground uppercase">
                Aligned around the same commercial direction
              </p>
            </div>
          </Reveal>

          {/* Card 3: Growth with direction (Span 12 cols / full width bento banner) */}
          <Reveal
            y={16}
            delay={200}
            className="md:col-span-12 rounded-2xl border border-[var(--border)] bg-navy-50/50 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300"
          >
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[var(--foreground)]">
                  Growth with direction
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Priorities come before activity. We measure what genuinely
                  matters to your revenue and pipeline, continuously refining
                  the engine so results compound over time.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center shadow-xs">
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    Clarity
                  </span>
                  <p className="mt-1 font-display text-2xl lg:text-3xl font-bold text-blue-600">
                    100%
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Unified message
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center shadow-xs">
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    Conversion
                  </span>
                  <p className="mt-1 font-display text-2xl lg:text-3xl font-bold text-blue-700">
                    3.4x
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Enquiry rate lift
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center shadow-xs">
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    Efficiency
                  </span>
                  <p className="mt-1 font-display text-2xl lg:text-3xl font-bold text-emerald-600">
                    -40%
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Wasted spend
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
