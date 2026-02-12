import { sanityFetch } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services as mockServices } from "@/data/mockData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Sunduğumuz profesyonel organizasyon hizmetleri.",
};

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] });

  if (services.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <Container>
           <h1 className="text-3xl font-bold">Henüz hizmet eklenmemiş.</h1>
           <p className="text-muted-foreground mt-4">Lütfen daha sonra tekrar kontrol ediniz.</p>
        </Container>
      </div>
    );
  }

  const displayServices = services;

  return (
    <div className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <SectionHeading
          title="Tüm Hizmetlerimiz"
          subtitle="Sizin İçin Neler Yapabiliriz?"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </div>
  );
}
