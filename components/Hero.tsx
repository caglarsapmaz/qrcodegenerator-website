"use client";

import { QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/store";

export function Hero() {
  const t = useI18n();

  return (
    <section className="px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-fg-secondary">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {t.heroBadge}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">
          {t.heroTitleStart}
          <span className="bg-gradient-to-r from-accent to-accent-blue bg-clip-text text-transparent">
            {t.heroTitleAccent}
          </span>
          {t.heroTitleEnd}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-fg-secondary sm:text-lg">
          {t.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#generator"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-blue px-7 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)] transition-all duration-150 hover:brightness-110 active:brightness-95"
          >
            <QrCode className="h-4 w-4" aria-hidden="true" />
            {t.heroCta}
          </a>
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-fg-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {t.heroPrivacyNote}
        </p>
      </div>
    </section>
  );
}
