"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

interface ConsultationDialogProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConsultationDialog({ open, onClose }: ConsultationDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap, Escape key, and body scroll lock
  useEffect(() => {
    if (!open) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // Set initial focus into modal
    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (modalRef.current) {
        const firstFocusable =
          modalRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        firstFocusable?.focus();
      }
    }, 50);

    // Keyboard handlers (ESC & Tab focus trap)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;

        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null); // only visible elements

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-dialog-title"
      aria-describedby="consultation-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="relative border-b border-slate-100 bg-slate-50/70 px-5 sm:px-6 py-5">
          <div className="pr-8">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0066cc]">
              Free · No Obligation
            </span>
            <h2
              id="consultation-dialog-title"
              className="mt-1 text-xl sm:text-2xl font-semibold font-display text-slate-900 tracking-tight"
            >
              Get Free Growth Consultation
            </h2>
            <p
              id="consultation-dialog-desc"
              className="mt-1 text-xs sm:text-sm text-slate-600 leading-snug"
            >
              Choose what&apos;s easiest for you. Chat right now on WhatsApp or leave your details below.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-[#0066cc]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-6 space-y-6">
          {/* Option 1: WhatsApp Primary Action */}
          <div className="rounded-[18px] bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5 text-center">
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Fastest Response · Sri Lanka WhatsApp
            </p>
            <WhatsAppLink
              location="dialog"
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 active:scale-[0.98] shadow-sm"
            >
              <MessageSquare className="h-5 w-5 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </WhatsAppLink>
            <p className="mt-2 text-[11px] text-emerald-700">
              Direct chat with BHive team · Typically replies in under 1 hour during business hours
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3 text-xs font-mono uppercase tracking-wider text-slate-400">
              or send a quick note
            </span>
          </div>

          {/* Option 2: Short Form */}
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
