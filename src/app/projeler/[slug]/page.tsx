import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/mockData";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Proje Bulunamadı" };
  
  return {
    title: `${project.title} | Reel Organizasyon`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params: { slug } }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
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
                    {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary">{project.title}</h1>
                
                <div className="flex items-center justify-center gap-6 text-muted-foreground pt-2">
                    {project.date && (
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{project.date}</span>
                        </div>
                    )}
                    {project.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>{project.location}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="max-w-3xl mx-auto">
                 <p className="text-xl text-gray-600 leading-relaxed text-center">
                    {project.description}
                 </p>
                 {/* Imagine more content here if Project interface had 'content' like Service */}
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
                <div className="space-y-6">
                    <SectionHeading title="Proje Galeri" center />
                    <div className="grid sm:grid-cols-2 gap-4">
                        {project.images.map((img, idx) => (
                             <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <Image
                                    src={img}
                                    alt={`${project.title} - Fotoğraf ${idx + 1}`}
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
