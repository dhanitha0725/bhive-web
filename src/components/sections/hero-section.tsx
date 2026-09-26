"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const systemNodes = [
  { step: "01", name: "Strategy", detail: "Market & offer clarity" },
  { step: "02", name: "Positioning", detail: "Commercial relevance" },
  { step: "03", name: "Brand", detail: "Trust & recognition" },
  { step: "04", name: "Digital", detail: "Frictionless experience" },
  { step: "05", name: "Demand", detail: "Connected marketing" },
  { step: "06", name: "Growth", detail: "Compounding scale" },
];

export function HeroSection() {
  return (
    <section className="bg-[#0a254f] py-20 text-white lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Core Copy & CTAs */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-blue-100">
              Strategy · Brand · Marketing · Digital
            </p>

            <h1 className="display mt-5 max-w-2xl text-white">
              We build businesses that are ready to grow.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100">
              BHive brings strategy, positioning, brand, marketing, and digital
              execution together—so your business grows as one connected system,
              not a collection of disconnected activities.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/grow-your-business"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#0a254f] transition-colors hover:bg-blue-50 active:scale-[0.98]"
              >
                <span>Grow My Business</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/launch-your-business"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <span>Launch My Business</span>
                <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-6 text-sm">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-2 underline-offset-4 transition-colors hover:text-blue-100"
              >
                <span>See Our Work & Transformations</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: System Architecture Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/15 bg-white/5 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-white">
                    BHIVE GROWTH ENGINE
                  </p>
                  <p className="text-[11px] text-blue-200">
                    Connected Decision Architecture
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>

              {/* 6 Connected Nodes Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {systemNodes.map((node) => (
                  <div
                    key={node.name}
                    className="flex flex-col justify-between rounded-lg border border-white/15 bg-white/5 p-4 text-white"
                  >
                    <span className="font-mono text-xs text-blue-200">
                      {node.step}
                    </span>
                    <div className="mt-3">
                      <p className="text-base font-semibold text-white">
                        {node.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-blue-200">
                        {node.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-blue-200">
                <span>01 DIAGNOSE</span>
                <span className="text-white/40">→</span>
                <span>02 ARCHITECT</span>
                <span className="text-white/40">→</span>
                <span className="font-bold text-white">03 EXECUTE</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
