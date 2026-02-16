"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-2 h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {service.mainImage ? (
          <>
            <Image
              src={service.mainImage}
              alt={service.mainImageAlt || service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
            <span className="text-secondary/20 font-serif font-bold text-4xl transform -rotate-12 italic select-none">
              {service.title}
            </span>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
             <div className="bg-white/90 backdrop-blur-md text-primary p-3 rounded-full shadow-lg border border-white/20">
                 <ArrowUpRight size={20} />
             </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-8 relative">
        <h3 className="text-2xl font-bold font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
          {service.title}
        </h3>
        
        <p className="mb-8 flex-1 text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>
        
        <Link 
            href={`/hizmetler/${service.slug}`} 
            className="mt-auto self-start relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-secondary"
        >
            Hizmeti İncele
        </Link>
      </div>
    </motion.div>
  );
}
