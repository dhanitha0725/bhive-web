"use client";

import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import BlurText from "@/components/BlurText";
import { ArrowUpRight, ArrowRight, Clock } from "lucide-react";
import { insights, pillars } from "@/content/insights";

export function InsightsSection() {
  const recentInsights = insights.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-navy-50/50 text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Header (Centered & Balanced) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>BHIVE INSIGHTS</span>
          </div>
          <h2 className="heading-2 mt-4 font-display tracking-tight text-[var(--foreground)] text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.10]">
            <BlurText
              text="Better growth starts with better decisions."
              animateBy="words"
              direction="bottom"
              delay={70}
              className="justify-center"
            />
          </h2>
          <div className="mt-5 flex items-center justify-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors group active:scale-[0.95]"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Editorial Insight Cards Grid (Watermelon blog-1 adaptation) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentInsights.map((item, idx) => (
            <Reveal
              as="article"
              key={item.slug}
              y={20}
              delay={idx * 100}
              className="group flex flex-col justify-between rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-6 shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/60 hover:shadow-xl"
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

                <h3 className="mt-4 font-display text-xl sm:text-[21px] font-semibold text-[var(--foreground)] tracking-[0.231px] leading-[1.19] group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                </h3>

                <p className="mt-3 text-sm sm:text-[17px] text-muted-foreground leading-[1.47] tracking-[-0.374px] line-clamp-3">
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
