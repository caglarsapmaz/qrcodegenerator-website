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
    <div role="radiogroup" aria-label={t.genContentTypeLabel} className="grid grid-cols-4 gap-1.5">
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
              "flex min-h-[58px] flex-col items-center justify-center gap-1.5 rounded-xl border px-1 py-2.5 text-[11px] font-medium transition-all duration-150 sm:text-xs",
              active
                ? "border-accent/50 bg-accent/10 text-fg"
                : "border-line bg-bg-secondary text-fg-secondary hover:border-fg-muted/40 hover:text-fg",
            )}
          >
            <Icon
              className={cn("h-4 w-4", active ? "text-accent" : "text-fg-muted")}
              aria-hidden="true"
            />
            {t.types[type]}
          </button>
        );
      })}
    </div>
  );
}
