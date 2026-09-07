import type { ComponentProps } from "react";

export function Badge({ className = "", ...props }: ComponentProps<"span">) {
  return (
    <span
      className={`badge-base inline-flex items-center bg-blue-50 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-blue-700 ${className}`}
      {...props}
    />
  );
}
