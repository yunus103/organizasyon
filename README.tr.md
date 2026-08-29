<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/English_EN-374151?style=for-the-badge" alt="English" />
  </a>
  <img src="https://img.shields.io/badge/Türkçe_TR-2563EB?style=for-the-badge" alt="Türkçe" />
</div>

# Nilay Organizasyon — Kurumsal Headless Etkinlik Platformu

**Nilay Organizasyon** için özel olarak geliştirilmiş; lüks etkinlik prodüksiyonu, düğün/davet yönetimi ve kurumsal organizasyon süreçlerini dijitalleştiren yüksek performanslı headless web platformu. Next.js 16 App Router mimarisi ile Sanity v3 Headless CMS entegrasyonu sayesinde gerçek zamanlı içerik yönetimi, anlık önbellek yenileme (On-Demand ISR) ve ilçe bazlı gelişmiş yerel SEO sağlar.

---

## 🏛️ Mimari ve Teknoloji Yığını

| Katman | Teknoloji | Açıklama / Amaç |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | React 19, Server Components (RSC), Server Actions |
| **Headless CMS** | **Sanity v3 (Entegre Studio)** | Gömülü Studio (`/studio`), GROQ sorguları, Medya yönetimi |
| **Stil & Tasarım** | **Tailwind CSS v4** | Modern utility CSS, `@tailwindcss/typography`, Radix UI Slot |
| **Tipografi** | **Next Font (`Inter`, `Playfair Display`)** | Sıfır CLS (Cumulative Layout Shift) ile optimize web fontları |
| **Animasyon & Slider** | **Framer Motion & Embla Carousel** | Akıcı mikro etkileşimler, responsive kaydırıcı modülleri |
| **Önbellek & Senkronizasyon** | **Next.js `revalidateTag` & Webhooks** | Sanity webhook tetiklemeli anlık (on-demand) ISR önbellek revalidasyonu |
| **Tip Güvenliği** | **TypeScript 5** | Şemalar, GROQ sorguları ve Server Actions için uçtan uca tip güvenliği |
| **SEO & Yapılandırılmış Veri** | **Metadata API & Schema.org JSON-LD** | `ProfessionalService` yapılandırılmış şeması, dinamik XML sitemap |

---

## ✨ Temel Modüller ve Fonksiyonel Özellikler

- **Dinamik Mega Menü & Kategori Yönetimi**: Sanity CMS üzerinden beslenen, ilişkisel kategorilere sahip çok katmanlı hizmet navigasyonu.
- **Hizmet Kataloğu & Detay Sayfaları**: Görsel odak noktası (`objectFit`, `objectPosition`) ayarlanabilir yüksek çözünürlüklü galeriler ve zengin içerik blokları.
- **Etkinlik Portfolyosu (Etkinliklerimiz)**: Gerçekleştirilen projelerin detayları, fotoğraf galerileri ve ilişkili hizmet bağlantıları.
- **Blog & İçerik Merkezi**: Kategori filtreleme, özel SEO meta etiketleri, zengin metin düzenleyici ve ilişkili yazılar modülü.
- **Entegre Sanity Studio (`/studio`)**: Türkçe dil destekli (`@sanity/locale-tr-tr`), medya kütüphanesi ve GROQ Vision aracı içeren dahili yönetim paneli.
- **Hızlı İletişim & Lead Dönüşümü**: Mobil ve masaüstü için optimize edilmiş kayan WhatsApp, telefon ve sosyal medya iletişim araçları.

---

## 🧭 Yönlendirme (Routing) ve Türkçe Karakter Mimarisi

- **Route Groups `(website)`**: Kullanıcı arayüzü sayfaları ile dahili Sanity Studio (`/studio/[[...index]]`) rotalarını birbirinden tamamen izole eden temiz App Router mimarisi.
- **Özel Türkçe Slugify Algoritması**: Sanity şemalarındaki tüm slug alanlarında Türkçe karakterleri (`ç`, `ğ`, `ı`, `ö`, `ş`, `ü`, `İ`) SEO uyumlu ve temiz URL yapılarına dönüştüren `turkishSlugify` motoru.
- **Türkçe Panel Optimizasyonu**: İçerik yöneticileri ve organizasyon ekipleri için tamamen Türkçeleştirilmiş CMS arayüzü.

