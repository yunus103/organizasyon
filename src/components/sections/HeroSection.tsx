"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { heroSlides } from "@/data/mockData";

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[100vh] lg:h-[800px] overflow-hidden bg-primary">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] h-full min-w-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                 {/* Using unoptimized for external demo images if domains not configured, but ideally optimized */}
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={slide.image.startsWith("http")} 
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center">
                <Container>
                  <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                      {slide.headline}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                      {slide.subheadline}
                    </p>
                    <div className="pt-4">
                      <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full bg-secondary hover:bg-secondary/90 text-white border-none shadow-xl transition-transform hover:scale-105">
                        <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                      </Button>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
}
