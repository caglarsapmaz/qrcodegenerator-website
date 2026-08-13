"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CircleCheck, CircleX, CircleAlert, X } from "lucide-react";
import { TOAST_DURATION_MS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/store";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<ToastVariant, { icon: typeof CircleCheck; iconClass: string }> = {
  success: { icon: CircleCheck, iconClass: "text-emerald-400" },
  error: { icon: CircleX, iconClass: "text-red-400" },
  info: { icon: CircleAlert, iconClass: "text-sky-400" },
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const t = useI18n();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((current) => [...current.slice(-3), { id, message, variant }]);
      const timer = setTimeout(() => dismiss(id), TOAST_DURATION_MS);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col items-end gap-2"
      >
        {toasts.map((item) => {
          const { icon: Icon, iconClass } = VARIANT_STYLES[item.variant];
          return (
            <div
              key={item.id}
              className="animate-toast-in pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-line bg-card-elevated/95 px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <Icon className={cn("mt-px h-4 w-4 shrink-0", iconClass)} />
              <p className="min-w-0 flex-1 text-sm text-fg">{item.message}</p>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label={t.ariaDismissToast}
                className="shrink-0 rounded-md p-1 text-fg-muted transition-colors hover:text-fg"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
