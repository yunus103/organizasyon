import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/data/mockData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Reel Organizasyon",
  description: "Düğün, nişan, kurumsal etkinlikler ve daha fazlası için profesyonel organizasyon hizmetlerimiz.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <SectionHeading
          title="Tüm Hizmetlerimiz"
          subtitle="Sizin İçin Neler Yapabiliriz?"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </div>
  );
}
