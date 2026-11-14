"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useConsultation } from "@/components/providers/consultation-provider";

// 16 tall showcase cards playing as a continuous panoramic cylindrical series
// so even wide/ultrawide desktop viewports remain filled edge-to-edge.
const SHOWCASE_CARDS = [
  { id: "c1", src: "/images/figma/hero-1.png", alt: "BHive retail strategy showcase 1", title: "Retail Strategy" },
  { id: "c2", src: "/images/figma/hero-2.png", alt: "BHive brand delivery showcase 2", title: "In-Store Experience" },
  { id: "c3", src: "/images/figma/hero-3.png", alt: "BHive marketing campaign showcase 3", title: "Brand Identity" },
  { id: "c4", src: "/images/figma/hero-4.png", alt: "BHive customer connection showcase 4", title: "Customer Connection" },
  { id: "c5", src: "/images/figma/service-strategy.png", alt: "BHive commercial strategy showcase 5", title: "Growth Strategy" },
  { id: "c6", src: "/images/figma/case-halegrove.png", alt: "BHive commercial execution showcase 6", title: "Digital Delivery" },
  { id: "c7", src: "/images/figma/hero-1.png", alt: "BHive retail strategy showcase 7", title: "Commercial Reach" },
  { id: "c8", src: "/images/figma/hero-2.png", alt: "BHive brand delivery showcase 8", title: "Customer Trust" },
  { id: "c9", src: "/images/figma/hero-3.png", alt: "BHive marketing campaign showcase 9", title: "Brand Loyalty" },
  { id: "c10", src: "/images/figma/hero-4.png", alt: "BHive customer connection showcase 10", title: "Conversion Systems" },
  { id: "c11", src: "/images/figma/service-strategy.png", alt: "BHive commercial strategy showcase 11", title: "Growth Systems" },
  { id: "c12", src: "/images/figma/case-halegrove.png", alt: "BHive commercial execution showcase 12", title: "Performance" },
  { id: "c13", src: "/images/figma/hero-1.png", alt: "BHive retail strategy showcase 13", title: "Market Positioning" },
  { id: "c14", src: "/images/figma/hero-2.png", alt: "BHive brand delivery showcase 14", title: "Brand Delivery" },
  { id: "c15", src: "/images/figma/hero-3.png", alt: "BHive marketing campaign showcase 15", title: "Visual Identity" },
  { id: "c16", src: "/images/figma/hero-4.png", alt: "BHive customer connection showcase 16", title: "Customer Growth" },
];

const CARD_COUNT = SHOWCASE_CARDS.length;
const PITCH = 196; // 196u pitch
const TOTAL_WIDTH = CARD_COUNT * PITCH; // 3136u

const BASE_W = 170;
const BASE_H = 280;
// Render the card surface larger than its projected size so scaling it up at
// the edges never blurs the artwork (transform scaling is raster-based).
const RASTER_SCALE = 1.5;
const SURFACE_W = BASE_W * RASTER_SCALE;
const SURFACE_H = BASE_H * RASTER_SCALE;
const SURFACE_RADIUS = 15 * RASTER_SCALE;
const SURFACE_BORDER = 1 * RASTER_SCALE;
const PERSPECTIVE = 600;
const AUTO_SCROLL_SPEED = 50; // u per second
const MOBILE_MARQUEE_SPEED = 40; // px per second
const MOBILE_MARQUEE_STOP = 5; // px per second

/**
 * Computes the cylindrical geometry for a card from its unpushed offset t
 * across a full-width showcase container.
 *
 * Keeps every card at SURFACE_W × SURFACE_H and describes its curved shape with
 * a single GPU-composited 3D transform: `perspective() rotateY() scale()`.
 */
