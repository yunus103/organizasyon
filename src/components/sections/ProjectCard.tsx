import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projeler/${project.slug}`} className="group relative block overflow-hidden rounded-xl bg-muted aspect-[4/3]">
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {project.category}
        </span>
        <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-secondary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
            {project.description}
        </p>
      </div>
    </Link>
  );
}
