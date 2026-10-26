import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border border-line bg-card", className)} {...props} />;
}

export function SectionLabel({ children, index }: { children: string; index?: string }) {
  return (
    <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
      {index && <span className="text-fg-secondary">{index}</span>}
      {children}
    </h3>
  );
}
