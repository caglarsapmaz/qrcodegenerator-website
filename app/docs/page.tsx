"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/store";

const CONTENT_TYPE_KEYS = [
  ["url", "docsCtUrl"],
  ["text", "docsCtText"],
  ["wifi", "docsCtWifi"],
  ["email", "docsCtEmail"],
  ["phone", "docsCtPhone"],
  ["sms", "docsCtSms"],
  ["contact", "docsCtContact"],
  ["location", "docsCtLocation"],
] as const;

export default function DocsPage() {
  const t = useI18n();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-fg">{t.docsTitle}</h1>
        <p className="mt-2 text-fg-secondary">{t.docsSubtitle}</p>

        <Card className="mt-8 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-fg">{t.docsGettingStarted}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg-secondary">
            <li>{t.docsStep1}</li>
            <li>{t.docsStep2}</li>
            <li>{t.docsStep3}</li>
            <li>{t.docsStep4}</li>
          </ol>
        </Card>

        <Card className="mt-6 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-fg">{t.docsContentTypes}</h2>
          <dl className="mt-3 divide-y divide-line">
            {CONTENT_TYPE_KEYS.map(([type, descriptionKey]) => (
              <div key={type} className="flex items-baseline gap-4 py-3">
                <dt className="w-20 shrink-0 text-sm font-medium text-fg">{t.types[type]}</dt>
                <dd className="text-sm leading-relaxed text-fg-secondary">{t[descriptionKey]}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="mt-6 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-fg">{t.docsCustomization}</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{t.docsCustomBody}</p>
        </Card>

        <Card className="mt-6 scroll-mt-24 p-6 sm:p-8" id="privacy">
          <h2 className="text-lg font-semibold text-fg">{t.docsPrivacy}</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{t.docsPrivacyBody}</p>
        </Card>
      </main>
      <Footer />
    </>
  );
}
