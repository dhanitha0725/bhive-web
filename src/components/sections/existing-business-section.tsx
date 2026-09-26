"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

export function ExistingBusinessSection() {
  return (
    <section className="bg-[#0a254f] py-20 text-white lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-blue-100">
              For existing businesses
            </span>

            <h2 className="heading-2 mt-4 text-white">
              Your business may not need more marketing. It may need a better
              system.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-100">
              More content, campaigns, and channels cannot fix unclear
              positioning or disconnected customer experiences. We audit and
              re-align your commercial foundation so every dollar works harder.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/grow-your-business"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#0a254f] transition-colors hover:bg-blue-50 active:scale-[0.98]"
              >
                <span>Explore Business Growth</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/free-growth-audit"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <span>Get Free Growth Audit</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Before vs After Transformation Comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {/* Before Card */}
            <div className="rounded-xl border border-white/15 bg-white/5 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Before BHive
                </span>
                <XCircle className="h-4 w-4 text-neutral-400" />
              </div>
              <ul className="mt-4 space-y-3 text-sm text-blue-100">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <span>Random, reactive marketing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <span>Unclear core value message</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <span>Fragmented customer touchpoints</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <span>High acquisition friction</span>
                </li>
              </ul>
            </div>

            {/* After Card */}
            <div className="rounded-xl bg-white p-6 font-medium text-[#0a0a0b]">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  After BHive
                </span>
                <CheckCircle2 className="h-4 w-4 text-[#0b4cc4]" />
              </div>
              <ul className="mt-4 space-y-3 text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b4cc4]" />
                  <span>Clear commercial positioning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b4cc4]" />
                  <span>Connected, high-ROI marketing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b4cc4]" />
                  <span>Seamless digital experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b4cc4]" />
                  <span>Measurable, compounding growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
