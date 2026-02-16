import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import { serviceBySlugQuery, servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services as mockServices } from "@/data/mockData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] });
  // Fallback to mock data if no services found (during setup)
  const source = services.length > 0 ? services : mockServices;
  
  return source.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await sanityFetch<Service>({ 
    query: serviceBySlugQuery, 
    params: { slug },
    tags: [`service:${slug}`]
  });
  
  // Minimal fallback metadata
  if (!service) return { title: "Hizmet Bulunamadı" };
  
  return {
    title: `${service.title} | Reel Organizasyon`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await sanityFetch<Service>({ 
    query: serviceBySlugQuery, 
    params: { slug },
    tags: [`service:${slug}`]
  });

  const mockService = mockServices.find((s) => s.slug === slug);
  const displayService = service || mockService;

  if (!displayService) {
    notFound();
  }

  return (
    <article className="pb-16 md:pb-24">
      <PageHero 
        title={displayService.title} 
        breadcrumbs={[
            { label: "Hizmetler", href: "/hizmetler" },
            { label: displayService.title }
        ]} 
      />
      <Container className="mt-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden shadow-xl bg-muted">
                {displayService.mainImage ? (
                    <Image
                        src={displayService.mainImage}
                        alt={displayService.mainImageAlt || displayService.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                        <span className="text-secondary/20 font-serif font-bold text-6xl transform -rotate-12 italic select-none text-center px-4">
                            {displayService.title}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center">
                <SectionHeading title={displayService.title} subtitle="Hizmet Detayları" center={false} />
                <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary">
                  {/* Handle both HTML string (mock) and Portable Text (Sanity) */}
                  {displayService.content && typeof displayService.content === 'string' ? (
                       <div dangerouslySetInnerHTML={{ __html: displayService.content }} />
                  ) : (
                       // @ts-ignore - simple fallback for portable text typing
                       <PortableText value={displayService.content as any} />
                  )}
                </div>
                
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
