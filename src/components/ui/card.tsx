import type { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`card-base border border-[var(--border)] bg-[var(--background)] p-6 text-[var(--foreground)] transition-all ${className}`}
      {...props}
    />
  );
}
