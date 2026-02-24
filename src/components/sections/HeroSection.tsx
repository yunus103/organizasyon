"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroSlide } from "@/types";

interface HeroSectionProps {
  slides?: HeroSlide[];
}

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (slides.length === 0) return null;

  const displaySlides = slides;

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-primary">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {displaySlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] h-full min-w-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-primary">
                {slide.image ? (
                   <Image
                     src={slide.image}
                     alt={slide.imageAlt || slide.headline || "Event background"}
                     fill
                     className="object-cover"
                     priority={index === 0}
                     unoptimized={slide.image.startsWith("http")}
                   />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/40" />
                )}
                {/* Overlay - Modern Gradient for better readability of left-aligned text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <Container>
                  <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                      </span>
                      Unutulmaz Etkinlikler, Kusursuz Planlama
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] drop-shadow-2xl">
                      {slide.headline}
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-gray-200/90 max-w-2xl leading-relaxed font-light drop-shadow-lg">
                      {slide.subheadline}
                    </p>

                    <div className="pt-8 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                      <Button
                        asChild
                        size="lg"
                        className="text-lg px-10 py-7 rounded-full bg-secondary hover:bg-secondary/90 text-white border-none shadow-[0_0_20px_rgba(var(--secondary-rgb),0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--secondary-rgb),0.5)] hover:-translate-y-1"
                      >
                        <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                      </Button>

                      <Button asChild variant="ghost" size="lg" className="text-lg px-10 py-7 rounded-full border border-white/30 text-white bg-white/10 backdrop-blur-md transition-all duration-500 hover:bg-white/25 hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:-translate-y-1">
                        <Link href="/hizmetler">Hizmetlerimiz</Link>
                      </Button>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - More subtle and modern */}
      <div className="absolute bottom-8 right-4 md:bottom-12 md:right-12 z-20 flex gap-2 md:gap-4">
        <button
          onClick={scrollPrev}
          className="p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
}
