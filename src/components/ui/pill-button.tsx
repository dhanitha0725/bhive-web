"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useConsultation } from "@/components/providers/consultation-provider";

type Variant = "primary" | "secondary" | "white" | "dark";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: Variant;
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

  const variantStyles: Record<Variant, string> = {
    primary:
      "bg-[#3068f9] text-white hover:bg-[#1f55e0] shadow-[0_2px_12px_rgba(48,104,249,0.25)]",
    secondary:
      "bg-white text-[#0b1220] border border-[#e5e8ee] hover:border-[#c5cbe0] hover:bg-[#f8fafd]",
    white:
      "bg-white text-[#3068f9] hover:bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
    dark:
      "bg-[#0b1220] text-white hover:bg-[#162035]",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2.5 h-13 sm:h-[60px] px-6 sm:px-8 rounded-full text-[15px] font-medium transition-all duration-200 active:scale-[0.98] select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`;

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
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
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
      {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </button>
  );
}

