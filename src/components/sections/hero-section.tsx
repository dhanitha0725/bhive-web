"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, PhoneCall, ArrowRight, ChevronDown } from "lucide-react";
import { CloudSky } from "@/components/ui/cloud-sky";
import { Container } from "@/components/ui/container";

const ROTATING_WORDS = ["Designs", "Grow", "Develop", "Scale", "Transform"];

const AVATARS = [
  {
    name: "Alex Rivera",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    fallback: "AR",
  },
  {
    name: "David Chen",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    fallback: "DC",
  },
  {
    name: "Elena Rostova",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    fallback: "ER",
  },
  {
    name: "Marcus Vance",
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    fallback: "MV",
  },
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] min-h-[calc(100dvh-4.5rem)] w-full flex-col justify-center items-center overflow-hidden bg-[#0075FF] text-white py-12 sm:py-16 lg:py-20">
      {/* 1. Cloud Sky Background (Interactive WebGL Drifting Sky with #0075FF background) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <CloudSky
          background="#0075FF"
          baseColor="#B4D2F0"
          accentColor="#FFFFFF"
          density={85}
          speed={45}
          size={130}
          clouds={{ softness: 160, shadow: 65, cirrus: 65 }}
          sun={{ x: 92, y: 94, glow: "#FFFFFF" }}
          pointer={{ wind: 220, damping: 40, parallax: 240 }}
          style={{ width: "100%", height: "100%", minWidth: "100%", minHeight: "100%" }}
        />
        {/* Soft atmospheric gradient to maintain high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0075FF]/35 via-transparent to-[#0075FF]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-[#0060df]/30 pointer-events-none" />
      </div>

      {/* 2. Main Hero Content Container */}
      <Container className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center px-4 sm:px-6">
        {/* Top Badge: [ AI-Powered ] Solutions for Client Businesses */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/20 backdrop-blur-md p-1 pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02]"
        >
          <span className="rounded-full bg-[#0a254f] px-3.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm">
            AI-Powered
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm">
            Solutions for Client Businesses
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-6 sm:mt-8 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.15] drop-shadow-[0_2px_16px_rgba(0,40,120,0.35)]"
        >
          {/* Line 1: Innovative [ Animated Word ] and Creative */}
          <span className="inline-flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3.5 gap-y-2">
            <span>Innovative</span>

            {/* Glowing Rounded Rectangle Container */}
            <span className="relative inline-flex items-center justify-center rounded-full border-2 border-white bg-white/20 px-4 sm:px-8 py-0.5 sm:py-1 shadow-[0_0_35px_rgba(255,255,255,0.45)] backdrop-blur-md min-w-[130px] sm:min-w-[210px] md:min-w-[240px] h-[46px] sm:h-[62px] md:h-[74px] overflow-hidden align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-white font-bold tracking-tight whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,40,120,0.5)]"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>

            <span>and Creative</span>
          </span>

          {/* Line 2: Ideas To Boost 🚀 Your Brand! */}
          <span className="mt-2 sm:mt-3 block">
            Ideas To Boost{" "}
            <motion.span
              animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              className="inline-block cursor-default select-none"
            >
              🚀
            </motion.span>{" "}
            Your Brand!
          </span>
        </motion.h1>

        {/* Subtitle / Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-white font-medium leading-relaxed text-balance drop-shadow-[0_1px_6px_rgba(0,40,120,0.3)]"
        >
          Our trusted agency for designs that captivate and strategies that drive
          results. We transform ideas into unforgettable experiences.
        </motion.p>

        {/* Social Proof Bar (4 Avatars + 5 Stars + 4.5 Rating + Subtext) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          {/* Overlapping Avatar Stack */}
          <div className="flex -space-x-2.5 overflow-hidden p-0.5">
            {AVATARS.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar.src}
                alt={avatar.name}
                loading="lazy"
                className="inline-block h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-white shadow-md transition-transform hover:scale-110 hover:z-20"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            ))}
          </div>

          {/* Rating Stars & Text */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-300 text-amber-300 drop-shadow-sm"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white tracking-wide drop-shadow-sm">
                4.5
              </span>
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white/95 drop-shadow-sm">
              Trusted by 1000+ Designers &amp; Developers
            </p>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Action Button: Book a Call 📞 */}
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0a254f] hover:bg-[#071e42] px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_6px_24px_rgba(10,37,79,0.4)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Book a Call</span>
            <PhoneCall className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
          </Link>

          {/* Secondary Action Button: View Pricing → */}
          <Link
            href="/grow-your-business"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/20 hover:bg-white/30 px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>View Pricing</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 1 }}
        className="absolute bottom-4 z-10 hidden sm:flex flex-col items-center gap-1 text-white/80 text-xs pointer-events-none drop-shadow-sm"
      >
        <span className="tracking-widest uppercase text-[10px] font-mono font-medium opacity-80">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
