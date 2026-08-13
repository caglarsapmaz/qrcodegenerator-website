# Zyqra — Ücretsiz QR Kod Oluşturucu

> **Create. Connect. Scan.**

A premium, dark-themed QR code generator built with Next.js. Generate, customize and
download QR codes **entirely in your browser** — no backend, no paid APIs, no accounts,
**no ads**.

![Stack](https://img.shields.io/badge/Next.js%2016-TypeScript-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Türkçe + English** — flag-icon language switcher (varsayılan Türkçe)
- **8 content types** — URL, Text, Wi-Fi, Email, Phone, SMS, Contact (vCard 3.0) and Location (geo URI)
- **Live preview** — the QR code renders instantly as you type, no generate button
- **Full customization** — foreground/background colors, square/rounded/dots pattern, square/rounded/circle eye styles, quiet-zone margin, error correction (L/M/Q/H)
- **Logo upload** — PNG, JPG or SVG (max 5 MB) with size slider; error correction auto-raises to High to keep the code scannable
- **Downloads** — PNG, SVG and WebP, generated client-side with Blob URLs
- **Copy to clipboard** — copy the QR image as a PNG
- **Local history** — the last 8 QR codes, stored only in `localStorage` (restorable, clearable)
- **Dark/light themes** — dark by default, persisted to `localStorage`, no flash on load
- **Privacy first, free & ad-free** — your data never leaves the browser
- Responsive, keyboard-accessible, SEO + Open Graph metadata

## Tech stack

| Layer     | Choice                                             |
| --------- | -------------------------------------------------- |
| Framework | Next.js 16 (App Router, static output)             |
| Language  | TypeScript (strict)                                |
| Styling   | Tailwind CSS v4                                    |
| Icons     | lucide-react                                       |
| i18n      | Lightweight custom store (useSyncExternalStore), TR + EN dictionaries |
| QR engine | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) v1.9 (MIT) — renders QR codes client-side as SVG/canvas with full styling support |

Everything runs client-side; the app is fully static and deploys on Vercel's free plan.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev        # http://localhost:3000

# 3. Lint + typecheck + verify payloads & QR rendering
npm run lint
npm run verify

# 4. Production build
npm run build
npm start
```

> `npm run verify` runs unit-style checks for URL/Wi-Fi/Email/vCard/geo payloads and a
> jsdom-based test that actually renders QR codes through `qr-code-styling`.

## Project structure

```
app/
├── layout.tsx            # Metadata, fonts, theme bootstrap script, ambient background
├── page.tsx              # Home page composition
├── docs/page.tsx         # Docs + privacy page (i18n)
├── globals.css           # Design tokens, dark/light themes, base styles
├── icon.svg              # Favicon
└── opengraph-image.tsx   # Auto-generated social share image
components/
├── Header.tsx, Hero.tsx, Footer.tsx, LanguageToggle.tsx, ThemeToggle.tsx
├── QRGenerator.tsx       # State, validation, history, persistence
├── ContentTypeSelector.tsx, ContentForm.tsx
├── CustomizationPanel.tsx, LogoUploader.tsx
├── QRPreview.tsx         # Live QR rendering (qr-code-styling)
├── DownloadButtons.tsx   # PNG/SVG/WebP downloads + copy
├── History.tsx, FeatureCards.tsx
└── ui/                   # Button, Input, Card, Toast, Flags, …
lib/
├── i18n/                 # TR + EN string dictionaries + language store
├── qr/                   # options mapping + payload builders (Wi-Fi, vCard, geo, …)
├── validation/           # URL/email/phone/coordinate validation (i18n errors)
├── storage/              # localStorage (theme, language, settings, history)
└── constants.ts, utils.ts, typeMeta.tsx
types/
└── qr.ts                 # Shared types
scripts/                  # verify.ts, verify-qr.ts (offline checks)
```

## Deploying to Vercel (free)

The project has no server-specific code, no environment variables and no database.

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Zyqra"
   git branch -M main
   git remote add origin https://github.com/caglarsapmaz/<repo>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repository and click **Deploy**.
   Vercel auto-detects Next.js — no configuration needed.
3. Your app is live at `https://<project>.vercel.app`.

## Privacy

QR codes are generated locally in the browser. Theme preference, language, last settings
and recent QR history are kept only in `localStorage` and are never sent anywhere.

## License

MIT — free for personal and commercial use.
