import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/mockData";

export function ProjectsSection() {
  // Show only first 3 projects on homepage
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
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
