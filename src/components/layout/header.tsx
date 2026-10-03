"use client";

import { usePathname } from "next/navigation";
import PillNav, { PillNavItem, PillNavProps } from "@/components/ui/pill-nav";
import { primaryNavigation } from "@/config/site";

export function Header() {
  const pathname = usePathname();

  const navItems: PillNavItem[] = primaryNavigation.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 pb-2 px-4">
      <div className="pointer-events-auto w-full md:w-auto flex justify-center max-w-md md:max-w-none">
        <PillNav
          logo="/logo.png"
          logoAlt="BHive"
          items={navItems}
          activeHref={pathname}
          baseColor="#ffffff"
          pillColor="#120F17"
          hoveredPillTextColor="#120F17"
          pillTextColor="#ffffff"
        />
      </div>
    </header>
  );
}

export default Header;
export { PillNav };
export type { PillNavItem, PillNavProps };
