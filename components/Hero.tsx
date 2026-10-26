"use client";

import { useI18n } from "@/lib/i18n/store";
import { FRAME, SPLIT } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useI18n();

  return (
    <section className="border-b border-line">
      <div className={cn(FRAME, SPLIT)}>
        <div className="px-4 pb-8 pt-10 sm:px-6 lg:border-r lg:border-line lg:pb-10 lg:pt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
            {t.heroBadge}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-4xl">
            {t.heroTitleStart}
            <span className="text-fg-muted">{t.heroTitleAccent}</span>
            {t.heroTitleEnd}
          </h1>
        </div>

        <div className="flex flex-col justify-end gap-4 border-t border-line px-4 py-6 sm:px-6 lg:border-t-0 lg:py-10">
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg-secondary">
            {t.heroSubtitle}
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">
            <span className="h-1.5 w-1.5 bg-fg-muted" aria-hidden="true" />
            {t.heroPrivacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
