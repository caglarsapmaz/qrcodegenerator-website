import type { ContentState, ContentType, PayloadStatus } from "../../types/qr";
import type { AppStrings } from "../i18n/strings";
import {
  buildEmailPayload,
  buildLocationPayload,
  buildPhonePayload,
  buildSmsPayload,
  buildTextPayload,
  buildVCardPayload,
  buildWifiPayload,
} from "../qr/payloads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts bare domains and adds https:// when no scheme is present. */
export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    const host = parsed.hostname;
    if (!host) return null;
    if (host !== "localhost" && !host.includes(".") && !host.includes(":")) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Loose international phone validation: digits with + ( ) - . and space separators. */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/[^\d+()\-.\s]/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 3 && digits.length <= 15;
}

export function parseCoordinate(value: string): number | null {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Validates the active content and produces the QR payload.
 * Returns `empty` when the form is untouched, `error` with a user-friendly
 * message (and the offending field) when invalid, or `ok` with the payload.
 */
export function getPayload(
  type: ContentType,
  content: ContentState,
  t: AppStrings,
): PayloadStatus {
  switch (type) {
    case "url": {
      if (!content.url.trim()) return { status: "empty" };
      const url = normalizeUrl(content.url);
      if (!url) {
        return {
          status: "error",
          field: "url",
          message: t.errInvalidUrl,
        };
      }
      return { status: "ok", payload: url };
    }
    case "text": {
      if (!content.text.trim()) return { status: "empty" };
      return { status: "ok", payload: buildTextPayload(content) };
    }
    case "wifi": {
      if (!content.ssid.trim()) return { status: "empty" };
      return { status: "ok", payload: buildWifiPayload(content) };
    }
    case "email": {
      if (!content.email.trim()) return { status: "empty" };
      if (!isValidEmail(content.email)) {
        return { status: "error", field: "email", message: t.errInvalidEmail };
      }
      return { status: "ok", payload: buildEmailPayload(content) };
    }
    case "phone": {
      if (!content.phone.trim()) return { status: "empty" };
      if (!isValidPhone(content.phone)) {
        return { status: "error", field: "phone", message: t.errInvalidPhone };
      }
      return { status: "ok", payload: buildPhonePayload(content) };
    }
    case "sms": {
      if (!content.smsPhone.trim()) return { status: "empty" };
      if (!isValidPhone(content.smsPhone)) {
        return { status: "error", field: "smsPhone", message: t.errInvalidPhone };
      }
      return { status: "ok", payload: buildSmsPayload(content) };
    }
    case "contact": {
      const hasContent = [
        content.firstName,
        content.lastName,
        content.contactPhone,
        content.contactEmail,
        content.company,
        content.website,
        content.address,
      ].some((value) => value.trim() !== "");
      if (!hasContent) return { status: "empty" };
      if (content.contactEmail.trim() && !isValidEmail(content.contactEmail)) {
        return {
          status: "error",
          field: "contactEmail",
          message: t.errInvalidEmail,
        };
      }
      if (content.contactPhone.trim() && !isValidPhone(content.contactPhone)) {
        return {
          status: "error",
          field: "contactPhone",
          message: t.errInvalidPhone,
        };
      }
      return { status: "ok", payload: buildVCardPayload(content) };
    }
    case "location": {
      if (!content.latitude.trim() && !content.longitude.trim()) {
        return { status: "empty" };
      }
      if (!content.latitude.trim() || !content.longitude.trim()) {
        return {
          status: "error",
          field: "latitude",
          message: t.errEnterBothCoords,
        };
      }
      const lat = parseCoordinate(content.latitude);
      const lng = parseCoordinate(content.longitude);
      if (lat === null || lng === null || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return {
          status: "error",
          field: "latitude",
          message: t.errInvalidCoords,
        };
      }
      return { status: "ok", payload: buildLocationPayload(content) };
    }
  }
}
