"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/config/site";
import { useConsultation } from "@/components/providers/consultation-provider";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Header() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-neutral-200/60 transition-all">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Col Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center py-1 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[#0071e3]"
              aria-label="BHive Home"
            >
              <img
                src="/logo.png"
                alt="BHive"
                className="h-7 sm:h-8 w-auto object-contain block"
              />
            </Link>
          </div>

          {/* Col Middle: Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                    isActive
                      ? "text-[#0066cc] bg-blue-50/70 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Col Right: CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => openConsultation("header", e.currentTarget)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-5 py-2.5 text-[14px] font-medium transition-all duration-150 active:scale-[0.98] shadow-[0_2px_12px_rgba(0,102,204,0.22)] cursor-pointer"
            >
              <span>Get Free Growth Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 py-4 px-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#0066cc] bg-blue-50 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  openConsultation("header_mobile", e.currentTarget);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white py-3 text-[15px] font-medium transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>Get Free Growth Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
