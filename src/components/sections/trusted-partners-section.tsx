"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

// Order requested:
// 1. Watareka Super
// 2. Century 21
// 3. Nano Cellular
// 4. Excess Lanka
// Original image files used directly without modification.
// Optical sizing calibrated so every mark has balanced visual presence.
const CLIENTS = [
  {
    name: "Watareka Super",
    src: "/partner-logos/watareka-logo.webp",
    desktopClass: "h-9 lg:h-10 w-auto object-contain mix-blend-multiply",
    mobileClass: "h-8 sm:h-9 w-auto object-contain shrink-0 mix-blend-multiply",
  },
  {
    name: "Century 21",
    src: "/partner-logos/Century21-logo.webp",
    desktopClass: "h-10 lg:h-11 w-auto object-contain mix-blend-multiply",
    mobileClass: "h-9 sm:h-10 w-auto object-contain shrink-0 mix-blend-multiply",
  },
  {
    name: "Nano Cellular",
    src: "/partner-logos/nanocellular-logo.webp",
    desktopClass: "h-16 lg:h-20 w-auto object-contain mix-blend-multiply",
    mobileClass: "h-14 sm:h-16 w-auto object-contain shrink-0 mix-blend-multiply",
  },
  {
    name: "Excess Lanka",
    src: "/partner-logos/excesslanka-logo.webp",
    desktopClass: "h-7 lg:h-8 w-auto object-contain mix-blend-multiply",
    mobileClass: "h-6 sm:h-7 w-auto object-contain shrink-0 mix-blend-multiply",
  },
];

// 4 sets (2 sets per 50% loop) ensure full viewport coverage on mobile landscape with zero hitch
const MARQUEE_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export function TrustedPartnersSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#f5f7fa] border-y border-[#e5e8ee]">
      <Container>
        {/* Section Eyebrow Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#5b6475] uppercase">
            Clients We’ve Worked With
          </p>
        </div>

        {/* Desktop & Tablet Layout: Balanced Single Row */}
        <div className="hidden md:grid grid-cols-4 items-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {CLIENTS.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" as const, delay: idx * 0.04 }}
              className="flex items-center justify-center h-16 lg:h-20 opacity-85 hover:opacity-100 transition-opacity duration-200 ease-out"
            >
              <img
                src={client.src}
                alt={client.name}
                className={client.desktopClass}
              />
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Mobile Layout: Full-bleed Infinite Scrolling Marquee in Single Row */}
      <div className="md:hidden relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex items-center gap-8 sm:gap-10 w-max animate-marquee py-1 hover:[animation-play-state:paused]">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center justify-center h-14 sm:h-16 px-2 shrink-0"
            >
              <img
                src={client.src}
                alt={client.name}
                className={client.mobileClass}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
