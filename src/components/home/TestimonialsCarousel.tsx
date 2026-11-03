"use client";

import { useState, useRef } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { TestimonialItem } from "@/config/gym.config";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

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
    <section id="reviews" className="py-14 lg:py-28 bg-[var(--bg-surface)] relative overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="SUCCESS STORIES"
          title={isDemo ? "WHAT MEMBERS ARE SAYING." : "WHAT OUR ATHLETES SAY ABOUT US."}
          accentWord={isDemo ? "MEMBERS" : "ATHLETES"}
          description={
            isDemo
              ? "Sample member feedback. Real reviews will appear here after your launch."
              : "Real member experiences, feedback, and genuine fitness progress."
          }
        />

        <Reveal>
          <div
            data-card="true"
            className="card-entrance relative rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] p-5 sm:p-10 shadow-2xl max-h-[400px] flex flex-col justify-between"
            style={{ touchAction: "pan-y" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Quote Mark */}
            <div className="absolute top-4 right-5 sm:top-6 sm:right-8 text-[var(--border-subtle)] pointer-events-none opacity-30">
              <Quote className="w-10 h-10 sm:w-16 sm:h-16" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Sample chip for demo or generic */}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] mb-2">
                SAMPLE REVIEW
              </span>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-accent mb-3 sm:mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="font-heading text-[clamp(1rem,4.2vw,1.2rem)] sm:text-2xl text-[var(--text-primary)] leading-relaxed tracking-wide max-w-2xl mb-4 sm:mb-6 line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center font-heading text-base sm:text-lg text-black font-bold shrink-0">
                  {item.avatarText}
                </div>
                <div className="text-left">
                  <h4 className="font-heading text-base sm:text-lg text-[var(--text-primary)] leading-none">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.role}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5 pt-3 sm:mt-6 sm:pt-4 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-1.5 sm:p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Jump to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      current === i ? "w-6 bg-accent" : "w-1.5 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="p-1.5 sm:p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
