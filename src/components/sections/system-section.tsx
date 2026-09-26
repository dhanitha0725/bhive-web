"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Compass,
  Target,
  Palette,
  Globe,
  Megaphone,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const systemPillars = [
  {
    step: "01",
    title: "Strategy",
    body: "Understand the business, customer, market, goals and constraints.",
    icon: Compass,
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    step: "02",
    title: "Positioning",
    body: "Define what makes the business valuable, relevant and different.",
    icon: Target,
    color: "text-indigo-600 bg-indigo-500/10",
  },
  {
    step: "03",
    title: "Brand",
    body: "Turn strategy into a recognizable identity people understand and trust.",
    icon: Palette,
    color: "text-blue-700 bg-blue-500/10",
  },
  {
    step: "04",
    title: "Digital",
    body: "Build experiences that make the business easy to discover and choose.",
    icon: Globe,
    color: "text-cyan-600 bg-cyan-500/10",
  },
  {
    step: "05",
    title: "Demand",
    body: "Coordinate marketing and content around commercial goals.",
    icon: Megaphone,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    step: "06",
    title: "Growth",
    body: "Measure what works, refine priorities and build from stronger foundations.",
    icon: TrendingUp,
    color: "text-rose-600 bg-rose-500/10",
  },
];

export function SystemSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Header */}
        <div className="max-w-3xl">
          <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
            The BHive system
          </p>
          <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
            Growth is a system.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Businesses rarely struggle because one logo, website, or social
            post is missing. Growth slows when strategy, message, brand,
            marketing, and digital experience stop working together.
          </p>
        </div>

        {/* 6 Feature-1 Grid Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {systemPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-navy-50/40 p-6 lg:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-[var(--background)] hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillar.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-foreground group-hover:text-blue-600 transition-colors">
                      {pillar.step}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--foreground)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>Connected Component</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
