import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Service } from "@/types";
import { Button } from "@/components/ui/Button";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {service.mainImage ? (
          <>
            <Image
              src={service.mainImage}
              alt={service.mainImageAlt || service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
             <span className="text-secondary/20 font-serif font-bold text-4xl transform -rotate-12 italic select-none">
                {service.title}
             </span>
          </div>
        )}
        
        {/* Floating Action Icon */}
        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
             <div className="bg-white text-primary p-3 rounded-full shadow-lg">
                 <ArrowRight size={20} />
             </div>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-6 relative">
        <div className="mb-4">
             <h3 className="text-xl font-bold font-serif text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {service.title}
            </h3>
            <div className="h-0.5 w-12 bg-muted-foreground/20 mt-3 group-hover:w-full group-hover:bg-secondary transition-all duration-500" />
        </div>
        
        <p className="mb-6 flex-1 text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>
        
        <Link 
            href={`/hizmetler/${service.slug}`} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors mt-auto"
        >
            Detaylı İncele <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
