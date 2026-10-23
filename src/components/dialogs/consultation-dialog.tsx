"use client";

import React, { useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { getWhatsAppUrl } from "@/config/site";

interface ConsultationDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultationDialog({ open, onClose }: ConsultationDialogProps) {
  // Prevent body scrolling when open and handle Escape key
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
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
            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-snug">
              Choose what&apos;s easiest for you. Chat right now on WhatsApp or leave your details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
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
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 active:scale-[0.98] shadow-sm"
            >
              <MessageSquare className="h-5 w-5 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </a>
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
