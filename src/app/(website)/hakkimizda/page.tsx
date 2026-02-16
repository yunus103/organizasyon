import { AboutSection } from "@/components/sections/AboutSection";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Şirketimiz hakkında detaylı bilgi.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="Hakkımızda" 
        breadcrumbs={[{ label: "Hakkımızda" }]} 
      />
      <AboutSection showLink={false} />
    </>
  );
}
