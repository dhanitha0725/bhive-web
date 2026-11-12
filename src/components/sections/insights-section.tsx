"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ARTICLES = [
  {
    category: "Marketing",
    readTime: "4 min read",
    title: "How we set budgets so the algorithm stops guessing",
    image: "/images/figma/service-strategy.png",
    href: "/insights",
  },
  {
    category: "Strategy",
    readTime: "5 min read",
    title: "The founder’s guide to sustainable paid acquisition in Sri Lanka",
    image: "/images/figma/case-halegrove.png",
    href: "/insights",
  },
  {
    category: "Brand",
    readTime: "3 min read",
    title: "Why positioning beats discounting every single time",
    image: "/images/figma/hero-3.png",
    href: "/insights",
  },
];

export function InsightsSection() {
  return (
    <section id="insights" className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* Section Header: Title Left + View All Button Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 sm:mb-4"
            >
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
                IDEAS THAT MOVE BUSINESS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]"
            >
              Blog &amp; Insights
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
          >
            <PillButton
              treatment="outline"
              href="/insights"
              showArrow
            >
              View all insights
            </PillButton>
          </motion.div>
        </div>

        {/* 12-Column Stretch Grid: 3 Articles (4 Cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: idx * 0.05 }}
            >
              <Link href={article.href} className="group flex flex-col h-full">
                {/* Article Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Metadata */}
                <p className="mt-4 text-xs sm:text-[13px] text-[#5b6475] font-medium">
                  {article.category} • {article.readTime}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-lg sm:text-xl font-medium tracking-tight text-[#0b1220] group-hover:text-[#3068f9] transition-colors duration-200 leading-[1.3]">
                  {article.title}
                </h3>

                {/* Action Link */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#0b1220] group-hover:text-[#3068f9] transition-colors duration-200">
                  <span>Read article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.5} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
