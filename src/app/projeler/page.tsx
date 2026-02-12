import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/mockData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projelerimiz | Reel Organizasyon",
  description: "Gerçekleştirdiğimiz başarılı organizasyonlardan örnekler.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20 lg:pt-32 pb-16 md:pb-24">
      <Container>
        <SectionHeading
          title="Tüm Projelerimiz"
          subtitle="Başarı Hikayelerimiz"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </div>
  );
}
