"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface MobileCarouselProps {
  children: React.ReactNode;
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  ariaLabel?: string;
}

export default function MobileCarousel({
  children,
  className = "",
  gridClassName = "md:grid-cols-3 md:gap-8",
  itemClassName = "",
  ariaLabel = "Content Carousel",
}: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = React.Children.toArray(children).filter(Boolean);
  const total = items.length;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasMore = el.scrollLeft + el.clientWidth < el.scrollWidth - 10;
    setCanScrollRight(hasMore);

    const cardWidth = el.clientWidth * 0.82 + 12; // 82vw + 12px gap
    if (cardWidth > 0) {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, idx), total - 1));
    }
  }, [total]);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.82 + 12;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  if (total === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Single container: Flex carousel on mobile (<768px), CSS Grid on desktop (>=768px) */}
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={`flex md:grid ${gridClassName} overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scroll-smooth no-scrollbar gap-3 px-4 md:px-0 pb-4 md:pb-0 -mx-4 md:mx-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]`}
      >
        {items.map((child, idx) => (
          <div
            key={idx}
            className={`w-[82vw] md:w-auto shrink-0 md:shrink snap-start select-none md:select-auto ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Soft fade on right edge when more content exists (mobile only) */}
      <div
        className={`md:hidden pointer-events-none absolute top-0 right-0 bottom-8 w-12 bg-gradient-to-l from-[var(--bg-main)] to-transparent transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Dots indicator on mobile */}
      {total > 1 && (
        <div
          className="md:hidden flex items-center justify-center gap-1.5 mt-3 mb-2"
          aria-hidden="true"
        >
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-[var(--accent)]"
                  : "w-1.5 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
