"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./theme-provider";

export function ThemeSelector({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const { theme, setTheme, themes, activeThemeMeta } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-xs transition-colors hover:bg-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Switch Design System"
      >
        <span
          className="size-3.5 rounded-full border border-black/10 shadow-xs"
          style={{ backgroundColor: activeThemeMeta.primaryColor }}
          aria-hidden="true"
        />
        <span className="font-medium">
          {compact ? activeThemeMeta.brand : `Theme: ${activeThemeMeta.name}`}
        </span>
        <svg
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-xl border border-[var(--border)] bg-[var(--background)] p-2 shadow-xl ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <div className="border-b border-[var(--border)] px-3 py-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Select Design System
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)]">
              Changes colors, typography, radii & geometry globally
            </p>
          </div>

          <div className="max-h-84 overflow-y-auto py-1">
            {themes.map((item) => {
              const isSelected = item.id === theme;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTheme(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                    isSelected
                      ? "bg-[var(--muted)] text-[var(--foreground)] font-semibold ring-1 ring-[var(--border)]"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)]/60"
                  }`}
                >
                  <div className="mt-1 flex flex-col items-center gap-1">
                    <div className="flex -space-x-1">
                      <span
                        className="size-3.5 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: item.primaryColor }}
                      />
                      <span
                        className="size-3.5 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[var(--foreground)]">
                        {item.name}
                      </span>
                      {isSelected && (
                        <span className="rounded bg-[var(--btn-primary-bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--btn-primary-text)]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-1 text-[11px] text-[var(--muted-foreground)]">
                      {item.tagline}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[var(--muted-foreground)]">
                      <span className="rounded bg-black/5 px-1 py-0.2 dark:bg-white/10 font-mono">
                        {item.fontDisplay.split("/")[0]}
                      </span>
                      <span>·</span>
                      <span>{item.radiusStyle.split("/")[0]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function FloatingThemeDock() {
  const { theme, setTheme, themes, activeThemeMeta } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside aria-label="Design System Theme Switcher" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {expanded && (
        <div className="mb-3 w-84 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-2xl backdrop-blur-lg animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Design Systems Preview
              </h3>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Live multi-brand system switcher
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="rounded-md p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              aria-label="Close theme dock"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 grid max-h-80 gap-1.5 overflow-y-auto pr-1">
            {themes.map((item) => {
              const isSelected = item.id === theme;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-[var(--ring)] bg-[var(--muted)] shadow-xs"
                      : "border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]/50"
                  }`}
                >
                  <div
                    className="size-8 shrink-0 rounded-lg border border-black/10 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: item.surfaceColor }}
                  >
                    <div className="flex -space-x-1">
                      <span
                        className="size-3 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: item.primaryColor }}
                      />
                      <span
                        className="size-3 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--foreground)]">
                        {item.name}
                      </span>
                      {isSelected ? (
                        <span className="size-2 rounded-full bg-[var(--ring)]" />
                      ) : null}
                    </div>
                    <p className="line-clamp-1 text-[11px] text-[var(--muted-foreground)]">
                      {item.tagline}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)] opacity-80">
                      Font: {item.fontDisplay.split("/")[0]} · {item.radiusStyle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg bg-[var(--muted)] p-2.5 text-[11px] text-[var(--muted-foreground)]">
            <span className="font-semibold text-[var(--foreground)]">Active: </span>
            {activeThemeMeta.description}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-xs font-semibold text-[var(--foreground)] shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        aria-label="Toggle Design System Switcher"
      >
        <div className="flex -space-x-1">
          <span
            className="size-3.5 rounded-full border border-white shadow-xs"
            style={{ backgroundColor: activeThemeMeta.primaryColor }}
          />
          <span
            className="size-3.5 rounded-full border border-white shadow-xs"
            style={{ backgroundColor: activeThemeMeta.accentColor }}
          />
        </div>
        <span className="font-bold">{activeThemeMeta.brand} System</span>
        <span className="rounded-full bg-[var(--muted)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted-foreground)]">
          {themes.findIndex((t) => t.id === theme) + 1}/{themes.length}
        </span>
      </button>
    </aside>
  );
}
