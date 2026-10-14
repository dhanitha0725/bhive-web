"use client";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

interface PartnerLogo {
  name: string;
  svg: React.ReactNode;
}

const PARTNERS: PartnerLogo[] = [
  {
    name: "Acme Technologies",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 140 36" fill="none">
        <path d="M16 6L28 13V27L16 34L4 27V13L16 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M16 6V20M28 13L16 20M4 13L16 20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="16" cy="20" r="2.2" fill="currentColor" />
        <text x="36" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2.5" fill="currentColor">
          ACME
        </text>
        <text x="36" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          TECHNOLOGIES
        </text>
      </svg>
    ),
  },
  {
    name: "Vertex Dynamics",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 145 36" fill="none">
        <path d="M6 28L18 8L30 28H6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 28L18 18L24 28" fill="currentColor" opacity="0.35" />
        <circle cx="18" cy="8" r="1.8" fill="currentColor" />
        <circle cx="6" cy="28" r="1.8" fill="currentColor" />
        <circle cx="30" cy="28" r="1.8" fill="currentColor" />
        <text x="38" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          VERTEX
        </text>
        <text x="38" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.6" fontFamily="monospace" fill="currentColor" opacity="0.75">
          DYNAMICS
        </text>
      </svg>
    ),
  },
  {
    name: "Nova Studios",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 135 36" fill="none">
        <circle cx="17" cy="19" r="12" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M17 10C17 15 13 19 8 19C13 19 17 23 17 28C17 23 21 19 26 19C21 19 17 15 17 10Z" fill="currentColor" />
        <text x="36" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2.5" fill="currentColor">
          NOVA
        </text>
        <text x="36" y="30" fontSize="5.5" fontWeight="600" letterSpacing="2" fontFamily="monospace" fill="currentColor" opacity="0.75">
          STUDIOS
        </text>
      </svg>
    ),
  },
  {
    name: "Pulse Systems",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 145 36" fill="none">
        <path d="M5 19H11L14 11L18 27L22 13L25 22L27 19H31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="19" r="13" stroke="currentColor" strokeWidth="1.6" opacity="0.3" />
        <text x="38" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          PULSE
        </text>
        <text x="38" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          SYSTEMS
        </text>
      </svg>
    ),
  },
  {
    name: "Apex Global",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 135 36" fill="none">
        <path d="M6 25L17 10L28 25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 25L17 16L23 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        <polygon points="17,6 20,10 14,10" fill="currentColor" />
        <text x="36" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          APEX
        </text>
        <text x="36" y="30" fontSize="5.5" fontWeight="600" letterSpacing="2" fontFamily="monospace" fill="currentColor" opacity="0.75">
          GLOBAL
        </text>
      </svg>
    ),
  },
  {
    name: "Stratos Ventures",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 150 36" fill="none">
        <rect x="5" y="10" width="22" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="9" y="17" width="22" height="4" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="13" y="24" width="22" height="4" rx="2" fill="currentColor" />
        <text x="40" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          STRATOS
        </text>
        <text x="40" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          VENTURES
        </text>
      </svg>
    ),
  },
  {
    name: "Lumina Analytics",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 145 36" fill="none">
        <circle cx="14" cy="19" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="19" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M18 12.5C19.5 14.3 20.3 16.6 20.3 19C20.3 21.4 19.5 23.7 18 25.5C16.5 23.7 15.7 21.4 15.7 19C15.7 16.6 16.5 14.3 18 12.5Z" fill="currentColor" opacity="0.3" />
        <text x="38" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2" fill="currentColor">
          LUMINA
        </text>
        <text x="38" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          ANALYTICS
        </text>
      </svg>
    ),
  },
  {
    name: "Zenith Capital",
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 145 36" fill="none">
        <polygon points="17,6 27,19 17,32 7,19" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="17" y1="10" x2="17" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="10" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <text x="36" y="22" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="2.2" fill="currentColor">
          ZENITH
        </text>
        <text x="36" y="30" fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="monospace" fill="currentColor" opacity="0.75">
          CAPITAL
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