function computeGeometry(t: number, centerX: number, curveRadius: number) {
  const ratio = t / curveRadius;
  const x = centerX + t * (1 + 0.083 * ratio * ratio);
  const d = Math.abs(x - centerX) / curveRadius;
  const w = BASE_W + 48 * d * d;
  const yOffset = -12 * d * d;

  const xLeft = x - w / 2;
  const xRight = x + w / 2;
  const qLeft = Math.abs(xLeft - centerX) / curveRadius;
  const qRight = Math.abs(xRight - centerX) / curveRadius;

  const hLeft = BASE_H + 92 * Math.pow(qLeft, 2.6);
  const hRight = BASE_H + 92 * Math.pow(qRight, 2.6);

  // Perspective taper that reproduces the exact left/right edge heights.
  const u = (hLeft - hRight) / (hLeft + hRight); // -1 < u < 1
  const flatWidth = w * (1 - u * u);
  const angle = Math.atan2(2 * PERSPECTIVE * u, flatWidth);
  const cos = Math.cos(angle);

  return {
    x,
    yOffset,
    xLeft,
    xRight,
    angle,
    scaleX: flatWidth / (BASE_W * cos),
    scaleY: (((hLeft + hRight) / 2) * (1 - u * u)) / BASE_H,
  };
}

