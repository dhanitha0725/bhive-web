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
  { label: "Blog", href: "/#insights" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e5e8ee] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="BHive Home"
          >
            <img
              src="/images/figma/bhive-logo.png"
              alt="BHive"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain block"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors duration-150 ${
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

          {/* Contact Action Pill Button */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={(e) => openConsultation("header", e.currentTarget)}
              className="inline-flex items-center justify-center gap-2 h-12 lg:h-13 px-6 lg:px-8 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[15px] font-medium shadow-[0_2px_12px_rgba(48,104,249,0.22)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Contact</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="p-2.5 rounded-full text-[#0b1220] hover:bg-[#f5f7fa] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[#e5e8ee] py-5 space-y-4"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 text-base font-medium text-[#0b1220] hover:text-[#3068f9] transition-colors"
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
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-[#3068f9] text-white text-[15px] font-medium shadow-md"
                >
                  <span>Contact</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