---

## ⚡ Önbellekleme, API, ISR ve SEO Standartları

- **Anlık On-Demand ISR (Incremental Static Regeneration)**:
  - Sanity Webhook entegrasyonu (`/api/revalidate`), HMAC SHA-256 imzalarını (`@sanity/webhook`) doğrular.
  - İçerik yayınlandığı anda sadece ilgili etiketler (`service`, `project`, `post`, `companyInfo`) ve spesifik döküman slug'ları (`service:slug`) anında revalidate edilir.
- **Arama Motoru Optimizasyonu (SEO)**:
  - **Dinamik Sitemap (`/sitemap.xml`)**: Statik rotalar ve Sanity'den çekilen tüm dinamik sayfalar için otomatik güncellenen XML site haritası.
  - **Robots.txt (`/robots.txt`)**: API ve Studio rotalarını tarayıcı botlardan koruyan dinamik kurallar.
  - **Yapılandırılmış JSON-LD Verisi**: İstanbul'un 39 ilçesini (`areaServed`) kapsayan, coğrafi koordinat ve iletişim bilgilerini içeren `ProfessionalService` Schema.org entegrasyonu.
  - **Dinamik Meta Veriler**: Sayfa bazlı otomatik üretilen Open Graph, Canonical URL ve Twitter kartları.

---

## 📁 Proje Dizin Yapısı

```text
├── src/
│   ├── app/
│   │   ├── (website)/             # Kullanıcı arayüzü rotaları (Ana Sayfa, Hakkımızda, Hizmetler, Etkinlikler, Blog, İletişim)
│   │   │   ├── blog/              # Blog listesi ve kategori filtreleri
│   │   │   ├── etkinliklerimiz/   # Etkinlik portfolyosu ve detay sayfaları
│   │   │   ├── hakkimizda/        # Kurumsal hakkımızda sayfası
│   │   │   ├── hizmetler/         # Hizmet kataloğu ve detay sayfaları
│   │   │   ├── iletisim/          # İletişim ve konum sayfası
│   │   │   └── [slug]/            # Dinamik slug rotası
│   │   ├── api/
│   │   │   └── revalidate/        # HMAC doğrulamalı Sanity webhook önbellek yenileme uç noktası
│   │   ├── studio/                # Entegre Sanity Studio rotası
│   │   ├── actions.ts             # Server Actions (sayfalanmış sorgular, veri işlemleri)
│   │   ├── layout.tsx             # Font ve temel meta verileri içeren ana layout
│   │   ├── robots.ts              # Dinamik robots.txt yapılandırması
│   │   └── sitemap.ts             # Dinamik XML site haritası üreticisi
│   ├── components/
│   │   ├── blog/                  # Blog kartları ve istemci listeleme bileşenleri
│   │   ├── layout/                # Header, Footer, MegaMenu, PageHero, FloatingContact
│   │   ├── sections/              # Hero, Hizmetler, Projeler, Hakkımızda, İletişim bölümleri
│   │   └── ui/                    # Yeniden kullanılabilir UI bileşenleri (Button, Modal, Image, Heading)
│   ├── lib/                       # Yardımcı fonksiyonlar ve utils
│   ├── sanity/
│   │   ├── lib/                   # Sanity client, GROQ sorguları, görsel URL oluşturucu, slugify
│   │   └── schemaTypes/           # İçerik şemaları (companyInfo, heroSlide, service, project, post)
│   └── types/                     # TypeScript tip tanımları ve arayüzler
├── sanity.config.ts               # Sanity Studio konfigürasyonu ve eklentileri
└── next.config.ts                 # Next.js platform ayarları
```

---

## 🔒 Güvenlik ve Mühendislik Standartları

- **Sıfır Sızıntı Çevre Değişkeni Yönetimi**: Tüm `.env*` varyasyonlarını git takibinden ve indeksinden hariç tutan kapsamlı `.gitignore` kuralları.
- **Kriptografik Webhook Doğrulaması**: Yetkisiz önbellek temizleme isteklerini engelleyen HMAC SHA-256 `isValidSignature` kontrolü.
- **Uçtan Uca Tip Güvenliği**: CMS veri modelleri ile ön yüz React bileşenleri arasında %100 uyumlu TypeScript tip sözleşmeleri.
