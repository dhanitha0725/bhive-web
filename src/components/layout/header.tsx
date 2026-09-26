"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { audiencePaths, primaryNavigation } from "@/config/site";
import { trackEvent } from "@/analytics/events";
import { BrandMark } from "./brand-mark";
import { LinkButton } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Container } from "@/components/ui/container";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton href="/contact">Start a Conversation</LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[var(--border)] text-[var(--foreground)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open navigation</span>
          <span aria-hidden="true" className="text-xl">☰</span>
        </button>
      </Container>

      <Drawer open={open} onClose={close} title="Navigate">
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid gap-1">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-md px-3 py-3 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              {item.label}
            </Link>
          ))}

          <div className="my-3 border-t border-[var(--border)]" />

          {audiencePaths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                trackEvent("audience_path_selected", {
                  placement: "mobile-navigation",
                  audience: item.audience,
                });
                close();
              }}
              className="rounded-md px-3 py-3 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              {item.label}
            </Link>
          ))}

          <LinkButton href="/contact" onClick={close} className="mt-4 w-full">
            Start a Conversation
          </LinkButton>
        </nav>
      </Drawer>
    </header>
  );
}
