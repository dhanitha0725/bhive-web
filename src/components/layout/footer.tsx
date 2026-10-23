"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandMark } from "./brand-mark";
import { getWhatsAppUrl } from "@/config/site";
import { useConsultation } from "@/components/providers/consultation-provider";
import { MessageSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openConsultation } = useConsultation();

  const footerNavLinks = [
    { label: "Services", href: "/services" },
    { label: "Selected Work", href: "/work" },
    { label: "About BHive", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-[#0a0a0b] py-14 text-white border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-md">
            <BrandMark inverted />
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300">
              More customers for your business with marketing that is planned, not guessed. Helping businesses in Sri Lanka grow step by step.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openConsultation}
              className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-5 py-3 text-sm font-medium transition-all active:scale-[0.96]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Get Free Growth Consultation</span>
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all active:scale-[0.96]"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-sm text-neutral-400">
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <span>© {currentYear} BHive. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
