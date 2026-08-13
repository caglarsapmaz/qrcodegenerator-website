import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-blue text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.55)] hover:brightness-110 active:brightness-95",
  secondary:
    "border border-line bg-card-elevated text-fg hover:bg-fg/5 active:bg-fg/10",
  ghost: "text-fg-secondary hover:bg-fg/5 hover:text-fg",
  danger:
    "text-red-500 dark:text-red-400 hover:bg-red-500/10",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
