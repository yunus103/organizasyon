import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/lib/queries";
import { Project, Service } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects as mockProjects } from "@/data/mockData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] });
  const source = projects.length > 0 ? projects : mockProjects;
  
  return source.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await sanityFetch<Project>({ 
    query: projectBySlugQuery, 
    params: { slug },
    tags: [`project:${slug}`]
  });

  if (!project) return { title: "Proje Bulunamadı" };
  
  return {
    title: `${project.title} | Reel Organizasyon`,
    description: project.description,
  };
}

// Helper to render portable text
import { PortableText } from "next-sanity";


// Fetch other projects for sidebar
async function getOtherProjects(currentId: string) {
    const query = `*[_type == "project" && _id != $currentId] | order(date desc)[0...5] {
        _id,
        title,
        "slug": slug.current,
        category,
        "coverImage": coverImage.asset->url
    }`;
    return await sanityFetch<Project[]>({ query, params: { currentId } });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await sanityFetch<Project>({ 
    query: projectBySlugQuery, 
    params: { slug },
    tags: [`project:${slug}`]
  });

  const mockProject = mockProjects.find((p) => p.slug === slug);
  const displayProject = project || mockProject;

  if (!displayProject) {
    notFound();
  }

  // Fetch sidebar data if it's a real project
  let otherProjects: Project[] = [];
  if (project) {
     otherProjects = await getOtherProjects(project._id || "");
  } else {
     otherProjects = mockProjects.filter(p => p.slug !== slug).slice(0, 5);
  }

  return (
    <article className="pb-16 md:pb-24">
      <PageHero 
        title={displayProject.title} 
        breadcrumbs={[
            { label: "Etkinliklerimiz", href: "/etkinliklerimiz" },
            { label: displayProject.title }
        ]} 
      />
      <Container className="mt-12">
        <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto space-y-4">
                 <span className="inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold uppercase tracking-wider text-secondary">
                    {displayProject.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-[1.2] md:leading-tight">{displayProject.title}</h1>
                
                <div className="flex items-center justify-center gap-6 text-muted-foreground pt-2">
                    {displayProject.date && (
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{displayProject.date}</span>
                        </div>
                    )}
                    {displayProject.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>{displayProject.location}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-muted">
                {displayProject.coverImage ? (
                    <Image
                        src={displayProject.coverImage}
                        alt={displayProject.coverImageAlt || displayProject.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary">
                        <span className="text-secondary/10 font-serif font-bold text-8xl transform -rotate-12 italic select-none">
                            {displayProject.title}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                    </div>
                )}
            </div>

            {/* Content & Sidebar Layout */}
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Brief description as lead text */}
                    {displayProject.description && (
                         <div className="border-b pb-8">
                            <p className="text-xl font-medium text-primary/80 leading-relaxed">
                                {displayProject.description}
                            </p>
                         </div>
                    )}
                    
                    {/* Detailed Content */}
                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary">
                        {displayProject.details && (
                            <PortableText 
                                value={displayProject.details} 
                                components={{
                                    block: {
                                        h1: ({children}) => <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mt-12 mb-6 block">{children}</h2>,
                                        h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary mt-10 mb-5 block">{children}</h2>,
                                        h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold font-serif text-primary mt-8 mb-4 block">{children}</h3>,
                                        h4: ({children}) => <h4 className="text-lg md:text-xl font-bold font-serif text-primary mt-6 mb-3 block">{children}</h4>,
                                        normal: ({children}) => <p className="mb-4 leading-relaxed block">{children}</p>,
                                    }
                                }}
                            />
                        )}
                    </div>
                    {/* Linked Services Button */}
                    {displayProject.services && displayProject.services.length > 0 && (
                        <div className="pt-8 border-t border-muted">
                            <h3 className="text-xl font-bold font-serif mb-4">İlgili Hizmetimiz</h3>
                            <div className="flex flex-wrap gap-4">
                                {displayProject.services.map((service: Service) => (
                                    <Button key={service._id} asChild className="space-x-2">
                                        <Link href={`/hizmetler/${service.slug}`}>
                                            <span>{service.title} Hizmetini İncele</span>
                                            <ArrowLeft className="rotate-180" size={16} />
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {/* Contact CTA */}
                        <div className="bg-primary text-white p-8 rounded-2xl text-center space-y-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-2xl font-bold font-serif">Hayalinizdeki Etkinliği Planlayalım</h3>
                                <p className="text-white/80">Siz de benzer bir organizasyon için hemen teklif alın.</p>
                                <Button asChild variant="secondary" className="w-full font-bold">
                                    <Link href="/iletisim">Teklif İste</Link>
                                </Button>
                            </div>
                        </div>

                         {/* Other Events List */}
                         {otherProjects.length > 0 && (
                             <div className="bg-white p-6 rounded-2xl shadow-lg border border-muted/20">
                                 <h3 className="text-lg font-bold font-serif mb-6 pb-2 border-b">Diğer Etkinlikler</h3>
                                 <div className="space-y-4">
                                     {otherProjects.map((item) => (
                                         <Link key={item.slug || item.id} href={`/etkinliklerimiz/${item.slug}`} className="group fl block">
                                             <div className="flex gap-4 items-center">
                                                 <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                                     {item.coverImage ? (
                                                         <Image 
                                                            src={item.coverImage} 
                                                            alt={item.title} 
                                                            fill 
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                                         />
                                                     ) : (
                                                         <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                             IMG
                                                         </div>
                                                     )}
                                                 </div>
                                                 <div>
                                                     <h4 className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 text-sm">
                                                         {item.title}
                                                     </h4>
                                                     <span className="text-xs text-muted-foreground mt-1 block">
                                                         {item.category}
                                                     </span>
                                                 </div>
                                             </div>
                                         </Link>
                                     ))}
                                 </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>

            {/* Gallery */}
            {displayProject.images && displayProject.images.length > 0 && (
                <div className="mt-16 space-y-8 pt-16 border-t">
                    <SectionHeading title="Etkinlik Karesi" center />
                    <div className="grid sm:grid-cols-2 gap-4">
                        {displayProject.images.map((img, idx) => (
                             <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-muted">
                                {img ? (
                                    <Image
                                        src={img}
                                        alt={`${displayProject.title} - Fotoğraf ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                                        <span className="text-secondary/10 font-serif font-bold text-2xl tracking-widest uppercase">
                                            {displayProject.category}
                                        </span>
                                    </div>
                                )}
                             </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </Container>
    </article>
  );
}
