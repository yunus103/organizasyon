import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/data/mockData";

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <SectionHeading
          title="Hizmetlerimiz"
          subtitle="Profesyonel Çözümler"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
