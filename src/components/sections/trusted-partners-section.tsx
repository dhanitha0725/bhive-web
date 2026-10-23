"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { TrendingUp, Users, CheckCircle } from "lucide-react";

// TODO: replace with real verified client counters and logos once approved by owner
const STAT_COUNTERS = [
  {
    icon: TrendingUp,
    value: "100%", // TODO: replace with real data
    label: "Custom-planned marketing",
    subtext: "No copied templates or random boosts",
  },
  {
    icon: Users,
    value: "24h", // TODO: replace with real data
    label: "Direct founder response",
    subtext: "We review your business before we call",
  },
  {
    icon: CheckCircle,
    value: "3 Languages", // TODO: replace with real data
    label: "English, Sinhala & Tamil",
    subtext: "Comfortable communication for your team",
  },
];

export function TrustedPartnersSection() {
  return (
    <section className="relative w-full border-b border-slate-200 bg-slate-50 py-7 sm:py-8">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {STAT_COUNTERS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-4 ${
                  i > 0 ? "pt-5 md:pt-0 md:pl-8" : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-[#0066cc]">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 font-normal">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TrustedPartnersSection;
