import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  // The only element on the page allowed to glow.
  primary:
    "border border-accent bg-accent text-accent-fg shadow-[0_0_0_1px_var(--accent),0_0_18px_-6px_var(--accent-glow)] hover:shadow-[0_0_0_1px_var(--accent),0_0_28px_-4px_var(--accent-glow)] active:translate-y-px",
  secondary:
    "border border-line-strong bg-bg text-fg hover:border-fg-muted hover:bg-fg/[0.04] active:bg-fg/[0.08]",
  ghost: "text-fg-secondary hover:bg-fg/[0.05] hover:text-fg",
  danger: "text-red-500 dark:text-red-400 hover:bg-red-500/10",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-[13px]",
  lg: "h-11 px-5 text-[13px]",
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
        "inline-flex select-none items-center justify-center gap-2 font-medium transition-[background-color,border-color,box-shadow,color] duration-150 disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none",
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
