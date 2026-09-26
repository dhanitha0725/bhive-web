"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, ArrowRight, Clock } from "lucide-react";
import { insights, pillars } from "@/content/insights";

export function InsightsSection() {
  const recentInsights = insights.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-navy-50/50 text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
              BHive insights
            </p>
            <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
              Better growth starts with better decisions.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Strategic frameworks, brand thinking, and commercial clarity for
              business leaders.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span>Explore All Insights</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial Insight Cards Grid (Watermelon blog-1 adaptation) */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentInsights.map((item, idx) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/60 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 font-mono font-medium text-blue-700">
                    {pillars[item.pillar] || item.pillar}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.readingTime}</span>
                  </div>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-5 border-t border-[var(--border)]">
                <span className="font-mono text-xs text-muted-foreground">
                  {item.date}
                </span>
                <Link
                  href={`/insights/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
