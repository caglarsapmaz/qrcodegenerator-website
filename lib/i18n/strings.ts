import type { ContentType } from "../../types/qr";

export type Language = "tr" | "en";

export interface AppStrings {
  metaTitle: string;
  metaDescription: string;

  navFeatures: string;
  navDocs: string;
  navGitHub: string;

  heroBadge: string;
  heroTitleStart: string;
  heroTitleAccent: string;
  heroTitleEnd: string;
  heroSubtitle: string;
  heroCta: string;
  heroPrivacyNote: string;

  genHeading: string;
  genReset: string;
  genResetAria: string;
  genContentTypeLabel: string;

  types: Record<ContentType, string>;

  formUrlLabel: string;
  formUrlHint: string;
  formUrlPlaceholder: string;
  formTextLabel: string;
  formTextPlaceholder: string;
  formTextCounter: (count: number, max: number) => string;
  formSsidLabel: string;
  formSsidPlaceholder: string;
  formSsidHint: string;
  formPasswordLabel: string;
  formPasswordHint: string;
  formPasswordPlaceholder: string;
  formShowPassword: string;
  formHidePassword: string;
  formSecurityLabel: string;
  formHiddenNetwork: string;
  formWifiNote: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formSubjectLabel: string;
  formSubjectPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formPhoneLabel: string;
  formPhoneHint: string;
  formPhonePlaceholder: string;
  formSmsPhoneLabel: string;
  formSmsPhoneHint: string;
  formSmsPhonePlaceholder: string;
  formSmsMessageLabel: string;
  formSmsMessagePlaceholder: string;
  formFirstNameLabel: string;
  formFirstNamePlaceholder: string;
  formLastNameLabel: string;
  formLastNamePlaceholder: string;
  formContactPhoneLabel: string;
  formContactPhonePlaceholder: string;
  formContactEmailLabel: string;
  formContactEmailPlaceholder: string;
  formCompanyLabel: string;
  formCompanyPlaceholder: string;
  formWebsiteLabel: string;
  formWebsitePlaceholder: string;
  formAddressLabel: string;
  formAddressPlaceholder: string;
  formVcardNote: string;
  formLatitudeLabel: string;
  formLatitudePlaceholder: string;
  formLongitudeLabel: string;
  formLongitudePlaceholder: string;
  formLocationNameLabel: string;
  formLocationNamePlaceholder: string;
  formGeoNote: string;

  custQrStyle: string;
  custForeground: string;
  custBackground: string;
  custPattern: string;
  custEyeStyle: string;
  custSquare: string;
  custRounded: string;
  custDots: string;
  custCircle: string;
  custLogo: string;
  custLogoAttached: string;
  custLogoNote: string;
  custRemoveLogo: string;
  custRemoveLogoAria: string;
  custLogoSize: string;
  custLogoSizeHint: string;
  custUploadLogo: string;
  custDragDropHint: string;
  custReadingImage: string;
  custQuietZone: string;
  custMargin: string;
  custQuietZoneHint: string;
  custErrorCorrection: string;
  custEcLow: string;
  custEcMedium: string;
  custEcQuartile: string;
  custEcHigh: string;
  custEcNote: string;

  prevLivePreview: string;
  prevReady: string;
  prevCheckInput: string;
  prevAwaiting: string;
  prevEmptyTitle: string;
  prevEmptySubtitle: string;
  prevErrorSubtitle: string;
  prevPrivacy: string;
  prevQrAria: string;

  dlPng: string;
  dlDownloading: string;
  dlSvg: string;
  dlWebp: string;
  dlCopy: string;
  dlCopied: string;
  dlFileNote: string;
  dlPngAria: string;
  dlSvgAria: string;
  dlWebpAria: string;
  dlCopyAria: string;
  dlSuccess: (extension: string) => string;

  histHeading: string;
  histClear: string;
  histClearAria: string;
  histEmpty: string;
  histEntryType: (typeLabel: string) => string;
  histRestoreAria: (typeLabel: string, label: string) => string;

  toastSettingsReset: string;
  toastLogoAdded: string;
  toastRestored: string;
  toastHistoryCleared: string;
  toastDownloadFailed: string;
  toastCopyFailed: string;
  toastClipboardUnavailable: string;
  toastNoImage: string;
  toastFileType: string;
  toastFileTooLarge: string;
  toastFileUnreadable: string;

