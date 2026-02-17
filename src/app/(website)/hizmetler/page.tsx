import { sanityFetch } from "@/sanity/lib/client";
import { paginatedServicesQuery, categoriesQuery } from "@/sanity/lib/queries";
import { Service, Category } from "@/types";
import { Container } from "@/components/ui/Container";
import { ServicesFeed } from "@/components/sections/ServicesFeed";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Sunduğumuz profesyonel organizasyon hizmetleri.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function ServicesPage() {
  // Fetch categories for tabs
  const categories = await sanityFetch<Category[]>({ query: categoriesQuery, tags: ["category"] });
  
  // Fetch initial services (first 12)
  const initialServices = await sanityFetch<Service[]>({ 
    query: paginatedServicesQuery, 
    params: { category: null, start: 0, end: 11 },
    tags: ["service"] 
  });

  return (
    <>
      <PageHero 
        title="Hizmetlerimiz" 
        breadcrumbs={[{ label: "Hizmetler" }]} 
      />
      
      <div className="pb-16 md:pb-24 md:-mt-8 relative z-20">
        <Container>
          <div className="bg-white rounded-3xl shadow-xl px-2 py-8 md:p-12 mb-12">
             <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                İhtiyacınız olan organizasyon türünü seçerek ilgili hizmetlerimize göz atabilirsiniz.
             </p>
             <ServicesFeed 
                initialServices={initialServices} 
                categories={categories} 
             />
          </div>
        </Container>
      </div>
    </>
  );
}
