"use client";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

interface PartnerLogo {
  name: string;
  svg: React.ReactNode;
}

const PARTNERS: PartnerLogo[] = [
  {
    name: "Nexus Mortgage Group",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 160 36">
        <path d="M6 26L14 8h5l8 18h-4.5l-2-4.5H12.5L10.5 26H6zm7.8-8h5.4L16.5 12h-.3l-2.4 6z" />
        <path d="M30 8h4.5l8 11.5V8H47v18h-4.5l-8-11.5V26H30V8z" />
        <path d="M51 8h13v3.5h-8.5v3.5h7.5v3.5h-7.5V22.5h8.5V26H51V8z" />
        <path d="M68 8h4.5l4 7 4-7H85l-6.5 10 7 8h-5l-4.5-5.5L71.5 26H67l7-8.5L68 8z" />
        <path d="M88 20.5c0-3.5 2.5-6 6.5-6s6.5 2.5 6.5 6v5.5h-4v-5.5c0-1.5-1-2.5-2.5-2.5s-2.5 1-2.5 2.5v5.5h-4V20.5z" />
        <path d="M106 8h4.5v18h-4.5V8z" />
        <path d="M115 22c1 1 2.5 1.5 4.5 1.5 2.5 0 4-1 4-2.5 0-1.5-1-2-3.5-2.5l-2-.5c-3.5-.8-5-2.5-5-5 0-3 2.5-5 6.5-5s6 2 6 4.5h-4c0-1-1-1.5-2-1.5s-2 .5-2 1.5c0 1 .8 1.5 2.8 2l2 .5c3.8.9 5.2 2.5 5.2 5.5 0 3.5-2.5 5.5-7 5.5-3.5 0-6.5-1.5-7-4.5h4.5z" />
        <text x="5" y="34" fontSize="6.5" letterSpacing="3.5" fontFamily="monospace" fill="currentColor" opacity="0.8">
          MORTGAGE GROUP
        </text>
      </svg>
    ),
  },
  {
    name: "JC Recovery",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 140 36">
        {/* Classical Pediment & Pillars Emblem */}
        <path d="M4 12l16-8 16 8v2H4v-2zm4 4h4v14H8V16zm8 0h4v14h-4V16zm8 0h4v14h-4V16zm8 0h4v14h-4V16zM4 30h32v2H4v-2z" opacity="0.85" />
        <text x="44" y="20" fontSize="13" fontWeight="800" fontFamily="serif" letterSpacing="1.5" fill="currentColor">
          JC
        </text>
        <text x="44" y="30" fontSize="7.5" fontWeight="600" letterSpacing="2.5" fontFamily="sans-serif" fill="currentColor" opacity="0.85">
          RECOVERY
        </text>
      </svg>
    ),
  },
  {
    name: "Triad Recovery Center",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 170 36">
        {/* Delta Triad Triangle Icon */}
        <polygon points="18,4 32,28 4,28" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <polygon points="18,11 27,26 9,26" fill="currentColor" opacity="0.4" />
        <text x="38" y="20" fontSize="13" fontWeight="900" fontFamily="serif" letterSpacing="3" fill="currentColor">
          TRIAD
        </text>
        <text x="38" y="29" fontSize="6" fontWeight="600" letterSpacing="1.5" fontFamily="monospace" fill="currentColor" opacity="0.8">
          RECOVERY CENTER · NC
        </text>
      </svg>
    ),
  },
  {
    name: "Emory Healthcare",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 130 36">
        {/* Stylized 'E' Monogram */}
        <rect x="4" y="6" width="22" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M10 12h11M10 18h8M10 24h11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="34" y="21" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          EMORY
        </text>
        <text x="34" y="29" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          RESEARCH &amp; HEALTH
        </text>
      </svg>
    ),
  },
  {
    name: "Recovery Services of Connecticut",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 175 36">
        {/* Anchor & Crest Emblem */}
        <circle cx="16" cy="18" r="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
        <path d="M16 10v14M11 15h10M11 21c1.5 2 3.5 3 5 3s3.5-1 5-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <text x="34" y="16" fontSize="7" fontWeight="700" letterSpacing="1" fontFamily="sans-serif" fill="currentColor">
          RECOVERY
        </text>
        <text x="34" y="24" fontSize="7" fontWeight="700" letterSpacing="1" fontFamily="sans-serif" fill="currentColor">
          SERVICES OF
        </text>
        <text x="34" y="31" fontSize="5.5" fontWeight="600" letterSpacing="1.5" fontFamily="monospace" fill="currentColor" opacity="0.8">
          CONNECTICUT
        </text>
      </svg>
    ),
  },
  {
    name: "Ocean State",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 135 36">
        {/* Circular Compass Seal */}
        <circle cx="17" cy="18" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="17,8 20,17 17,15 14,17" fill="currentColor" />
        <polygon points="17,28 20,19 17,21 14,19" fill="currentColor" opacity="0.5" />
        <text x="37" y="21" fontSize="11" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.2" fill="currentColor">
          OCEAN STATE
        </text>
        <text x="37" y="29" fontSize="6" fontWeight="600" letterSpacing="2" fontFamily="monospace" fill="currentColor" opacity="0.75">
          VENTURES &amp; LABS
        </text>
      </svg>
    ),
  },
  {
    name: "Grillers Mediterranean Kitchen",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 170 36">
        {/* Knife / Grill Cross Motif */}
        <path d="M4 17h16M7 14l-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <text x="24" y="21" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5" fill="currentColor">
          GRILLERS
        </text>
        <text x="24" y="30" fontSize="5.5" fontWeight="700" letterSpacing="1.5" fontFamily="sans-serif" fill="currentColor" opacity="0.8">
          MEDITERRANEAN KITCHEN
        </text>
      </svg>
    ),
  },
  {
    name: "Kids Academy",
    svg: (
      <svg className="h-8 sm:h-9 w-auto fill-current" viewBox="0 0 130 36">
        {/* Star & Playful Arc */}
        <path d="M14 6l2.5 5 5.5.8-4 3.9 1 5.3-5-2.6-5 2.6 1-5.3-4-3.9 5.5-.8z" fill="currentColor" opacity="0.85" />
        <text x="28" y="19" fontSize="11" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.5" fill="currentColor">
          KIDS
        </text>
        <text x="28" y="28" fontSize="6.5" fontWeight="700" letterSpacing="2" fontFamily="monospace" fill="currentColor" opacity="0.8">
          ACADEMY
        </text>
      </svg>
    ),
  },
];

