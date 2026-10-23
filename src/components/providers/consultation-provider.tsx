"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { ConsultationDialog } from "@/components/dialogs/consultation-dialog";
import { trackCtaClick } from "@/lib/analytics";

interface ConsultationContextType {
  isOpen: boolean;
  openConsultation: (
    locationOrEvent?: string | React.MouseEvent<HTMLElement>,
    trigger?: HTMLElement | null
  ) => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(
  undefined
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openConsultation = (
    locationOrEvent?: string | React.MouseEvent<HTMLElement>,
    trigger?: HTMLElement | null
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
      value={{ isOpen, openConsultation, closeConsultation }}
    >
      {children}
      <ConsultationDialog open={isOpen} onClose={closeConsultation} />
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
