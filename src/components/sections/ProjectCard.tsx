import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/etkinliklerimiz/${project.slug}`} className="group relative block overflow-hidden rounded-2xl bg-muted aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500">
      {project.coverImage ? (
        <>
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt || project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-primary">
           <span className="text-secondary/10 font-serif font-bold text-6xl transform -rotate-12 italic select-none">
              {project.title}
           </span>
           <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        </div>
      )}
      
      {/* Top Right Icon */}
      <div className="absolute top-4 right-4 translate-x-12 -translate-y-12 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
        <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <span className="mb-3 inline-block rounded-full bg-secondary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
          {project.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2 text-white group-hover:text-secondary transition-colors duration-300">
          {project.title}
        </h3>
        <div className="h-0 w-0 group-hover:h-auto group-hover:w-full overflow-hidden transition-all duration-500 delay-100">
            <p className="text-gray-300 text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                {project.description}
            </p>
            <div className="h-1 w-12 bg-secondary mt-4 rounded-full" />
        </div>
      </div>
    </Link>
  );
}
