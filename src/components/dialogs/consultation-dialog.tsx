"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef } from "react";
import { Check, MessageSquare, X } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import type { ConsultationOptions } from "@/components/providers/consultation-provider";

interface ConsultationDialogProps {
  open: boolean;
  onClose: () => void;
  options?: ConsultationOptions;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConsultationDialog({ open, onClose, options }: ConsultationDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isAudit = options?.type === "growth-audit";

  // Focus trap, Escape key, and body scroll lock
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        firstFocusable?.focus();
      }
    }, 50);

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
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b1220]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Split-screen Modal Surface */}
      <div
        ref={modalRef}
        className="relative z-10 flex w-full max-w-[980px] lg:max-w-[1040px] max-h-[92vh] flex-col md:flex-row overflow-hidden rounded-[24px] border border-[#e5e8ee] bg-white text-[#0b1220] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* =========================================================
            LEFT PANEL: Brand, Imagery & Value Props (Split Screen)
           ========================================================= */}
        <aside
          className="relative hidden md:flex flex-col justify-between w-[40%] lg:w-[42%] shrink-0 p-8 lg:p-10 overflow-hidden bg-[#0b1220] text-white"
          aria-label="About BHive Growth Review"
        >
          {/* Background Image Texture */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/images/figma/service-strategy.png')` }}
          />

          {/* Gradient Overlay for high-contrast typography readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/85 to-[#0b1220]/75 pointer-events-none" />

          {/* Ambient Brand Blue Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#3068f9]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#1f55e0]/20 blur-3xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <img
              src="/images/figma/bhive-logo.png"
              alt="BHive"
              className="h-7 w-auto object-contain brightness-0 invert block"
            />
          </div>

          {/* Middle Editorial Statement */}
          <div className="relative z-10 my-8">
            <span className="text-[12px] font-medium tracking-[0.15em] text-[#3068f9] uppercase block mb-3">
              STRATEGY · BRAND · MARKETING
            </span>
            <h3 className="text-2xl lg:text-[28px] font-medium tracking-tight text-white leading-[1.18]">
              {isAudit ? "Stop guessing where your growth leaks." : "From first step to fully scaled."}
            </h3>
            <p className="mt-3.5 text-sm text-white/70 leading-[1.6]">
              {isAudit
                ? "We analyze your website, acquisition channels, and funnel drop-offs so you stop wasting budget on ads that don't convert."
                : "Tailored strategy, brand, and marketing systems built to win real paying customers and scale your business."}
            </p>
          </div>

          {/* Bottom Proof & Pillars */}
          <div className="relative z-10 space-y-3.5 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm text-white/85">
              <div className="h-5 w-5 rounded-full bg-[#3068f9]/20 flex items-center justify-center shrink-0 text-[#3068f9]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <span>Free 24–48h growth diagnostic review</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/85">
              <div className="h-5 w-5 rounded-full bg-[#3068f9]/20 flex items-center justify-center shrink-0 text-[#3068f9]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <span>Clear 90-day commercial action plan</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/85">
              <div className="h-5 w-5 rounded-full bg-[#3068f9]/20 flex items-center justify-center shrink-0 text-[#3068f9]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <span>100% free · Zero lock-in or sales pressure</span>
            </div>
          </div>
        </aside>

        {/* =========================================================
            RIGHT PANEL: Form & Action (Split Screen)
           ========================================================= */}
        <main className="relative flex-1 flex flex-col min-w-0 max-h-[92vh] overflow-y-auto bg-white p-6 sm:p-8 lg:p-10">
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-5 top-5 sm:right-6 sm:top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f7fa] text-[#5b6475] hover:bg-[#e5e8ee] hover:text-[#0b1220] transition-colors focus-visible:outline-2 focus-visible:outline-[#3068f9] cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          {/* Form Header */}
          <div className="pr-10 mb-6">
            <span className="text-xs font-medium tracking-[0.15em] text-[#3068f9] uppercase block mb-1">
              {isAudit ? "FREE GROWTH AUDIT" : "GROWTH CONSULTATION"}
            </span>
            <h2
              id="consultation-dialog-title"
              className="text-2xl sm:text-[26px] font-medium tracking-tight text-[#0b1220] leading-[1.2]"
            >
              {isAudit ? "Claim your free growth audit" : "Book a growth consultation"}
            </h2>
            <p
              id="consultation-dialog-desc"
              className="mt-1.5 text-xs sm:text-sm text-[#5b6475] leading-relaxed"
            >
              {isAudit
                ? "Tell us about your business. We will review your current marketing and send you a practical 3-month action plan."
                : "Choose what's easiest for you. Chat right now on WhatsApp or leave your details below for a 15-minute diagnostic call."}
            </p>
          </div>

          {/* Fast-track WhatsApp Option (Sri Lanka market convenience) */}
          <div className="rounded-2xl bg-[#f5f7fa] border border-[#e5e8ee] p-4 sm:p-4.5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#0b1220]">
                  Prefer WhatsApp?
                </p>
                <p className="text-xs text-[#5b6475] mt-0.5">
                  Direct chat with our strategy team · Replies within 1 hour
                </p>
              </div>
              <WhatsAppLink
                location={isAudit ? "dialog_audit" : "dialog_consultation"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4.5 py-2.5 text-xs sm:text-sm font-medium text-white transition-all shadow-sm shrink-0 active:scale-95"
              >
                <MessageSquare className="h-4 w-4 fill-white stroke-none" />
                <span>Chat on WhatsApp</span>
              </WhatsAppLink>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-[#e5e8ee]" />
            <span className="absolute bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-[#5b6475]">
              or leave your details below
            </span>
          </div>

          {/* Main Lead Form */}
          <LeadForm
            isAudit={isAudit}
            submitLabel={isAudit ? "Claim Free Growth Audit" : "Book Growth Consultation"}
          />
        </main>
      </div>
    </div>
  );
}
