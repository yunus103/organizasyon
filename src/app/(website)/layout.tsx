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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo?.name || "Nilay Organizasyon",
    url: baseUrl,
    logo: companyInfo?.logo,
    description: companyInfo?.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo?.contact?.address,
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo?.contact?.phone,
      contactType: "customer service",
    },
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
