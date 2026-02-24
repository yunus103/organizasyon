import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PageHero } from "@/components/layout/PageHero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etkinliklerimiz",
  description: "Gerçekleştirdiğimiz unutulmaz etkinliklerimiz.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] });
  
  if (projects.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <Container>
           <h1 className="text-3xl font-bold">Henüz etkinlik eklenmemiş.</h1>
           <p className="text-muted-foreground mt-4">Kısa süre içinde etkinliklerimiz burada yer alacak.</p>
        </Container>
      </div>
    );
  }

  const displayProjects = projects;

  return (
    <>
      <PageHero 
        title="Etkinliklerimiz" 
        breadcrumbs={[{ label: "Etkinliklerimiz" }]} 
      />
      <div className="pb-16 md:pb-24">
        <Container>
          <SectionHeading
            title="Tüm Etkinliklerimiz"
            subtitle="Mutlu Anlar, Unutulmaz Anılar"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
