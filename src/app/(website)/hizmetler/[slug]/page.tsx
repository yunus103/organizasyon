import { notFound } from "next/navigation";

import { PortableText } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import { serviceBySlugQuery, servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";
import { Container } from "@/components/ui/Container";

import { services as mockServices } from "@/data/mockData";

import { PageHero } from "@/components/layout/PageHero";
import { ServiceSidebar } from "@/components/layout/ServiceSidebar";
import { ServiceGallery } from "@/components/ui/ServiceGallery";

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
    title: `${service.title} | Nilay Organizasyon`,
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

  const allServices = await sanityFetch<Service[]>({ 
      query: servicesQuery, 
      tags: ["service"] 
  });

  if (!displayService) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: displayService.title,
    description: displayService.shortDescription,
    provider: {
      "@type": "Organization",
      name: "Nilay Organizasyon",
      url: baseUrl,
    },
    url: `${baseUrl}/hizmetler/${displayService.slug}`,
    image: displayService.mainImage,
  };

  return (
    <article className="pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero 
        title={displayService.title} 
        breadcrumbs={[
            { label: "Hizmetler", href: "/hizmetler" },
            { label: displayService.title }
        ]} 
      />
      <Container className="mt-12">
        <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
                {/* Main Image / Gallery */}
                {displayService.mainImage ? (
                    <ServiceGallery 
                        images={[
                            { url: displayService.mainImage, alt: displayService.mainImageAlt || displayService.title },
                            ...(displayService.gallery || [])
                        ]} 
                    />
                ) : (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                            <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-tight text-center px-4">{displayService.title}</h1>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-6">{displayService.title}</h1>
                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary">
                        {/* Handle both HTML string (mock) and Portable Text (Sanity) */}
                        {displayService.content && typeof displayService.content === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: displayService.content }} />
                        ) : (
                            <PortableText 
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                value={displayService.content as any} 
                                components={{
                                    block: {
                                        h1: ({children}) => <h1 className="text-3xl font-bold font-serif text-primary mt-8 mb-4">{children}</h1>,
                                        h2: ({children}) => <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">{children}</h2>,
                                        h3: ({children}) => <h3 className="text-xl font-bold font-serif text-primary mt-6 mb-3">{children}</h3>,
                                        normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                                    },
                                    list: {
                                        bullet: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                                        number: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                                    },
                                    marks: {
                                        strong: ({children}) => <strong className="font-bold text-primary">{children}</strong>,
                                        link: ({children, value}) => (
                                            <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">
                                                {children}
                                            </a>
                                        ),
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-4 pl-8 border-l border-gray-100">
                <div className="sticky top-24">
                   <ServiceSidebar services={allServices} currentSlug={slug} />
                </div>
            </div>
        </div>
      </Container>
    </article>
  );
}
