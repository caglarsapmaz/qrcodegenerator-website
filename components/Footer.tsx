"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { useI18n } from "@/lib/i18n/store";
import { APP_NAME, APP_SLOGAN, CREATOR, GITHUB_URL } from "@/lib/constants";
import { FRAME } from "@/lib/layout";
import { cn } from "@/lib/utils";

const linkClass = "text-fg-secondary transition-colors hover:text-fg";

export function Footer() {
  const t = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className={cn(FRAME, "grid grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center bg-fg text-bg">
              <QrCode className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-fg">{APP_NAME}</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-fg-secondary">
            <span className="text-fg">{APP_SLOGAN}</span> {t.footDesc}
          </p>
        </div>
        <nav
          aria-label={t.navFeatures}
          className="flex flex-wrap items-start gap-x-8 gap-y-3 text-[13px] md:justify-end"
        >
          <Link href="/#features" className={linkClass}>
            {t.footFeatures}
          </Link>
          <Link href="/docs" className={linkClass}>
            {t.footDocs}
          </Link>
          <Link href="/docs#privacy" className={linkClass}>
            {t.footPrivacy}
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={cn(linkClass, "inline-flex items-center gap-1.5")}>
            <GitHubIcon className="h-3.5 w-3.5" />
            {t.footGitHub}
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <div
          className={cn(
            FRAME,
            "flex flex-col gap-2 px-4 py-4 font-mono text-[11px] text-fg-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
          )}
        >
          <p>{t.footRights(year)}</p>
          <p className="hidden md:block">{t.footPrivacyLine}</p>
          <p className="flex items-center gap-2">
            {t.footMadeBy(CREATOR.name)}
            <a
              href={CREATOR.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub — ${CREATOR.name}`}
              className={linkClass}
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={CREATOR.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn — ${CREATOR.name}`}
              className={linkClass}
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
