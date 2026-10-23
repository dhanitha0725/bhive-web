"use client";

import React from "react";
import { useConsultation } from "@/components/providers/consultation-provider";

interface ConsultationTriggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  location?: string;
  children: React.ReactNode;
}

export function ConsultationTriggerButton({
  location = "unspecified",
  children,
  className,
  onClick,
  ...props
}: ConsultationTriggerButtonProps) {
  const { openConsultation } = useConsultation();

  return (
    <button
      type="button"
      onClick={(e) => {
        openConsultation(location, e.currentTarget);
        onClick?.(e);
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
