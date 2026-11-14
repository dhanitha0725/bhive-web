"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const EXPLORE_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const SUPPORT_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact us", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0b1220] text-white pt-16 sm:pt-20 pb-12">
      <Container>
        {/* Main Footer Grid: Brand Left + Links Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Side: Brand Identity & Positioning */}
          <div className="lg:col-span-6 flex flex-col items-start max-w-md">
            <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/images/figma/bhive-logo.png"
                alt="BHive"
                className="h-7 w-auto object-contain brightness-0 invert block"
              />
            </Link>

            <h3 className="mt-6 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-white leading-[1.2]">
              Great marketing. Better growth.
            </h3>

            <p className="mt-3 text-sm sm:text-base text-white/64 leading-[1.6]">
              Tailored strategy, brand, and marketing systems helping Sri Lankan businesses attract and convert paying customers.
            </p>
          </div>

          {/* Right Side: Navigation Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12 lg:justify-self-end lg:min-w-[340px]">
            {/* Explore Column */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/64 mb-4 sm:mb-5">
                Explore
              </p>
              <ul className="space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/64 mb-4 sm:mb-5">
                Support
              </p>
              <ul className="space-y-3">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200"
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
        <div className="w-full border-t border-white/10 mt-14 sm:mt-16 pt-8" />

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/64">
          <p>© {currentYear} BHive. All rights reserved.</p>

          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of service
            </Link>
            <Link href="/privacy#cookies" className="hover:text-white transition-colors duration-200">
              Cookie policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
