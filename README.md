# Zyqra — Ücretsiz QR Kod Oluşturucu

> **Create. Connect. Scan.**

Next.js ile geliştirilmiş, premium görünümlü bir QR kod oluşturucu. QR kodlarınızı tamamen tarayıcınızda oluşturun, özelleştirin ve indirin — backend yok, ücretli API yok, hesap gerekmez, **reklam yok**.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 📖 Proje Hakkında

**Zyqra**, kullanıcıların QR kodlarını özgürce oluşturmasına, özelleştirmesine ve indirmesine olanak tanıyan ücretsiz bir web uygulamasıdır. Tüm işlemler istemci tarafında gerçekleşir; verileriniz hiçbir zaman sunucuya gönderilmez.

## ✨ Özellikler

- 🌍 **Türkçe + İngilizce** — bayrak ikonlu dil değiştirici (varsayılan Türkçe)
- 📋 **8 içerik türü** — URL, Metin, Wi-Fi, E-posta, Telefon, SMS, Kişi (vCard 3.0) ve Konum (geo URI)
- ⚡ **Anlık önizleme** — siz yazarken QR kod anında oluşturulur, buton gerekmez
- 🎨 **Tam özelleştirme** — ön plan/arka plan renkleri, kare/yuvarlak/nokta deseni, göz stilleri, kenar boşluğu, hata düzeltme seviyesi (L/M/Q/H)
- 🖼️ **Logo yükleme** — PNG, JPG veya SVG (maks. 5 MB), boyut kaydırıcısı ile; taranabilirlik korunur
- 💾 **İndirme seçenekleri** — PNG, SVG ve WebP, istemci tarafında Blob URL ile oluşturulur
- 📋 **Panoya kopyalama** — QR görselini PNG olarak kopyala
- 🕘 **Yerel geçmiş** — son 8 QR kodu, yalnızca `localStorage`'da saklanır (geri yüklenebilir, temizlenebilir)
- 🌙 **Koyu/Açık tema** — varsayılan koyu, `localStorage`'a kaydedilir, yüklemede flaş yok
- 🔒 **Gizlilik öncelikli, ücretsiz ve reklamsız** — verileriniz tarayıcınızı terk etmez
- 📱 Duyarlı tasarım, klavye erişilebilirliği, SEO + Open Graph meta verileri

## 🛠️ Kullanılan Teknolojiler

| Katman | Tercih |
|---|---|
| Framework | Next.js 16 (App Router, statik çıktı) |
| Dil | TypeScript (strict) |
| Stil | Tailwind CSS v4 |
| İkonlar | lucide-react |
| i18n | Hafif özel store (useSyncExternalStore), TR + EN sözlükleri |
| QR motoru | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) v1.9 (MIT) — SVG/canvas ile tam stil destekli istemci taraflı QR oluşturma |

## 🗂️ Proje Yapısı

```
app/
├── layout.tsx            # Metadata, fontlar, tema bootstrap, arka plan
├── page.tsx              # Ana sayfa bileşimi
├── docs/page.tsx         # Belgeler + gizlilik sayfası (i18n)
├── globals.css           # Tasarım token'ları, koyu/açık temalar, temel stiller
├── icon.svg              # Favicon
└── opengraph-image.tsx   # Otomatik oluşturulan sosyal paylaşım görseli
components/
├── Header.tsx, Hero.tsx, Footer.tsx, LanguageToggle.tsx, ThemeToggle.tsx
├── QRGenerator.tsx       # State, doğrulama, geçmiş, kalıcılık
├── ContentTypeSelector.tsx, ContentForm.tsx
├── CustomizationPanel.tsx, LogoUploader.tsx
├── QRPreview.tsx         # Anlık QR render (qr-code-styling)
├── DownloadButtons.tsx   # PNG/SVG/WebP indirme + kopyalama
├── History.tsx, FeatureCards.tsx
└── ui/                   # Button, Input, Card, Toast, Flags, …
lib/
├── i18n/                 # TR + EN dize sözlükleri + dil store'u
├── qr/                   # Seçenek eşlemesi + payload oluşturucular (Wi-Fi, vCard, geo, …)
├── validation/           # URL/e-posta/telefon/koordinat doğrulama (i18n hatalar)
├── storage/              # localStorage (tema, dil, ayarlar, geçmiş)
└── constants.ts, utils.ts, typeMeta.tsx
types/
└── qr.ts                 # Ortak tipler
scripts/                  # verify.ts, verify-qr.ts (çevrimdışı kontroller)
```

## 🚀 Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Yerel olarak çalıştırın
npm run dev        # http://localhost:3000

# Lint + tip kontrolü + doğrulama
npm run lint
npm run verify

# Üretim build'i
npm run build
npm start
```

> `npm run verify` — URL/Wi-Fi/E-posta/vCard/geo payload'ları için birim tarzı kontroller çalıştırır ve `qr-code-styling` üzerinden QR kod render'ını test eder.

## 🔒 Gizlilik

QR kodlar tamamen tarayıcıda oluşturulur. Tema tercihi, dil, son ayarlar ve QR geçmişi yalnızca `localStorage`'da tutulur; hiçbir veri dışarıya gönderilmez.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.

1. Bu depoyu fork'layın
2. Yeni bir branch oluşturun (`git checkout -b ozellik/yeni-ozellik`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push'layın (`git push origin ozellik/yeni-ozellik`)
5. Bir Pull Request açın

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır — dilediğiniz gibi kullanabilir, değiştirebilir ve dağıtabilirsiniz.

---

<p align="center">Made with ❤️ by <a href="https://github.com/caglarsapmaz">caglarsapmaz</a></p>
