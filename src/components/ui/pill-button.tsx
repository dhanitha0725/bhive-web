"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useConsultation } from "@/components/providers/consultation-provider";

type Treatment = "primary" | "outline" | "filled" | "faded" | "secondary" | "white" | "dark";

interface PillButtonProps {
  children: React.ReactNode;
  treatment?: Treatment;
  variant?: Treatment; // Alias for compatibility
  href?: string;
  isConsultation?: boolean;
  consultationLocation?: string;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function PillButton({
  children,
  treatment,
  variant = "primary",
  href,
  isConsultation = false,
  consultationLocation = "cta",
  className = "",
  showArrow = false,
  onClick,
  type = "button",
  disabled = false,
}: PillButtonProps) {
  const { openConsultation } = useConsultation();
  const activeStyle = treatment || variant;

  const treatmentStyles: Record<Treatment, string> = {
    // Primary: Blue (#3068F9) / White text, Hover: #1F55E0
    primary:
      "bg-[#3068f9] text-white hover:bg-[#1f55e0]",
    // Outline: White bg, 1px #E5E8EE border, Ink (#0B1220) text, Hover: #C5CBE0
    outline:
      "bg-white text-[#0b1220] border border-[#e5e8ee] hover:border-[#c5cbe0] hover:bg-[#f8fafd]",
    secondary:
      "bg-white text-[#0b1220] border border-[#e5e8ee] hover:border-[#c5cbe0] hover:bg-[#f8fafd]",
    // Filled: White bg / Blue text (for dark Ink zone) or Ink / White
    filled:
      "bg-white text-[#3068f9] hover:bg-white/95",
    white:
      "bg-white text-[#3068f9] hover:bg-white/95",
    // Faded: Blue-tint (#EEF3FF) bg / Blue-hover (#1F55E0) text
    faded:
      "bg-[#eef3ff] text-[#1f55e0] hover:bg-[#dfe9ff]",
    dark:
      "bg-[#0b1220] text-white hover:bg-[#162035]",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2.5 h-13 sm:h-[60px] px-6 sm:px-8 rounded-full text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ease-out select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 ${
    treatmentStyles[activeStyle] || treatmentStyles.primary
  } ${className}`;

  if (isConsultation) {
    return (
      <button
        type="button"
        onClick={(e) => {
          onClick?.();
          openConsultation(consultationLocation, e.currentTarget);
        }}
        className={baseClasses}
        disabled={disabled}
      >
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.5} />}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.5} />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
    >
      <span>{children}</span>
      {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.5} />}
    </button>
  );
}
