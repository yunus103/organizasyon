"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Service, Category } from "@/types";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getServicesAction } from "@/app/actions";
import { cn } from "@/lib/utils";

interface ServicesFeedProps {
  initialServices: Service[];
  categories: Category[];
}

const ITEMS_PER_PAGE = 12;

export function ServicesFeed({ initialServices, categories }: ServicesFeedProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hasMore, setHasMore] = useState(initialServices.length >= ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = async (slug: string) => {
    setActiveCategory(slug);
    setHasMore(true);
    setPage(1);
    setIsLoading(true);

    const categoryFilter = slug === "all" ? undefined : slug;
    
    // Smooth transition for fetching
    startTransition(async () => {
        const newServices = await getServicesAction({ 
            category: categoryFilter, 
            start: 0, 
            end: ITEMS_PER_PAGE - 1 
        });
        setServices(newServices);
        setHasMore(newServices.length >= ITEMS_PER_PAGE);
        setIsLoading(false);
    });
  };

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const categoryFilter = activeCategory === "all" ? undefined : activeCategory;
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    const newServices = await getServicesAction({ 
        category: categoryFilter, 
        start, 
        end 
    });

    setServices((prev) => [...prev, ...newServices]);
    setHasMore(newServices.length >= ITEMS_PER_PAGE);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  return (
    <div className="space-y-12">
      {/* Tabs */}
      <Container>
         <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            <button
                onClick={() => handleCategoryChange("all")}
                className={cn(
                    "relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 z-10",
                    activeCategory === "all" ? "text-white" : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                )}
            >
                {activeCategory === "all" && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                TÜMÜ
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={cn(
                        "relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 z-10",
                        activeCategory === cat.slug ? "text-white" : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                >
                    {activeCategory === cat.slug && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {cat.title.toUpperCase()}
                </button>
            ))}
         </div>
      </Container>
      
      {/* Grid */}
      <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </AnimatePresence>
          </div>
          
          {/* Empty State */}
          {!isLoading && services.length === 0 && (
              <div className="text-center py-20">
                  <p className="text-muted-foreground">Bu kategoride hizmet bulunamadı.</p>
              </div>
          )}

          {/* Loading State / Load More */}
          <div className="mt-16 text-center">
              {hasMore ? (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={loadMore} 
                    disabled={isLoading}
                    className="min-w-[200px] rounded-full px-8 py-6 text-base shadow-sm border-primary/20 hover:border-primary/50"
                  >
                      {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Yükleniyor...
                          </>
                      ) : (
                          "Daha Fazla Göster"
                      )}
                  </Button>
              ) : services.length > 0 ? (
                  <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-50">Tüm hizmetler görüntülendi</p>
              ) : null}
          </div>
      </Container>
    </div>
  );
}
