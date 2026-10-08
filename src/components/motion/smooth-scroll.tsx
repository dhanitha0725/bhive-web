"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion: leave native scrolling alone.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisModule, gsapModule, triggerModule]) => {
      if (disposed) return;

      const Lenis = lenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

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

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      const onScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", onScroll);

      // Connect GSAP ticker with Lenis requestAnimationFrame
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Re-measure trigger positions once fonts/layout settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh).catch(() => {});
      }
      const refreshTimer = window.setTimeout(refresh, 500);

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
        window.clearTimeout(refreshTimer);
        window.removeEventListener("load", refresh);
        document.removeEventListener("click", handleAnchorClick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
