"use client";

import { useState, type RefObject } from "react";
import type QRCodeStyling from "qr-code-styling";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useI18n } from "@/lib/i18n/store";

type Extension = "png" | "svg" | "webp";

const MIME_TYPES: Record<Extension, string> = {
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Give the browser time to start the download before revoking the URL.
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function DownloadButtons({
  qrRef,
  disabled,
}: {
  qrRef: RefObject<QRCodeStyling | null>;
  disabled: boolean;
}) {
  const t = useI18n();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<Extension | null>(null);

  async function handleDownload(extension: Extension) {
    const qr = qrRef.current;
    if (!qr || disabled) return;
    setBusy(extension);
    try {
      const raw = await qr.getRawData(extension);
      if (!raw) throw new Error("No image data");
      const blob =
        typeof Blob !== "undefined" && raw instanceof Blob
          ? raw
          : new Blob([raw as unknown as BlobPart], { type: MIME_TYPES[extension] });
      triggerDownload(blob, `qr-code.${extension}`);
      toast(t.dlSuccess(extension.toUpperCase()));
    } catch {
      toast(t.toastDownloadFailed, "error");
    } finally {
      setBusy(null);
    }
  }

  async function handleCopy() {
    const qr = qrRef.current;
    if (!qr || disabled) return;
    try {
      const raw = await qr.getRawData("png");
      if (!raw) {
        toast(t.toastNoImage, "error");
        return;
      }
      if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) {
        toast(t.toastClipboardUnavailable, "error");
        return;
      }
      const blob =
        typeof Blob !== "undefined" && raw instanceof Blob
          ? raw
          : new Blob([raw as unknown as BlobPart], { type: "image/png" });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      toast(t.dlCopied);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(t.toastCopyFailed, "error");
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          variant="primary"
          onClick={() => void handleDownload("png")}
          disabled={disabled || busy !== null}
          aria-label={t.dlPngAria}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {busy === "png" ? t.dlDownloading : t.dlPng}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => void handleDownload("svg")}
            disabled={disabled || busy !== null}
            aria-label={t.dlSvgAria}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t.dlSvg}
          </Button>
          <Button
            onClick={() => void handleDownload("webp")}
            disabled={disabled || busy !== null}
            aria-label={t.dlWebpAria}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t.dlWebp}
          </Button>
        </div>
        <Button
          variant="secondary"
          onClick={() => void handleCopy()}
          disabled={disabled || busy !== null}
          className="sm:col-span-2"
          aria-label={t.dlCopyAria}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {t.dlCopied}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              {t.dlCopy}
            </>
          )}
        </Button>
      </div>
      <p className="mt-2 text-center text-[11px] text-fg-muted">{t.dlFileNote}</p>
    </div>
  );
}
