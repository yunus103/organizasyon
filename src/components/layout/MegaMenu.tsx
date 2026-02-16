"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from "lucide-react";

import { Category } from "@/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ categories, isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "");

  // Reset active tab when menu opens
  React.useEffect(() => {
    if (isOpen && categories.length > 0) {
      setActiveTab(categories[0].id);
    }
  }, [isOpen, categories]);

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl bg-white rounded-b-3xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] z-40 overflow-hidden border border-primary/5 border-t-0"
          onMouseLeave={onClose}
        >
            <div className="flex min-h-[320px]">
              {/* Sidebar - Categories */}
              <div className="w-[260px] bg-primary p-6 space-y-2 flex flex-col">
                <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/80 mb-1">Hizmetlerimiz</p>
                    <h3 className="text-xl font-serif font-bold text-white">Kategoriler</h3>
                </div>
                <div className="flex-1 space-y-1">
                  {categories.map((category) => {
                    const isActive = activeTab === category.id;
                    return (
                      <button
                        key={category.id}
                        onMouseEnter={() => setActiveTab(category.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group text-left",
                          isActive 
                            ? "bg-white/10 text-white shadow-sm border border-white/10" 
                            : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles size={14} className={cn(
                              "transition-colors",
                              isActive ? "text-secondary" : "text-white/10 group-hover:text-white/30"
                          )} />
                          <span className="font-bold text-sm tracking-wide">{category.title}</span>
                        </div>
                        <ChevronRight size={12} className={cn(
                          "transition-all duration-300",
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        )} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Result Area - Services */}
              <div className="flex-1 p-8 bg-[#f9fafb] overflow-y-auto max-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start justify-between border-b border-primary/5 pb-4">
                        <div className="max-w-xl">
                            <div className="inline-block px-3 py-0.5 bg-secondary/10 rounded-full mb-2">
                                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{activeCategory?.title}</span>
                            </div>
                            <h4 className="text-2xl font-serif font-bold text-primary mb-1">{activeCategory?.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed italic">{activeCategory?.description || "Etkinliklerinize değer katan profesyonel organizasyon çözümleri."}</p>
                        </div>
                        <Link 
                            href={`/hizmetler?category=${activeCategory?.slug}`}
                            className="bg-white px-4 py-1.5 rounded-full border border-primary/5 text-[9px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                            Tüm Listeyi Gör
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                      {activeCategory?.services?.map((service) => (
                        <Link
                          key={service.id}
                          href={`/hizmetler/${service.slug}`}
                          className="group/item flex flex-col"
                          onClick={onClose}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-sm text-primary group-hover/item:text-secondary transition-colors inline-flex items-center gap-2">
                                {service.title}
                                <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-secondary" />
                            </span>
                          </div>
                          <span className="text-[11px] text-muted-foreground line-clamp-1 leading-relaxed font-light border-l-2 border-transparent group-hover/item:border-secondary/30 group-hover/item:pl-3 transition-all">
                              {service.shortDescription}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {activeCategory?.services?.length === 0 && (
                        <div className="py-12 text-center">
                            <Sparkles className="mx-auto text-primary/10 mb-2" size={32} />
                            <p className="text-xs text-gray-400 italic">Bu kategoride henüz hizmet eklenmemiş.</p>
                        </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          {/* Bottom Bar */}
          <div className="bg-gray-100/50 py-2.5 border-t border-primary/5">
             <Container className="flex justify-between items-center max-w-5xl">
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-secondary" />
                        <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest leading-none">Kişiye Özel Konseptler</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-secondary" />
                        <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest leading-none">7/24 Destek</span>
                    </div>
                 </div>
                 <Link href="/iletisim" className="text-[9px] font-bold text-secondary hover:text-primary transition-colors uppercase tracking-[2px] flex items-center gap-2 group leading-none">
                     Ücretsiz Danışmanlık Alın <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
             </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
