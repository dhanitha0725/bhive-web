"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
export function Dialog({
  open,
  onClose,
  title,
  children,
  presentation = "modal",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  presentation?: "modal" | "drawer";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  const surface =
    presentation === "drawer"
      ? "m-0 ml-auto h-dvh max-h-none w-full max-w-md rounded-none border-y-0 border-r-0"
      : "m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border";
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      className={`${surface} bg-white p-0 text-navy-600 shadow-none backdrop:bg-navy-900/60`}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="dialog-title" className="heading-2 text-2xl">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-md text-2xl leading-none hover:bg-navy-50"
          >
            ×
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  );
}
