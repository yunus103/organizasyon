import { sanityFetch } from "@/sanity/lib/client";
import { heroSlidesQuery } from "@/sanity/lib/queries";
import { HeroSlide } from "@/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function Home() {
  const slides = await sanityFetch<HeroSlide[]>({ 
    query: heroSlidesQuery, 
    tags: ["heroSlide"] 
  });

  return (
    <>
      <HeroSection slides={slides} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
