"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion: leave native scrolling alone.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import("lenis").then((lenisModule) => {
      if (disposed) return;

      const Lenis = lenisModule.default;

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        // Keep touch scrolling native (1:1 finger tracking). Smoothing touch
        // input fights the browser compositor and feels laggy on mobile.
        syncTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1.0,
        anchors: false,
      });

      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Handle in-page hash links smoothly
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const el = document.querySelector<HTMLElement>(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { offset: -80, duration: 1.2 });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("click", handleAnchorClick);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