  errInvalidUrl: string;
  errInvalidEmail: string;
  errInvalidPhone: string;
  errEnterBothCoords: string;
  errInvalidCoords: string;

  featHeading: string;
  featFast: string;
  featFastDesc: string;
  featCustomizable: string;
  featCustomizableDesc: string;
  featPrivate: string;
  featPrivateDesc: string;
  featFree: string;
  featFreeDesc: string;

  footTagline: string;
  footDesc: string;
  footFeatures: string;
  footDocs: string;
  footPrivacy: string;
  footGitHub: string;
  footRights: (year: number) => string;
  footMadeBy: (name: string) => string;
  footPrivacyLine: string;

  docsTitle: string;
  docsSubtitle: string;
  docsGettingStarted: string;
  docsStep1: string;
  docsStep2: string;
  docsStep3: string;
  docsStep4: string;
  docsContentTypes: string;
  docsCtUrl: string;
  docsCtText: string;
  docsCtWifi: string;
  docsCtEmail: string;
  docsCtPhone: string;
  docsCtSms: string;
  docsCtContact: string;
  docsCtLocation: string;
  docsCustomization: string;
  docsCustomBody: string;
  docsPrivacy: string;
  docsPrivacyBody: string;

  ariaThemeDark: string;
  ariaThemeLight: string;
  ariaOpenMenu: string;
  ariaCloseMenu: string;
  ariaChangeLanguage: string;
  ariaDismissToast: string;
}