export function HeroSection() {
  const { openConsultation } = useConsultation();
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Two nodes per card: an outer wrapper that only translates, and an inner
  // surface that carries the perspective/rotation/scale for the curved shape.
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardSurfacesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardImgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const cardVisibilityRef = useRef<boolean[]>(Array(CARD_COUNT).fill(true));

  // Mobile / touch marquee (the curved frame is desktop-only)
  const mobileShowcaseRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCopyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileImgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const mobileState = useRef({
    offset: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
    setWidth: 0,
  });

  // Scroll parallax state (0 -> 1 as hero scrolls out of viewport)
  const scrollState = useRef({
    target: 0,
    current: 0,
    heroHeight: 900,
    reducedMotion: false,
  });

  // Animation & Physics state (stored in ref to avoid react re-render stalls during 60/120fps tick)
  const animState = useRef({
    offset: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
    scaleU: 1,
    bandWidth: 1440,
    bandHeight: 420,
  });

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [mobileGrabbing, setMobileGrabbing] = useState(false);

  // Measure the full-width desktop showcase band and compute its scale factor so
  // the tallest edge cards fit cleanly inside the remaining hero viewport height.
  const measureDesktopBand = useCallback(() => {
    const section = sectionRef.current;
    if (section) {
      scrollState.current.heroHeight = Math.max(section.offsetHeight, window.innerHeight || 720, 1);
    }

    const band = cardsContainerRef.current;
    if (!band) return;
    const width = band.clientWidth;
    const height = band.clientHeight;
    if (width <= 0 || height <= 0) return;

    // Max edge card height in geometry units is BASE_H + 92 = 372u (+12u curve rise).
    // Dividing by 404 keeps clean top/bottom breathing room inside the band.
    const u = Math.min(Math.max(height / 404, 0.56), 1.15);
    animState.current.bandWidth = width;
    animState.current.bandHeight = height;
    animState.current.scaleU = u;
  }, []);

  // Animation frame runner across 100% of the showcase width with scroll depth parallax
  const updateCardsDOM = useCallback((currentOffset: number, scrollProgress = 0) => {
    const { bandWidth, bandHeight, scaleU } = animState.current;
    if (bandWidth <= 0 || bandHeight <= 0 || scaleU <= 0) return;

    const frameW = bandWidth / scaleU;
    const centerX = frameW / 2;
    const curveRadius = Math.max(frameW * 0.49, 640);
    const centerY = bandHeight / 2;
    const halfWidth = TOTAL_WIDTH / 2;

    if (cardsContainerRef.current) {
      const bandParallaxY = scrollProgress * 22;
      cardsContainerRef.current.style.transform = `translate3d(0, ${bandParallaxY.toFixed(2)}px, 0)`;
    }

    for (let k = 0; k < CARD_COUNT; k++) {
      const wrapper = cardWrappersRef.current[k];
      const surface = cardSurfacesRef.current[k];
      const img = cardImgsRef.current[k];
      if (!wrapper || !surface) continue;

      // Base unpushed offset
      const rawT = k * PITCH - currentOffset;
      let t = ((rawT % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      if (t > halfWidth) t -= TOTAL_WIDTH;

      const geom = computeGeometry(t, centerX, curveRadius);

      // Skip cards that are entirely outside the full-width viewport band.
      const visible = geom.xRight > -40 && geom.xLeft < frameW + 40;
      if (visible !== cardVisibilityRef.current[k]) {
        cardVisibilityRef.current[k] = visible;
        wrapper.style.visibility = visible ? "visible" : "hidden";
      }
      if (!visible) continue;

      // Cylindrical depth factor: 0 at deep center, ~1+ at closer outer wings.
      const depthFactor = Math.min(Math.abs(geom.x - centerX) / curveRadius, 1.25);
      const cardParallaxY = (12 - 22 * depthFactor) * scrollProgress;

      // Translate in real pixels relative to full-width band; inner surface
      // holds the perspective projection and scaleU factor.
      const wrapperX = geom.x * scaleU - BASE_W / 2;
      const wrapperY = centerY + geom.yOffset * scaleU - BASE_H / 2 + cardParallaxY;
      wrapper.style.transform = `translate3d(${wrapperX.toFixed(2)}px, ${wrapperY.toFixed(2)}px, 0)`;

      const localScaleX = (geom.scaleX * scaleU) / RASTER_SCALE;
      const localScaleY = (geom.scaleY * scaleU) / RASTER_SCALE;
      surface.style.transform = `perspective(${(PERSPECTIVE * scaleU).toFixed(1)}px) rotateY(${geom.angle.toFixed(
        4
      )}rad) scale(${localScaleX.toFixed(4)}, ${localScaleY.toFixed(4)})`;

      // Inner image counter-parallax inside its rounded card frame
      if (img) {
        const imgShiftY = (-12 + 18 * depthFactor) * scrollProgress;
        img.style.transform = `scale(1.08) translate3d(0, ${imgShiftY.toFixed(2)}px, 0)`;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    scrollState.current.reducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      scrollState.current.reducedMotion = e.matches;
      if (e.matches) {
        scrollState.current.target = 0;
        scrollState.current.current = 0;
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const updateScrollTarget = () => {
      if (scrollState.current.reducedMotion) {
        scrollState.current.target = 0;
        return;
      }
      const h = Math.max(scrollState.current.heroHeight, 1);
      scrollState.current.target = Math.min(Math.max(window.scrollY / h, 0), 1);
    };

    const band = cardsContainerRef.current;

    measureDesktopBand();
    updateScrollTarget();
    scrollState.current.current = scrollState.current.target;
    updateCardsDOM(animState.current.offset + scrollState.current.current * 110, scrollState.current.current);

    const resizeObserver =
      band && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measureDesktopBand();
            updateScrollTarget();
            const p = scrollState.current.reducedMotion ? 0 : scrollState.current.current;
            updateCardsDOM(animState.current.offset + p * 110, p);
          })
        : null;
    if (band && resizeObserver) {
      resizeObserver.observe(band);
    }

    const handleResize = () => {
      measureDesktopBand();
      updateScrollTarget();
      const p = scrollState.current.reducedMotion ? 0 : scrollState.current.current;
      updateCardsDOM(animState.current.offset + p * 110, p);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", updateScrollTarget, { passive: true });

    let lastTime = performance.now();
    let rafId: number;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = animState.current;

      if (state.isDragging) {
        // While dragging, offset is updated by pointer handlers
      } else if (Math.abs(state.velocity) > 0.5) {
        // Momentum coasting: velocity decays about 95% per second => factor = 0.05^dt
        const decay = Math.pow(0.05, dt);
        state.offset += state.velocity * dt;
        state.velocity *= decay;

        // Normalize offset
        state.offset = ((state.offset % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      } else {
        // Continuous automatic rotation along the curved arc (right to left).
        state.offset += AUTO_SCROLL_SPEED * dt;
        state.offset = ((state.offset % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      }

      // Skip DOM work while the desktop hero is display:none (mobile layout).
      if (desktopContainerRef.current?.offsetParent) {
        const sState = scrollState.current;
        if (sState.reducedMotion) {
          sState.current = 0;
        } else {
          const damp = 1 - Math.pow(0.001, dt);
          sState.current += (sState.target - sState.current) * damp;
        }
        const effectiveOffset = state.offset + sState.current * 110;
        updateCardsDOM(effectiveOffset, sState.current);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScrollTarget);
      motionQuery.removeEventListener("change", handleMotionChange);
      resizeObserver?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [measureDesktopBand, updateCardsDOM]);

  // Measure the distance between the two duplicated mobile copies. That is the
  // exact loop length, including the inter-card gap, so the wrap is seamless.
  const measureMobileMarquee = useCallback(() => {
    const first = mobileCopyRefs.current[0];
    const second = mobileCopyRefs.current[1];
    if (!first || !second) return;
    const width = second.offsetLeft - first.offsetLeft;
    if (width > 0) mobileState.current.setWidth = width;
  }, []);

  // Mobile marquee: automatic continuous scroll + pointer/touch drag with momentum + scroll parallax.
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    measureMobileMarquee();
    const resizeObserver = new ResizeObserver(() => {
      measureMobileMarquee();
      if (sectionRef.current) {
        scrollState.current.heroHeight = Math.max(sectionRef.current.offsetHeight, window.innerHeight || 720, 1);
      }
    });
    resizeObserver.observe(track);

    let lastTime = performance.now();
    let rafId: number;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = mobileState.current;

      // The mobile block is rendered but display:none on md+ screens.
      if (!track.offsetParent) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      if (state.setWidth === 0) measureMobileMarquee();

      if (!state.isDragging) {
        if (Math.abs(state.velocity) > MOBILE_MARQUEE_STOP) {
          state.offset += state.velocity * dt;
          state.velocity *= Math.pow(0.05, dt);
        } else {
          state.velocity = 0;
          state.offset += MOBILE_MARQUEE_SPEED * dt;
        }
      }

      if (state.setWidth > 0) {
        state.offset = ((state.offset % state.setWidth) + state.setWidth) % state.setWidth;
      }

      const sState = scrollState.current;
      if (sState.reducedMotion) {
        sState.current = 0;
      } else {
        const damp = 1 - Math.pow(0.001, dt);
        sState.current += (sState.target - sState.current) * damp;
      }
      const p = sState.current;

      if (mobileShowcaseRef.current) {
        mobileShowcaseRef.current.style.transform = `translate3d(0, ${(p * 16).toFixed(2)}px, 0)`;
      }

      const displayOffset =
        state.setWidth > 0
          ? (((state.offset + p * 54) % state.setWidth) + state.setWidth) % state.setWidth
          : state.offset;

      track.style.transform = `translate3d(${-displayOffset.toFixed(2)}px, 0, 0)`;

      for (let i = 0; i < mobileImgsRef.current.length; i++) {
        const img = mobileImgsRef.current[i];
        if (!img) continue;
        const cadence = (i % 3) - 1;
        const imgY = (-8 + cadence * 5) * p;
        img.style.transform = `scale(1.07) translate3d(0, ${imgY.toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [measureMobileMarquee]);

  // Pointer drag interactions (supports pointer and touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const state = animState.current;
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartOffset = state.offset;
    state.lastPointerX = e.clientX;
    state.lastPointerTime = performance.now();
    state.velocity = 0;
    setIsGrabbing(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = animState.current;
    if (!state.isDragging) return;

    const currentX = e.clientX;
    const now = performance.now();
    const u = state.scaleU || 1;

    // Delta converted to geometry units
    const deltaU = (currentX - state.dragStartX) / u;
    state.offset = (((state.dragStartOffset - deltaU) % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;

    // Velocity computation (u per second)
    const dt = Math.max((now - state.lastPointerTime) / 1000, 0.005);
    const instantaneousV = -(currentX - state.lastPointerX) / u / dt;
    state.velocity = 0.6 * instantaneousV + 0.4 * state.velocity;

    state.lastPointerX = currentX;
    state.lastPointerTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const state = animState.current;
    if (!state.isDragging) return;
    state.isDragging = false;
    setIsGrabbing(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture release throws
    }
  };

  // Mobile marquee drag handlers (same 1:1 + momentum behaviour as desktop)
  const handleMobilePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const state = mobileState.current;
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartOffset = state.offset;
    state.lastPointerX = e.clientX;
    state.lastPointerTime = performance.now();
    state.velocity = 0;
    setMobileGrabbing(true);
  };

  const handleMobilePointerMove = (e: React.PointerEvent) => {
    const state = mobileState.current;
    if (!state.isDragging) return;

    const now = performance.now();
    state.offset = state.dragStartOffset - (e.clientX - state.dragStartX);

    const dt = Math.max((now - state.lastPointerTime) / 1000, 0.005);
    state.velocity = -(e.clientX - state.lastPointerX) / dt;

    state.lastPointerX = e.clientX;
    state.lastPointerTime = now;
  };

  const handleMobilePointerUp = (e: React.PointerEvent) => {
    const state = mobileState.current;
    if (!state.isDragging) return;
    state.isDragging = false;
    setMobileGrabbing(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture release throws
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white text-[#0b1220] overflow-hidden select-none">
      {/* =========================================================
          DESKTOP LAYOUT: Fits screen height cleanly with a 100%-width
          panoramic cylindrical image showcase band.
         ========================================================= */}
      <div
        ref={desktopContainerRef}
        className="hidden md:flex flex-col w-full h-[100svh] min-h-[660px] max-h-[1040px]"
      >
        {/* 1. TOP BAR (Centered up to 1440px) */}
        <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-10 h-[76px] lg:h-[88px] flex items-center justify-between shrink-0 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
          >
            <img
              src="/images/figma/bhive-logo.png"
              alt="BHive"
              className="h-8 w-auto object-contain block"
            />
          </Link>

          <nav
            className="flex items-center gap-[34px] text-[15.5px] font-medium text-[#0b1220]"
            aria-label="Hero navigation"
          >
            <Link href="/#services" className="hover:text-[#3068f9] transition-colors">
              Services
            </Link>
            <Link href="/#work" className="hover:text-[#3068f9] transition-colors">
              Our Work
            </Link>
            <Link href="/insights" className="hover:text-[#3068f9] transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-[#3068f9] transition-colors">
              About
            </Link>
          </nav>

          <button
            type="button"
            onClick={(e) => openConsultation("hero-topbar", e.currentTarget)}
            className="h-[42px] px-6 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[14px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Contact</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* 2. HERO COPY & CTA BLOCK */}
        <div className="w-full max-w-[1180px] mx-auto px-6 pt-2 lg:pt-4 pb-3 lg:pb-5 flex flex-col items-center text-center shrink-0 z-10">
          <span className="text-[12px] lg:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase mb-2.5 lg:mb-3.5">
            STRATEGY. BRAND. MARKETING.
          </span>

          <h1 className="text-[clamp(2.4rem,4.3vw,4.15rem)] leading-[1.08] font-medium text-[#0b1220] tracking-[-0.035em] max-w-[1100px]">
            From First Step to Fully Scaled.
            <br />
            <span className="group/phrase relative inline-flex items-baseline gap-1 mt-0.5 px-1 cursor-default">
              <span
                className="relative z-10 text-[#3068f9] font-semibold text-[1.18em] leading-none tracking-[-0.01em] transition-transform duration-300 ease-out group-hover/phrase:-rotate-1"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                We’re With You.
              </span>

              {/* Interactive hand-drawn doodle underline */}
              <svg
                aria-hidden="true"
                viewBox="0 0 260 22"
                fill="none"
                className="pointer-events-none absolute -bottom-1.5 left-0 w-full h-[14px] lg:h-[16px] text-[#3068f9] overflow-visible"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 14C62 5 148 4 256 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-85 transition-all duration-300 ease-out group-hover/phrase:opacity-100"
                  style={{
                    strokeDasharray: 270,
                    strokeDashoffset: 0,
                  }}
                />
                <path
                  d="M28 19C95 13 175 13 232 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-40 transition-transform duration-300 ease-out origin-left group-hover/phrase:scale-x-105 group-hover/phrase:opacity-75"
                />
              </svg>

              {/* Interactive hand-drawn spark strokes */}
              <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                fill="none"
                className="pointer-events-none absolute -right-6 -top-2 w-6 h-6 text-[#3068f9] opacity-75 transition-all duration-300 ease-out group-hover/phrase:opacity-100 group-hover/phrase:scale-110 group-hover/phrase:rotate-6"
              >
                <path
                  d="M8 22L18 9M17 24L27 19M4 13L9 5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-4 lg:mt-5 text-[15.5px] lg:text-[17.5px] leading-[1.55] font-normal text-[#5b6475] max-w-[660px]">
            Tailored strategy, brand, and marketing systems built to win real customers
            <br className="hidden lg:inline" /> and scale your business.
          </p>

          <div className="mt-5 lg:mt-7 flex items-center justify-center gap-3.5 lg:gap-4 z-20">
            <button
              type="button"
              onClick={(e) =>
                openConsultation("hero-growth-audit", e.currentTarget, { type: "growth-audit" })
              }
              className="group inline-flex items-center justify-center gap-2 h-[48px] lg:h-[54px] px-7 lg:px-8 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[14.5px] lg:text-[15px] font-medium transition-colors duration-200 ease-out cursor-pointer active:scale-[0.98]"
            >
              <span>Get free growth audit</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={(e) =>
                openConsultation("hero-consultation", e.currentTarget, { type: "consultation" })
              }
              className="group inline-flex items-center justify-center gap-2.5 h-[48px] lg:h-[54px] pl-3.5 pr-6 lg:pl-4 lg:pr-7 rounded-full bg-white hover:bg-[#eef3ff]/65 text-[#0b1220] border border-[#e5e8ee] hover:border-[#3068f9]/35 text-[14.5px] lg:text-[15px] font-medium transition-all duration-200 ease-out cursor-pointer active:scale-[0.98]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3ff] text-[#3068f9] transition-colors duration-200 group-hover:bg-[#3068f9] group-hover:text-white">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span>Book a growth consultation</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#5b6475] transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-[#3068f9]" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* 3. FULL-WIDTH (100% SCREEN WIDTH) CURVED CYLINDRICAL SHOWCASE */}
        <div
          ref={cardsContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-full flex-1 min-h-[260px] overflow-hidden touch-pan-y pb-4 will-change-transform ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {SHOWCASE_CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardWrappersRef.current[i] = el;
              }}
              className="absolute top-0 left-0 will-change-transform"
              style={{
                width: BASE_W,
                height: BASE_H,
                transform: "translate3d(-9999px, 0, 0)",
              }}
            >
              <div
                ref={(el) => {
                  cardSurfacesRef.current[i] = el;
                }}
                className="absolute overflow-hidden bg-[#f5f7fa] will-change-transform"
                style={{
                  left: (BASE_W - SURFACE_W) / 2,
                  top: (BASE_H - SURFACE_H) / 2,
                  width: SURFACE_W,
                  height: SURFACE_H,
                  boxSizing: "border-box",
                  border: `${SURFACE_BORDER}px solid #e5e8ee`,
                  borderRadius: `${SURFACE_RADIUS}px`,
                  transformOrigin: "50% 50%",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  ref={(el) => {
                    cardImgsRef.current[i] = el;
                  }}
                  src={card.src}
                  alt={card.alt}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none block will-change-transform"
                  style={{ transform: "scale(1.08) translate3d(0, 0, 0)" }}
                  loading={i < 6 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          MOBILE LAYOUT (Phones ≤ 767px)
         ========================================================= */}
      <div className="md:hidden flex flex-col w-full pt-4 pb-10">
        <div className="px-4 sm:px-6">
          {/* Top bar on phone */}
          <div className="flex items-center justify-between w-full mb-6">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/figma/bhive-logo.png"
                alt="BHive"
                className="h-7 w-auto object-contain block"
              />
            </Link>

            <button
              type="button"
              onClick={(e) => openConsultation("mobile-topbar", e.currentTarget)}
              className="h-9 px-4 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[13px] font-medium flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Contact</span>
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>

          {/* Copy: stacked and centered */}
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="mb-3">
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
                STRATEGY. BRAND. MARKETING.
              </span>
            </div>

            <h1 className="text-[32px] sm:text-[42px] leading-[1.12] font-medium text-[#0b1220] tracking-[-0.03em]">
              From First Step to Fully Scaled.
              <br />
              <span className="relative inline-block mt-1">
                <span
                  className="text-[#3068f9] font-semibold text-[1.2em] leading-none"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  We’re With You.
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 18"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1 left-0 w-full h-[11px] text-[#3068f9]"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 12C54 4 128 3 217 10"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#5b6475] max-w-md">
              Tailored strategy, brand, and marketing systems built to win real customers and scale your business.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={(e) =>
                  openConsultation("mobile-hero-growth-audit", e.currentTarget, { type: "growth-audit" })
                }
                className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[14px] font-medium inline-flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer transition-colors"
              >
                <span>Get free growth audit</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={(e) =>
                  openConsultation("mobile-hero-consultation", e.currentTarget, { type: "consultation" })
                }
                className="w-full sm:w-auto h-12 px-5 rounded-full bg-white hover:bg-[#eef3ff]/60 text-[#0b1220] border border-[#e5e8ee] hover:border-[#3068f9]/35 text-[14px] font-medium inline-flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer transition-colors"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef3ff] text-[#3068f9]">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <span>Book a growth consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Looping Mobile Carousel Band - auto-scrolls, draggable, and scroll parallax */}
        <div
          ref={mobileShowcaseRef}
          className="w-full mt-8 overflow-hidden relative select-none will-change-transform"
        >
          <div
            ref={mobileTrackRef}
            onPointerDown={handleMobilePointerDown}
            onPointerMove={handleMobilePointerMove}
            onPointerUp={handleMobilePointerUp}
            onPointerCancel={handleMobilePointerUp}
            className={`flex w-max items-center gap-3 py-1 touch-pan-y will-change-transform ${
              mobileGrabbing ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
          >
            {[0, 1].map((copy) => (
              <div
                key={`mob-copy-${copy}`}
                ref={(el) => {
                  mobileCopyRefs.current[copy] = el;
                }}
                className="flex items-center gap-3 shrink-0"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {SHOWCASE_CARDS.slice(0, 10).map((card, idx) => (
                  <div
                    key={`mob-${copy}-${card.id}`}
                    className="relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] shrink-0 w-[150px] sm:w-[170px] aspect-[9/15]"
                  >
                    <img
                      ref={(el) => {
                        mobileImgsRef.current[copy * 10 + idx] = el;
                      }}
                      src={card.src}
                      alt={card.alt}
                      draggable={false}
                      className="w-full h-full object-cover block pointer-events-none will-change-transform"
                      style={{ transform: "scale(1.07) translate3d(0, 0, 0)" }}
                      loading={copy === 0 && idx < 4 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}