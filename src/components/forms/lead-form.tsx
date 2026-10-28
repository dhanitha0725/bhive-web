"use client";

import React, { useState } from "react";
import { consultationLeadSchema } from "@/forms/schemas";
import { CheckCircle2, Loader2, AlertCircle, MessageSquare } from "lucide-react";
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
}

interface FormState {
  name: string;
  whatsappNumber: string;
  businessName: string;
  whatYouNeed: string;
  honeypot: string;
}

export function LeadForm({ onSuccess, className = "" }: LeadFormProps) {
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
        const errorMsg = data.error || "Unable to send request. Please message us on WhatsApp directly.";
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
      <div className="rounded-[18px] border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 text-center text-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 font-display">
          Request Received
        </h3>
        <p className="mt-2 text-base text-slate-700 max-w-md mx-auto leading-relaxed">
          Thanks. We will WhatsApp you within 24 hours.
        </p>
        <p className="mt-4 text-xs font-mono uppercase tracking-wider text-slate-500">
          No obligation · 100% Free Consultation
        </p>
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-sm"
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          Your Name <span className="text-red-500">*</span>
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
          className={`w-full rounded-full border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc] ${
            errors.name ? "border-red-400 ring-1 ring-red-400" : "border-slate-300"
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          WhatsApp Number <span className="text-red-500">*</span>
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
          className={`w-full rounded-full border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc] ${
            errors.whatsappNumber ? "border-red-400 ring-1 ring-red-400" : "border-slate-300"
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          Business or Project Name <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-business"
          type="text"
          name="businessName"
          required
          placeholder="e.g. Ceylon Spices Store"
          value={formData.businessName}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-full border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc] ${
            errors.businessName ? "border-red-400 ring-1 ring-red-400" : "border-slate-300"
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          What do you need help with? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="lead-need"
          name="whatYouNeed"
          rows={3}
          required
          placeholder="e.g. We have a Facebook page with 5k followers but hardly get any enquiries or sales..."
          value={formData.whatYouNeed}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full rounded-[14px] border bg-white p-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc] ${
            errors.whatYouNeed ? "border-red-400 ring-1 ring-red-400" : "border-slate-300"
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
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-150 hover:bg-[#0055b3] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#0071e3]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Get Free Growth Consultation</span>
          )}
        </button>
      </div>

      {/* Consent Line & Guarantees */}
      <div className="space-y-1.5 pt-1 text-center">
        <p className="text-xs text-slate-500 leading-relaxed">
          By submitting this form, you agree that BHive may contact you via WhatsApp or phone regarding your growth consultation. Your information is never sold or shared with third-party advertisers.
        </p>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          Free · No Obligation · Reply Within 24h
        </p>
      </div>
    </form>
  );
}
