"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Ceylon Tea Trails", category: "Hospitality" },
  { name: "Lanka Retail Co.", category: "Retail" },
  { name: "Colombo Tech Lab", category: "Digital" },
  { name: "Heritage Apparel", category: "Fashion" },
  { name: "Island Spice Exotics", category: "Exports" },
];

export function TrustedPartnersSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-white">
      <Container>
        {/* Divider Line */}
        <div className="w-full border-t border-[#e5e8ee]" />

        {/* Section Heading */}
        <div className="text-center mt-10 sm:mt-14 mb-8 sm:mb-12">
          <p className="text-xs sm:text-[13px] font-medium tracking-[0.15em] text-[#5b6475] uppercase">
            Trusted Partners
          </p>
        </div>

        {/* 5 Partner Logo Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-center">
          {PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-16 sm:h-18 rounded-2xl bg-[#f5f7fa] border border-[#e5e8ee] flex flex-col items-center justify-center px-4 transition-all duration-200 hover:border-[#c5cbe0] hover:bg-[#eef3ff] group"
            >
              <span className="text-[13px] sm:text-[14px] font-medium text-[#0b1220] tracking-tight group-hover:text-[#3068f9] transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#5b6475]">
                {partner.category}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
