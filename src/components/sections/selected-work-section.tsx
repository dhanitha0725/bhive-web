"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

export function SelectedWorkSection() {
  const featuredCases = caseStudies.filter((x) => x.featured).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-navy-50/50 text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
              Selected work
            </p>
            <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
              Proof through transformation.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Good work changes more than appearance. It changes how a business
              communicates, operates, and converts in its market.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Showcase Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/60 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-mono font-medium text-blue-700">
                    {item.industry}
                  </span>
                  <Link
                    href={`/work/${item.slug}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-muted-foreground transition-colors group-hover:bg-blue-600 group-hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
                  <Link href={`/work/${item.slug}`}>{item.client}</Link>
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.transformation}
                </p>

                {/* Scope Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.scope.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-navy-50/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)]">
                <p className="font-mono text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  Outcome Delivered:
                </p>
                <p className="mt-1 text-xs font-medium text-[var(--foreground)] leading-snug">
                  {item.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
