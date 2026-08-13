import type {
  ContentState,
  ErrorCorrection,
  QRSettings,
  WifiSecurity,
} from "../types/qr";

export const STORAGE_KEYS = {
  theme: "qr-studio:theme",
  settings: "qr-studio:settings",
  history: "qr-studio:history",
} as const;

export const APP_NAME = "Zyqra";
export const APP_SLOGAN = "Create. Connect. Scan.";

export const GITHUB_URL = "https://github.com/caglarsapmaz";
export const LINKEDIN_URL = "https://www.linkedin.com/in/caglarsapmaz";

/** Attribution shown in the footer (the person who built the app). */
export const CREATOR = {
  name: "Çağlar Sapmaz",
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
} as const;

export const QR_CANVAS_SIZE = 600;

export const MAX_TEXT_LENGTH = 2000;
export const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_LOGO_SIZE_PERCENT = 50;
export const MIN_LOGO_SIZE_PERCENT = 10;
export const MAX_HISTORY_ENTRIES = 8;

export const HISTORY_DEBOUNCE_MS = 600;
export const PERSIST_DEBOUNCE_MS = 400;
export const TOAST_DURATION_MS = 3500;

const EMPTY_CONTENT: ContentState = {
  url: "",
  text: "",
  ssid: "",
  password: "",
  security: "WPA",
  hidden: false,
  email: "",
  subject: "",
  message: "",
  phone: "",
  smsPhone: "",
  smsMessage: "",
  firstName: "",
  lastName: "",
  contactPhone: "",
  contactEmail: "",
  company: "",
  website: "",
  address: "",
  latitude: "",
  longitude: "",
  locationName: "",
};

export const DEFAULT_SETTINGS: QRSettings = {
  type: "url",
  content: { ...EMPTY_CONTENT, url: "https://example.com" },
  foreground: "#000000",
  background: "#ffffff",
  pattern: "square",
  eyeStyle: "square",
  errorCorrection: "H",
  margin: 24,
  logoSize: 20,
};

export const ERROR_CORRECTION_OPTIONS: Array<{
  value: ErrorCorrection;
  label: string;
  percent: string;
}> = [
  { value: "L", label: "Low", percent: "7%" },
  { value: "M", label: "Medium", percent: "15%" },
  { value: "Q", label: "Quartile", percent: "25%" },
  { value: "H", label: "High", percent: "30%" },
];

export const WIFI_SECURITY_OPTIONS: Array<{
  value: WifiSecurity;
  label: string;
}> = [
  { value: "WPA", label: "WPA / WPA2" },
  { value: "WEP", label: "WEP" },
  { value: "nopass", label: "None (open)" },
];

export const ACCEPTED_LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
] as const;
