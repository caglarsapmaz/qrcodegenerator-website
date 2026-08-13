"use client";

import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn, isValidHexColor } from "@/lib/utils";

export const inputBase =
  "w-full min-h-11 rounded-xl border border-line bg-bg-secondary px-3.5 text-sm text-fg placeholder:text-fg-muted transition-colors duration-150 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-fg-secondary">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-500 dark:text-red-400">
          <CircleAlert className="mt-px h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-fg-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(inputBase, invalid && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(inputBase, "py-2.5 leading-relaxed", invalid && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20", className)}
      {...props}
    />
  );
}

export function Select({
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select className={cn(inputBase, "cursor-pointer appearance-none pr-9", className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-xs font-medium text-fg-secondary">{label}</label>
        <span className="text-xs font-medium tabular-nums text-fg">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-2 w-full"
      />
      {hint && <p className="mt-1 text-xs text-fg-muted">{hint}</p>}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-1 rounded-xl border border-line bg-bg-secondary p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-9 items-center justify-center rounded-[9px] px-2 text-xs font-medium transition-all duration-150",
              active
                ? "bg-card-elevated text-fg shadow-sm ring-1 ring-line"
                : "text-fg-secondary hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string; hint?: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium text-fg-secondary">{label}</legend>
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all duration-150",
                active
                  ? "border-accent/50 bg-accent/10 text-fg"
                  : "border-line bg-bg-secondary text-fg-secondary hover:border-fg-muted/40 hover:text-fg",
              )}
            >
              <span
                className={cn(
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
                  active ? "border-accent" : "border-fg-muted",
                )}
                aria-hidden="true"
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </span>
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                {option.label}
                {option.hint && (
                  <span className="text-[10px] tabular-nums text-fg-muted">{option.hint}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-fg-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 cursor-pointer rounded accent-accent"
      />
      {label}
    </label>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [lastValue, setLastValue] = useState(value);

  // Keep the hex draft in sync when the value changes externally (e.g. reset)
  // by adjusting state during render, per the React docs.
  if (lastValue !== value) {
    setLastValue(value);
    setDraft(value);
  }

  return (
    <div>
      <span className="text-xs font-medium text-fg-secondary">{label}</span>
      <div className="mt-1.5 flex items-center gap-2">
        <label
          className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-line bg-card-elevated"
          title={`Choose ${label.toLowerCase()} color`}
        >
          <span
            className="absolute inset-0 rounded-xl"
            style={{ background: value }}
            aria-hidden="true"
          />
          <input
            type="color"
            value={isValidHexColor(value) ? value : "#000000"}
            onChange={(event) => onChange(event.target.value)}
            aria-label={`${label} color picker`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            if (isValidHexColor(draft)) onChange(draft);
            else setDraft(value);
          }}
          aria-label={`${label} hex value`}
          maxLength={7}
          spellCheck={false}
          className={cn(inputBase, "min-h-11 w-28 font-mono uppercase")}
        />
      </div>
    </div>
  );
}
