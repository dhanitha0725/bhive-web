"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useGradientSettings } from "./gradient-controls";

export interface MinimalGradientCardProps {
  variant: "problem" | "outcome";
  eyebrow?: React.ReactNode;
  title: string;
  description: string;
  angle?: number;
  spread?: number;
  cornerColor?: string;
  mainColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MinimalGradientCard({
  variant,
  eyebrow,
  title,
  description,
  angle,
  spread,
  cornerColor,
  mainColor,
  className = "",
  children,
}: MinimalGradientCardProps) {
  const { blue, red } = useGradientSettings();
  const isProblem = variant === "problem";

  // Use values from gradient handlers or direct props with light default fallbacks
  const currentSettings = isProblem ? red : blue;
  const activeAngle = angle ?? currentSettings.angle;
  const activeSpread = spread ?? currentSettings.spread;
  const activeCorner = cornerColor ?? currentSettings.cornerColor;
  const activeMain = mainColor ?? currentSettings.mainColor;

  const gradientStyle = `linear-gradient(${activeAngle}deg, ${activeCorner} 0%, ${activeMain} ${activeSpread}%)`;

  // Soft, refined typography colors tuned for light pastel surfaces
  const eyebrowColor = isProblem ? "text-[#7a1f2b]/80" : "text-[#1d3f66]/80";
  const titleColor = isProblem ? "text-[#340b13]" : "text-[#0c2137]";
  const descColor = isProblem ? "text-[#542129]" : "text-[#284666]";

  return (
    <div
      className={cn(
        // Modern borderless card geometry matching the reference design
        "relative overflow-hidden rounded-[28px] sm:rounded-[32px] p-8 sm:p-10",
        "flex flex-col justify-between transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5",
        className
      )}
      style={{ background: gradientStyle }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Eyebrow */}
          {eyebrow && (
            <div className={cn("text-xs sm:text-sm font-semibold tracking-wide mb-4", eyebrowColor)}>
              {eyebrow}
            </div>
          )}

          {/* Heading */}
          <h3 className={cn("text-2xl sm:text-3xl font-semibold font-display tracking-tight leading-[1.2]", titleColor)}>
            {title}
          </h3>

          {/* Description */}
          <p className={cn("mt-4 text-base sm:text-[17px] leading-relaxed max-w-[96%]", descColor)}>
            {description}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default MinimalGradientCard;
