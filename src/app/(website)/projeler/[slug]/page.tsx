import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
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

  return (
    <article className="pb-16 md:pb-24">
      <PageHero 
        title={displayProject.title} 
        breadcrumbs={[
            { label: "Projeler", href: "/projeler" },
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

            <div className="max-w-3xl mx-auto">
                 <p className="text-xl text-gray-600 leading-relaxed ">
                    {displayProject.description}
                 </p>
                 {/* Imagine more content here if Project interface had 'content' like Service */}
            </div>

            {/* Gallery */}
            {displayProject.images && displayProject.images.length > 0 && (
                <div className="space-y-6">
                    <SectionHeading title="Proje Galeri" center />
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