export function TrustedPartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause the marquee when offscreen: even compositor-driven animations
  // cost frames while scrolling past this section.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        track.style.animationPlayState = entries[0]?.isIntersecting
          ? ""
          : "paused";
      },
      { threshold: 0 }
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full border-b border-slate-200 bg-white pt-14 pb-16 sm:pt-16 sm:pb-20 text-slate-900 overflow-hidden">
      {/* Subtle Grid Background matching the reference layout */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(to right, #0000000a 1px, transparent 1px), linear-gradient(to bottom, #0000000a 1px, transparent 1px)`,
          backgroundSize: "3rem 3rem",
        }}
      />

      <Container className="relative z-10 mx-auto px-4 sm:px-6 max-w-6xl">
        {/* 1. Header Eyebrow */}
        <div className="text-center">
          <p className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            TRUSTED BY LEADING BRANDS
          </p>
        </div>

        {/* 2. Logos Row (Smooth marquee with fade masks) */}
        <div className="relative mt-8 sm:mt-10 w-full overflow-hidden">
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Running Logo Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-10 sm:gap-14 py-2 w-max animate-marquee hover:[animation-play-state:paused]"
          >
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                title={partner.name}
                className="flex items-center justify-center text-slate-400/80 hover:text-slate-800 transition-colors duration-200 shrink-0 select-none cursor-default"
              >
                {partner.svg}
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
