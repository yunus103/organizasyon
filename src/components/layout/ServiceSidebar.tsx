"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, ChevronRight } from "lucide-react";
import { Service } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ServiceSidebarProps {
  services: Service[];
  currentSlug: string;
}

export function ServiceSidebar({ services, currentSlug }: ServiceSidebarProps) {
  // Sort services alphabetically or by any other logic if needed
  const sortedServices = [...services].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="space-y-8">
      {/* CTA Card */}
      <div className="bg-primary p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3 group-hover:bg-secondary/20 transition-colors duration-500" />
         
         <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-secondary mb-2">
                <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif">Projenizi Birlikte Planlayalım</h3>
            <p className="text-white/70 text-sm leading-relaxed">
                Hayalinizdeki organizasyon için profesyonel ekibimizle hemen iletişime geçin.
            </p>
            <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white mt-2 shadow-lg shadow-black/20">
                <Link href="/iletisim" className="flex items-center justify-center gap-2">
                    Teklif Alın <ArrowRight size={16} />
                </Link>
            </Button>
         </div>
      </div>

      {/* Services List */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold font-serif text-primary mb-6 pb-4 border-b border-gray-100">
            Diğer Hizmetlerimiz
        </h3>
        <nav className="space-y-2">
            {sortedServices.map((service) => {
                const isActive = service.slug === currentSlug;
                return (
                    <Link
                        key={service.id}
                        href={`/hizmetler/${service.slug}`}
                        className={cn(
                            "group flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-sm font-medium",
                            isActive 
                                ? "bg-primary text-white shadow-md cursor-default pointer-events-none" 
                                : "text-gray-600 hover:bg-muted hover:text-primary"
                        )}
                    >
                        <span>{service.title}</span>
                        {!isActive && (
                            <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
                        )}
                    </Link>
                );
            })}
        </nav>
      </div>
    </div>
  );
}
