"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useConsultation } from "@/components/providers/consultation-provider";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Blog", href: "/insights" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeader = !isHomePage || scrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
        showHeader
          ? "translate-y-0 opacity-100 bg-white/95 backdrop-blur-sm border-b border-[#e5e8ee]"
          : "-translate-y-full opacity-0 pointer-events-none border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90"
            aria-label="BHive Home"
          >
            <img
              src="/images/figma/bhive-logo.png"
              alt="BHive"
              className="h-7 sm:h-8 w-auto object-contain block"
            />
          </Link>

          {/* Desktop Navigation Links: Services · Our Work · Blog · About */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[14px] lg:text-[15px] font-medium transition-colors duration-200 ease-out ${
                    isCurrent
                      ? "text-[#3068f9]"
                      : "text-[#0b1220] hover:text-[#3068f9]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Single Action Pill Button: Contact -> */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={(e) => openConsultation("header", e.currentTarget)}
              className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 sm:px-6 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[14px] font-medium transition-colors duration-200 ease-out cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <span>Contact</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-full text-[#0b1220] hover:bg-[#f5f7fa] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-[#e5e8ee] py-4 space-y-3"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 text-[15px] font-medium text-[#0b1220] hover:text-[#3068f9] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    openConsultation("header-mobile", e.currentTarget);
                  }}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-full bg-[#3068f9] text-white text-[14px] font-medium"
                >
                  <span>Contact</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
