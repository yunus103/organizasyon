import { sanityFetch } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services as mockServices } from "@/data/mockData";

export async function ServicesSection() {
  const services = await sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] });
  
  if (services.length === 0) return null;
  
  const displayServices = services;
  
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <SectionHeading
          title="Hizmetlerimiz"
          subtitle="Profesyonel Çözümler"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
