"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { TestimonialItem } from "@/config/gym.config";
import { Star, ChevronLeft, ChevronRight, Quote, Play, Pause } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { useReducedMotion } from "framer-motion";

interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
  isDemo?: boolean;
}

export default function TestimonialsCarousel({
  testimonials,
  isDemo = false,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const touchStartCoord = useRef<{ x: number; y: number } | null>(null);

  const total = testimonials.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }, [total]);

  // Autoplay every 3s when playing, not hovered/focused/touched, and reduced motion is off
  useEffect(() => {
    if (shouldReduceMotion || !isPlaying || isHovered || isFocused || isTouched) {
      return;
    }

    const timer = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPlaying, isHovered, isFocused, isTouched, next]);

  // Touch handlers that preserve vertical page scrolling (pan-y)
  const onTouchStart = (e: React.TouchEvent) => {
    setIsTouched(true);
    touchStartCoord.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartCoord.current) {
      const deltaX = touchStartCoord.current.x - e.changedTouches[0].clientX;
      const deltaY = touchStartCoord.current.y - e.changedTouches[0].clientY;

      // Horizontal swipe detected only if x movement is dominant and > 40px
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX > 0) {
          next();
        } else {
          prev();
        }
      }
    }
    touchStartCoord.current = null;
    // Delay resuming autoplay briefly after touch ends
    setTimeout(() => setIsTouched(false), 1200);
  };

  const item = testimonials[current] || testimonials[0];

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
            className="relative rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] p-5 sm:p-8 shadow-2xl min-h-[360px] sm:min-h-[340px] flex flex-col justify-between"
            style={{ touchAction: "pan-y" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Background Quote Mark */}
            <div className="absolute top-4 right-5 sm:top-6 sm:right-8 text-[var(--border-subtle)] pointer-events-none opacity-20">
              <Quote className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Sample Review Chip */}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] mb-3">
                SAMPLE REVIEW
              </span>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-accent mb-3">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Quote with Smooth Slide & Crossfade Transition */}
              <div className="w-full min-h-[96px] sm:min-h-[80px] flex items-center justify-center px-2">
                <p
                  key={current}
                  className="font-heading text-[clamp(1rem,4.2vw,1.2rem)] sm:text-2xl text-[var(--text-primary)] leading-relaxed tracking-wide max-w-2xl animate-fade-slide"
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Review Author */}
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center font-heading text-base text-black font-bold shrink-0">
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

            {/* Controls Bar: Prev, Dots, Play/Pause, Next */}
            <div className="flex items-center justify-between mt-5 pt-3 sm:mt-6 sm:pt-4 border-t border-[var(--border-subtle)]">
              {/* Previous button */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-1.5 sm:p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Center controls: Dots indicator + Play/Pause button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      aria-label={`Jump to review ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        current === i
                          ? "w-6 bg-accent"
                          : "w-1.5 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]"
                      }`}
                    />
                  ))}
                </div>

                {!shouldReduceMotion && (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause testimonials rotation" : "Play testimonials rotation"}
                    className="p-1.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-accent hover:border-accent transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Next button */}
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
