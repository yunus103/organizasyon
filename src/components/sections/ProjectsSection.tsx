import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects as mockProjects } from "@/data/mockData";

export async function ProjectsSection() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] });

  if (projects.length === 0) return null;

  const displayProjects = projects;
  
  // Show only first 3 projects on homepage
  const featuredProjects = displayProjects.slice(0, 3);
  
  return (
    <section className="py-20 md:py-32 bg-background relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <Container>
        <SectionHeading
          title="Projelerimiz"
          subtitle="İmzamızı Attığımız İşler"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {featuredProjects.map((project) => (
             <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/projeler" className="gap-2">Tüm Projeleri Gör <ArrowRight size={16}/></Link>
            </Button>
        </div>
      </Container>
    </section>
  );
}
