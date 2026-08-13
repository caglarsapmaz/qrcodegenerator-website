export type ContentType =
  | "url"
  | "text"
  | "wifi"
  | "email"
  | "phone"
  | "sms"
  | "contact"
  | "location";

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type QRPattern = "square" | "rounded" | "dots";
export type QREyeStyle = "square" | "rounded" | "circle";
export type ErrorCorrection = "L" | "M" | "Q" | "H";

export type Theme = "dark" | "light";

/** Flat form state holding every content-type field (only the active type's fields are used). */
export interface ContentState {
  url: string;
  text: string;
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden: boolean;
  email: string;
  subject: string;
  message: string;
  phone: string;
  smsPhone: string;
  smsMessage: string;
  firstName: string;
  lastName: string;
  contactPhone: string;
  contactEmail: string;
  company: string;
  website: string;
  address: string;
  latitude: string;
  longitude: string;
  locationName: string;
}

export interface QRSettings {
  type: ContentType;
  content: ContentState;
  foreground: string;
  background: string;
  pattern: QRPattern;
  eyeStyle: QREyeStyle;
  errorCorrection: ErrorCorrection;
  /** Quiet zone around the QR code, in px on the 600px canvas. */
  margin: number;
  /** Logo size as a percentage of the QR code (10–50). */
  logoSize: number;
}

export interface HistoryEntry {
  id: string;
  type: ContentType;
  content: Partial<ContentState>;
  label: string;
  createdAt: number;
}

export type PayloadStatus =
  | { status: "empty" }
  | { status: "error"; field?: keyof ContentState; message: string }
  | { status: "ok"; payload: string };
