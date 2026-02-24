import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bizimle iletişime geçin.",
};

import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";

export default async function ContactPage() {
  const companyInfo = await sanityFetch<CompanyInfo>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  return (
    <>
      <PageHero 
        title="İletişim" 
        breadcrumbs={[{ label: "İletişim" }]} 
      />
      <ContactSection />
      {companyInfo?.contact?.googleMapsEmbed && (
        <section className="w-full h-[400px] md:h-[500px]">
          <iframe
            src={companyInfo.contact.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-0"
          ></iframe>
        </section>
      )}
    </>
  );
}
