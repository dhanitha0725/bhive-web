"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { ConsultationDialog } from "@/components/dialogs/consultation-dialog";
import { trackCtaClick } from "@/lib/analytics";

export type ConsultationType = "growth-audit" | "consultation";

export interface ConsultationOptions {
  type?: ConsultationType;
  title?: string;
  subtitle?: string;
}

interface ConsultationContextType {
  isOpen: boolean;
  options: ConsultationOptions;
  openConsultation: (
    locationOrEvent?: string | React.MouseEvent<HTMLElement>,
    trigger?: HTMLElement | null,
    options?: ConsultationOptions
  ) => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(
  undefined
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConsultationOptions>({ type: "growth-audit" });
  const triggerRef = useRef<HTMLElement | null>(null);

  const openConsultation = (
    locationOrEvent?: string | React.MouseEvent<HTMLElement>,
    trigger?: HTMLElement | null,
    opts?: ConsultationOptions
  ) => {
    let loc = "unspecified";
    let trig: HTMLElement | null = trigger || null;

    if (typeof locationOrEvent === "string") {
      loc = locationOrEvent;
    } else if (
      locationOrEvent &&
      typeof locationOrEvent === "object" &&
      "currentTarget" in locationOrEvent
    ) {
      trig = (locationOrEvent.currentTarget as HTMLElement) || trig;
    }

    // Determine type from opts or loc
    const detectedType: ConsultationType =
      opts?.type ||
      (loc.toLowerCase().includes("audit") ? "growth-audit" : "consultation");

    setOptions({
      type: detectedType,
      title: opts?.title,
      subtitle: opts?.subtitle,
    });

    // Record triggering element to return focus on close (a11y requirement)
    if (trig) {
      triggerRef.current = trig;
    } else if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      triggerRef.current = document.activeElement;
    }

    trackCtaClick(loc);
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
    // Return focus to triggering element after dialog closes
    if (triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus();
        triggerRef.current = null;
      }, 50);
    }
  };

  return (
    <ConsultationContext.Provider
      value={{ isOpen, options, openConsultation, closeConsultation }}
    >
      {children}
      <ConsultationDialog open={isOpen} onClose={closeConsultation} options={options} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error(
      "useConsultation must be used within a ConsultationProvider"
    );
  }
  return context;
}
