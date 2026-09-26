"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight, PhoneCall, CheckCircle2, ChevronRight } from "lucide-react";

const founderSteps = [
  { step: "01", title: "Business clarity", desc: "Define the commercial offer & audience." },
  { step: "02", title: "Market positioning", desc: "Clarify what makes the business valuable." },
  { step: "03", title: "Brand strategy", desc: "Shape the voice, messaging & trust pillars." },
  { step: "04", title: "Visual identity", desc: "Establish recognition & design standards." },
  { step: "05", title: "Marketing strategy", desc: "Align channels directly with buyer decisions." },
  { step: "06", title: "Website", desc: "High-converting digital architecture." },
  { step: "07", title: "Launch", desc: "Coordinated market entry & momentum." },
  { step: "08", title: "Growth foundation", desc: "Scalable foundation without rebuilds." },
];

export function FoundersSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
            For founders
          </p>
          <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
            Build it in the right order.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Logo first, website next, social pages after that: it is how many
            businesses launch—and why they later rebuild everything. We build
            with intentional sequence.
          </p>
        </div>

        {/* 8-Step Progressive Grid (Watermelon Stepper/Process Cards) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {founderSteps.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-navy-50/40 p-5 shadow-2xs transition-all duration-300 hover:border-blue-500/50 hover:bg-[var(--background)] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600">
                    Step {item.step}
                  </span>
                  {idx < founderSteps.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)]/60 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span className="truncate">Connected sequence</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/launch-your-business"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <span>Build My Business</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/business-guidance-call"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-navy-50 px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all hover:bg-navy-100/80 active:scale-95"
          >
            <PhoneCall className="h-4 w-4 text-blue-600" />
            <span>Book Free Guidance Call</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
