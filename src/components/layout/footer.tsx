"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { MessageSquare, ArrowUp, MapPin, Check } from "lucide-react";
import Image from "next/image";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { useConsultation } from "@/components/providers/consultation-provider";
import { siteConfig } from "@/config/site";

const footerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.65, bounce: 0 },
  },
};

const brandItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.85, bounce: 0 },
  },
};

interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openConsultation } = useConsultation();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const footerColumns: FooterColumn[] = [
    {
      title: "SERVICES",
      links: [
        { label: "Business Strategy", href: "/services/business-strategy" },
        { label: "Brand & Identity", href: "/services/brand-identity" },
        { label: "Marketing Strategy", href: "/services/marketing-strategy" },
        { label: "Website", href: "/services/website" },
        { label: "Content & Social", href: "/services/content-social" },
      ],
    },
    {
      title: "GROWTH",
      links: [
        { label: "Free Growth Audit", href: "/free-growth-audit" },
        { label: "Business Guidance Call", href: "/business-guidance-call" },
        { label: "Grow Your Business", href: "/grow-your-business" },
        { label: "Launch Your Business", href: "/launch-your-business" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "All Services", href: "/services" },
        { label: "Selected Work", href: "/work" },
        { label: "About BHive", href: "/about" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}`, external: true },
      ],
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedinIn className="h-4 w-4" />,
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebookF className="h-4 w-4" />,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: <FaInstagram className="h-4 w-4" />,
    },
    {
      label: "X",
      href: "https://x.com",
      icon: <FaXTwitter className="h-4 w-4" />,
    },
  ];

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.footer
      variants={footerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="w-full overflow-hidden bg-[#0a0a0b] text-neutral-100 font-sans antialiased border-t border-white/10 px-6 py-12 sm:px-10 lg:px-12"
    >
      <div className="mx-auto flex min-h-[400px] w-full max-w-[1440px] flex-col justify-between">
        {/* Top Section: Brand + Newsletter/Actions & Multi-column Links */}
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-16">
          <motion.div variants={riseItem} className="max-w-[420px]">
            <Link
              href="/"
              aria-label="BHive Home"
              className="inline-flex items-center transition-opacity hover:opacity-85"
            >
              <Image
                src="/logo.png"
                alt="BHive"
                width={160}
                height={56}
                className="h-8 sm:h-9 w-auto object-contain block"
                priority
              />
            </Link>
            <h2 className="mt-4 text-[19px] sm:text-[21px] font-semibold tracking-tight text-white leading-snug">
              Marketing planned for real growth, not guesswork.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              More customers for your business with planned marketing systems. Helping small and medium businesses in
              Sri Lanka grow step by step.
            </p>

            {/* Quick Actions from current footer */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={(e) => openConsultation("footer", e.currentTarget)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-5 py-2.5 text-sm font-medium shadow-[inset_0px_1px_1px_rgba(255,255,255,0.3)] transition-all active:scale-[0.96] cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Get Free Consultation</span>
                <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>

              <WhatsAppLink
                location="footer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-[0.96]"
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </WhatsAppLink>
            </div>

            {/* Newsletter / Insights subscription box */}
            <form onSubmit={handleNewsletterSubmit} className="mt-8 max-w-[390px]">
              <label htmlFor="footer-email" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                Get monthly growth insights
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="h-[44px] flex-1 rounded-full bg-neutral-900 border border-white/15 px-4 text-sm font-normal text-white placeholder:text-neutral-500 outline-none transition-[border-color,background-color] duration-200 focus:border-[#0066cc] focus:bg-neutral-800"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition-all hover:bg-neutral-200 active:scale-[0.98] cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <FaArrowRight className="h-3 w-3" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Navigation Columns */}
          <motion.nav
            variants={footerContainer}
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:pt-2"
          >
            {footerColumns.map((column) => (
              <motion.div key={column.title} variants={riseItem}>
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          className="text-sm font-normal text-neutral-400 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm font-normal text-neutral-400 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.nav>
        </div>

        {/* Oversized Brand Lockup (Signature of Watermelon footer-12) */}
        <motion.div
          variants={brandItem}
          className="mx-auto mt-16 mb-8 flex w-full items-center justify-center overflow-hidden py-4 sm:py-6"
        >
          <svg
            className="h-auto w-full flex-1 cursor-text select-text"
            viewBox="0 0 1400 150"
            preserveAspectRatio="xMidYMid meet"
            aria-label="BHive Marketing"
          >
            <text
              x="50%"
              y="82%"
              dominantBaseline="alphabetic"
              textAnchor="middle"
              className="fill-white/[0.08] font-black uppercase tracking-tight transition-colors duration-500 hover:fill-white/[0.16] cursor-text select-text"
              fontSize="165"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.08em",
              }}
            >
              BHive Marketing
            </text>
          </svg>
        </motion.div>

        {/* Bottom Bar: Copyright, Socials, Region / Back-to-Top */}
        <motion.div
          variants={riseItem}
          className="grid gap-6 text-neutral-400 text-sm md:grid-cols-3 md:items-center"
        >
          <p className="text-xs sm:text-sm font-light text-neutral-400">
            © {currentYear} BHive. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 md:justify-center">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileTap={{ scale: 0.92 }}
                whileHover={{ y: -2 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {link.icon}
              </motion.a>
            ))}

            <WhatsAppLink
              location="footer_social"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors duration-200 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-[#25D366]"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" />
            </WhatsAppLink>
          </div>

          {/* Location & Back to Top */}
          <div className="flex items-center gap-3 md:justify-end">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
              <MapPin className="h-3 w-3 text-[#0066cc]" />
              <span>Sri Lanka 🇱🇰</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-neutral-300 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
