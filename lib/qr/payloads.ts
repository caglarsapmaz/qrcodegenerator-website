import type { ContentState, ContentType } from "../../types/qr";
import type { AppStrings } from "../i18n/strings";

const WIFI_ESCAPE_RE = /([\\;,:"])/g;

function escapeWifiValue(value: string): string {
  return value.replace(WIFI_ESCAPE_RE, "\\$1");
}

function escapeVCardValue(value: string): string {
  return value.replace(/[\\;,]/g, (m) => `\\${m}`);
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Standard Wi-Fi QR payload: WIFI:T:WPA;S:net;P:pass;H:true;; */
export function buildWifiPayload(content: ContentState): string {
  const parts = ["WIFI:"];
  parts.push(`T:${content.security};`);
  parts.push(`S:${escapeWifiValue(singleLine(content.ssid))};`);
  if (content.security !== "nopass" && content.password) {
    parts.push(`P:${escapeWifiValue(content.password)};`);
  }
  if (content.hidden) {
    parts.push("H:true;");
  }
  parts.push(";");
  return parts.join("");
}

export function buildEmailPayload(content: ContentState): string {
  const params: string[] = [];
  if (content.subject) {
    params.push(`subject=${encodeURIComponent(content.subject)}`);
  }
  if (content.message) {
    params.push(`body=${encodeURIComponent(content.message)}`);
  }
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${content.email.trim()}${query}`;
}

export function buildPhonePayload(content: ContentState): string {
  return `tel:${content.phone.trim()}`;
}

/** SMSTO is the most widely supported SMS QR format. */
export function buildSmsPayload(content: ContentState): string {
  const message = content.smsMessage ? `:${content.smsMessage}` : "";
  return `SMSTO:${content.smsPhone.trim()}${message}`;
}

/** Geo URI: geo:lat,lon (optionally with a ?q= label). */
export function buildLocationPayload(content: ContentState): string {
  const lat = content.latitude.trim();
  const lng = content.longitude.trim();
  let payload = `geo:${lat},${lng}`;
  const name = content.locationName.trim();
  if (name) {
    payload += `?q=${encodeURIComponent(name)}`;
  }
  return payload;
}

/** vCard 3.0 payload built from the fields the user filled in. */
export function buildVCardPayload(content: ContentState): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];

  const first = content.firstName.trim();
  const last = content.lastName.trim();
  if (first || last) {
    lines.push(`N:${escapeVCardValue(last)};${escapeVCardValue(first)};;;`);
    lines.push(`FN:${escapeVCardValue(`${first} ${last}`.trim())}`);
  }
  if (content.contactPhone.trim()) {
    lines.push(`TEL:${content.contactPhone.trim()}`);
  }
  if (content.contactEmail.trim()) {
    lines.push(`EMAIL:${content.contactEmail.trim()}`);
  }
  if (content.company.trim()) {
    lines.push(`ORG:${escapeVCardValue(singleLine(content.company))}`);
  }
  if (content.website.trim()) {
    lines.push(`URL:${content.website.trim()}`);
  }
  if (content.address.trim()) {
    lines.push(`ADR:;;${escapeVCardValue(singleLine(content.address))};;;;`);
  }

  lines.push("END:VCARD");
  return lines.join("\n");
}

export function buildTextPayload(content: ContentState): string {
  return content.text;
}

/** Short human-readable label for the recent-QR history list. */
export function historyLabel(
  type: ContentType,
  content: ContentState,
  t: AppStrings,
): string {
  switch (type) {
    case "url": {
      const url = content.url.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
      return url || t.types.url;
    }
    case "text": {
      const text = content.text.trim();
      return text.length > 40 ? `${text.slice(0, 40)}…` : text || t.types.text;
    }
    case "wifi":
      return content.ssid.trim() || t.types.wifi;
    case "email":
      return content.email.trim() || t.types.email;
    case "phone":
      return content.phone.trim() || t.types.phone;
    case "sms":
      return content.smsPhone.trim() || t.types.sms;
    case "contact": {
      const name = `${content.firstName} ${content.lastName}`.trim();
      return name || content.contactEmail.trim() || content.contactPhone.trim() || t.types.contact;
    }
    case "location":
      return (
        content.locationName.trim() ||
        `${content.latitude.trim()}, ${content.longitude.trim()}`.trim() ||
        t.types.location
      );
  }
}
