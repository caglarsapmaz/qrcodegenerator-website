import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card shadow-[var(--card-shadow)]",
        className,
      )}
      {...props}
    />
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
      {children}
    </h3>
  );
}
