"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import BlurText from "@/components/BlurText";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Check,
  TrendingUp,
  CreditCard,
  Wifi,
  Signal,
  Battery,
  Flame,
  Lock,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */
interface OutcomeItem {
  id: string;
  number: string;
  title: string;
  description: string;
  containerBg: string;
  containerBorder: string;
  visual: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* INDIVIDUAL OUTCOME ROW WITH SCROLL FADE-OUT TRANSITION                      */
/* -------------------------------------------------------------------------- */
function OutcomeRow({
  outcome,
  index,
}: {
  outcome: OutcomeItem;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll transitions:
  // - Enters from bottom: fades in from 0.35 to 1.0
  // - In viewport reading zone: stays solid 1.0 opacity
  // - Scrolls up past top of screen: smoothly dims/fades out to 0.22 opacity
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.62, 0.92],
    [0.35, 1, 1, 0.22]
  );

  const scale = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.62, 0.92],
    [0.98, 1, 1, 0.98]
  );

  // Alternating layout: even items have text on left, card on right;
  // odd items have card on left, text on right.
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity, scale }}
      className="relative will-change-transform py-10 sm:py-14 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Text Column */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6 ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Eyebrow: Number + OUTCOME label */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase">
              {outcome.number} &nbsp; OUTCOME
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold font-display tracking-tight text-slate-900 leading-[1.18]">
            {outcome.title}
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
            {outcome.description}
          </p>
        </div>

        {/* Visual Card Container Column */}
        <div
          className={`lg:col-span-7 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div
            className={`relative rounded-3xl sm:rounded-[36px] overflow-hidden p-6 sm:p-10 lg:p-12 ${outcome.containerBg} ${outcome.containerBorder} flex items-center justify-center`}
          >
            {outcome.visual}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* OUTCOME VISUAL 01: POLISHED UI & BRAND POSITIONING (Inspired by Image 1)  */
/* -------------------------------------------------------------------------- */
function OutcomeVisual01() {
  return (
    <div className="relative w-full max-w-xl flex items-center justify-center py-2 sm:py-4">
      {/* Phone chassis row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full items-stretch">
        {/* Phone 1: Balance & Transactions */}
        <div className="relative rounded-[2rem] bg-[#0c1017] border border-slate-700/60 p-3.5 text-white shadow-xl flex flex-col justify-between">
          <div>
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-3 px-1">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="h-2.5 w-2.5" />
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* Account pill */}
            <div className="text-[10px] text-slate-400 font-medium">Total balance</div>
            <div className="text-lg font-bold tracking-tight text-white mt-0.5">€12,480.32</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+€1,294 this month</div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-1.5 my-3 text-center">
              {["Add", "Send", "Request", "More"].map((act) => (
                <div key={act} className="flex flex-col items-center">
                  <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-[11px] text-slate-200">
                    +
                  </div>
                  <span className="text-[8px] text-slate-400 mt-1">{act}</span>
                </div>
              ))}
            </div>

            {/* In-app Card Mini */}
            <div className="rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 p-2.5 text-white shadow-md mb-3">
              <div className="text-[10px] font-bold tracking-widest uppercase">nova</div>
              <div className="text-[11px] font-mono mt-2 tracking-wider">•••• 4871</div>
              <div className="text-[8px] text-white/80 mt-1">Debit</div>
            </div>
          </div>

          {/* Transactions list */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Transactions</div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-300 truncate">Basil Kitchen</span>
              <span className="font-mono text-slate-200">-€24.90</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-300 truncate">Aria Cliff Suite</span>
              <span className="font-mono text-slate-200">-€420.00</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-300 truncate">Client Retainer</span>
              <span className="font-mono text-emerald-400">+€4,200.00</span>
            </div>
          </div>
        </div>

        {/* Phone 2: Main Card & Controls (Featured Center) */}
        <div className="relative rounded-[2rem] bg-[#0c1017] border border-slate-700/60 p-3.5 text-white shadow-xl flex flex-col justify-between sm:-translate-y-1">
          <div>
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-3 px-1">
              <span>9:41</span>
              <span className="text-[10px] font-semibold text-slate-300">Card</span>
              <div className="flex items-center gap-1">
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* Featured Purple Gradient Card */}
            <div className="rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 p-3.5 text-white shadow-lg relative overflow-hidden mb-3.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest uppercase">nova</span>
                <Wifi className="h-3.5 w-3.5 rotate-90 text-white/80" />
              </div>
              <div className="h-4 w-5 rounded bg-amber-300/90 my-3 shadow-inner" />
              <div className="text-xs font-mono tracking-widest">•••• 4871</div>
              <div className="flex justify-between items-center mt-1 text-[9px] text-white/90">
                <span>Mia Novak</span>
                <span className="font-semibold">Debit</span>
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="grid grid-cols-3 gap-1.5 mb-3.5">
              {[
                { label: "Freeze", icon: Lock },
                { label: "Details", icon: CreditCard },
                { label: "Limits", icon: TrendingUp },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-1.5 text-center flex flex-col items-center justify-center gap-1"
                >
                  <Icon className="h-3 w-3 text-slate-300" />
                  <span className="text-[8px] font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 text-[10px] pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Online payments</span>
              <div className="h-3.5 w-6 rounded-full bg-indigo-500 p-0.5 flex justify-end">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Contactless</span>
              <div className="h-3.5 w-6 rounded-full bg-indigo-500 p-0.5 flex justify-end">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="text-[9px] text-slate-400 pt-0.5">
              Monthly limit: <span className="text-white font-mono">€2,000</span> / €5,000
            </div>
          </div>
        </div>

        {/* Phone 3: Insights & Analytics */}
        <div className="relative rounded-[2rem] bg-[#0c1017] border border-slate-700/60 p-3.5 text-white shadow-xl flex flex-col justify-between">
          <div>
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-3 px-1">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">Insights</span>
              <span className="text-[9px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">September ▾</span>
            </div>

            <div className="text-[10px] text-slate-400">Spent this Month</div>
            <div className="text-lg font-bold text-white">€1,350</div>
            <div className="text-[9px] text-indigo-400 font-mono mb-3">€210 less than August</div>

            {/* Category breakdown */}
            <div className="space-y-1.5 text-[9px]">
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Groceries</span>
                  <span className="font-mono">€513 (35%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Travel</span>
                  <span className="font-mono">€351 (26%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "26%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Dining</span>
                  <span className="font-mono">€270 (20%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-400 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart Volume */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex justify-between text-[9px] text-slate-400 mb-1.5">
              <span>This week</span>
              <span className="font-mono text-white font-semibold">€198</span>
            </div>
            <div className="flex items-end justify-between h-9 gap-1 px-1">
              {[35, 50, 40, 75, 95, 60, 45].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm ${
                      i === 4 ? "bg-indigo-400" : "bg-slate-700/70"
                    }`}
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[7px] text-slate-500">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OUTCOME VISUAL 02: WORLD-CLASS UX & BOOKING FLOW (Inspired by Image 2)     */
/* -------------------------------------------------------------------------- */
function OutcomeVisual02() {
  return (
    <div className="relative w-full max-w-lg flex items-center justify-center py-2 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full items-start">
        {/* Phone 1: Destination Overview Screen */}
        <div className="relative rounded-[2.2rem] bg-[#0a110d] border border-emerald-900/50 shadow-2xl overflow-hidden flex flex-col">
          {/* Top image with photography */}
          <div className="relative w-full aspect-[4/3] bg-emerald-950 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
              alt="Kumo-no-Yu Ryokan Japan Garden"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* Top Bar Floating Buttons */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white">
              <div className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <ArrowLeft className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <Share2 className="h-3 w-3" />
                </div>
                <div className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <Heart className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-white/90 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-full">
              1/18
            </div>
          </div>

          {/* Bottom Card (Cream / Sand Light Tone matching screenshot) */}
          <div className="bg-[#faf8f5] text-stone-900 p-3.5 sm:p-4 rounded-t-2xl -mt-3 relative z-10 space-y-2.5">
            <div>
              <div className="text-[10px] text-stone-500 font-medium">📍 Hakone, Japan</div>
              <div className="text-sm font-bold tracking-tight text-stone-900">Kumo-no-Yu Ryokan</div>
              <div className="flex items-center gap-1 text-[10px] text-stone-600 mt-0.5">
                <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                <span className="font-semibold text-stone-800">4.96</span>
                <span>· 312 reviews · Traditional Inn</span>
              </div>
            </div>

            {/* Amenities pills */}
            <div className="flex flex-wrap gap-1 text-[9px]">
              <span className="rounded-full bg-stone-200/80 px-2 py-0.5 text-stone-700">♨ Private onsen</span>
              <span className="rounded-full bg-stone-200/80 px-2 py-0.5 text-stone-700">🍱 Kaiseki dinner</span>
              <span className="rounded-full bg-stone-200/80 px-2 py-0.5 text-stone-700">🌿 Garden</span>
            </div>

            {/* Dates selector */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-stone-200 bg-white p-2 text-[9px]">
              <div>
                <span className="text-stone-400 block text-[8px] uppercase font-bold">Check-in</span>
                <span className="font-semibold text-stone-800">Thu 12 Nov</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[8px] uppercase font-bold">Check-out</span>
                <span className="font-semibold text-stone-800">Sun 15 Nov</span>
              </div>
            </div>

            {/* Reserve bar */}
            <div className="flex items-center justify-between pt-1 border-t border-stone-200">
              <div>
                <div className="text-xs font-bold text-stone-900">
                  $580 <span className="text-[9px] font-normal text-stone-500">night</span>
                </div>
                <div className="text-[8px] text-stone-500">3 nights = $1,740</div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-[#273d2d] px-3.5 py-1.5 text-[11px] font-bold text-white shadow hover:bg-[#1e2f23] transition-colors"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>

        {/* Phone 2: Review and Book Modal Flow */}
        <div className="relative rounded-[2.2rem] bg-[#0a110d] border border-emerald-900/50 shadow-2xl overflow-hidden flex flex-col">
          {/* Top glimpse of background image */}
          <div className="relative w-full h-24 bg-emerald-950 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
              alt="Japanese bamboo architecture"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white">
              <div className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <ArrowLeft className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Review Sheet Modal */}
          <div className="bg-[#faf8f5] text-stone-900 p-3.5 sm:p-4 rounded-t-2xl -mt-4 relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-stone-900">Review and book</span>
              <span className="text-xs text-stone-400 cursor-pointer">✕</span>
            </div>

            {/* Room Card with thumbnail */}
            <div className="flex items-center gap-2.5 rounded-xl bg-white border border-stone-200 p-2">
              <div className="relative h-11 w-11 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=200&q=80"
                  alt="Room thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-[10px]">
                <div className="font-bold text-stone-900">Kumo-no-Yu Ryokan</div>
                <div className="text-stone-500 text-[9px]">Garden room with private onsen</div>
              </div>
            </div>

            {/* Details rows */}
            <div className="space-y-1.5 text-[10px] border-t border-stone-200 pt-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Dates</span>
                <span className="font-semibold text-stone-800">Thu 12 to Sun 15 Nov</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guests</span>
                <span className="font-semibold text-stone-800">2 adults</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Pay with</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  💳 Visa 4821
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 font-bold text-stone-900 text-xs">
                <span>Total for 3 nights</span>
                <span>$1,740</span>
              </div>
            </div>

            {/* Confirm button */}
            <div className="space-y-1 pt-1">
              <button
                type="button"
                className="w-full rounded-xl bg-[#273d2d] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1e2f23] transition-colors"
              >
                Confirm and pay
              </button>
              <div className="text-center text-[8px] text-stone-500">
                Free cancellation until 5 Nov
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OUTCOME VISUAL 03: HABIT LOOPS & RETENTION (Inspired by Image 3)           */
/* -------------------------------------------------------------------------- */
function OutcomeVisual03() {
  return (
    <div className="relative w-full max-w-lg flex items-center justify-center py-2 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full items-start">
        {/* Phone 1: Daily Streak & Class Card */}
        <div className="relative rounded-[2.2rem] bg-[#16120e] border border-amber-900/50 shadow-2xl overflow-hidden p-3.5 text-stone-900 bg-[#f7f2ed] flex flex-col justify-between">
          <div className="space-y-3">
            {/* Top row: Avatar + Greeting */}
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-stone-600 font-medium">Good morning, Mia</div>
              <div className="relative h-6 w-6 rounded-full overflow-hidden border border-amber-800/30">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Mia user avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Today + Streak Badge */}
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold tracking-tight text-stone-900">Today</h4>
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 text-[9px] font-bold text-amber-900">
                <Flame className="h-2.5 w-2.5 fill-amber-600 text-amber-600" />
                <span>12 day streak</span>
              </div>
            </div>

            {/* Week day bubbles */}
            <div>
              <div className="text-[8px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                This week
              </div>
              <div className="flex items-center justify-between gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                      i === 3
                        ? "bg-[#291e17] text-white shadow"
                        : i < 3
                        ? "bg-amber-200/70 text-amber-900"
                        : "bg-stone-200/70 text-stone-600"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Class Card with photo */}
            <div className="rounded-xl overflow-hidden bg-white border border-stone-200 shadow-sm">
              <div className="relative w-full h-28 bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                  alt="Pilates reformer class"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] font-bold text-white">
                  Today&apos;s class
                </span>
              </div>
              <div className="p-2.5 space-y-1">
                <div className="text-[11px] font-bold text-stone-900">Pilates Reformer Flow</div>
                <div className="text-[9px] text-stone-600">10:00 AM · 45 min · Studio A</div>
                <div className="text-[8px] text-amber-800 font-semibold">Coach Clara Vance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone 2: Monthly Progress & Heatmap Grid */}
        <div className="relative rounded-[2.2rem] bg-[#16120e] border border-amber-900/50 shadow-2xl overflow-hidden p-3.5 text-stone-900 bg-[#f7f2ed] flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header + View Tabs */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-stone-900">Progress</h4>
              <div className="flex rounded-lg bg-stone-200/80 p-0.5 text-[8px] font-semibold text-stone-600">
                <span className="px-1.5 py-0.5">Week</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-stone-900 shadow-sm">Month</span>
                <span className="px-1.5 py-0.5">Year</span>
              </div>
            </div>

            {/* Subhead */}
            <div className="flex justify-between items-baseline text-[10px]">
              <span className="font-bold text-stone-800">November</span>
              <span className="text-stone-500 font-mono text-[9px]">18 classes completed</span>
            </div>

            {/* Calendar Grid of Completed Days */}
            <div className="rounded-xl bg-white border border-stone-200 p-2.5">
              <div className="grid grid-cols-7 gap-1 text-center text-[7px] text-stone-400 font-bold mb-1.5">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-mono">
                {Array.from({ length: 30 }, (_, idx) => {
                  const day = idx + 1;
                  // Completed days highlighted
                  const isCompleted = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 23, 24, 25].includes(day);
                  const isToday = day === 19;

                  return (
                    <div
                      key={day}
                      className={`h-5 w-5 mx-auto rounded-full flex items-center justify-center ${
                        isToday
                          ? "bg-[#291e17] text-white font-bold ring-2 ring-amber-400"
                          : isCompleted
                          ? "bg-amber-200 text-amber-950 font-bold"
                          : "text-stone-400"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streak & Consistency Card */}
            <div className="rounded-xl bg-amber-950/5 border border-amber-900/10 p-2.5 space-y-1">
              <div className="flex justify-between text-[10px] font-semibold text-stone-800">
                <span>Consistency Rate</span>
                <span className="font-mono text-amber-900">92%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-800 rounded-full" style={{ width: "92%" }} />
              </div>
              <div className="text-[8px] text-stone-500 pt-0.5">
                Top 5% active member this quarter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OUTCOME VISUAL 04: REAL-TIME REVENUE & TELEMETRY ENGINE                    */
/* -------------------------------------------------------------------------- */
function OutcomeVisual04() {
  return (
    <div className="relative w-full max-w-lg flex items-center justify-center py-2 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full items-start">
        {/* Phone 1: Real-time Revenue & Growth Curve */}
        <div className="relative rounded-[2.2rem] bg-[#0b101c] border border-blue-900/50 shadow-2xl overflow-hidden p-3.5 text-white flex flex-col justify-between">
          <div className="space-y-3">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
              <span>9:41</span>
              <span className="text-[9px] uppercase tracking-wider text-blue-400 font-semibold">Telemetry</span>
              <div className="flex items-center gap-1">
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* Big Revenue Stat */}
            <div>
              <div className="text-[10px] text-slate-400">Monthly Recurring Revenue</div>
              <div className="text-xl font-bold tracking-tight text-white mt-0.5">$142,850</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>+34.2% MoM pacing</span>
              </div>
            </div>

            {/* Revenue Sparkline Chart SVG */}
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-2.5">
              <div className="text-[8px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                ARR Trajectory (Q1-Q4)
              </div>
              <svg viewBox="0 0 160 50" className="w-full h-12 overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q20,40 40,32 T80,24 T120,12 T160,4 L160,50 L0,50 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,45 Q20,40 40,32 T80,24 T120,12 T160,4"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="160" cy="4" r="3" fill="#60a5fa" />
              </svg>
            </div>

            {/* Key Efficiency Unit Economics */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="rounded-lg bg-slate-900/70 border border-slate-800/80 p-1.5">
                <div className="text-[8px] text-slate-400">CAC Payback</div>
                <div className="text-[10px] font-bold text-white mt-0.5 font-mono">42 Days</div>
              </div>
              <div className="rounded-lg bg-slate-900/70 border border-slate-800/80 p-1.5">
                <div className="text-[8px] text-slate-400">LTV / CAC</div>
                <div className="text-[10px] font-bold text-emerald-400 mt-0.5 font-mono">4.6x</div>
              </div>
              <div className="rounded-lg bg-slate-900/70 border border-slate-800/80 p-1.5">
                <div className="text-[8px] text-slate-400">Conv. Rate</div>
                <div className="text-[10px] font-bold text-white mt-0.5 font-mono">4.8%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone 2: Channel Attribution & Live Conversion Stream */}
        <div className="relative rounded-[2.2rem] bg-[#0b101c] border border-blue-900/50 shadow-2xl overflow-hidden p-3.5 text-white flex flex-col justify-between">
          <div className="space-y-3">
            {/* Attribution Header */}
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold text-white">Attribution Breakdown</span>
              <span className="text-[9px] font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>

            {/* Channel Performance List */}
            <div className="space-y-2 text-[10px]">
              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-2">
                <div className="flex justify-between font-semibold">
                  <span>Paid Search &amp; High-Intent SEO</span>
                  <span className="font-mono text-emerald-400">4.8x ROAS</span>
                </div>
                <div className="text-[8px] text-slate-400 mt-0.5">$42,500 direct attributed revenue</div>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-2">
                <div className="flex justify-between font-semibold">
                  <span>Targeted Paid Social Funnels</span>
                  <span className="font-mono text-emerald-400">3.6x ROAS</span>
                </div>
                <div className="text-[8px] text-slate-400 mt-0.5">$38,200 scalable acquisition</div>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-2">
                <div className="flex justify-between font-semibold">
                  <span>Automated Lifecycle Email</span>
                  <span className="font-mono text-blue-400">31.4% Repurchase</span>
                </div>
                <div className="text-[8px] text-slate-400 mt-0.5">Zero incremental ad spend</div>
              </div>
            </div>

            {/* Live conversion feed */}
            <div className="rounded-xl bg-blue-950/30 border border-blue-900/40 p-2 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <div className="text-[9px] text-slate-300">
                <span className="font-semibold text-white">Enterprise tier closed: $18,400</span>
                <div className="text-slate-400 text-[8px]">Nurture workflow automated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OUTCOMES DATA (4 OUTCOMES MATCHING SCREENSHOTS IN LIGHT THEME)              */
/* -------------------------------------------------------------------------- */
const OUTCOMES_DATA: OutcomeItem[] = [
  {
    id: "outcome-1",
    number: "01",
    title: "Brand identity and positioning that commands premium pricing",
    description:
      "Visual design is only the surface. We engineer distinctive brand systems, messaging frameworks, and category authority that justify premium price points and build immediate trust with high-value buyers.",
    containerBg: "bg-slate-50/90",
    containerBorder: "border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06)]",
    visual: <OutcomeVisual01 />,
  },
  {
    id: "outcome-2",
    number: "02",
    title: "Digital experiences and products people genuinely love",
    description:
      "Understand what people actually need, remove unnecessary friction, and turn messy flows into experiences that feel simple, natural, and genuinely world-class.",
    containerBg: "bg-[#f2f7f3]",
    containerBorder: "border border-emerald-100 shadow-[0_20px_50px_-15px_rgba(16,85,48,0.06)]",
    visual: <OutcomeVisual02 />,
  },
  {
    id: "outcome-3",
    number: "03",
    title: "Customer journeys engineered for compounding retention",
    description:
      "Acquisition without retention is an expensive illusion. We build integrated lifecycle flows, automated re-engagement triggers, and habit-forming loyalty loops that maximize customer lifetime value and drive repeat sales.",
    containerBg: "bg-[#faf5f0]",
    containerBorder: "border border-amber-100 shadow-[0_20px_50px_-15px_rgba(120,53,15,0.06)]",
    visual: <OutcomeVisual03 />,
  },
  {
    id: "outcome-4",
    number: "04",
    title: "Predictable revenue telemetry and unit-economic scale",
    description:
      "Eliminate commercial guesswork. We establish end-to-end attribution, real-time revenue telemetry, and full-funnel diagnostics so you know your exact CAC-to-LTV payback velocity and can allocate growth capital with total conviction.",
    containerBg: "bg-[#f2f5fc]",
    containerBorder: "border border-blue-100 shadow-[0_20px_50px_-15px_rgba(11,76,196,0.06)]",
    visual: <OutcomeVisual04 />,
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN OUTCOMES COMPONENT (LIGHT THEME)                                      */
/* -------------------------------------------------------------------------- */
export function OutcomesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-36 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header: Clean, spacious, centered headline in Light Theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.15rem] font-bold font-display tracking-tight text-slate-900 leading-[1.15]">
            <BlurText
              text="Measurable outcomes that compound commercial growth"
              animateBy="words"
              direction="bottom"
              delay={60}
              className="justify-center"
            />
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            We don’t settle for vanity metrics or superficial redesigns. Here is the concrete business
            impact we engineer for scaling brands and visionary founders.
          </p>
        </div>

        {/* 4 Outcomes List with Alternating Layout & Scroll Fade-Out Transitions */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {OUTCOMES_DATA.map((outcome, index) => (
            <OutcomeRow key={outcome.id} outcome={outcome} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing imports
export const SystemSection = OutcomesSection;

export default OutcomesSection;
