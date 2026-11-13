import type { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20 ${className}`}
      {...props}
    />
  );
}
