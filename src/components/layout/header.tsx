"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import GooeyNav, { GooeyNavItem } from "@/components/GooeyNav";
import { primaryNavigation } from "@/config/site";
import { useConsultation } from "@/components/providers/consultation-provider";
import { MessageSquare } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();

  const navItems: GooeyNavItem[] = primaryNavigation.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none pt-3 sm:pt-4 md:pt-5 pb-2 px-3 sm:px-4">
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-5xl">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center pl-3 pr-2 py-1.5 rounded-full transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[#0071e3]"
          aria-label="BHive Home"
        >
          <img
            src="/logo.png"
            alt="BHive"
            className="h-6 sm:h-7 w-auto object-contain block"
          />
        </Link>

        {/* Navigation Bar (Services, Work, About, Contact) */}
        <nav aria-label="Main Navigation" className="hidden sm:block">
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex >= 0 ? activeIndex : undefined}
            theme="light"
            color="#0066cc"
            activeTextColor="#ffffff"
            size="md"
            frame={false}
            hoverEffect={true}
            particleCount={14}
            gooeyness={0.65}
            spread={50}
          />
        </nav>

        {/* Mobile Navigation Links */}
        <nav aria-label="Mobile Navigation" className="flex sm:hidden items-center gap-1">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#0066cc] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Persistent CTA Button */}
        <button
          type="button"
          onClick={openConsultation}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.96] shadow-sm shrink-0"
        >
          <MessageSquare className="h-3.5 w-3.5 hidden xs:block" />
          <span>Get Free Growth Consultation</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
