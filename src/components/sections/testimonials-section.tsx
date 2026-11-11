"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const STORIES = [
  {
    quote:
      "“B Hive completely changed how customers see our business. Every decision felt strategic instead of random marketing.”",
    author: "Ashan Fernando",
    role: "Founder - Retail Business",
    avatar: "/images/figma/hero-1.png",
  },
  {
    quote:
      "“They didn’t just build our store, they built the whole customer acquisition engine. Sales doubled in our first 90 days.”",
    author: "Dinuka Perera",
    role: "Managing Director - Tea & Spices",
    avatar: "/images/figma/hero-2.png",
  },
  {
    quote:
      "“Clear communication, zero fluff, and actual business results. The best marketing investment we made this year.”",
    author: "Kavinda Silva",
    role: "Co-Founder - Direct-to-Consumer",
    avatar: "/images/figma/hero-4.png",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              CLIENT VOICES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.08] text-[#0b1220]"
          >
            Our success stories
          </motion.h2>
        </div>

        {/* 12-Column Stretch Grid: 3 Testimonial Cards (4 Cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-white border border-[#e5e8ee] p-8 sm:p-10 flex flex-col justify-between h-full min-h-[320px] transition-all duration-300 hover:border-[#c5cbe0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <p className="text-base sm:text-lg text-[#0b1220] leading-relaxed">
                {story.quote}
              </p>

              <div className="mt-8 pt-6 border-t border-[#e5e8ee] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f5f7fa] shrink-0 border border-[#e5e8ee]">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-[#0b1220]">
                    {story.author}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#5b6475]">
                    {story.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
