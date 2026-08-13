"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, QrCode, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GitHubIcon } from "@/components/GitHubIcon";
import { useI18n } from "@/lib/i18n/store";
import { APP_NAME, GITHUB_URL } from "@/lib/constants";

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
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-fg-secondary transition-colors duration-150 hover:bg-fg/5 hover:text-fg";
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
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${APP_NAME} ana sayfa`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-accent-blue text-white shadow-[0_4px_16px_-4px_rgba(124,58,237,0.6)]">
            <QrCode className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-fg">
            {APP_NAME}
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Ana menü">
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href} label={link.label} />
            ))}
            <NavItem
              href={GITHUB_URL}
              label={t.navGitHub}
              external
              icon={<GitHubIcon className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.ariaCloseMenu : t.ariaOpenMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-fg/5 hover:text-fg md:hidden"
            >
              {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobil menü"
          className="flex flex-col gap-1 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-xl md:hidden"
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
