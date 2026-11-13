"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "Business Strategy",
    description:
      "Turn idea into market-ready business with complete branding, positioning, marketing, and launch support.",
    image: "/images/figma/service-strategy.png",
    alt: "Business strategy deliverables",
  },
  {
    id: "02",
    title: "Brand Identity",
    description:
      "Craft distinctive visual identities, design systems, and brand assets that build trust and command premium authority.",
    image: "/images/figma/service-strategy.png",
    alt: "Brand identity systems",
  },
  {
    id: "03",
    title: "Marketing Strategy",
    description:
      "Deploy targeted campaigns and proven sales funnels that bring consistent, qualified buyers directly to your business.",
    image: "/images/figma/case-halegrove.png",
    alt: "Marketing strategy execution",
  },
  {
    id: "04",
    title: "Web Development",
    description:
      "High-speed, conversion-engineered web applications and storefronts optimized for smooth checkout and mobile dominance.",
    image: "/images/figma/hero-2.png",
    alt: "Web development showcase",
  },
];

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICES[activeIdx];

  return (
    <section id="services" className="relative w-full pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24 lg:pb-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-[1100px] mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              WHAT WE DO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] text-[#0b1220]"
          >
            Everything your business needs to attract and close customers
          </motion.h2>
        </div>

        {/* 12-Column Stretch Grid: 6 Cols Left (Tabs) + 6 Cols Right (Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left Column: 6 Columns */}
          <div className="lg:col-span-6 flex flex-col space-y-2 sm:space-y-3">
            {SERVICES.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left flex items-center justify-between p-4 sm:p-5 md:p-6 rounded-2xl transition-colors duration-200 ease-out cursor-pointer ${
                    isActive
                      ? "bg-[#eef3ff] text-[#0b1220]"
                      : "bg-transparent text-[#0b1220] hover:bg-[#f5f7fa] border border-transparent hover:border-[#e5e8ee]"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`text-sm sm:text-base font-medium transition-colors ${
                        isActive ? "text-[#3068f9]" : "text-[#5b6475]"
                      }`}
                    >
                      {service.id}
                    </span>
                    <span className="text-lg sm:text-xl font-medium tracking-tight">
                      {service.title}
                    </span>
                  </div>

                  <ArrowRight
                    className={`h-5 w-5 transition-transform duration-200 ease-out ${
                      isActive
                        ? "text-[#3068f9] translate-x-1"
                        : "text-[#5b6475] opacity-60"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: 6 Columns */}
          <div className="lg:col-span-6 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Preview Image */}
                <div className="relative w-full aspect-[628/340] sm:aspect-[628/320] rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee]">
                  <img
                    src={activeService.image}
                    alt={activeService.alt}
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Service Description */}
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#5b6475] leading-[1.6]">
                  {activeService.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
