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
  "w-full min-h-10 border border-line-strong bg-bg px-3 text-[13px] text-fg placeholder:text-fg-muted transition-colors duration-150 hover:border-fg-muted/60 focus:border-fg focus:outline-none disabled:opacity-50";

const invalidClass = "border-red-500/70 hover:border-red-500/70 focus:border-red-500";

const labelClass = "text-xs font-medium text-fg-secondary";

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
        <label htmlFor={htmlFor} className={cn(labelClass, "mb-1.5 block")}>
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
  return <input className={cn(inputBase, invalid && invalidClass, className)} {...props} />;
}

export function Textarea({
  className,
  invalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(inputBase, "py-2.5 leading-relaxed", invalid && invalidClass, className)}
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
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg-muted" />
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
        <label className={labelClass}>{label}</label>
        <span className="border border-line-strong px-1.5 py-px font-mono text-[11px] tabular-nums text-fg">
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
      <div className="flex justify-between font-mono text-[10px] tabular-nums text-fg-muted">
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </div>
      {hint && <p className="mt-1.5 text-xs text-fg-muted">{hint}</p>}
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
      className="grid gap-px border border-line-strong bg-line-strong"
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
              "flex min-h-9 items-center justify-center px-2 text-xs font-medium transition-colors duration-150",
              active ? "bg-fg text-bg" : "bg-bg text-fg-secondary hover:bg-bg-secondary hover:text-fg",
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
      <legend className={labelClass}>{label}</legend>
      <div className="mt-1.5 grid grid-cols-2 gap-px border border-line-strong bg-line-strong sm:grid-cols-4">
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
                "flex flex-col items-start gap-1 px-3 py-2.5 text-left text-xs font-medium transition-colors duration-150",
                active ? "bg-fg text-bg" : "bg-bg text-fg-secondary hover:bg-bg-secondary hover:text-fg",
              )}
            >
              <span className="flex w-full items-center justify-between gap-2">
                {option.label}
                <span
                  className={cn("h-1.5 w-1.5 shrink-0", active ? "bg-bg" : "border border-fg-muted")}
                  aria-hidden="true"
                />
              </span>
              {option.hint && (
                <span className={cn("font-mono text-[10px] tabular-nums", active ? "text-bg/60" : "text-fg-muted")}>
                  {option.hint}
                </span>
              )}
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
    <label className="flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-fg-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="check cursor-pointer"
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
      <span className={labelClass}>{label}</span>
      <div className="mt-1.5 flex">
        <label
          className="relative h-10 w-10 shrink-0 cursor-pointer border border-r-0 border-line-strong"
          title={`Choose ${label.toLowerCase()} color`}
        >
          <span className="absolute inset-[3px]" style={{ background: value }} aria-hidden="true" />
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
          className={cn(inputBase, "font-mono uppercase")}
        />
      </div>
    </div>
  );
}
