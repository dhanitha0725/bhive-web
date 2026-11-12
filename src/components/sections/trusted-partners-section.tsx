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
    desktopClass: "h-10 lg:h-11 w-auto object-contain",
    mobileClass: "h-8 sm:h-9 w-auto object-contain shrink-0",
  },
  {
    name: "Century 21",
    src: "/partner-logos/Century21-logo.webp",
    desktopClass: "h-11 lg:h-12 w-auto object-contain",
    mobileClass: "h-9 sm:h-10 w-auto object-contain shrink-0",
  },
  {
    name: "Nano Cellular",
    src: "/partner-logos/nanocellular-logo.webp",
    desktopClass: "h-20 lg:h-22 w-auto object-contain mix-blend-multiply",
    mobileClass: "h-16 sm:h-18 w-auto object-contain shrink-0 mix-blend-multiply",
  },
  {
    name: "Excess Lanka",
    src: "/partner-logos/excesslanka-logo.webp",
    desktopClass: "h-8 lg:h-9 w-auto object-contain",
    mobileClass: "h-6 sm:h-7 w-auto object-contain shrink-0",
  },
];

// 4 sets (2 sets per 50% loop) ensure full viewport coverage on mobile landscape with zero hitch
const MARQUEE_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export function TrustedPartnersSection() {
  return (
    <section className="relative w-full pt-1 sm:pt-2 pb-8 sm:pb-12 md:pb-14 bg-white">
      <Container>
        {/* Subtle Divider Line */}
        <div className="w-full border-t border-[#e5e8ee]" />

        {/* Section Eyebrow Heading */}
        <div className="text-center mt-5 sm:mt-7 mb-6 sm:mb-8">
          <p className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#5b6475] uppercase">
            Clients We’ve Worked With
          </p>
        </div>

        {/* Desktop & Tablet Layout: Static, Perfectly Balanced Single Row */}
        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16 max-w-4xl mx-auto">
          {CLIENTS.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" as const, delay: idx * 0.04 }}
              className="flex items-center justify-center h-16 lg:h-20 transition-transform duration-200 ease-out hover:scale-[1.04]"
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
        <div className="flex items-center gap-8 sm:gap-10 w-max animate-marquee py-2 hover:[animation-play-state:paused]">
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