const en: AppStrings = {
  metaTitle: "Zyqra — Free QR Code Generator",
  metaDescription:
    "Create, customize and download QR codes instantly. Free, fast and private — everything runs in your browser.",

  navFeatures: "Features",
  navDocs: "Docs",
  navGitHub: "GitHub",

  heroBadge: "Free forever · No sign-up · No ads",
  heroTitleStart: "Generate ",
  heroTitleAccent: "custom",
  heroTitleEnd: " QR codes.",
  heroSubtitle:
    "Generate, customize and download QR codes instantly — completely free and ad-free.",
  heroCta: "Create QR Code",
  heroPrivacyNote: "Your data never leaves this page.",

  genHeading: "Create your QR code",
  genReset: "Reset",
  genResetAria: "Reset all settings to defaults",
  genContentTypeLabel: "Content type",

  types: {
    url: "URL",
    text: "Text",
    wifi: "Wi-Fi",
    email: "Email",
    phone: "Phone",
    sms: "SMS",
    contact: "Contact",
    location: "Location",
  },

  formUrlLabel: "Website URL",
  formUrlHint: "Enter the URL you want to encode.",
  formUrlPlaceholder: "https://example.com",
  formTextLabel: "Text",
  formTextPlaceholder: "Enter your text...",
  formTextCounter: (count, max) => `${count} / ${max} characters`,
  formSsidLabel: "Network name",
  formSsidPlaceholder: "My Wi-Fi",
  formSsidHint: "The name (SSID) of your wireless network.",
  formPasswordLabel: "Password",
  formPasswordHint: "Omitted from the QR code for open networks.",
  formPasswordPlaceholder: "••••••••",
  formShowPassword: "Show password",
  formHidePassword: "Hide password",
  formSecurityLabel: "Security",
  formHiddenNetwork: "Hidden network",
  formWifiNote:
    "Uses the standard Wi-Fi QR format (WIFI:T:S:P:H) supported by iOS, Android and most camera apps.",
  formEmailLabel: "Email address",
  formEmailPlaceholder: "hello@example.com",
  formSubjectLabel: "Subject",
  formSubjectPlaceholder: "Optional subject line",
  formMessageLabel: "Message",
  formMessagePlaceholder: "Optional message",
  formPhoneLabel: "Phone number",
  formPhoneHint: "Include your country code, e.g. +1 555 123 4567.",
  formPhonePlaceholder: "+1 555 123 4567",
  formSmsPhoneLabel: "Phone number",
  formSmsPhoneHint: "The number the message will be sent to.",
  formSmsPhonePlaceholder: "+1 555 123 4567",
  formSmsMessageLabel: "Message",
  formSmsMessagePlaceholder: "Optional pre-filled message",
  formFirstNameLabel: "First name",
  formFirstNamePlaceholder: "Ada",
  formLastNameLabel: "Last name",
  formLastNamePlaceholder: "Lovelace",
  formContactPhoneLabel: "Phone",
  formContactPhonePlaceholder: "+1 555 123 4567",
  formContactEmailLabel: "Email",
  formContactEmailPlaceholder: "ada@example.com",
  formCompanyLabel: "Company",
  formCompanyPlaceholder: "Analytical Engines Ltd.",
  formWebsiteLabel: "Website",
  formWebsitePlaceholder: "https://example.com",
  formAddressLabel: "Address",
  formAddressPlaceholder: "12 Analytical Engine Row, London",
  formVcardNote: "Encoded as a vCard 3.0 — works with most phone contacts apps.",
  formLatitudeLabel: "Latitude",
  formLatitudePlaceholder: "40.7128",
  formLongitudeLabel: "Longitude",
  formLongitudePlaceholder: "-74.0060",
  formLocationNameLabel: "Location name (optional)",
  formLocationNamePlaceholder: "Statue of Liberty",
  formGeoNote: "Encoded as a geo URI, e.g. geo:40.7128,-74.0060.",

  custQrStyle: "QR Style",
  custForeground: "Foreground",
  custBackground: "Background",
  custPattern: "Pattern",
  custEyeStyle: "Finder / eye style",
  custSquare: "Square",
  custRounded: "Rounded",
  custDots: "Dots",
  custCircle: "Circle",
  custLogo: "Logo",
  custLogoAttached: "Logo attached",
  custLogoNote: "Error correction was raised to High to keep your QR scannable.",
  custRemoveLogo: "Remove logo",
  custRemoveLogoAria: "Remove logo",
  custLogoSize: "Logo size",
  custLogoSizeHint: "Keep the logo under ~40% so the QR code still scans reliably.",
  custUploadLogo: "Upload logo",
  custDragDropHint: "or drag & drop · PNG, JPG or SVG · max 5 MB",
  custReadingImage: "Reading image…",
  custQuietZone: "Quiet zone",
  custMargin: "Margin",
  custQuietZoneHint: "The empty space around the QR code. 4+ modules keeps scanners happy.",
  custErrorCorrection: "Error correction",
  custEcLow: "Low",
  custEcMedium: "Medium",
  custEcQuartile: "Quartile",
  custEcHigh: "High",
  custEcNote:
    "Higher levels make QR codes easier to scan, especially with a logo — at the cost of a denser pattern.",

  prevLivePreview: "Live Preview",
  prevReady: "Ready to download",
  prevCheckInput: "Check your input",
  prevAwaiting: "Awaiting content",
  prevEmptyTitle: "Your QR code will appear here",
  prevEmptySubtitle: "Enter your content to generate a QR code.",
  prevErrorSubtitle: "Fix the highlighted field to generate your QR code.",
  prevPrivacy:
    "Your QR codes are generated locally in your browser. We don’t upload your data to a server.",
  prevQrAria: "QR code preview",

  dlPng: "Download PNG",
  dlDownloading: "Downloading…",
  dlSvg: "SVG",
  dlWebp: "WebP",
  dlCopy: "Copy QR",
  dlCopied: "Copied!",
  dlFileNote: "Files are saved as qr-code.png / qr-code.svg / qr-code.webp",
  dlPngAria: "Download QR code as PNG",
  dlSvgAria: "Download QR code as SVG",
  dlWebpAria: "Download QR code as WebP",
  dlCopyAria: "Copy QR code image to clipboard",
  dlSuccess: (extension) => `QR code downloaded as ${extension}`,

  histHeading: "Recent QR Codes",
  histClear: "Clear history",
  histClearAria: "Clear QR history",
  histEmpty: "No QR codes yet — create one above and it will show up here.",
  histEntryType: (typeLabel) => `${typeLabel} QR code`,
  histRestoreAria: (typeLabel, label) => `Restore ${typeLabel} QR code ${label}`,

  toastSettingsReset: "Settings reset to defaults",
  toastLogoAdded: "Logo added",
  toastRestored: "QR code restored from history",
  toastHistoryCleared: "History cleared",
  toastDownloadFailed: "Download failed — please try again",
  toastCopyFailed: "Copy failed — please try again",
  toastClipboardUnavailable: "Clipboard is not available in this browser",
  toastNoImage: "Could not generate the image",
  toastFileType: "Unsupported file type — please upload a PNG, JPG or SVG",
  toastFileTooLarge: "File too large — maximum size is 5 MB",
  toastFileUnreadable: "Could not read that image — please try another file",

  errInvalidUrl:
    "Invalid URL — please enter a valid URL starting with https:// or http://",
  errInvalidEmail: "Invalid email address",
  errInvalidPhone: "Invalid phone number",
  errEnterBothCoords: "Enter both latitude and longitude",
  errInvalidCoords:
    "Invalid coordinates — latitude must be between -90 and 90, longitude between -180 and 180",

  featHeading: "Everything you need to create better QR codes.",
  featFast: "Fast",
  featFastDesc: "Generate QR codes instantly — no page reloads, no waiting.",
  featCustomizable: "Customizable",
  featCustomizableDesc: "Colors, patterns, eye styles, logos and more.",
  featPrivate: "Private",
  featPrivateDesc: "Your data stays in your browser. Nothing is uploaded.",
  featFree: "Free & Ad-free",
  featFreeDesc: "No subscriptions. No hidden fees. No ads. Free forever.",

  footTagline: "Create. Connect. Scan.",
  footDesc: "Free and ad-free QR code generator. Built for the web.",
  footFeatures: "Features",
  footDocs: "Docs",
  footPrivacy: "Privacy",
  footGitHub: "GitHub",
  footRights: (year) => `© ${year} Zyqra. All rights reserved.`,
  footMadeBy: (name) => `Made by ${name}`,
  footPrivacyLine: "QR codes are generated locally — nothing is uploaded to a server.",

  docsTitle: "Docs",
  docsSubtitle: "Everything you need to know about Zyqra.",
  docsGettingStarted: "Getting started",
  docsStep1: "Pick a content type — URL, Text, Wi-Fi, Email and more.",
  docsStep2: "Fill in the fields. Your QR code renders live — no generate button.",
  docsStep3: "Customize colors, pattern, eye style, logo and quiet zone.",
  docsStep4: "Download as PNG, SVG or WebP, or copy the image to your clipboard.",
  docsContentTypes: "Supported content types",
  docsCtUrl: "Point a QR code at any website.",
  docsCtText: "Plain text that appears instantly when scanned.",
  docsCtWifi: "Share network credentials in the standard WIFI:T:S:P:H format.",
  docsCtEmail: "Open a pre-filled mailto: draft with subject and body.",
  docsCtPhone: "Start a phone call via tel:.",
  docsCtSms: "Open a text message with a pre-filled number and body.",
  docsCtContact: "A vCard 3.0 so people can save you as a contact.",
  docsCtLocation: "A geo: URI that opens in the device’s map app.",
  docsCustomization: "Customization",
  docsCustomBody:
    "Change the foreground and background colors, switch the module pattern between square, rounded and dots, and pick an eye style. Add a logo — error correction automatically rises to High so the QR code stays scannable. Adjust the quiet zone (margin) to keep scanners happy, and choose the error correction level that fits your use case.",
  docsPrivacy: "Privacy & data",
  docsPrivacyBody:
    "Your QR codes are generated locally in your browser. We don’t upload your data to a server. Theme preference, your last settings and a short list of recent QR codes are stored only in your browser’s localStorage — you can clear the history at any time, and nothing is ever sent anywhere.",

  ariaThemeDark: "Switch to light mode",
  ariaThemeLight: "Switch to dark mode",
  ariaOpenMenu: "Open menu",
  ariaCloseMenu: "Close menu",
  ariaChangeLanguage: "Change language",
  ariaDismissToast: "Dismiss notification",
};

