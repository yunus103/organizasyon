<div align="right">
  <img src="https://img.shields.io/badge/English_EN-2563EB?style=for-the-badge" alt="English" />
  <a href="./README.tr.md">
    <img src="https://img.shields.io/badge/Türkçe_TR-374151?style=for-the-badge" alt="Türkçe" />
  </a>
</div>

# Nilay Organizasyon — Enterprise Headless Event Platform

A high-performance, headless web platform engineered for **Nilay Organizasyon**, delivering luxury event production, wedding management, and corporate organization services. Built with a decoupled architecture pairing Next.js 16 App Router with Sanity v3 Headless CMS for real-time editorial workflows, instant on-demand cache revalidation, and district-level local SEO.

---

## 🏛️ Architecture & Tech Stack

| Layer | Technology | Details / Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | React 19, Server Components (RSC), Server Actions |
| **Headless CMS** | **Sanity v3 (Embedded Studio)** | Embedded Studio (`/studio`), GROQ queries, Media management |
| **Styling & Design** | **Tailwind CSS v4** | Modern utility CSS, `@tailwindcss/typography`, Radix UI Slot |
| **Typography** | **Next Font (`Inter`, `Playfair Display`)** | Optimized web fonts, zero Cumulative Layout Shift (CLS) |
| **Animation & Carousel** | **Framer Motion & Embla Carousel** | Smooth micro-interactions, responsive carousel sliders |
| **Cache & Data Sync** | **Next.js `revalidateTag` & Webhooks** | On-demand ISR triggered via Sanity webhooks |
| **Type Safety** | **TypeScript 5** | End-to-end typed schemas, queries, and Server Actions |
| **SEO & Structured Data** | **Metadata API & Schema.org JSON-LD** | `ProfessionalService` structured schema, dynamic XML sitemaps |

---

## ✨ Core Modules & Functional Features

- **Dynamic Mega Menu & Category Directory**: Multi-tiered service navigation dynamically hydrated from Sanity CMS with category relations.
- **Service Catalog & Showcase**: High-resolution galleries with responsive image focal points (`objectFit`, `objectPosition`) and dynamic content blocks.
- **Event Portfolio (Etkinliklerimiz)**: Curated event showcase linking real-world case studies to relevant organization services.
- **Editorial Blog System**: Content hub supporting categories, SEO metadata, rich text body blocks, and related article recommendations.
- **Embedded Sanity Studio (`/studio`)**: In-app CMS environment featuring Turkish localization (`@sanity/locale-tr-tr`), media asset management, and GROQ Vision tooling.
- **Floating Conversion & Direct Contact**: Instant WhatsApp, phone, and social interaction suite optimized for high lead conversion.

---

## 🧭 Routing & Localization Architecture

- **Route Groups `(website)`**: Clean architectural separation of consumer-facing pages from administrative studio routes (`/studio/[[...index]]`).
- **Native Turkish Slugification**: Custom `turkishSlugify` algorithm transforming Turkish diacritics (`ç`, `ğ`, `ı`, `ö`, `ş`, `ü`, `İ`) into standardized, SEO-friendly URI paths across all Sanity schemas.
- **Localized CMS Management**: Fully localized Turkish editorial interface for internal event coordinators and content editors.

---

## ⚡ Caching, API, ISR & SEO Standards

- **On-Demand ISR (Incremental Static Regeneration)**:
  - Route handler (`/api/revalidate`) verifies HMAC SHA-256 signatures via `@sanity/webhook`.
  - Targeted cache invalidation using `revalidateTag` per document type (`service`, `project`, `post`, `companyInfo`) and individual slug tags (`service:slug`).
- **Search Engine Optimization (SEO)**:
  - **Dynamic Sitemap (`/sitemap.xml`)**: Automated crawler index covering all static routes and CMS-published entities with dynamic priorities and change frequencies.
  - **Robots.txt (`/robots.txt`)**: Controlled crawling directives protecting API and studio routes.
  - **Structured JSON-LD**: Comprehensive `ProfessionalService` schema with geographical coordinates and district-level `areaServed` coverage across all 39 Istanbul districts.
  - **Metadata Engine**: Server-rendered Open Graph, canonical links, and dynamic titles/descriptions.

---

## 📁 Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── (website)/             # Public route group (Home, About, Services, Events, Blog, Contact)
│   │   │   ├── blog/              # Blog listing and category filters
│   │   │   ├── etkinliklerimiz/   # Event portfolio & detail pages
│   │   │   ├── hakkimizda/        # About page
│   │   │   ├── hizmetler/         # Service directory & detail pages
│   │   │   ├── iletisim/          # Contact page
│   │   │   └── [slug]/            # Dynamic slug route
│   │   ├── api/
│   │   │   └── revalidate/        # HMAC-signed Sanity webhook revalidation endpoint
│   │   ├── studio/                # Embedded Sanity Studio route
│   │   ├── actions.ts             # Server Actions (paginated queries, data mutations)
│   │   ├── layout.tsx             # Root HTML layout with Google Fonts
│   │   ├── robots.ts              # Dynamic robots.txt configuration
│   │   └── sitemap.ts             # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── blog/                  # Blog cards, listing clients
│   │   ├── layout/                # Header, Footer, MegaMenu, PageHero, FloatingContact
│   │   ├── sections/              # Hero, Services, Projects, About, Contact sections
│   │   └── ui/                    # Reusable atomic UI components (Button, Modal, Image, Heading)
│   ├── lib/                       # Utility helpers & class mergers
│   ├── sanity/
│   │   ├── lib/                   # Sanity client, GROQ queries, image builder, slugifier
│   │   └── schemaTypes/           # Content schemas (companyInfo, heroSlide, service, project, post)
│   └── types/                     # TypeScript domain interfaces
├── sanity.config.ts               # Sanity Studio configuration & plugins
└── next.config.ts                 # Next.js platform configuration
```

---

## 🔒 Security & Engineering Standards

- **Zero Exposure Credential Management**: Comprehensive `.gitignore` protecting all `.env*` variations against git staging and version tracking.
- **Cryptographic Webhook Verification**: `isValidSignature` HMAC validation ensuring only authenticated Sanity CMS events trigger cache invalidation.
- **Type-Safe Contract**: Strict TypeScript interfaces bridging CMS data models with frontend React Server Components.
