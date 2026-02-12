import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/mockData";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: ServiceDetailPageProps) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Hizmet Bulunamadı" };
  
  return {
    title: `${service.title} | Reel Organizasyon`,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params: { slug } }: ServiceDetailPageProps) {
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <article className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0 hover:pl-2 transition-all">
                <Link href="/hizmetler" className="gap-2 text-muted-foreground"><ArrowLeft size={16}/> Tüm Hizmetlere Dön</Link>
            </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                    src={service.mainImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="flex flex-col justify-center">
                <SectionHeading title={service.title} subtitle="Hizmet Detayları" center={false} />
                <div 
                    className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary"
                    dangerouslySetInnerHTML={{ __html: service.content }} 
                />
                
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/iletisim">Hemen Teklif Alın</Link>
                    </Button>
                </div>
            </div>
        </div>
      </Container>
    </article>
  );
}
