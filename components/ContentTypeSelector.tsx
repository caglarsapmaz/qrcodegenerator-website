"use client";

import type { ContentType } from "@/types/qr";
import { getTypeIcon } from "@/lib/typeMeta";
import { useI18n } from "@/lib/i18n/store";
import { cn } from "@/lib/utils";

const TYPES: ContentType[] = [
  "url",
  "text",
  "wifi",
  "email",
  "phone",
  "sms",
  "contact",
  "location",
];

export function ContentTypeSelector({
  value,
  onChange,
}: {
  value: ContentType;
  onChange: (type: ContentType) => void;
}) {
  const t = useI18n();

  return (
    <div role="radiogroup" aria-label={t.genContentTypeLabel} className="grid grid-cols-4 gap-px border border-line-strong bg-line-strong">
      {TYPES.map((type) => {
        const Icon = getTypeIcon(type);
        const active = type === value;
        return (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(type)}
            className={cn(
              "flex min-h-[60px] flex-col items-start justify-between gap-2 px-2.5 py-2.5 text-[11px] font-medium transition-colors duration-150 sm:text-xs",
              active
                ? "bg-fg text-bg"
                : "bg-bg text-fg-secondary hover:bg-bg-secondary hover:text-fg",
            )}
          >
            <Icon
              className={cn("h-3.5 w-3.5", active ? "text-bg" : "text-fg-muted")}
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {t.types[type]}
          </button>
        );
      })}
    </div>
  );
}
