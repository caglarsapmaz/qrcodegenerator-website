"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useI18n, useLanguage, setLanguage, initLanguage } from "@/lib/i18n/store";
import { EnglishFlag, TurkishFlag } from "@/components/ui/Flags";

const OPTIONS = [
  { value: "tr" as const, label: "Türkçe", Flag: TurkishFlag },
  { value: "en" as const, label: "English", Flag: EnglishFlag },
];

export function LanguageToggle() {
  const t = useI18n();
  const language = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLanguage();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const current = OPTIONS.find((option) => option.value === language) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t.ariaChangeLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary transition-colors duration-150 hover:bg-fg/5 hover:text-fg"
      >
        <current.Flag className="h-4 w-6 rounded-[2px] ring-1 ring-line" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t.ariaChangeLanguage}
          className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-line bg-card-elevated py-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
        >
          {OPTIONS.map(({ value, label, Flag }) => {
            const selected = value === language;
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setLanguage(value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-fg-secondary transition-colors duration-150 hover:bg-fg/5 hover:text-fg"
              >
                <Flag className="h-3.5 w-5 rounded-[2px] ring-1 ring-line" />
                <span className="flex-1 text-left">{label}</span>
                {selected && <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
