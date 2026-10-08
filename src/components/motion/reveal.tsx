"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms (keeps the same staggered look, runs on the compositor). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: "div" | "article";
  id?: string;
};

/**
 * Lightweight scroll reveal: an IntersectionObserver driving a CSS
 * transform/opacity transition.
 *
 * Replaces framer-motion `whileInView` for below-fold cards. Framer runs its
 * own rAF + JS style writes per animated element on every scroll frame;
 * this version does zero JS work during scrolling once revealed.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  as = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    let doneTimer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            io.disconnect();
            // Once the entrance settles, drop the reveal hooks so the
            // element's own hover transitions (duration-300 etc.) apply
            // exactly as before. End state is identical, so this is seamless.
            doneTimer = window.setTimeout(() => {
              target.classList.remove("reveal");
              target.style.removeProperty("--reveal-delay");
              target.style.removeProperty("--reveal-y");
            }, 800 + delay);
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(doneTimer);
    };
  }, [delay]);

  const style: React.CSSProperties = {
    ...(delay > 0 ? { ["--reveal-delay" as string]: `${delay}ms` } : null),
    ...(y !== 18 ? { ["--reveal-y" as string]: `${y}px` } : null),
  };

  if (as === "article") {
    return (
      <article
        ref={ref as unknown as React.RefObject<HTMLElement>}
        id={id}
        className={`reveal ${className}`}
        style={style}
      >
        {children}
      </article>
    );
  }
  return (
    <div ref={ref} id={id} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
