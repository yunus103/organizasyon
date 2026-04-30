import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await sanityFetch<CompanyInfo | null>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  const name = companyInfo?.name || "Organizasyon";
  const tagline = companyInfo?.tagline || "";
  const description = companyInfo?.description || "";
  const logo = companyInfo?.logo;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: tagline ? `${name} | ${tagline}` : name,
      template: `%s | ${name}`,
    },
    description: description,
    icons: logo ? {
      icon: logo,
      shortcut: logo,
      apple: logo,
    } : undefined,
  };
}

import { FloatingContact } from "@/components/layout/FloatingContact";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyInfo = await sanityFetch<CompanyInfo | null>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";

  const address = companyInfo?.contact?.address || "Tevfikbey mahallesi 1, Kaya Sk. no4 D:18, 34290 Küçükçekmece/İstanbul, Türkiye";
  const phone = companyInfo?.contact?.phone || "+905496593444";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: companyInfo?.name || "Nilay Organizasyon",
    url: baseUrl,
    logo: companyInfo?.logo || `${baseUrl}/logo.png`,
    image: companyInfo?.logo || `${baseUrl}/logo.png`,
    description: companyInfo?.description || "İstanbul genelinde profesyonel organizasyon hizmetleri.",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "İstanbul",
      addressRegion: "Marmara",
      postalCode: "34290",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.0028", // Küçükçekmece approx
      longitude: "28.7816",
    },
    telephone: phone,
    priceRange: "$$",
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      { "@type": "AdministrativeArea", name: "Adalar" },
      { "@type": "AdministrativeArea", name: "Arnavutköy" },
      { "@type": "AdministrativeArea", name: "Ataşehir" },
      { "@type": "AdministrativeArea", name: "Avcılar" },
      { "@type": "AdministrativeArea", name: "Bağcılar" },
      { "@type": "AdministrativeArea", name: "Bahçelievler" },
      { "@type": "AdministrativeArea", name: "Bakırköy" },
      { "@type": "AdministrativeArea", name: "Başakşehir" },
      { "@type": "AdministrativeArea", name: "Bayrampaşa" },
      { "@type": "AdministrativeArea", name: "Beşiktaş" },
      { "@type": "AdministrativeArea", name: "Beykoz" },
      { "@type": "AdministrativeArea", name: "Beylikdüzü" },
      { "@type": "AdministrativeArea", name: "Beyoğlu" },
      { "@type": "AdministrativeArea", name: "Büyükçekmece" },
      { "@type": "AdministrativeArea", name: "Çatalca" },
      { "@type": "AdministrativeArea", name: "Çekmeköy" },
      { "@type": "AdministrativeArea", name: "Esenler" },
      { "@type": "AdministrativeArea", name: "Esenyurt" },
      { "@type": "AdministrativeArea", name: "Eyüpsultan" },
      { "@type": "AdministrativeArea", name: "Fatih" },
      { "@type": "AdministrativeArea", name: "Gaziosmanpaşa" },
      { "@type": "AdministrativeArea", name: "Güngören" },
      { "@type": "AdministrativeArea", name: "Kadıköy" },
      { "@type": "AdministrativeArea", name: "Kağıthane" },
      { "@type": "AdministrativeArea", name: "Kartal" },
      { "@type": "AdministrativeArea", name: "Küçükçekmece" },
      { "@type": "AdministrativeArea", name: "Maltepe" },
      { "@type": "AdministrativeArea", name: "Pendik" },
      { "@type": "AdministrativeArea", name: "Sancaktepe" },
      { "@type": "AdministrativeArea", name: "Sarıyer" },
      { "@type": "AdministrativeArea", name: "Silivri" },
      { "@type": "AdministrativeArea", name: "Sultanbeyli" },
      { "@type": "AdministrativeArea", name: "Sultangazi" },
      { "@type": "AdministrativeArea", name: "Şile" },
      { "@type": "AdministrativeArea", name: "Şişli" },
      { "@type": "AdministrativeArea", name: "Tuzla" },
      { "@type": "AdministrativeArea", name: "Ümraniye" },
      { "@type": "AdministrativeArea", name: "Üsküdar" },
      { "@type": "AdministrativeArea", name: "Zeytinburnu" }
    ],
    sameAs: [
      companyInfo?.contact?.socials?.instagram,
      companyInfo?.contact?.socials?.facebook,
      companyInfo?.contact?.socials?.twitter,
      companyInfo?.contact?.socials?.linkedin,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContact 
        phone={companyInfo?.contact?.phone} 
        whatsapp={companyInfo?.contact?.whatsapp} 
        instagram={companyInfo?.contact?.socials?.instagram}
      />
    </>
  );
}
