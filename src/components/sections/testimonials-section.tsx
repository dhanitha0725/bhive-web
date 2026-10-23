"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Quote } from "lucide-react";

// TODO: replace with verified client testimonials, real photos, and owner-approved quotes
const TESTIMONIALS = [
  {
    id: 1,
    name: "Kasun Jayawardena", // TODO: replace with real client data
    role: "Founder & Director",
    business: "Kandy Tea Exporters", // TODO: replace with real business
    photoPlaceholder: "KJ", // TODO: replace with real photo
    specificResult: "Generated 40+ direct export enquiries in our first 60 days",
    quote:
      "Before BHive, our website was like a ghost town. They restructured our offer, set up direct WhatsApp chat links, and targeted genuine buyers. We finally have consistent weekly enquiries.",
    isPlaceholder: true,
  },
  {
    id: 2,
    name: "Dilini Senanayake", // TODO: replace with real client data
    role: "Managing Partner",
    business: "Colombo Boutique Living", // TODO: replace with real business
    photoPlaceholder: "DS", // TODO: replace with real photo
    specificResult: "Direct bookings increased by 45% within three months",
    quote:
      "We were losing huge sums on booking commission platforms. BHive built a lightning-fast mobile booking page and a simple Instagram plan that brought guests straight to our WhatsApp.",
    isPlaceholder: true,
  },
  {
    id: 3,
    name: "Mohamed Rilwan", // TODO: replace with real client data
    role: "Managing Director",
    business: "Apex Engineering Supplies", // TODO: replace with real business
    photoPlaceholder: "MR", // TODO: replace with real photo
    specificResult: "Closed three major commercial contracts without discounting",
    quote:
      "Having a professional brand identity and clear service packages stopped customers from treating us like cheap contractors. Our sales conversations are ten times easier now.",
    isPlaceholder: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/70 text-slate-900 border-b border-slate-200">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            Owner Feedback
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold font-display tracking-tight text-slate-900 leading-[1.15]">
            What business owners say about working with BHive
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical marketing solutions built around real business owners who need results, not theories.
          </p>
        </div>

        {/* Testimonials Grid (Max 3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-[22px] bg-white border border-slate-200 p-6 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
            >
              <div>
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Specific Result Highlight */}
                <div className="mt-4 rounded-xl bg-blue-50/80 p-3 border border-blue-100">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Specific Result
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-900">
                    {item.specificResult}
                  </span>
                </div>
              </div>

              {/* Author & Photo Placeholder */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0066cc] to-blue-800 text-white font-semibold text-sm shadow-sm">
                  {/* TODO: replace photo avatar with next/image once real photos provided */}
                  {item.photoPlaceholder}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}, {item.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
