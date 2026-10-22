"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandMark } from "./brand-mark";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: "Growth Paths",
      links: [
        { label: "Grow My Business", href: "/grow-your-business" },
        { label: "Launch My Business", href: "/launch-your-business" },
        { label: "Free Growth Audit", href: "/free-growth-audit" },
        { label: "Guidance Call", href: "/business-guidance-call" },
      ],
    },
    {
      title: "Capabilities",
      links: services.map((service) => ({
        label: service.name,
        href: `/services/${service.slug}`,
      })),
    },
    {
      title: "Explore",
      links: [
        { label: "Selected Work", href: "/work" },
        { label: "Insights & Articles", href: "/insights" },
        { label: "The BHive System", href: "/#system" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About BHive", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0a0a0b] pb-0 pt-16 text-white">
      <Container>
        {/* Top Section: Brand Story & Diagnostic Callout */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <BrandMark inverted />
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-300">
              BHive brings strategy, positioning, brand, marketing, and digital
              execution together—so your business grows as one coherent commercial
              system.
            </p>

            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-neutral-400">
              Commercial Growth Architecture
            </p>
          </div>

          {/* Quick Growth Audit CTA Card */}
          <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/5 p-6 lg:col-span-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                Growth Readiness Audit
              </p>
              <h3 className="mt-2 text-lg font-bold text-white">
                Find out what is slowing your business growth.
              </h3>
              <p className="mt-1 text-sm text-neutral-300">
                A 3-minute diagnostic revealing message friction, disconnected
                channels, and pipeline opportunities.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/free-growth-audit"
                className="group inline-flex items-center gap-2 rounded-md bg-[#0b4cc4] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#083da0] active:scale-[0.98]"
              >
                <span>Take Free Audit</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/business-guidance-call"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <span>Book 15-Min Call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-300 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-neutral-400 sm:flex-row">
          <p>© {currentYear} BHive Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
