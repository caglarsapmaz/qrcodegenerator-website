"use client";

import { SlidersHorizontal, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/store";
import { Card } from "@/components/ui/Card";

export function FeatureCards() {
  const t = useI18n();

  const features = [
    { icon: Zap, title: t.featFast, description: t.featFastDesc },
    { icon: SlidersHorizontal, title: t.featCustomizable, description: t.featCustomizableDesc },
    { icon: ShieldCheck, title: t.featPrivate, description: t.featPrivateDesc },
    { icon: Sparkles, title: t.featFree, description: t.featFreeDesc },
  ];

  return (
    <section id="features" aria-labelledby="features-heading" className="mt-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2
          id="features-heading"
          className="text-balance text-center text-2xl font-bold tracking-tight text-fg sm:text-3xl"
        >
          {t.featHeading}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-fg-muted/30 hover:shadow-[var(--card-shadow)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-blue/15 ring-1 ring-line">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-fg">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
