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

  return {
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

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContact 
        phone={companyInfo?.contact?.phone} 
        whatsapp={companyInfo?.contact?.whatsapp} 
      />
    </>
  );
}
