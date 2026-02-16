"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  // Image prop removed as per user request
}

export function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative h-[35vh] min-h-[280px] lg:h-[45vh] flex items-center overflow-hidden bg-primary pt-16">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        
        {/* Animated Gradient Orbs for a "Live" feel */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-secondary/30 blur-[120px]"
        />
        <motion.div 
            animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -40, 0],
                y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] rounded-full bg-primary-light/20 blur-[100px]"
        />
        
        {/* Main Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/5 opacity-90" />
        
        {/* Grain/Texture for premium feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Geometric Accent */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-15deg] translate-x-1/2" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8">
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-block text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 opacity-80">
                Keşfedin
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none">
              {title}
            </h1>
          </motion.div>

          {/* Breadcrumbs Pill */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="inline-flex items-center bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
              <ul className="flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase">
                <li>
                  <Link href="/" className="text-white/40 hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <Home size={12} className="group-hover:scale-110 transition-transform" />
                    <span>Anasayfa</span>
                  </Link>
                </li>
                
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <li className="text-white/20">
                      <ChevronRight size={10} />
                    </li>
                    <li>
                      {crumb.href ? (
                        <Link 
                          href={crumb.href} 
                          className="text-white/40 hover:text-secondary transition-colors"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white underline underline-offset-8 decoration-secondary/50 decoration-2">{crumb.label}</span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
