"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useConsultation } from "@/components/providers/consultation-provider";

// 10 tall showcase cards playing as a continuous image series
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
];

const CARD_COUNT = 10;
const PITCH = 196; // 196u pitch
const TOTAL_WIDTH = CARD_COUNT * PITCH; // 1960u

const FRAME_W = 1440;
const CENTER_X = 720;
const CENTER_Y = 725;
const BASE_W = 170;
const BASE_H = 280;
// Render the card surface larger than its projected size so scaling it up at
// the edges never blurs the artwork (transform scaling is raster-based).
const RASTER_SCALE = 1.5;
const SURFACE_W = BASE_W * RASTER_SCALE;
const SURFACE_H = BASE_H * RASTER_SCALE;
const SURFACE_RADIUS = 15 * RASTER_SCALE;
const SURFACE_BORDER = 1 * RASTER_SCALE;
const CURVE_RADIUS = 706;
const PERSPECTIVE = 600;
const CARD_BAND_TOP = 470;
const CARD_BAND_HEIGHT = 560;
const AUTO_SCROLL_SPEED = 50; // u per second
const MOBILE_MARQUEE_SPEED = 40; // px per second
const MOBILE_MARQUEE_STOP = 5; // px per second

/**
 * Computes the cylindrical geometry for a card from its unpushed offset t.
 *
 * Instead of rewriting a clip-path (and the card's width/height) every frame,
 * we keep every card at BASE_W × BASE_H and describe its curved shape with a
 * single GPU-composited 3D transform: `perspective() rotateY() scale()`.
 *
 * The transform is solved so its projection exactly reproduces the target
 * trapezoid: width `w`, left edge height `hLeft`, right edge height `hRight`.
 * The result is transform-only animation - no layout, no repaint per frame.
 */
function computeGeometry(t: number) {
  const ratio = t / CURVE_RADIUS;
  const x = CENTER_X + t * (1 + 0.083 * ratio * ratio);
  const d = Math.abs(x - CENTER_X) / CURVE_RADIUS;
  const w = BASE_W + 48 * d * d;
  const y = CENTER_Y - 12 * d * d;

  const xLeft = x - w / 2;
  const xRight = x + w / 2;
  const qLeft = Math.abs(xLeft - CENTER_X) / CURVE_RADIUS;
  const qRight = Math.abs(xRight - CENTER_X) / CURVE_RADIUS;

  const hLeft = BASE_H + 92 * Math.pow(qLeft, 2.6);
  const hRight = BASE_H + 92 * Math.pow(qRight, 2.6);

  // Perspective taper that reproduces the exact left/right edge heights.
  const u = (hLeft - hRight) / (hLeft + hRight); // -1 < u < 1
  const flatWidth = w * (1 - u * u);
  const angle = Math.atan2(2 * PERSPECTIVE * u, flatWidth);
  const cos = Math.cos(angle);

  return {
    x,
    y,
    xLeft,
    xRight,
    angle,
    scaleX: flatWidth / (BASE_W * cos),
    scaleY: ((hLeft + hRight) / 2) * (1 - u * u) / BASE_H,
  };
}

