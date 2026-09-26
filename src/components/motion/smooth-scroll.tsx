"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion and mobile touch devices
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

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
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
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
