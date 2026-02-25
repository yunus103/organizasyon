"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceGalleryProps {
  images: { url: string; alt?: string }[];
}

export function ServiceGallery({ images }: ServiceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    
    // Defer the initial selection to avoid setting state during render
    const raf = requestAnimationFrame(() => onSelect());
    
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    
    return () => cancelAnimationFrame(raf);
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (mainApi) mainApi.scrollPrev();
  }, [mainApi]);

  const scrollNext = useCallback(() => {
    if (mainApi) mainApi.scrollNext();
  }, [mainApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image carousel */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-muted group">
        <div className="overflow-hidden h-full" ref={mainRef}>
          <div className="flex h-full touch-pan-y">
            {images.map((img, index) => (
              <div
                className="flex-[0_0_100%] min-w-0 relative h-full"
                key={index}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Service image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-primary shadow-sm hover:bg-white transition-opacity opacity-0 md:group-hover:opacity-100 disabled:opacity-50 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-primary shadow-sm hover:bg-white transition-opacity opacity-0 md:group-hover:opacity-100 disabled:opacity-50 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3 touch-pan-x">
            {images.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "flex-[0_0_30%] md:flex-[0_0_20%] lg:flex-[0_0_15%] min-w-0 relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 outline-none select-none",
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-100"
                )}
                onClick={() => onThumbClick(index)}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