const tr: AppStrings = {
  metaTitle: "Zyqra — Ücretsiz QR Kod Oluşturucu",
  metaDescription:
    "QR kodlarını anında oluşturun, özelleştirin ve indirin. Ücretsiz, hızlı ve gizli — her şey tarayıcınızda çalışır.",

  navFeatures: "Özellikler",
  navDocs: "Belgeler",
  navGitHub: "GitHub",

  heroBadge: "Sonsuza dek ücretsiz · Kayıt yok · Reklam yok",
  heroTitleStart: "Kendi ",
  heroTitleAccent: "QR kodlarınızı",
  heroTitleEnd: " oluşturun.",
  heroSubtitle:
    "QR kodlarınızı anında oluşturun, özelleştirin ve indirin — tamamen ücretsiz ve reklamsız.",
  heroCta: "QR Kod Oluştur",
  heroPrivacyNote: "Verileriniz bu sayfadan asla çıkmaz.",

  genHeading: "QR kodunuzu oluşturun",
  genReset: "Sıfırla",
  genResetAria: "Tüm ayarları varsayılana döndür",
  genContentTypeLabel: "İçerik türü",

  types: {
    url: "URL",
    text: "Metin",
    wifi: "Wi-Fi",
    email: "E-posta",
    phone: "Telefon",
    sms: "SMS",
    contact: "Kişi",
    location: "Konum",
  },

  formUrlLabel: "Web sitesi URL'si",
  formUrlHint: "Kodlamak istediğiniz URL'yi girin.",
  formUrlPlaceholder: "https://example.com",
  formTextLabel: "Metin",
  formTextPlaceholder: "Metninizi girin...",
  formTextCounter: (count, max) => `${count} / ${max} karakter`,
  formSsidLabel: "Ağ adı (SSID)",
  formSsidPlaceholder: "Ev Ağı",
  formSsidHint: "Kablosuz ağınızın adı.",
  formPasswordLabel: "Şifre",
  formPasswordHint: "Açık ağlarda QR kodundan çıkarılır.",
  formPasswordPlaceholder: "••••••••",
  formShowPassword: "Şifreyi göster",
  formHidePassword: "Şifreyi gizle",
  formSecurityLabel: "Güvenlik",
  formHiddenNetwork: "Gizli ağ",
  formWifiNote:
    "iOS, Android ve çoğu kamera uygulamasının desteklediği standart Wi-Fi QR formatını (WIFI:T:S:P:H) kullanır.",
  formEmailLabel: "E-posta adresi",
  formEmailPlaceholder: "ornek@mail.com",
  formSubjectLabel: "Konu",
  formSubjectPlaceholder: "Opsiyonel konu satırı",
  formMessageLabel: "Mesaj",
  formMessagePlaceholder: "Opsiyonel mesaj",
  formPhoneLabel: "Telefon numarası",
  formPhoneHint: "Ülke kodunuzu ekleyin, örn. +90 555 123 45 67.",
  formPhonePlaceholder: "+90 555 123 45 67",
  formSmsPhoneLabel: "Telefon numarası",
  formSmsPhoneHint: "Mesajın gönderileceği numara.",
  formSmsPhonePlaceholder: "+90 555 123 45 67",
  formSmsMessageLabel: "Mesaj",
  formSmsMessagePlaceholder: "Opsiyonel önceden doldurulmuş mesaj",
  formFirstNameLabel: "Ad",
  formFirstNamePlaceholder: "Ada",
  formLastNameLabel: "Soyad",
  formLastNamePlaceholder: "Lovelace",
  formContactPhoneLabel: "Telefon",
  formContactPhonePlaceholder: "+90 555 123 45 67",
  formContactEmailLabel: "E-posta",
  formContactEmailPlaceholder: "ada@example.com",
  formCompanyLabel: "Şirket",
  formCompanyPlaceholder: "Analytical Engines Ltd.",
  formWebsiteLabel: "Web sitesi",
  formWebsitePlaceholder: "https://example.com",
  formAddressLabel: "Adres",
  formAddressPlaceholder: "Analytical Engine Row 12, Londra",
  formVcardNote: "vCard 3.0 olarak kodlanır — çoğu telefon rehberi uygulamasıyla çalışır.",
  formLatitudeLabel: "Enlem",
  formLatitudePlaceholder: "41.0082",
  formLongitudeLabel: "Boylam",
  formLongitudePlaceholder: "28.9784",
  formLocationNameLabel: "Konum adı (opsiyonel)",
  formLocationNamePlaceholder: "Galata Kulesi",
  formGeoNote: "geo URI olarak kodlanır, örn. geo:41.0082,28.9784.",

  custQrStyle: "QR Stili",
  custForeground: "Ön plan",
  custBackground: "Arka plan",
  custPattern: "Desen",
  custEyeStyle: "Bulucu / göz stili",
  custSquare: "Kare",
  custRounded: "Yuvarlak",
  custDots: "Nokta",
  custCircle: "Daire",
  custLogo: "Logo",
  custLogoAttached: "Logo eklendi",
  custLogoNote: "Hata düzeltme, QR'ınızın okunabilir kalması için Yüksek seviyeye çıkarıldı.",
  custRemoveLogo: "Logoyu kaldır",
  custRemoveLogoAria: "Logoyu kaldır",
  custLogoSize: "Logo boyutu",
  custLogoSizeHint: "QR kodun güvenilir şekilde taranması için logoyu ~%40 altında tutun.",
  custUploadLogo: "Logo yükle",
  custDragDropHint: "veya sürükle & bırak · PNG, JPG veya SVG · en fazla 5 MB",
  custReadingImage: "Görsel okunuyor…",
  custQuietZone: "Sessiz bölge",
  custMargin: "Kenar boşluğu",
  custQuietZoneHint: "QR kodun etrafındaki boşluk. Tarayıcılar için 4+ modül önerilir.",
  custErrorCorrection: "Hata düzeltme",
  custEcLow: "Düşük",
  custEcMedium: "Orta",
  custEcQuartile: "Çeyrek",
  custEcHigh: "Yüksek",
  custEcNote:
    "Daha yüksek seviyeler, özellikle logo varken QR'ın taranmasını kolaylaştırır — daha yoğun bir desen pahasına.",

  prevLivePreview: "Canlı Önizleme",
  prevReady: "İndirmeye hazır",
  prevCheckInput: "Girdinizi kontrol edin",
  prevAwaiting: "İçerik bekleniyor",
  prevEmptyTitle: "QR kodunuz burada görünecek",
  prevEmptySubtitle: "QR kod oluşturmak için içeriğinizi girin.",
  prevErrorSubtitle: "QR kodunuzu oluşturmak için işaretli alanı düzeltin.",
  prevPrivacy:
    "QR kodlarınız tarayıcınızda yerel olarak oluşturulur. Verilerinizi sunucuya yüklemiyoruz.",
  prevQrAria: "QR kod önizlemesi",

  dlPng: "PNG İndir",
  dlDownloading: "İndiriliyor…",
  dlSvg: "SVG",
  dlWebp: "WebP",
  dlCopy: "QR'ı Kopyala",
  dlCopied: "Kopyalandı!",
  dlFileNote: "Dosyalar qr-code.png / qr-code.svg / qr-code.webp olarak kaydedilir",
  dlPngAria: "QR kodunu PNG olarak indir",
  dlSvgAria: "QR kodunu SVG olarak indir",
  dlWebpAria: "QR kodunu WebP olarak indir",
  dlCopyAria: "QR kod görselini panoya kopyala",
  dlSuccess: (extension) => `QR kod ${extension} olarak indirildi`,

  histHeading: "Son QR Kodlar",
  histClear: "Geçmişi temizle",
  histClearAria: "QR geçmişini temizle",
  histEmpty: "Henüz QR kod yok — yukarıda bir tane oluşturun, burada görünecek.",
  histEntryType: (typeLabel) => `${typeLabel} QR kodu`,
  histRestoreAria: (typeLabel, label) => `${typeLabel} QR kodunu geri yükle: ${label}`,

  toastSettingsReset: "Ayarlar varsayılana sıfırlandı",
  toastLogoAdded: "Logo eklendi",
  toastRestored: "QR kod geçmişten geri yüklendi",
  toastHistoryCleared: "Geçmiş temizlendi",
  toastDownloadFailed: "İndirme başarısız — lütfen tekrar deneyin",
  toastCopyFailed: "Kopyalama başarısız — lütfen tekrar deneyin",
  toastClipboardUnavailable: "Bu tarayıcıda pano desteklenmiyor",
  toastNoImage: "Görsel oluşturulamadı",
  toastFileType: "Desteklenmeyen dosya türü — lütfen PNG, JPG veya SVG yükleyin",
  toastFileTooLarge: "Dosya çok büyük — en fazla 5 MB",
  toastFileUnreadable: "Görsel okunamadı — lütfen başka bir dosya deneyin",

  errInvalidUrl: "Geçersiz URL — lütfen https:// veya http:// ile başlayan geçerli bir URL girin",
  errInvalidEmail: "Geçersiz e-posta adresi",
  errInvalidPhone: "Geçersiz telefon numarası",
  errEnterBothCoords: "Enlem ve boylamı birlikte girin",
  errInvalidCoords:
    "Geçersiz koordinatlar — enlem -90 ile 90, boylam -180 ile 180 arasında olmalı",

  featHeading: "Daha iyi QR kodlar oluşturmak için ihtiyacınız olan her şey.",
  featFast: "Hızlı",
  featFastDesc: "QR kodları anında oluşturun — sayfa yenileme yok, bekleme yok.",
  featCustomizable: "Özelleştirilebilir",
  featCustomizableDesc: "Renkler, desenler, göz stilleri, logolar ve daha fazlası.",
  featPrivate: "Gizli",
  featPrivateDesc: "Verileriniz tarayıcınızda kalır. Hiçbir şey yüklenmez.",
  featFree: "Ücretsiz & Reklamsız",
  featFreeDesc: "Abonelik yok. Gizli ücret yok. Reklam yok. Sonsuza dek ücretsiz.",

  footTagline: "Create. Connect. Scan.",
  footDesc: "Ücretsiz ve reklamsız QR kod oluşturucu. Web için üretildi.",
  footFeatures: "Özellikler",
  footDocs: "Belgeler",
  footPrivacy: "Gizlilik",
  footGitHub: "GitHub",
  footRights: (year) => `© ${year} Zyqra. Tüm hakları saklıdır.`,
  footMadeBy: (name) => `${name} tarafından yapıldı`,
  footPrivacyLine: "QR kodlar yerel olarak oluşturulur — hiçbir şey sunucuya yüklenmez.",

  docsTitle: "Belgeler",
  docsSubtitle: "Zyqra hakkında bilmeniz gereken her şey.",
  docsGettingStarted: "Başlarken",
  docsStep1: "Bir içerik türü seçin — URL, Metin, Wi-Fi, E-posta ve daha fazlası.",
  docsStep2: "Alanları doldurun. QR kodunuz canlı olarak oluşur — oluştur butonu yok.",
  docsStep3: "Renkleri, deseni, göz stilini, logoyu ve sessiz bölgeyi özelleştirin.",
  docsStep4: "PNG, SVG veya WebP olarak indirin ya da görseli panonuza kopyalayın.",
  docsContentTypes: "Desteklenen içerik türleri",
  docsCtUrl: "QR kod ile herhangi bir web sitesine yönlendirin.",
  docsCtText: "Tarandığında anında görünen düz metin.",
  docsCtWifi: "Standart WIFI:T:S:P:H formatında ağ bilgilerini paylaşın.",
  docsCtEmail: "Konu ve gövdesi dolu bir mailto: taslağı açın.",
  docsCtPhone: "tel: ile arama başlatın.",
  docsCtSms: "Önceden doldurulmuş numara ve mesajla kısa mesaj açın.",
  docsCtContact: "Kişilerin sizi kaydetmesi için vCard 3.0.",
  docsCtLocation: "Cihazın harita uygulamasında açılan geo: URI'si.",
  docsCustomization: "Özelleştirme",
  docsCustomBody:
    "Ön plan ve arka plan renklerini değiştirin, modül desenini kare, yuvarlak ve nokta arasında seçin, göz stili belirleyin. Logo ekleyin — hata düzeltme otomatik olarak Yüksek seviyeye çıkar. Tarayıcıları memnun etmek için sessiz bölgeyi (kenar boşluğu) ayarlayın ve ihtiyacınıza uygun hata düzeltme seviyesini seçin.",
  docsPrivacy: "Gizlilik & veri",
  docsPrivacyBody:
    "QR kodlarınız tarayıcınızda yerel olarak oluşturulur. Verilerinizi sunucuya yüklemiyoruz. Tema tercihi, son ayarlarınız ve kısa bir son QR kod listesi yalnızca tarayıcınızın localStorage'ında tutulur — geçmişi istediğiniz zaman temizleyebilirsiniz ve hiçbir şey hiçbir yere gönderilmez.",

  ariaThemeDark: "Açık temaya geç",
  ariaThemeLight: "Koyu temaya geç",
  ariaOpenMenu: "Menüyü aç",
  ariaCloseMenu: "Menüyü kapat",
  ariaChangeLanguage: "Dili değiştir",
  ariaDismissToast: "Bildirimi kapat",
};

export const STRINGS: Record<Language, AppStrings> = { tr, en };
