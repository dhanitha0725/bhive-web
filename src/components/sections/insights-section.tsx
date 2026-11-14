"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { motion } from "framer-motion";
import type { InsightSummary } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/blog-card";

export function InsightsSection({ posts }: { posts: InsightSummary[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="insights" className="relative w-full py-16 sm:py-24 lg:py-28 bg-white">
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
            <PillButton treatment="outline" href="/insights" showArrow>
              View all insights
            </PillButton>
          </motion.div>
        </div>

        {/* 12-Column Stretch Grid: 3 Articles (4 Cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug || post._id || idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut", delay: idx * 0.05 }}
              className="h-full"
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
