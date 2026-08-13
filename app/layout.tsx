import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { THEME_SCRIPT } from "@/lib/theme-script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
  themeColor: "#080808",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div
            className="absolute -top-40 right-[-12%] h-[480px] w-[480px] rounded-full blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, var(--glow-violet), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-18%] left-[-12%] h-[520px] w-[520px] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, var(--glow-blue), transparent 70%)",
            }}
          />
        </div>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
