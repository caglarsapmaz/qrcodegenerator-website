import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { THEME_SCRIPT } from "@/lib/theme-script";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Default for resolving OG image URLs — update if you deploy to a custom domain.
const SITE_URL = "https://zyqra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zyqra — Ücretsiz QR Kod Oluşturucu",
    template: "%s — Zyqra",
  },
  description:
    "QR kodlarını anında oluşturun, özelleştirin ve indirin. Ücretsiz, hızlı ve gizli — her şey tarayıcınızda çalışır.",
  applicationName: "Zyqra",
  keywords: [
    "QR kod oluşturucu",
    "ücretsiz QR kod",
    "QR kod",
    "Wi-Fi QR kodu",
    "vCard QR kodu",
    "özelleştirilebilir QR kod",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Zyqra — Ücretsiz QR Kod Oluşturucu",
    description:
      "QR kodlarını anında oluşturun, özelleştirin ve indirin. Ücretsiz, reklamsız ve gizli.",
    type: "website",
    siteName: "Zyqra",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyqra — Ücretsiz QR Kod Oluşturucu",
    description:
      "QR kodlarını anında oluşturun, özelleştirin ve indirin. Ücretsiz, reklamsız ve gizli.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
