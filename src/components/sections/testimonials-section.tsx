"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    heading: '"Transformed our client pipeline"',
    quote:
      "We went from scattered consulting ops to a clean, positioned market authority. The commercial visibility and coherent brand architecture alone transformed our client pipeline.",
    author: "Marcus Vance",
    role: "Managing Partner",
    company: "Northline Advisory",
    initials: "MV",
    color: "bg-blue-600",
  },
  {
    id: 2,
    heading: '"Eliminated friction across the board"',
    quote:
      "The brand and booking journey overhaul eliminated friction across the board. Our prospective guests finally understand our luxury tier instantly without hesitation.",
    author: "Elena Rostova",
    role: "Founder & CEO",
    company: "Haven & Co.",
    initials: "ER",
    color: "bg-navy-600",
  },
  {
    id: 3,
    heading: '"Rowing in the exact same direction"',
    quote:
      "BHive structured our communication around clear service lines. Our marketing, brand, and sales touchpoints are finally rowing in the exact same commercial direction.",
    author: "David Kelling",
    role: "Head of Growth",
    company: "Vertex Works",
    initials: "DK",
    color: "bg-navy-800",
  },
  {
    id: 4,
    heading: '"Saved us months of costly rework"',
    quote:
      "Building in the right order saved us months of rework. Having positioning, brand, and launch architecture mapped out before writing copy gave our entire team total clarity.",
    author: "Sarah Chen",
    role: "Co-Founder",
    company: "Arclight Labs",
    initials: "SC",
    color: "bg-neutral-800",
  },
];

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const nextTestimonial = () => {
    setStartIndex((prev) => (prev + 2 >= testimonials.length ? 0 : prev + 2));
  };

  const prevTestimonial = () => {
    setStartIndex((prev) => (prev - 2 < 0 ? Math.max(0, testimonials.length - 2) : prev - 2));
  };

  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
  ];

  return (
    <section className="py-20 lg:py-28 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
              Client Stories
            </p>
            <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
              Trusted by leaders who value commercial clarity.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Here is how business owners and founders experience building with
              the BHive system.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-navy-50 text-[var(--foreground)] transition-colors hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-navy-50 text-[var(--foreground)] transition-colors hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid (Watermelon testimonials-1 card adaptation) */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {visibleTestimonials.map((item, idx) => (
            <motion.div
              key={`${item.id}-${startIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-navy-50/40 p-7 lg:p-8 shadow-2xs transition-all duration-300 hover:border-blue-400/50 hover:bg-[var(--background)] hover:shadow-lg"
            >
              <div>
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-blue-600 text-blue-600"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-muted-foreground/30" />
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[var(--foreground)]">
                  {item.heading}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-8 flex items-center gap-3.5 pt-6 border-t border-[var(--border)]">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color} font-display text-xs font-bold text-white`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    {item.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.role},{" "}
                    <span className="font-semibold text-[var(--foreground)]">
                      {item.company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