export function HeroSection() {
  const { openConsultation } = useConsultation();
  const frameRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Two nodes per card: an outer wrapper that only translates, and an inner
  // surface that carries the perspective/rotation/scale for the curved shape.
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardSurfacesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardVisibilityRef = useRef<boolean[]>(Array(CARD_COUNT).fill(true));

  // Mobile / touch marquee (the curved frame is desktop-only)
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCopyRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    entered: false,
  });

  const [entered, setEntered] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [mobileGrabbing, setMobileGrabbing] = useState(false);

  // Initialize the frame scale (--u = min(vw/1440, vh/1080))
  const updateScale = useCallback(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // --u = min(100vw/1440, 100vh/1080)
    const u = Math.min(vw / 1440, vh / 1080);
    animState.current.scaleU = u;
    if (frameRef.current) {
      frameRef.current.style.setProperty("--u", `${u}`);
    }
  }, []);

  // Animation frame runner
  const updateCardsDOM = useCallback((currentOffset: number) => {
    const halfWidth = TOTAL_WIDTH / 2;

    for (let k = 0; k < CARD_COUNT; k++) {
      const wrapper = cardWrappersRef.current[k];
      const surface = cardSurfacesRef.current[k];
      if (!wrapper || !surface) continue;

      // Base unpushed offset
      const rawT = k * PITCH - currentOffset;
      let t = ((rawT % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      if (t > halfWidth) t -= TOTAL_WIDTH;

      const geom = computeGeometry(t);

      // Skip cards that are entirely outside the 1440 frame. Toggling only on
      // the edge crossings keeps this write rare instead of per-frame.
      const visible = geom.xRight > -24 && geom.xLeft < FRAME_W + 24;
      if (visible !== cardVisibilityRef.current[k]) {
        cardVisibilityRef.current[k] = visible;
        wrapper.style.visibility = visible ? "visible" : "hidden";
      }
      if (!visible) continue;

      // Translate only - the projection lives on the inner surface.
      const wrapperX = geom.x - BASE_W / 2;
      const wrapperY = geom.y - CARD_BAND_TOP - BASE_H / 2;
      wrapper.style.transform = `translate3d(${wrapperX.toFixed(2)}px, ${wrapperY.toFixed(2)}px, 0)`;

      const localScaleX = geom.scaleX / RASTER_SCALE;
      const localScaleY = geom.scaleY / RASTER_SCALE;
      surface.style.transform = `perspective(${PERSPECTIVE}px) rotateY(${geom.angle.toFixed(
        4
      )}rad) scale(${localScaleX.toFixed(4)}, ${localScaleY.toFixed(4)})`;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });

    // Entrance trigger
    const timer = setTimeout(() => {
      setEntered(true);
      animState.current.entered = true;
    }, 80);

    // Initial positioning
    updateCardsDOM(0);

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
        // It always runs: dragging temporarily overrides it, then momentum
        // hands control back to the auto-scroll.
        state.offset += AUTO_SCROLL_SPEED * dt;
        state.offset = ((state.offset % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      }

      // Skip DOM work while the curved frame is display:none (mobile layout).
      if (frameRef.current?.offsetParent) updateCardsDOM(state.offset);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", updateScale);
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [updateScale, updateCardsDOM]);

  // Measure the distance between the two duplicated mobile copies. That is the
  // exact loop length, including the inter-card gap, so the wrap is seamless.
  const measureMobileMarquee = useCallback(() => {
    const first = mobileCopyRefs.current[0];
    const second = mobileCopyRefs.current[1];
    if (!first || !second) return;
    const width = second.offsetLeft - first.offsetLeft;
    if (width > 0) mobileState.current.setWidth = width;
  }, []);

  // Mobile marquee: automatic continuous scroll + pointer/touch drag with
  // momentum. Uses transforms only, so it stays smooth on touch devices.
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    measureMobileMarquee();
    const resizeObserver = new ResizeObserver(() => measureMobileMarquee());
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

      track.style.transform = `translate3d(${-state.offset.toFixed(2)}px, 0, 0)`;
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

    // Delta converted to frame units
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
    <section
      className="relative w-full bg-white text-[#0b1220] overflow-hidden select-none flex flex-col items-center justify-center pt-2 sm:pt-4 pb-12 sm:pb-16"
      style={
        {
          "--u": "min(calc(100vw / 1440), calc(100vh / 1080))",
        } as React.CSSProperties
      }
    >
      {/* =========================================================
          DESKTOP CONTAINER (1440×1080 Frame, contained & centered)
          --u = min(100vw / 1440, 100vh / 1080)
         ========================================================= */}
      <div
        ref={frameRef}
        className="hidden md:flex relative mx-auto items-center justify-center shrink-0"
        style={{
          width: "calc(1440px * var(--u, 1))",
          height: "calc(1080px * var(--u, 1))",
          maxWidth: "1440px",
          maxHeight: "1080px",
        }}
      >
        {/* Coordinate Space Root (1440 × 1080) scaled via transform */}
        <div
          className="absolute top-0 left-0 origin-top-left overflow-hidden bg-white"
          style={{
            width: "1440px",
            height: "1080px",
            transform: "scale(var(--u, 1))",
          }}
        >
          {/* 1. TOP BAR */}
          <div
            className={`absolute top-0 left-0 w-full h-[88px] flex items-center transition-all duration-700 ease-out z-20 ${
              entered ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            {/* Logo at (37, 32) */}
            <Link
              href="/"
              className="absolute left-[37px] top-[32px] flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img
                src="/images/figma/bhive-logo.png"
                alt="BHive"
                className="h-8 w-auto object-contain block"
              />
            </Link>

            {/* Nav: Services · Our Work · Blog · About */}
            <nav
              className="absolute left-[505px] top-[37px] flex items-center gap-[34px] text-[15.5px] font-medium text-[#0b1220]"
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

            {/* Single Action Pill Button: Contact -> at right (1288px) */}
            <div className="absolute right-[37px] top-[29px] flex items-center">
              <button
                type="button"
                onClick={(e) => openConsultation("hero-topbar", e.currentTarget)}
                className="h-[42px] px-6 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[14px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span>Contact</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* 2. EYEBROW: "STRATEGY. BRAND. MARKETING." at top 110 */}
          <div
            className={`absolute top-[110px] left-0 w-full text-center transition-all duration-700 delay-100 ease-out z-10 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-[13.5px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY. BRAND. MARKETING.
            </span>
          </div>

          {/* 3. HEADLINE: "From First Step to Fully Scaled. / We’re With You." at top 140 */}
          <div
            className={`absolute top-[140px] left-0 w-full text-center z-10 transition-all duration-700 delay-150 ease-out ${
              entered ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"
            }`}
          >
            <h1
              className="text-[72px] leading-[1.08] font-bold text-[#0b1220] tracking-[-0.035em] max-w-[1100px] mx-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              From First Step to Fully Scaled.
              <br />
              <span className="text-[#3068f9]">We’re With You.</span>
            </h1>
          </div>

          {/* 4. SUBLINE: at top 312 */}
          <div
            className={`absolute top-[312px] left-0 w-full text-center z-10 transition-all duration-700 delay-200 ease-out ${
              entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p className="text-[18px] leading-[1.6] font-normal text-[#5b6475] max-w-[720px] mx-auto">
              Tailored strategy, brand, and marketing systems built to win real customers
              <br />
              and scale your business.
            </p>
          </div>

          {/* 5. PREVIOUS CTA BUTTONS: "Get free growth audit" and "Book a growth consultation" at top 395 */}
          <div
            className={`absolute top-[395px] left-0 w-full flex items-center justify-center gap-4 z-20 transition-all duration-700 delay-250 ease-out ${
              entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Link
              href="/free-growth-audit"
              className="inline-flex items-center justify-center h-[54px] px-8 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] text-white text-[15px] font-medium transition-colors duration-200 ease-out shadow-none cursor-pointer active:scale-95"
            >
              Get free growth audit
            </Link>

            <button
              type="button"
              onClick={(e) => openConsultation("hero-consultation", e.currentTarget)}
              className="inline-flex items-center justify-center h-[54px] px-8 rounded-full bg-white hover:bg-[#f8fafd] text-[#0b1220] border border-[#e5e8ee] hover:border-[#c5cbe0] text-[15px] font-medium transition-colors duration-200 ease-out cursor-pointer active:scale-95"
            >
              Book a growth consultation
            </button>
          </div>

          {/* 6. CARD ROW: Curved Cylindrical Video/Image Slideshow */}
          <div
            ref={cardsContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute left-0 w-[1440px] touch-pan-y transition-opacity duration-700 delay-300 ${
              isGrabbing ? "cursor-grabbing" : "cursor-grab"
            } ${entered ? "opacity-100" : "opacity-0"}`}
            style={{ top: CARD_BAND_TOP, height: CARD_BAND_HEIGHT }}
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
                  {/* Showcase Image */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none block"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE LAYOUT (Phones ≤ 820px)
         ========================================================= */}
      <div className="md:hidden flex flex-col w-full pt-4 pb-8 px-4 sm:px-6">
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
          {/* Eyebrow */}
          <div className="mb-3">
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#3068f9] uppercase">
              STRATEGY. BRAND. MARKETING.
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[34px] sm:text-[44px] leading-[1.1] font-bold text-[#0b1220] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            From First Step to Fully Scaled.
            <br />
            <span className="text-[#3068f9]">We’re With You.</span>
          </h1>

          {/* Subline */}
          <p className="mt-3.5 text-[15px] sm:text-base leading-relaxed text-[#5b6475] max-w-md">
            Tailored strategy, brand, and marketing systems built to win real customers and scale your business.
          </p>

          {/* Mobile CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/free-growth-audit"
              className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#3068f9] text-white text-[14px] font-medium flex items-center justify-center active:scale-95"
            >
              Get free growth audit
            </Link>

            <button
              type="button"
              onClick={(e) => openConsultation("mobile-hero-consultation", e.currentTarget)}
              className="w-full sm:w-auto h-12 px-6 rounded-full bg-white text-[#0b1220] border border-[#e5e8ee] text-[14px] font-medium flex items-center justify-center active:scale-95"
            >
              Book a growth consultation
            </button>
          </div>
        </div>

        {/* Looping Mobile Carousel Band - auto-scrolls and is draggable */}
        <div className="w-full mt-8 overflow-hidden relative select-none">
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
                {SHOWCASE_CARDS.map((card, idx) => (
                  <div
                    key={`mob-${copy}-${card.id}`}
                    className="relative rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee] shrink-0 w-[150px] sm:w-[170px] aspect-[9/15]"
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      draggable={false}
                      className="w-full h-full object-cover block pointer-events-none"
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