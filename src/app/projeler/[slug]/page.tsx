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
    <article className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0 hover:pl-2 transition-all">
                <Link href="/projeler" className="gap-2 text-muted-foreground"><ArrowLeft size={16}/> Tüm Projelere Dön</Link>
            </Button>
        </div>

        <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto space-y-4">
                 <span className="inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold uppercase tracking-wider text-secondary">
                    {displayProject.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary">{displayProject.title}</h1>
                
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
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src={displayProject.coverImage}
                    alt={displayProject.coverImageAlt || displayProject.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="max-w-3xl mx-auto">
                 <p className="text-xl text-gray-600 leading-relaxed text-center">
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
                             <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <Image
                                    src={img}
                                    alt={`${displayProject.title} - Fotoğraf ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
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
