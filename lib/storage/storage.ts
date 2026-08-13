import type { HistoryEntry, QRSettings, Theme } from "../../types/qr";
import {
  DEFAULT_SETTINGS,
  MAX_HISTORY_ENTRIES,
  STORAGE_KEYS,
} from "../constants";
import { clamp, isValidHexColor } from "../utils";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage disabled — fail silently.
  }
}

// ─── Settings ────────────────────────────────────────────────────────────────

const VALID_TYPES: QRSettings["type"][] = [
  "url",
  "text",
  "wifi",
  "email",
  "phone",
  "sms",
  "contact",
  "location",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadSettings(): QRSettings {
  const stored = readJson<Partial<QRSettings>>(STORAGE_KEYS.settings);
  if (!stored || !isRecord(stored)) return DEFAULT_SETTINGS;

  const storedContent = isRecord(stored.content) ? stored.content : {};
  const content = { ...DEFAULT_SETTINGS.content, ...storedContent };

  return {
    type: VALID_TYPES.includes(stored.type as QRSettings["type"])
      ? (stored.type as QRSettings["type"])
      : DEFAULT_SETTINGS.type,
    content,
    foreground:
      typeof stored.foreground === "string" && isValidHexColor(stored.foreground)
        ? stored.foreground
        : DEFAULT_SETTINGS.foreground,
    background:
      typeof stored.background === "string" && isValidHexColor(stored.background)
        ? stored.background
        : DEFAULT_SETTINGS.background,
    pattern: ["square", "rounded", "dots"].includes(stored.pattern as string)
      ? (stored.pattern as QRSettings["pattern"])
      : DEFAULT_SETTINGS.pattern,
    eyeStyle: ["square", "rounded", "circle"].includes(stored.eyeStyle as string)
      ? (stored.eyeStyle as QRSettings["eyeStyle"])
      : DEFAULT_SETTINGS.eyeStyle,
    errorCorrection: ["L", "M", "Q", "H"].includes(stored.errorCorrection as string)
      ? (stored.errorCorrection as QRSettings["errorCorrection"])
      : DEFAULT_SETTINGS.errorCorrection,
    margin:
      typeof stored.margin === "number"
        ? clamp(stored.margin, 0, 64)
        : DEFAULT_SETTINGS.margin,
    logoSize:
      typeof stored.logoSize === "number"
        ? clamp(stored.logoSize, 10, 50)
        : DEFAULT_SETTINGS.logoSize,
  };
}

export function saveSettings(settings: QRSettings): void {
  writeJson(STORAGE_KEYS.settings, settings);
}

// ─── Theme ───────────────────────────────────────────────────────────────────

export function getStoredTheme(): Theme {
  if (!canUseStorage()) return "dark";
  try {
    return window.localStorage.getItem(STORAGE_KEYS.theme) === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function saveTheme(theme: Theme): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
    // Ignore.
  }
}

// ─── History ─────────────────────────────────────────────────────────────────

export function loadHistory(): HistoryEntry[] {
  const stored = readJson<unknown>(STORAGE_KEYS.history);
  if (!Array.isArray(stored)) return [];
  return stored
    .filter((entry): entry is HistoryEntry => isRecord(entry) && typeof entry.id === "string")
    .slice(0, MAX_HISTORY_ENTRIES);
}

export function saveHistory(entries: HistoryEntry[]): void {
  writeJson(STORAGE_KEYS.history, entries.slice(0, MAX_HISTORY_ENTRIES));
}
