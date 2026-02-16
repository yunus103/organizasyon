"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Category } from "@/types";
import { Container } from "@/components/ui/Container";

interface MegaMenuProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ categories, isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-primary/5 shadow-2xl z-40 overflow-hidden"
          onMouseLeave={onClose}
        >
          <Container className="py-12">
            <div className="grid grid-cols-4 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="space-y-4 group">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="h-6 w-1 bg-secondary rounded-full group-hover:h-8 transition-all"/>
                         <h3 className="font-serif text-xl font-bold text-primary">{category.title}</h3>
                    </div>
                  
                  <ul className="space-y-3">
                    {category.services?.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/hizmetler/${service.slug}`}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-secondary transition-colors group/item"
                          onClick={onClose}
                        >
                          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          <span className="group-hover/item:translate-x-1 transition-transform inline-block">
                             {service.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {category.services && category.services.length > 0 && (
                      <div className="pt-2">
                           <Link href={`/hizmetler?category=${category.slug}`} className="text-xs font-bold text-secondary uppercase tracking-wider hover:underline">
                               Tümünü Gör
                           </Link>
                      </div>
                  )}
                </div>
              ))}
               {/* Call to Action Column / Featured Image (Optional - utilizing the 4th column if categories are few, or adding a specific promo area) */}
               {categories.length < 4 && (
                   <div className="col-span-1 bg-muted/30 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                        <h4 className="font-bold text-primary mb-2">Özel Bir Planınız mı Var?</h4>
                        <p className="text-sm text-gray-600 mb-4">Size özel konseptler için bizimle iletişime geçin.</p>
                        <Link href="/iletisim" className="px-6 py-2 bg-secondary text-white rounded-full text-sm font-bold hover:bg-secondary/90 transition-colors">
                            Teklif Alın
                        </Link>
                   </div>
               )}
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
