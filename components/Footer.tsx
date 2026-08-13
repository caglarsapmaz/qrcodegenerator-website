"use client";

import Link from "next/link";
import { Heart, QrCode } from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { useI18n } from "@/lib/i18n/store";
import { APP_NAME, APP_SLOGAN, CREATOR, GITHUB_URL } from "@/lib/constants";

export function Footer() {
  const t = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-blue text-white">
                <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-fg">{APP_NAME}</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-fg-secondary">
              <span className="font-medium text-fg">{APP_SLOGAN}</span> · {t.footDesc}
            </p>
          </div>
          <nav aria-label={t.navFeatures} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/#features" className="font-medium text-fg-secondary transition-colors hover:text-fg">
              {t.footFeatures}
            </Link>
            <Link href="/docs" className="font-medium text-fg-secondary transition-colors hover:text-fg">
              {t.footDocs}
            </Link>
            <Link href="/docs#privacy" className="font-medium text-fg-secondary transition-colors hover:text-fg">
              {t.footPrivacy}
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-fg-secondary transition-colors hover:text-fg"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              {t.footGitHub}
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-1.5 border-t border-line pt-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footRights(year)}</p>
          <p className="flex items-center gap-1.5">
            {t.footMadeBy(CREATOR.name)}
            <Heart className="h-3 w-3 text-accent" aria-hidden="true" />
            <a
              href={CREATOR.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub — ${CREATOR.name}`}
              className="text-fg-secondary transition-colors hover:text-fg"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={CREATOR.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn — ${CREATOR.name}`}
              className="text-fg-secondary transition-colors hover:text-fg"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
        <p className="mt-3 text-xs text-fg-muted">{t.footPrivacyLine}</p>
      </div>
    </footer>
  );
}
