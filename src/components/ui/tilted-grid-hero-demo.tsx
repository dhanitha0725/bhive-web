"use client";

import React from "react";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";

// Verified high-quality images combining branding, editorial, and design
const DEMO_IMAGES: TiltedGridImage[] = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop",
    alt: "Abstract digital geometry and brand form",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
    alt: "Modern architecture and spatial design",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    alt: "Data visualization and growth analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80&auto=format&fit=crop",
    alt: "Digital storefront and interface design",
  },
  {
    src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80&auto=format&fit=crop",
    alt: "Strategic business roadmap planning",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80&auto=format&fit=crop",
    alt: "Creative branding and identity direction",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    alt: "Commercial marketing and conversion funnel",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop",
    alt: "Collaborative growth team session",
  },
];

export function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={DEMO_IMAGES}
      speed={4}
      tileHeight={30}
      aspectRatio={16 / 9}
      gap={6}
      axis={56}
      curve={75}
      fade={14}
      className="h-[560px] w-full rounded-2xl border border-neutral-200 bg-white"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3.5 py-1 text-xs text-neutral-600 mb-6 shadow-xs">
            <span className="rounded-full bg-[#0066cc] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Cylinder Loop
            </span>
            <span>Tilted Curved Hero</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15]">
            Every frame,
            <br />
            brought into focus.
          </h1>
        </div>

        <p className="max-w-md px-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
          Images stream along an arc, bend in from the edges, flatten toward the center, and fade smoothly into the canvas.
        </p>
      </div>
    </TiltedGridHero>
  );
}

export default TiltedGridHeroDemo;

