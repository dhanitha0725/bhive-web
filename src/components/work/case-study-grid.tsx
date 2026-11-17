"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { CaseStudyDialog } from "@/components/work/case-study-dialog";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 sm:gap-10">
        {studies.map((item, index) => (
          <Reveal key={item.slug} delay={index * 50} className="h-full">
            <CaseStudyCard
              item={item}
              index={index}
              onOpen={() => setActiveStudy(item)}
            />
          </Reveal>
        ))}
      </div>

      <CaseStudyDialog study={activeStudy} onClose={() => setActiveStudy(null)} />
    </>
  );
}
