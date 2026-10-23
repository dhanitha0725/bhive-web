"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import GooeyNav, { GooeyNavItem } from "@/components/GooeyNav";
import { primaryNavigation } from "@/config/site";

export function Header() {
  const pathname = usePathname();

  const navItems: GooeyNavItem[] = primaryNavigation.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 md:pt-5 lg:pt-6 pb-2 px-4">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-neutral-200/80 shadow-[0_8px_32px_-8px_rgba(10,37,79,0.12)]">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center pl-3.5 pr-2 py-1.5 rounded-full transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[#0071e3]"
          aria-label="BHive Home"
        >
          <img
            src="/logo.png"
            alt="BHive"
            className="h-6 sm:h-7 w-auto object-contain block"
          />
        </Link>

        {/* Gooey Navigation Bar */}
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
      </div>
    </header>
  );
}

export default Header;

