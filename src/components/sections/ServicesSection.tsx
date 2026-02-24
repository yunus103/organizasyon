import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";

export async function ServicesSection() {
  const services = await sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] });
  
  if (services.length === 0) return null;
  
  // Filter for homepage if marked, otherwise just show top 6
  const featuredServices = services.filter((s) => (s as Service & { showOnHome?: boolean }).showOnHome);
  const displayServices = featuredServices.length > 0 ? featuredServices : services.slice(0, 6);
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-muted/20">
      <Container>
        <SectionHeading
          title="Hizmetlerimiz"
          subtitle="Profesyonel Çözümler"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {displayServices.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link href="/hizmetler" className="gap-2">Tüm Hizmetleri Gör <ArrowRight size={16}/></Link>
            </Button>
        </div>
      </Container>
    </section>
  );
}
