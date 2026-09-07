import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "navy" | "honey" | "outline" | "text";

const styles: Record<Variant, string> = {
  navy: "bg-navy-600 text-white hover:bg-navy-700 shadow-xs",
  honey: "bg-honey-500 text-navy-900 font-bold hover:bg-honey-400 shadow-xs",
  outline: "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--foreground)]/40",
  text: "text-[var(--foreground)] underline decoration-blue-500 decoration-2 underline-offset-4 hover:text-blue-700",
};

const base =
  "btn-base inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm transition-all duration-150 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

export function Button({
  variant = "navy",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "navy",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
