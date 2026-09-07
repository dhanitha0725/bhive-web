import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-[var(--radius-btn,6px)] border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-base text-[var(--foreground)] shadow-xs placeholder:text-[var(--muted-foreground)]/60 focus:border-[var(--ring)] focus:outline-none focus:ring-3 focus:ring-[var(--ring)]/20 aria-[invalid=true]:border-red-600 transition-colors";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${control} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return <textarea className={`${control} min-h-32 resize-y ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <select className={`${control} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function FormField({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const description = error ?? hint;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--foreground)]">
        {label}
      </label>
      {children}
      {description ? (
        <p
          id={`${id}-description`}
          className={error ? "text-sm text-red-600 font-medium" : "text-sm text-[var(--muted-foreground)]"}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
