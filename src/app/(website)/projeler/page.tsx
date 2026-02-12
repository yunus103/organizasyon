import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects as mockProjects } from "@/data/mockData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "Geçmişte gerçekleştirdiğimiz başarılı organizasyon projelerimiz.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] });
  
  if (projects.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <Container>
           <h1 className="text-3xl font-bold">Henüz proje eklenmemiş.</h1>
           <p className="text-muted-foreground mt-4">Kısa süre içinde projelerimiz burada yer alacak.</p>
        </Container>
      </div>
    );
  }

  const displayProjects = projects;

  return (
    <div className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <SectionHeading
          title="Tüm Projelerimiz"
          subtitle="Başarı Hikayelerimiz"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </div>
  );
}
