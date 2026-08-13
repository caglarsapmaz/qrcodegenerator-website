"use client";

import { useEffect, useMemo, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { CircleAlert, QrCode, ShieldCheck } from "lucide-react";
import type { PayloadStatus, QRSettings } from "@/types/qr";
import { buildQROptions } from "@/lib/qr/options";
import { useI18n } from "@/lib/i18n/store";
import { Card } from "@/components/ui/Card";
import { DownloadButtons } from "@/components/DownloadButtons";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: PayloadStatus }) {
  const t = useI18n();
  if (status.status === "ok") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
        {t.prevReady}
      </span>
    );
  }
  if (status.status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400" aria-hidden="true" />
        {t.prevCheckInput}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-fg-muted" aria-hidden="true" />
      {t.prevAwaiting}
    </span>
  );
}

export function QRPreview({
  settings,
  status,
  logo,
}: {
  settings: QRSettings;
  status: PayloadStatus;
  logo: string | null;
}) {
  const t = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const latestOptionsRef = useRef<Options | null>(null);

  const options = useMemo(() => {
    if (status.status !== "ok") return null;
    return buildQROptions(settings, status.payload, logo);
  }, [status, settings, logo]);

  useEffect(() => {
    latestOptionsRef.current = options;
  }, [options]);

  // Create the QR instance once (module-level code touches no browser globals,
  // so this runs safely after mount).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = new QRCodeStyling({ type: "svg", width: 600, height: 600, data: "" });
    instance.append(container);
    qrRef.current = instance;
    const current = latestOptionsRef.current;
    if (current) instance.update(current);
    else container.innerHTML = "";

    return () => {
      qrRef.current = null;
      container.innerHTML = "";
    };
  }, []);

  // Keep the rendered QR in sync with the settings.
  useEffect(() => {
    const qr = qrRef.current;
    const container = containerRef.current;
    if (!qr || !container) return;
    if (options) {
      qr.update(options);
    } else {
      container.innerHTML = "";
    }
  }, [options]);

  const isReady = status.status === "ok";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2 className="text-sm font-semibold text-fg">{t.prevLivePreview}</h2>
        <StatusBadge status={status} />
      </div>

      <div className="p-5 sm:p-7">
        <div className="mx-auto w-full max-w-md">
          <div
            className={cn(
              "relative w-full rounded-2xl p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-1 sm:p-4",
              settings.background === "#ffffff" || settings.background.toLowerCase() === "#fff"
                ? "ring-[var(--qr-ring)]"
                : "ring-line",
            )}
            style={{ background: settings.background }}
          >
            <div
              ref={containerRef}
              className={cn("qr-svg w-full", !isReady && "hidden")}
              role="img"
              aria-label={t.prevQrAria}
            />
            {!isReady && (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-6 text-center">
                <QrCode className="h-8 w-8 text-zinc-400" aria-hidden="true" />
                {status.status === "error" ? (
                  <>
                    <p className="text-sm font-medium text-zinc-600">
                      <CircleAlert className="mr-1.5 inline h-4 w-4 text-red-400" aria-hidden="true" />
                      {status.message}
                    </p>
                    <p className="text-xs text-zinc-400">{t.prevErrorSubtitle}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-zinc-600">{t.prevEmptyTitle}</p>
                    <p className="text-xs text-zinc-400">{t.prevEmptySubtitle}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line px-5 py-5">
        <DownloadButtons qrRef={qrRef} disabled={!isReady} />
        <p className="mt-4 flex items-start gap-1.5 text-xs text-fg-muted">
          <ShieldCheck className="mt-px h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{t.prevPrivacy}</span>
        </p>
      </div>
    </Card>
  );
}
