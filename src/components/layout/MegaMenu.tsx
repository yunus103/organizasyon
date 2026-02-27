"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
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
  // We expect exactly 2 categories for this design, but we map up to 2 just in case
  const displayCategories = categories.slice(0, 2);

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
            <div className="flex flex-col md:flex-row min-h-[400px]">
              {displayCategories.map((category, index) => (
                <div 
                  key={category.id} 
                  className={cn(
                    "flex-1 p-6 overflow-y-auto max-h-[500px]",
                    index === 0 ? "bg-primary/5 border-r border-primary/10" : "bg-white"
                  )}
                >
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-4">
                      <h4 className="text-2xl font-serif font-bold text-primary">{category.title}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {category.services?.slice(0, 10).map((service) => (
                      <Link
                        key={service.id}
                        href={`/hizmetler/${service.slug}`}
                        className="group/item flex items-center p-2 rounded-lg hover:bg-white/80 hover:shadow-sm transition-all border border-transparent hover:border-primary/5"
                        onClick={onClose}
                      >
                        <span className="font-bold text-sm text-primary group-hover/item:text-secondary transition-colors inline-flex items-center gap-2">
                            {service.title}
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-secondary" />
                        </span>
                      </Link>
                    ))}
                    {(!category.services || category.services.length === 0) && (
                        <div className="py-12 text-center">
                            <Sparkles className="mx-auto text-primary/10 mb-2" size={32} />
                            <p className="text-xs text-gray-400 italic">Bu kategoride henüz hizmet eklenmemiş.</p>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          {/* Bottom Bar */}
          <div className="bg-gray-100/50 py-3 border-t border-primary/5">
             <Container className="flex justify-between items-center max-w-5xl px-8">
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest leading-none">Kişiye Özel Konseptler</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest leading-none">7/24 Destek</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                     <Link href="/hizmetler" onClick={onClose} className="text-[10px] font-bold text-primary hover:text-secondary transition-colors uppercase tracking-[2px] flex items-center gap-2 group leading-none">
                         TÜM HİZMETLERİ GÖR <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                     <Link href="/iletisim" onClick={onClose} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors uppercase tracking-[2px] flex items-center gap-2 group leading-none">
                         Ücretsiz Danışmanlık Alın <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                 </div>
             </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
