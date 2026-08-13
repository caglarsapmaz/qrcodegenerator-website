"use client";

import { Clock, Trash2 } from "lucide-react";
import type { HistoryEntry } from "@/types/qr";
import { getTypeIcon } from "@/lib/typeMeta";
import { useI18n } from "@/lib/i18n/store";
import { relativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function History({
  entries,
  onRestore,
  onClear,
}: {
  entries: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
  onClear: () => void;
}) {
  const t = useI18n();

  return (
    <section aria-labelledby="history-heading" className="mt-10">
      <div className="flex items-center justify-between gap-3">
        <h2 id="history-heading" className="flex items-center gap-2 text-base font-semibold text-fg">
          <Clock className="h-4 w-4 text-fg-muted" aria-hidden="true" />
          {t.histHeading}
        </h2>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            aria-label={t.histClearAria}
            className="text-red-500 hover:bg-red-500/10 hover:text-red-400 dark:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            {t.histClear}
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <Card className="mt-3 px-5 py-6 text-center">
          <p className="text-sm text-fg-muted">{t.histEmpty}</p>
        </Card>
      ) : (
        <Card className="mt-3 divide-y divide-line overflow-hidden">
          {entries.map((entry) => {
            const Icon = getTypeIcon(entry.type);
            const typeLabel = t.types[entry.type];
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onRestore(entry)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-fg/5 sm:px-5"
                aria-label={t.histRestoreAria(typeLabel, entry.label)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-secondary ring-1 ring-line">
                  <Icon className="h-3.5 w-3.5 text-fg-secondary" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-fg">{entry.label}</span>
                  <span className="block text-xs text-fg-muted">
                    {t.histEntryType(typeLabel)}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-fg-muted">
                  {relativeTime(entry.createdAt)}
                </span>
              </button>
            );
          })}
        </Card>
      )}
    </section>
  );
}
