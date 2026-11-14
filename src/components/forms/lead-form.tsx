"use client";

import React, { useState } from "react";
import { consultationLeadSchema } from "@/forms/schemas";
import { CheckCircle2, Loader2, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import {
  getUtmAndReferrer,
  trackLeadSubmitSuccess,
  trackLeadSubmitError,
} from "@/lib/analytics";

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
  source?: string;
  submitLabel?: string;
  isAudit?: boolean;
}

interface FormState {
  name: string;
  whatsappNumber: string;
  businessName: string;
  whatYouNeed: string;
  honeypot: string;
}

export function LeadForm({
  onSuccess,
  className = "",
  submitLabel,
  isAudit = false,
}: LeadFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    whatsappNumber: "",
    businessName: "",
    whatYouNeed: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultSubmitLabel = submitLabel || (isAudit ? "Claim Free Growth Audit" : "Book Growth Consultation");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline error on field change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    // Client-side validation with Zod
    const validation = consultationLeadSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const utmInfo = getUtmAndReferrer();
      const payload = {
        ...formData,
        ...utmInfo,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.issues) {
          const fieldErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(data.issues)) {
            fieldErrors[key] = Array.isArray(msgs) ? msgs[0] : String(msgs);
          }
          setErrors(fieldErrors);
        }
        const errorMsg =
          data.error || "Unable to send request. Please message us on WhatsApp directly.";
        trackLeadSubmitError(errorMsg);
        throw new Error(errorMsg);
      }

      trackLeadSubmitSuccess();
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const msg =
        (err as Error).message ||
        "Failed to submit. Please message us on WhatsApp directly.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 text-center text-[#0b1220]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
        </div>
        <h3 className="text-xl font-medium text-[#0b1220]">
          Request Received
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#5b6475] max-w-md mx-auto leading-relaxed">
          Thanks, {formData.name || "there"}! We will review your business details and message you on WhatsApp within 24 hours.
        </p>
        <div className="mt-6 pt-4 border-t border-emerald-200/60 flex flex-col items-center gap-2">
          <p className="text-xs text-[#5b6475]">Want an immediate answer?</p>
          <WhatsAppLink
            location="form_success"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-5 py-2.5 text-sm font-medium text-white transition-all shadow-sm"
          >
            <MessageSquare className="h-4 w-4 fill-white stroke-none" />
            <span>Chat on WhatsApp Now</span>
          </WhatsAppLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 text-left ${className}`}>
      {/* Honeypot field for anti-bot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <span className="font-medium">{serverError}</span>
          </div>
          <WhatsAppLink
            location="form_error"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4 py-2.5 text-sm font-medium text-white transition-all shadow-sm"
          >
            <MessageSquare className="h-4 w-4 fill-white stroke-none" />
            <span>Message Us Directly on WhatsApp</span>
          </WhatsAppLink>
        </div>
      )}

      {/* Your Name */}
      <div>
        <label
          htmlFor="lead-name"
          className="block text-xs font-medium tracking-wider text-[#5b6475] uppercase mb-1.5"
        >
          Your Name <span className="text-[#3068f9]">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          name="name"
          required
          placeholder="e.g. Ruwan Perera"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 sm:py-3 text-[15px] text-[#0b1220] placeholder:text-[#5b6475]/50 focus:outline-none focus:ring-2 focus:ring-[#3068f9] transition-colors ${
            errors.name ? "border-red-400 ring-1 ring-red-400" : "border-[#e5e8ee] hover:border-[#c5cbe0]"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
        )}
      </div>

      {/* WhatsApp Number */}
      <div>
        <label
          htmlFor="lead-phone"
          className="block text-xs font-medium tracking-wider text-[#5b6475] uppercase mb-1.5"
        >
          WhatsApp Number <span className="text-[#3068f9]">*</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          name="whatsappNumber"
          required
          placeholder="e.g. 077 123 4567 or +94 77 123 4567"
          value={formData.whatsappNumber}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 sm:py-3 text-[15px] text-[#0b1220] placeholder:text-[#5b6475]/50 focus:outline-none focus:ring-2 focus:ring-[#3068f9] transition-colors ${
            errors.whatsappNumber ? "border-red-400 ring-1 ring-red-400" : "border-[#e5e8ee] hover:border-[#c5cbe0]"
          }`}
        />
        {errors.whatsappNumber && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.whatsappNumber}
          </p>
        )}
      </div>

      {/* Business Name */}
      <div>
        <label
          htmlFor="lead-business"
          className="block text-xs font-medium tracking-wider text-[#5b6475] uppercase mb-1.5"
        >
          Business or Project Name <span className="text-[#3068f9]">*</span>
        </label>
        <input
          id="lead-business"
          type="text"
          name="businessName"
          required
          placeholder="e.g. Ceylon Spices Store or ceylonspices.lk"
          value={formData.businessName}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 sm:py-3 text-[15px] text-[#0b1220] placeholder:text-[#5b6475]/50 focus:outline-none focus:ring-2 focus:ring-[#3068f9] transition-colors ${
            errors.businessName ? "border-red-400 ring-1 ring-red-400" : "border-[#e5e8ee] hover:border-[#c5cbe0]"
          }`}
        />
        {errors.businessName && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.businessName}
          </p>
        )}
      </div>

      {/* What do you need */}
      <div>
        <label
          htmlFor="lead-need"
          className="block text-xs font-medium tracking-wider text-[#5b6475] uppercase mb-1.5"
        >
          {isAudit ? "What channels or areas would you like us to audit?" : "What do you need help with?"} <span className="text-[#3068f9]">*</span>
        </label>
        <textarea
          id="lead-need"
          name="whatYouNeed"
          rows={3}
          required
          placeholder={
            isAudit
              ? "e.g. We run Facebook and Instagram ads but cost per enquiry is too high, and our website bounce rate is high..."
              : "e.g. We need to launch a new brand, build a high-converting web presence, or scale our customer acquisition..."
          }
          value={formData.whatYouNeed}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-white p-3 sm:p-3.5 text-[15px] text-[#0b1220] placeholder:text-[#5b6475]/50 focus:outline-none focus:ring-2 focus:ring-[#3068f9] transition-colors ${
            errors.whatYouNeed ? "border-red-400 ring-1 ring-red-400" : "border-[#e5e8ee] hover:border-[#c5cbe0]"
          }`}
        />
        {errors.whatYouNeed && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.whatYouNeed}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] px-6 text-[15px] font-medium text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>{defaultSubmitLabel}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>

      {/* Consent Line & Guarantees */}
      <div className="pt-1 text-center">
        <p className="text-[12px] text-[#5b6475] leading-relaxed">
          100% Free · No sales pressure · Replies within 24h via WhatsApp
        </p>
      </div>
    </form>
  );
}
