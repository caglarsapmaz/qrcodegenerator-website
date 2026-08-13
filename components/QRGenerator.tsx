"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { ContentState, ContentType, HistoryEntry, QRSettings } from "@/types/qr";
import {
  DEFAULT_SETTINGS,
  HISTORY_DEBOUNCE_MS,
  MAX_HISTORY_ENTRIES,
  PERSIST_DEBOUNCE_MS,
} from "@/lib/constants";
import { historyLabel } from "@/lib/qr/payloads";
import { getPayload } from "@/lib/validation/validate";
import { useI18n } from "@/lib/i18n/store";
import {
  loadHistory,
  loadSettings,
  saveHistory,
  saveSettings,
} from "@/lib/storage/storage";
import { uid } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Card } from "@/components/ui/Card";
import { ContentTypeSelector } from "@/components/ContentTypeSelector";
import { ContentForm } from "@/components/ContentForm";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { QRPreview } from "@/components/QRPreview";
import { History } from "@/components/History";

export function QRGenerator() {
  const t = useI18n();
  const { toast } = useToast();
  const [settings, setSettings] = useState<QRSettings>(() => loadSettings());
  const [logo, setLogo] = useState<string | null>(null);
  const [entries, setEntries] = useState<HistoryEntry[]>(() => loadHistory());

  // Persist settings (debounced) so reloads restore the last session.
  useEffect(() => {
    const timer = window.setTimeout(() => saveSettings(settings), PERSIST_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [settings]);

  const status = useMemo(
    () => getPayload(settings.type, settings.content, t),
    [settings.type, settings.content, t],
  );

  const errors = useMemo(
    () =>
      status.status === "error" && status.field
        ? ({ [status.field]: status.message } as Partial<Record<keyof ContentState, string>>)
        : {},
    [status],
  );

  // Add to local history (debounced + deduped) whenever a new QR is generated.
  const lastPayloadRef = useRef<string | null>(null);
  useEffect(() => {
    if (status.status !== "ok") return;
    const timer = window.setTimeout(() => {
      if (lastPayloadRef.current === status.payload) return;
      lastPayloadRef.current = status.payload;
      const entry: HistoryEntry = {
        id: uid(),
        type: settings.type,
        content: { ...settings.content },
        label: historyLabel(settings.type, settings.content, t),
        createdAt: Date.now(),
      };
      setEntries((previous) => {
        const withoutDuplicate = previous.filter(
          (item) => !(item.type === entry.type && item.label === entry.label),
        );
        const next = [entry, ...withoutDuplicate].slice(0, MAX_HISTORY_ENTRIES);
        saveHistory(next);
        return next;
      });
    }, HISTORY_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [status, settings.type, settings.content, t]);

  const updateContent = useCallback((key: keyof ContentState, value: string | boolean) => {
    setSettings((current) => ({
      ...current,
      content: { ...current.content, [key]: value },
    }));
  }, []);

  const updateSettings = useCallback((patch: Partial<QRSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const changeType = useCallback((type: ContentType) => {
    setSettings((current) => ({ ...current, type }));
  }, []);

  const handleLogoChange = useCallback(
    (dataUrl: string | null) => {
      setLogo(dataUrl);
      if (dataUrl) {
        // A logo covers part of the QR code — raise error correction to keep it scannable.
        setSettings((current) => ({ ...current, errorCorrection: "H" }));
      }
    },
    [],
  );

  const handleReset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setLogo(null);
    toast(t.toastSettingsReset);
  }, [toast, t]);

  const handleRestore = useCallback(
    (entry: HistoryEntry) => {
      setSettings((current) => ({
        ...current,
        type: entry.type,
        content: { ...current.content, ...entry.content },
      }));
      toast(t.toastRestored);
    },
    [toast, t],
  );

  const handleClearHistory = useCallback(() => {
    setEntries([]);
    saveHistory([]);
    toast(t.toastHistoryCleared);
  }, [toast, t]);

  return (
    <section id="generator" aria-label={t.genHeading} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
          {/* Preview renders first in the DOM so it sits on top on mobile. */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <QRPreview settings={settings} status={status} logo={logo} />
            </div>
          </div>

          <div className="order-2 space-y-6 lg:order-1">
            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-fg">{t.genHeading}</h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-fg-muted transition-colors duration-150 hover:bg-fg/5 hover:text-fg"
                  aria-label={t.genResetAria}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.genReset}
                </button>
              </div>

              <div className="mt-5 space-y-6">
                <ContentTypeSelector value={settings.type} onChange={changeType} />
                <ContentForm
                  type={settings.type}
                  content={settings.content}
                  errors={errors}
                  onChange={updateContent}
                />
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <CustomizationPanel
                settings={settings}
                onChange={updateSettings}
                logo={logo}
                onLogoChange={handleLogoChange}
              />
            </Card>
          </div>
        </div>

        <History entries={entries} onRestore={handleRestore} onClear={handleClearHistory} />
      </div>
    </section>
  );
}
