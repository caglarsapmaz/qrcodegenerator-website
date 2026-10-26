"use client";

import { useEffect, useMemo, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { CircleAlert, QrCode, ShieldCheck } from "lucide-react";
import type { PayloadStatus, QRSettings } from "@/types/qr";
import { buildQROptions } from "@/lib/qr/options";
import { useI18n } from "@/lib/i18n/store";
import { DownloadButtons } from "@/components/DownloadButtons";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: PayloadStatus }) {
  const t = useI18n();
  const [label, dot, text] =
    status.status === "ok"
      ? [t.prevReady, "bg-accent", "text-fg"]
      : status.status === "error"
        ? [t.prevCheckInput, "bg-red-500", "text-red-500 dark:text-red-400"]
        : [t.prevAwaiting, "bg-fg-muted", "text-fg-muted"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]",
        text,
      )}
    >
      <span className={cn("h-1.5 w-1.5", dot)} aria-hidden="true" />
      {label}
    </span>
  );
}

// Registration marks at the four corners of the drawing frame.
const CORNERS = [
  "-left-2 -top-2 border-l border-t",
  "-right-2 -top-2 border-r border-t",
  "-bottom-2 -left-2 border-b border-l",
  "-bottom-2 -right-2 border-b border-r",
];

function Dimension({ label, vertical }: { label: string; vertical?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-[10px] tabular-nums tracking-[0.08em] text-fg-muted",
        vertical ? "h-full flex-col" : "w-full",
      )}
      aria-hidden="true"
    >
      <span className={cn("bg-fg-muted", vertical ? "h-px w-2" : "h-2 w-px")} />
      <span className={cn("flex-1 bg-line-strong", vertical ? "w-px" : "h-px")} />
      <span className={cn(vertical && "[writing-mode:vertical-rl]")}>{label}</span>
      <span className={cn("flex-1 bg-line-strong", vertical ? "w-px" : "h-px")} />
      <span className={cn("bg-fg-muted", vertical ? "h-px w-2" : "h-2 w-px")} />
    </div>
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

  const patternLabel = { square: t.custSquare, rounded: t.custRounded, dots: t.custDots }[
    settings.pattern
  ];
  const eyeLabel = { square: t.custSquare, rounded: t.custRounded, circle: t.custCircle }[
    settings.eyeStyle
  ];

  const specs: Array<[string, React.ReactNode]> = [
    [t.genContentTypeLabel, t.types[settings.type]],
    [t.custErrorCorrection, settings.errorCorrection],
    [t.custMargin, `${settings.margin}px`],
    [t.custPattern, patternLabel],
    [t.custEyeStyle, eyeLabel],
    [
      t.custForeground,
      <span key="fg" className="inline-flex items-center gap-1.5 uppercase">
        <span className="h-2.5 w-2.5 border border-line-strong" style={{ background: settings.foreground }} />
        {settings.foreground}
      </span>,
    ],
  ];

  return (
    <div className="flex flex-col">
      <div className="flex h-12 items-center justify-between gap-3 border-b border-line bg-bg-secondary px-4 sm:px-6">
        <h2 className="flex items-center gap-3 text-[13px] font-medium text-fg">
          <span className="font-mono text-[11px] text-fg-muted">03</span>
          {t.prevLivePreview}
        </h2>
        <StatusBadge status={status} />
      </div>

      <div className="blueprint flex justify-center px-6 py-8">
        <div className="qr-stage">
          <div className="mb-3 pr-7">
            <Dimension label="600 PX" />
          </div>
          <div className="flex gap-3">
            <div className="relative min-w-0 flex-1">
              {CORNERS.map((position) => (
                <span
                  key={position}
                  className={cn("absolute h-3 w-3 border-fg-muted", position)}
                  aria-hidden="true"
                />
              ))}
              <div
                className="relative w-full border border-[var(--qr-ring)] p-3 sm:p-4"
                style={{ background: settings.background }}
              >
                <div
                  ref={containerRef}
                  className={cn("qr-svg w-full", !isReady && "hidden")}
                  role="img"
                  aria-label={t.prevQrAria}
                />
                {!isReady && (
                  <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 border border-dashed border-zinc-300 px-6 text-center">
                    <QrCode className="h-7 w-7 text-zinc-400" strokeWidth={1.5} aria-hidden="true" />
                    {status.status === "error" ? (
                      <>
                        <p className="text-[13px] font-medium text-zinc-700">
                          <CircleAlert className="mr-1.5 inline h-3.5 w-3.5 text-red-500" aria-hidden="true" />
                          {status.message}
                        </p>
                        <p className="text-xs text-zinc-500">{t.prevErrorSubtitle}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-[13px] font-medium text-zinc-700">{t.prevEmptyTitle}</p>
                        <p className="text-xs text-zinc-500">{t.prevEmptySubtitle}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="w-4 shrink-0">
              <Dimension label="600 PX" vertical />
            </div>
          </div>
          <p className="mt-4 flex justify-between pr-7 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
            <span>FIG. 01</span>
            <span>
              {t.types[settings.type]} · ECC {settings.errorCorrection}
            </span>
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3">
        {specs.map(([label, value]) => (
          <div key={label} className="min-w-0 bg-bg px-4 py-3 sm:px-6">
            <dt className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
              {label}
            </dt>
            <dd className="mt-1 truncate font-mono text-xs text-fg">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="px-4 py-5 sm:px-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
          {t.prevExport}
        </p>
        <DownloadButtons qrRef={qrRef} disabled={!isReady} />
        <p className="mt-4 flex items-center gap-2 text-xs text-fg-muted">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{t.prevPrivacy}</span>
        </p>
      </div>
    </div>
  );
}
