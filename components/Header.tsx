"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, QrCode, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GitHubIcon } from "@/components/GitHubIcon";
import { useI18n } from "@/lib/i18n/store";
import { APP_NAME, GITHUB_URL } from "@/lib/constants";
import { FRAME } from "@/lib/layout";
import { cn } from "@/lib/utils";

function NavItem({
  href,
  label,
  onNavigate,
  external,
  icon,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  external?: boolean;
  icon?: React.ReactNode;
}) {
  const className =
    "flex h-12 items-center gap-2 px-3 text-[13px] text-fg-secondary transition-colors duration-150 hover:bg-fg/[0.04] hover:text-fg md:h-auto md:py-1.5";
  if (external) {
    return (
      <a href={href} onClick={onNavigate} target="_blank" rel="noreferrer" className={className}>
        {icon}
        {label}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onNavigate} className={className}>
      {icon}
      {label}
    </Link>
  );
}

export function Header() {
  const t = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  // Absolute paths (with hashes where needed) so these work from every page.
  const navLinks = [
    { label: t.navFeatures, href: "/#features" },
    { label: t.navDocs, href: "/docs" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className={cn(FRAME, "flex h-12 items-center justify-between px-4 sm:px-6")}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${APP_NAME} ana sayfa`}>
            <span className="flex h-6 w-6 items-center justify-center bg-fg text-bg">
              <QrCode className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-fg">{APP_NAME}</span>
          </Link>
          <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted sm:block">
            QR / Generator
          </span>
        </div>

        <nav className="flex items-center" aria-label="Ana menü">
          <div className="hidden items-center md:flex">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href} label={link.label} />
            ))}
            <NavItem
              href={GITHUB_URL}
              label={t.navGitHub}
              external
              icon={<GitHubIcon className="h-3.5 w-3.5" />}
            />
            <span className="mx-2 h-4 w-px bg-line-strong" aria-hidden="true" />
          </div>

          <div className="flex items-center">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.ariaCloseMenu : t.ariaOpenMenu}
              className="flex h-8 w-8 items-center justify-center text-fg-secondary transition-colors hover:bg-fg/[0.05] hover:text-fg md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobil menü"
          className="flex flex-col divide-y divide-line border-t border-line bg-bg md:hidden"
        >
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
          <NavItem
            href={GITHUB_URL}
            label={t.navGitHub}
            external
            icon={<GitHubIcon className="h-3.5 w-3.5" />}
            onNavigate={() => setMenuOpen(false)}
          />
        </nav>
      )}
    </header>
  );
}
