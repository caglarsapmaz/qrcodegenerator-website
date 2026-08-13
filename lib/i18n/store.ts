"use client";

import { useSyncExternalStore } from "react";
import type { AppStrings, Language } from "./strings";
import { STRINGS } from "./strings";

export type I18nKey = keyof AppStrings;

const STORAGE_KEY = "qr-studio:lang";

let currentLanguage: Language = "tr";
const listeners = new Set<() => void>();

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "tr";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "tr";
  } catch {
    return "tr";
  }
}

/** Adopt the stored language after hydration (server snapshot stays "tr"). */
export function initLanguage(): void {
  const stored = getStoredLanguage();
  if (stored !== currentLanguage) setLanguage(stored);
}

export function setLanguage(language: Language): void {
  currentLanguage = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Ignore storage errors.
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = language === "tr" ? "tr" : "en";
    document.title = STRINGS[language].metaTitle;
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Language {
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return "tr";
}

export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useI18n() {
  const language = useLanguage();
  return STRINGS[language];
}
