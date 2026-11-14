"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useConsultation } from "@/components/providers/consultation-provider";

const SITEMAP_PAGES = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Blog & Insights", href: "/insights" },
  { label: "About BHive", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SITEMAP_SERVICES = [
  { label: "Business Strategy", href: "/services#business-strategy" },
  { label: "Brand & Identity", href: "/services#brand-identity" },
  { label: "Marketing Strategy", href: "/services#marketing-strategy" },
  { label: "Websites", href: "/services#website" },
  { label: "Content & Social", href: "/services#content-social" },
];

const SITEMAP_SECTIONS = [
  { label: "Services Overview", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Latest Insights", href: "/#insights" },
  { label: "FAQs", href: "/#faq" },
];

const SOCIAL_ICON_MAP = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openConsultation } = useConsultation();

  return (
    <footer
      aria-label="Site Footer"
      className="relative w-full bg-[#f5f7fa] text-[#0b1220] border-t border-[#e5e8ee]"
    >
      <Container>
        {/* Main Footer Grid: Brand + Social Left | 4-Column Sitemap Right */}
        <div className="py-14 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Brand Identity, Direct Info & Social Icons */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="inline-flex items-center hover:opacity-90 transition-opacity"
              aria-label="BHive Home"
            >
              <img
                src="/images/figma/bhive-logo.png"
                alt="BHive"
                className="h-7 w-auto object-contain block"
              />
            </Link>

            <h2 className="mt-6 text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[#0b1220] leading-[1.25]">
              Great marketing. Better growth.
            </h2>

            <p className="mt-3 text-sm sm:text-[15px] text-[#5b6475] leading-[1.6] max-w-sm">
              Tailored strategy, brand, and marketing systems helping Sri Lankan businesses attract
              and convert paying customers.
            </p>

            {/* Quick Location & Email */}
            <div className="mt-6 space-y-2 text-sm text-[#5b6475]">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#3068f9] shrink-0" strokeWidth={1.75} />
                <span>Colombo, Sri Lanka · Island-wide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#3068f9] shrink-0" strokeWidth={1.75} />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-[#3068f9] transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-7">
              <p className="text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-[#5b6475] mb-3">
                Connect with us
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {siteConfig.social.map((item) => {
                  const Icon = SOCIAL_ICON_MAP[item.id];
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`BHive on ${item.label}`}
                      title={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#e5e8ee] text-[#0b1220] hover:border-[#3068f9]/40 hover:bg-[#eef3ff] hover:text-[#3068f9] transition-colors duration-200"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message BHive on WhatsApp"
                  title="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#e5e8ee] text-[#0b1220] hover:border-[#3068f9]/40 hover:bg-[#eef3ff] hover:text-[#3068f9] transition-colors duration-200"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Sitemap */}
          <nav
            aria-label="Footer Sitemap"
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-8"
          >
            {/* Column 1: Pages */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-[#0b1220] mb-4">
                Sitemap
              </h3>
              <ul className="space-y-2.5">
                {SITEMAP_PAGES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-[#0b1220] mb-4">
                Services
              </h3>
              <ul className="space-y-2.5">
                {SITEMAP_SERVICES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Jump & Actions */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-[#0b1220] mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5">
                {SITEMAP_SECTIONS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={(e) =>
                      openConsultation("footer-growth-audit", e.currentTarget, {
                        type: "growth-audit",
                      })
                    }
                    className="text-sm font-medium text-[#3068f9] hover:text-[#1f55e0] transition-colors duration-200 cursor-pointer whitespace-nowrap text-left"
                  >
                    Free Growth Audit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) =>
                      openConsultation("footer-consultation", e.currentTarget, {
                        type: "consultation",
                      })
                    }
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 cursor-pointer whitespace-nowrap text-left"
                  >
                    Book Consultation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect & Legal */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-[#0b1220] mb-4">
                Support &amp; Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                  >
                    WhatsApp Chat
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                  >
                    Email Support
                  </a>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy#cookies"
                    className="text-sm text-[#5b6475] hover:text-[#3068f9] transition-colors duration-200 whitespace-nowrap"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="border-t border-[#e5e8ee] py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#5b6475]">
          <p className="text-center sm:text-left">
            © {currentYear} BHive. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <Link href="/privacy" className="hover:text-[#0b1220] transition-colors duration-200">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-[#0b1220] transition-colors duration-200">
              Terms of service
            </Link>
            <Link
              href="/privacy#cookies"
              className="hover:text-[#0b1220] transition-colors duration-200"
            >
              Cookie policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
