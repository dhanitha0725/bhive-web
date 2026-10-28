"use client";

import React from "react";
import { useConsultation } from "@/components/providers/consultation-provider";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { ArrowRight, MessageSquare } from "lucide-react";

export function MobileStickyCta() {
  const { isOpen, openConsultation } = useConsultation();

  // Hidden while dialog is open
  if (isOpen) return null;

  return (
    <div
      aria-label="Quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 block sm:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_24px_rgba(0,0,0,0.09)] pointer-events-auto"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={(e) => openConsultation("mobile_sticky_bar", e.currentTarget)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white py-3.5 px-4 text-sm font-semibold shadow-sm active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[#0066cc]"
        >
          <span>Free Consultation</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <WhatsAppLink
          location="mobile_sticky_bar"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm active:scale-[0.96] transition-all"
        >
          <MessageSquare className="h-5 w-5 fill-white stroke-none" />
        </WhatsAppLink>
      </div>
    </div>
  );
}
