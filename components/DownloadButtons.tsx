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
      <Button
        variant="primary"
        size="lg"
        onClick={() => void handleDownload("png")}
        disabled={disabled || busy !== null}
        aria-label={t.dlPngAria}
        className="w-full"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {busy === "png" ? t.dlDownloading : t.dlPng}
      </Button>
      <div className="mt-2 grid grid-cols-3 gap-px border border-line-strong bg-line-strong">
        <Button
          onClick={() => void handleDownload("svg")}
          disabled={disabled || busy !== null}
          aria-label={t.dlSvgAria}
          className="border-0 font-mono text-xs"
        >
          {t.dlSvg}
        </Button>
        <Button
          onClick={() => void handleDownload("webp")}
          disabled={disabled || busy !== null}
          aria-label={t.dlWebpAria}
          className="border-0 font-mono text-xs"
        >
          {t.dlWebp}
        </Button>
        <Button
          onClick={() => void handleCopy()}
          disabled={disabled || busy !== null}
          aria-label={t.dlCopyAria}
          className="border-0 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {t.dlCopied}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {t.dlCopy}
            </>
          )}
        </Button>
      </div>
      <p className="mt-2 font-mono text-[10px] text-fg-muted">{t.dlFileNote}</p>
    </div>
  );
}
