"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

export type TiltedGridImage = {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
};

export type TiltedGridHeroProps = {
  images: TiltedGridImage[];
  /**
   * Rotation speed in degrees per second.
   * @default 10
   */
  speed?: number;
  /**
   * Aspect ratio of each card (width / height).
   * Default 3 / 4 for portrait cards.
   * @default 3 / 4
   */
  aspectRatio?: number;
  /**
   * Vertical position of the carousel center (percentage from top).
   * @default 58
   */
  axis?: number;
  /**
   * Base curve curvature factor (50 to 90).
   * Higher values flatten the arc.
   * @default 76
   */
  curve?: number;
  /**
   * Percentage width of the edge fade gradient on each side.
   * @default 3
   */
  fade?: number;
  /**
   * Legacy compat props
   */
  tileHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const DEG = Math.PI / 180;
const TILT_FACTOR = 0.82;

/**
 * Horizontal fan profile.
 *
 * Cards sit on an arc whose local spacing follows the local card width, so the
 * gap between neighbours stays a constant few pixels while the cards themselves
 * grow toward the edges. Integrating `S(a) * cos(tilt * a)` gives that profile.
 */
function fanOffset(deg: number, depth: number, tilt = TILT_FACTOR) {
  const a = deg * DEG;
  return (
    ((1 + depth) * Math.sin(tilt * a)) / tilt -
    (depth / 2) * (Math.sin((1 - tilt) * a) / (1 - tilt) + Math.sin((1 + tilt) * a) / (1 + tilt))
  );
}

export function TiltedGridHero({
  images,
  speed = 9,
  aspectRatio = 3 / 4,
  axis = 58,
  curve = 76,
  fade = 3,
  children,
  className,
}: TiltedGridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Internal state for container dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 640 });

  // Continuous rotation angle in degrees
  const rotationRef = useRef<number>(0);

  // Responsive card sizing — the card width drives the whole ring so the
  // composition keeps the same tile-to-gap ratio on every viewport.
  const isMobile = dimensions.width < 640;

  const cardWidth = Math.round(Math.min(250, Math.max(102, dimensions.width * 0.13)));
  const cardHeight = Math.round(cardWidth / aspectRatio);

  const slotsCount = useMemo(() => {
    if (images.length === 0) return 0;
    // Repeat images until the ring has ~36 cards, keeping the angular step near 10°.
    const repeats = Math.max(1, Math.round(36 / images.length));
    return images.length * repeats;
  }, [images.length]);

  const stepAngle = slotsCount > 0 ? 360 / slotsCount : 360;

  // How far cards swell toward the viewer at the edges (middle stays deepest).
  const depth = Math.max(0.4, 2.8 * (76 / Math.max(curve, 1)));

  // Radius of the fan: adjacent cards land ~3% wider than a card apart.
  const fanStep = fanOffset(stepAngle, depth);
  const fanRadius = fanStep > 0 ? (cardWidth * 1.03) / fanStep : 0;

  // Flattened array of image items
  const cardItems = useMemo(() => {
    if (images.length === 0) return [];
    const result: TiltedGridImage[] = [];
    for (let i = 0; i < slotsCount; i++) {
      result.push(images[i % images.length]);
    }
    return result;
  }, [images, slotsCount]);

  // Measure container dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height || 640),
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(() => updateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Update card DOM transforms directly on each frame
  const updateCardTransforms = useCallback(() => {
    const currentRot = rotationRef.current;
    const tiltFactor = TILT_FACTOR;
    const containerHalf = dimensions.width / 2 + 80;
    const perspective = isMobile ? 1100 : 1400;

    for (let i = 0; i < slotsCount; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      // Normalize angle to [-180, 180] relative to front center
      const rawAngle = (currentRot + i * stepAngle) % 360;
      let relAngle = rawAngle < 0 ? rawAngle + 360 : rawAngle;
      if (relAngle > 180) relAngle -= 360;

      const absAngle = Math.abs(relAngle);

      // Concave bowl projection:
      // the middle card sits deepest (scale 1) and each step outward swells toward the viewer.
      const scale = 1 + depth * (1 - Math.cos(relAngle * DEG));
      const x = fanRadius * fanOffset(relAngle, depth, tiltFactor);
      const rotateY = -relAngle * tiltFactor;
      const halfWidth = (cardWidth * scale * Math.cos(rotateY * DEG)) / 2;

      // Cull only once a card is fully outside the stage, so nothing pops mid-view.
      if (absAngle > 88 || Math.abs(x) - halfWidth > containerHalf) {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        continue;
      }

      // Tiny forward offset keeps outer cards in front where they overlap.
      const z = absAngle * 0.6;

      el.style.visibility = "visible";
      el.style.opacity = "1";
      el.style.zIndex = Math.round(500 + absAngle).toString();
      el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), -50%, ${z.toFixed(2)}px) perspective(${perspective}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    }
  }, [slotsCount, stepAngle, cardWidth, depth, fanRadius, dimensions.width, isMobile]);

  // Framer Motion useAnimationFrame continuous rotation: 100% reliable, constant speed, no hover interruption
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta / 1000, 0.05);
    rotationRef.current = (rotationRef.current + speed * dt) % 360;
    updateCardTransforms();
  });

  const maskStyle = `linear-gradient(90deg, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden select-none", className)}
      style={{
        pointerEvents: "auto",
      }}
    >
      {/* 3D Curved Cylindrical Stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {cardItems.map((img, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-[0_14px_36px_rgba(0,0,0,0.13),_0_2px_8px_rgba(0,0,0,0.05)] pointer-events-none"
              style={{
                top: `${axis}%`,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              {/* Pure clean image with portrait crop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || `Showcase ${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none select-none"
                loading={i < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Foreground Content (Title, CTAs, Badges) */}
      {children}
    </div>
  );
}

export default TiltedGridHero;
