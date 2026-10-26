"use client";

import { SlidersHorizontal, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/store";
import { FRAME } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function FeatureCards() {
  const t = useI18n();

  const features = [
    { icon: Zap, title: t.featFast, description: t.featFastDesc },
    { icon: SlidersHorizontal, title: t.featCustomizable, description: t.featCustomizableDesc },
    { icon: ShieldCheck, title: t.featPrivate, description: t.featPrivateDesc },
    { icon: Sparkles, title: t.featFree, description: t.featFreeDesc },
  ];

  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-12 border-b border-line">
      <div className={cn(FRAME, "border-b border-line px-4 py-10 sm:px-6")}>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">05</p>
        <h2
          id="features-heading"
          className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-fg"
        >
          {t.featHeading}
        </h2>
      </div>
      <div className={cn(FRAME, "grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4")}>
        {features.map(({ icon: Icon, title, description }, index) => (
          <div key={title} className="bg-bg px-4 py-8 sm:px-6">
            <div className="flex items-center justify-between">
              <Icon className="h-4 w-4 text-fg" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-mono text-[10px] text-fg-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-[13px] font-medium text-fg">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
