"use client";

import { useRef, useState, type DragEvent } from "react";
import { FileImage, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Slider } from "@/components/ui/Input";
import { useI18n } from "@/lib/i18n/store";
import { ACCEPTED_LOGO_TYPES, MAX_LOGO_SIZE_BYTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ensureSvgSize(svg: string): string {
  if (/\bwidth=/.test(svg.slice(0, svg.indexOf(">") + 1)) && /\bheight=/.test(svg.slice(0, svg.indexOf(">") + 1))) {
    return svg;
  }
  const viewBox = svg.match(/viewBox=["']([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)["']/);
  const width = viewBox ? viewBox[3] : "512";
  const height = viewBox ? viewBox[4] : "512";
  return svg.replace(/<svg([^>]*)>/, (match, attrs: string) => {
    const additions = [
      /\bwidth=/.test(attrs) ? "" : ` width="${width}"`,
      /\bheight=/.test(attrs) ? "" : ` height="${height}"`,
    ].join("");
    return `<svg${attrs}${additions}>`;
  });
}

function imageLoads(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = src;
  });
}

async function fileToDataUrl(file: File): Promise<string> {
  if (file.type === "image/svg+xml") {
    const text = await file.text();
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ensureSvgSize(text))}`;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function LogoUploader({
  logo,
  logoSize,
  onLogoChange,
  onLogoSizeChange,
}: {
  logo: string | null;
  logoSize: number;
  onLogoChange: (dataUrl: string | null) => void;
  onLogoSizeChange: (size: number) => void;
}) {
  const t = useI18n();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined | null) {
    if (!file || busy) return;
    if (!ACCEPTED_LOGO_TYPES.includes(file.type as (typeof ACCEPTED_LOGO_TYPES)[number])) {
      toast(t.toastFileType, "error");
      return;
    }
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      toast(t.toastFileTooLarge, "error");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      await imageLoads(dataUrl);
      onLogoChange(dataUrl);
      toast(t.toastLogoAdded);
    } catch {
      toast(t.toastFileUnreadable, "error");
    } finally {
      setBusy(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDragOver(false);
    void handleFile(event.dataTransfer.files?.[0]);
  }

  if (logo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-xl border border-line bg-bg-secondary p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview */}
          <img
            src={logo}
            alt={t.custLogoAttached}
            className="h-14 w-14 shrink-0 rounded-lg border border-line bg-white object-contain p-1"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-fg">{t.custLogoAttached}</p>
            <p className="mt-0.5 text-xs text-fg-muted">{t.custLogoNote}</p>
          </div>
          <button
            type="button"
            onClick={() => onLogoChange(null)}
            aria-label={t.custRemoveLogoAria}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <Slider
          label={t.custLogoSize}
          value={logoSize}
          min={10}
          max={50}
          step={5}
          onChange={onLogoSizeChange}
          format={(value) => `${value}%`}
          hint={t.custLogoSizeHint}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-7 transition-colors duration-150",
          dragOver
            ? "border-accent bg-accent/10"
            : "border-line bg-bg-secondary hover:border-fg-muted/50",
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card-elevated ring-1 ring-line">
          <FileImage className="h-5 w-5 text-fg-secondary" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-fg">
          {busy ? t.custReadingImage : t.custUploadLogo}
        </span>
        <span className="text-xs text-fg-muted">{t.custDragDropHint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </>
  );
}
