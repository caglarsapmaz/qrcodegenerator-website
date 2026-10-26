"use client";

import { Trash2 } from "lucide-react";
import type { HistoryEntry } from "@/types/qr";
import { getTypeIcon } from "@/lib/typeMeta";
import { useI18n } from "@/lib/i18n/store";
import { relativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
    <section aria-labelledby="history-heading">
      <div className="flex h-12 items-center justify-between gap-3 border-b border-line bg-bg-secondary px-4 sm:px-6">
        <h2 id="history-heading" className="flex items-center gap-3 text-[13px] font-medium text-fg">
          <span className="font-mono text-[11px] text-fg-muted">04</span>
          {t.histHeading}
          {entries.length > 0 && (
            <span className="border border-line-strong px-1.5 font-mono text-[10px] tabular-nums text-fg-muted">
              {entries.length}
            </span>
          )}
        </h2>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            aria-label={t.histClearAria}
            className="h-7 text-fg-muted hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" />
            {t.histClear}
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="px-4 py-6 text-[13px] text-fg-muted sm:px-6">{t.histEmpty}</p>
      ) : (
        <div className="-mb-px grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => {
            const Icon = getTypeIcon(entry.type);
            const typeLabel = t.types[entry.type];
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onRestore(entry)}
                className="group flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left transition-colors duration-150 hover:bg-bg-secondary sm:px-6 md:border-r"
                aria-label={t.histRestoreAria(typeLabel, entry.label)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-strong transition-colors group-hover:border-fg-muted">
                  <Icon className="h-3.5 w-3.5 text-fg-secondary" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] text-fg">{entry.label}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
                    {t.histEntryType(typeLabel)}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[10px] tabular-nums text-fg-muted">
                  {relativeTime(entry.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
