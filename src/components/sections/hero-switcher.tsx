"use client";

import React, { useSyncExternalStore } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { HeroSectionTilted } from "@/components/sections/hero-section-tilted";
import { Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroVariation = "carousel" | "tilted";

const STORAGE_KEY = "bhive_hero_variation";
const CHANGE_EVENT = "bhive-hero-variation-change";

// localStorage is an external store: read it through useSyncExternalStore so
// the server render (default) and the first client render always agree, and
// the saved preference is picked up without a hydration mismatch.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): HeroVariation {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "tilted" ? "tilted" : "carousel";
  } catch {
    // Storage can be unavailable (private mode); keep the default.
    return "carousel";
  }
}

function getServerSnapshot(): HeroVariation {
  return "carousel";
}

function setVariation(v: HeroVariation) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    // Persistence is best-effort only.
  }
  // Same-tab writes don't fire a "storage" event; notify listeners ourselves.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function HeroSwitcher() {
  const variation = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="relative w-full">
      {/* Floating Variation Switcher Buttons */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="inline-flex items-center p-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            onClick={() => setVariation("carousel")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              variation === "carousel"
                ? "bg-[#0066cc] text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80",
            )}
            aria-pressed={variation === "carousel"}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FlexCarousel</span>
          </button>

          <button
            type="button"
            onClick={() => setVariation("tilted")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              variation === "tilted"
                ? "bg-[#0066cc] text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80",
            )}
            aria-pressed={variation === "tilted"}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Tilted Grid</span>
          </button>
        </div>
      </div>

      {/* Active Variation */}
      {variation === "carousel" ? <HeroSection /> : <HeroSectionTilted />}
    </div>
  );
}

export default HeroSwitcher;
