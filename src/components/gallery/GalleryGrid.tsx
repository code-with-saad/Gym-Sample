"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { StaggerContainer } from "@/components/common/Reveal";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "strength", "weights", "equipment", "cardio", "functional", "recovery", "studio", "amenities"];

  const filteredImages = images.filter((img) => {
    if (filter === "all") return true;
    return img.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="overflow-x-clip">
      {/* Category Filter */}
      <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 scrollbar-none snap-x mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 min-h-[44px] snap-start ${
              filter === c
                ? "bg-accent text-black shadow-glow-sm"
                : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid with Staggered reveal */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className="group relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] aspect-[4/3] cursor-pointer card-hover"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[var(--accent)] flex items-center justify-center text-accent shadow-glow">
                <ZoomIn className="w-6 h-6" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                {img.category}
              </span>
              <h4 className="font-heading text-xl text-[var(--text-primary)]">
                {img.title}
              </h4>
            </div>
          </div>
        ))}
      </StaggerContainer>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden p-2 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:text-accent border border-[var(--border-subtle)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden shrink-0">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="p-4 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs uppercase font-bold text-accent tracking-wider">
                  {activeImage.category}
                </span>
                <h3 className="font-heading text-2xl text-[var(--text-primary)]">
                  {activeImage.title}
                </h3>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                Click background or close button to exit
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
