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
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={service.mainImage}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold font-serif text-primary group-hover:text-secondary transition-colors">
          {service.title}
        </h3>
        <p className="mb-4 flex-1 text-muted-foreground line-clamp-3">
          {service.shortDescription}
        </p>
        <Button asChild variant="ghost" className="w-fit p-0 hover:bg-transparent hover:text-secondary group-hover:translate-x-1 transition-transform">
          <Link href={`/hizmetler/${service.slug}`} className="flex items-center gap-2">
            İncele <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
