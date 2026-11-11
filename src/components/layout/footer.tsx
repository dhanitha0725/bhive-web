"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";

const EXPLORE_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Insights", href: "/#insights" },
];

const SUPPORT_LINKS = [
  { label: "Help centre", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact us", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0b1220] text-white pt-16 sm:pt-20 md:pt-24 pb-12 border-t border-white/10">
      <Container>
        {/* Main Footer Grid: Brand Left + Links Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Side: Brand Message & Action */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-white/60 uppercase">
              FIND YOUR STRATEGY. MAKE IT YOURS.
            </span>

            <h3 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight text-white leading-[1.1]">
              Great marketing. <br />
              Better growth.
            </h3>

            <p className="mt-4 text-base sm:text-lg text-white/70 leading-[1.6]">
              Discover and work the marketing for your next business. Less planning, more doing.
            </p>

            <div className="mt-8">
              <PillButton
                variant="white"
                isConsultation
                consultationLocation="footer"
                showArrow
              >
                Book a growth consultation
              </PillButton>
            </div>
          </div>

          {/* Right Side: Navigation Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 pt-2 lg:pt-0">
            {/* Explore Column */}
            <div>
              <p className="text-[15px] font-medium text-white mb-4 sm:mb-6">
                Explore
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <p className="text-[15px] font-medium text-white mb-4 sm:mb-6">
                Support
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/10 mt-16 sm:mt-20 pt-8" />

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/60">
          <p>© {currentYear} BHive. All rights reserved.</p>

          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of service
            </Link>
            <Link href="/privacy#cookies" className="hover:text-white transition-colors">
              Cookie policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
