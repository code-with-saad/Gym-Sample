"use client";

import { useState, useRef } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { TestimonialItem } from "@/config/gym.config";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
  isDemo?: boolean;
}

export default function TestimonialsCarousel({
  testimonials,
  isDemo = false,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
    touchStart.current = null;
  };

  const item = testimonials[current];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[var(--bg-surface)] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="SUCCESS STORIES"
          title={isDemo ? "WHAT MEMBERS ARE SAYING." : "WHAT OUR ATHLETES SAY ABOUT US."}
          accentWord={isDemo ? "MEMBERS" : "ATHLETES"}
          description={
            isDemo
              ? "Sample member feedback. Real reviews will appear here after your launch."
              : "Real transformations, verified member reviews, and genuine fitness achievements."
          }
        />

        <div
          className="relative rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] p-8 sm:p-12 shadow-2xl"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Large Quote Mark */}
          <div className="absolute top-6 right-8 text-[var(--border-subtle)] pointer-events-none opacity-40">
            <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {isDemo && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] mb-3">
                SAMPLE REVIEW
              </span>
            )}

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 text-accent mb-6">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] leading-snug tracking-wide max-w-3xl mb-8">
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Metric pill */}
            {!isDemo && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-accent uppercase tracking-wider mb-8">
                <span>Verified Achievement:</span>
                <strong className="text-[var(--text-primary)]">{item.results}</strong>
              </div>
            )}

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center font-heading text-xl text-black font-bold">
                {item.avatarText}
              </div>
              <div className="text-left">
                <h4 className="font-heading text-xl text-[var(--text-primary)] leading-none">
                  {item.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1">{item.role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-subtle)]">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    current === i ? "w-8 bg-accent" : "w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
