import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bizimle iletişime geçin.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="İletişim" 
        breadcrumbs={[{ label: "İletişim" }]} 
      />
      <ContactSection />
    </>
  );
}
