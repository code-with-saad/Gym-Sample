"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Phone,
  Dumbbell,
  Gem,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";
import { images } from "@/config/images";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  gymName?: string;
  tagline?: string;
  subtagline?: string;
  rating?: number;
  reviews?: number;
  heroBadge?: string;
  whatsapp?: string;
  phone?: string;
  isDemo?: boolean;
  audience?: "mixed" | "ladies";
  heroImageDesktop?: string;
  offsetTop?: number;
}

export default function Hero({
  gymName = "IronForge Fitness",
  subtagline = "A professional fitness facility offering structured training programs, personal coaching, and the amenities you need to reach your goals.",
  rating = 4.9,
  reviews = 380,
  heroBadge,
  whatsapp = "923001234567",
  phone = "+92 300 1234567",
  isDemo = false,
  audience = "mixed",
  heroImageDesktop,
  offsetTop = 70,
}: HeroProps) {
  const isLadies = audience === "ladies";
  const hasWhatsapp = Boolean(whatsapp && whatsapp.trim() !== "");

  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 60]);

  const primaryHref = hasWhatsapp
    ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${gymName}, I want to claim a free trial pass.`
      )}`
    : `tel:${phone.replace(/[^0-9+]/g, "")}`;

  const primaryLabel = hasWhatsapp ? "JOIN NOW" : "CALL TO JOIN";
  const primaryTarget = hasWhatsapp ? "_blank" : undefined;
  const primaryRel = hasWhatsapp ? "noopener noreferrer" : undefined;

  const defaultBadge = isLadies
    ? "PREMIER WOMEN'S WELLNESS & STRENGTH STUDIO"
    : "PREMIER STRENGTH & CONDITIONING CLUB";
  const badgeText = heroBadge || defaultBadge;

  const defaultImage = isLadies ? images.ladies.hero.main : images.hero.main;
  const desktopSrc = heroImageDesktop || defaultImage;

  const imgObjectPosition = isLadies ? "28% 15%" : "22% 12%";

  const mixedFeatures = [
    { icon: Dumbbell, line1: "EXPERT", line2: "COACHES" },
    { icon: Gem, line1: "QUALITY", line2: "EQUIPMENT" },
    { icon: Users, line1: "SUPPORTIVE", line2: "COMMUNITY" },
  ];

  const ladiesFeatures = [
    { icon: Dumbbell, line1: "WOMEN-FOCUSED", line2: "SPACE" },
    { icon: Heart, line1: "EXPERT", line2: "TRAINERS" },
    { icon: Sparkles, line1: "PERSONALIZED", line2: "PROGRAMS" },
    { icon: Users, line1: "SUPPORTIVE", line2: "COMMUNITY" },
  ];

  const features = isLadies ? ladiesFeatures : mixedFeatures;

  const renderHighlightedSubtagline = (text: string) => {
    if (isLadies) {
      const parts = text.split(
        /(women's fitness and wellness studio|strength training|group classes|supportive environment)/gi
      );
      return parts.map((part, i) => {
        const lower = part.toLowerCase();
        if (
          lower === "women's fitness and wellness studio" ||
          lower === "strength training" ||
          lower === "group classes" ||
          lower === "supportive environment"
        ) {
          return (
            <span key={i} className="text-accent font-semibold">
              {part}
            </span>
          );
        }
        return part;
      });
    }

    const parts = text.split(
      /(structured training programs|personal coaching|amenities you need)/gi
    );
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (
        lower === "structured training programs" ||
        lower === "personal coaching" ||
        lower === "amenities you need"
      ) {
        return (
          <span key={i} className="text-accent font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--bg-main)] overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "600px",
        maxHeight: "960px",
      }}
    >
      {/* ───────────────── MOBILE LAYOUT (< lg) ───────────────── */}
      <div
        className="absolute top-0 left-0 right-0 lg:hidden"
        style={{
          height: "38vh",
          minHeight: "200px",
          maxHeight: "340px",
          marginTop: `${offsetTop}px`,
        }}
      >
        <Image
          src={desktopSrc}
          alt={`${gymName} athlete`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imgObjectPosition }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-3/4"
          style={{
            background:
              "linear-gradient(to top, var(--bg-main) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ───────────────── DESKTOP LAYOUT (lg+) ───────────────── */}
      <div
        style={{
          width: "58%",
        }}
        className="hidden lg:block absolute top-0 right-0 bottom-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Radial glow behind athlete */}
        <div
          className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            filter: "blur(48px)",
            opacity: 0.5,
          }}
        />
        <div className="relative w-full h-full">
          <m.div
            style={{ y: shouldReduceMotion ? 0 : parallaxY }}
            className="relative w-full h-full"
          >
            <Image
              src={desktopSrc}
              alt={`${gymName} athlete`}
              fill
              priority
              sizes="58vw"
              className="object-cover"
              style={{ objectPosition: imgObjectPosition }}
            />
          </m.div>
        </div>
        {/* Left-edge mask fade */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 16%, black 34%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 16%, black 34%)",
          }}
        />
        {/* Dark left overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--bg-main) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Dust particles */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <span className="dust-particle dust-1 top-[22%] right-[28%]" />
        <span className="dust-particle dust-2 top-[48%] right-[18%]" />
        <span className="dust-particle dust-3 top-[65%] right-[38%]" />
        <span className="dust-particle dust-2 top-[35%] right-[42%]" />
        <span className="dust-particle dust-1 top-[78%] right-[22%]" />
      </div>

      {/* ───────────────── TEXT CONTENT (NO initial hiding) ───────────────── */}
      <div
        className="relative z-10 h-full flex flex-col max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full"
        style={{
          paddingTop: `calc(${offsetTop}px + 1rem)`,
          paddingBottom: "1.25rem",
        }}
      >
        {/* Mobile: spacer to push content below athlete image */}
        <div
          className="lg:hidden shrink-0"
          style={{ height: "calc(38vh - 4rem)", minHeight: "160px", maxHeight: "280px" }}
          aria-hidden="true"
        />

        <div className="flex-1 lg:flex lg:items-center overflow-hidden">
          {/* Text column: 100% on mobile (<640px) and up to min(55vw, 800px) on sm+ */}
          <div className="flex flex-col items-start text-left w-full sm:max-w-[min(55vw,800px)]">
            
            {/* Badge row with rating chip (for demo) */}
            <div className="hero-animate-badge flex flex-wrap items-center gap-2 mb-3 lg:mb-4 max-w-full">
              <div className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-sm p-1 pr-3 shadow-sm max-w-full">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 mr-1.5 sm:mr-2">
                  <Dumbbell className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] whitespace-normal leading-tight">
                  {badgeText}
                </span>
              </div>

              {/* Demo rating chip placed inline with badge */}
              {isDemo && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-sm text-xs font-semibold text-[var(--text-primary)]">
                  <div className="flex items-center text-accent">
                    <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  </div>
                  <span className="font-bold text-accent">{rating.toFixed(1)}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    ({reviews}+ reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Headline */}
            <div className="mb-3 lg:mb-4 relative">
              <h1 className="font-heading leading-[0.88] tracking-wide m-0">
                <span className="block overflow-hidden">
                  <span
                    className="hero-animate-line-1 block whitespace-nowrap bg-gradient-to-b from-white via-white to-zinc-300 bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(2.5rem, min(7vw, 10vh), 6.2rem)" }}
                  >
                    TRAIN HARD.
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="hero-animate-line-2 block whitespace-nowrap bg-clip-text text-transparent"
                    style={{
                      fontSize: "clamp(2.5rem, min(7vw, 10vh), 6.2rem)",
                      backgroundImage:
                        "linear-gradient(90deg, var(--accent-from) 0%, var(--accent-to) 100%)",
                    }}
                  >
                    STAY UNSTOPPABLE.
                  </span>
                </span>
              </h1>

              {/* Rose brush underline */}
              {isLadies && (
                <svg
                  className="w-36 sm:w-52 md:w-68 h-3 sm:h-4 text-accent mt-1 stroke-current fill-none pointer-events-none"
                  viewBox="0 0 320 16"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12 Q 80 4, 160 10 T 316 8"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            {/* Subtagline: max 3 lines, no clamp ellipsis */}
            <p className="hero-animate-para text-[var(--text-muted)] text-xs sm:text-base leading-relaxed mb-4 lg:mb-5 max-w-prose">
              {renderHighlightedSubtagline(subtagline)}
            </p>

            {/* CTA Buttons: full width on mobile */}
            <div className="hero-animate-buttons flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-4 lg:mb-5">
              <a
                href={primaryHref}
                target={primaryTarget}
                rel={primaryRel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-black font-heading text-lg tracking-wider uppercase font-bold shadow-glow hover:brightness-110 active:scale-95 transition-all text-center min-h-[48px]"
              >
                {!hasWhatsapp && <Phone className="w-5 h-5 text-black" />}
                <span>{primaryLabel}</span>
                {hasWhatsapp && <ArrowRight className="w-5 h-5 text-black" />}
              </a>

              {isDemo ? (
                <a
                  href="#pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-heading text-lg tracking-wider uppercase font-bold hover:border-accent hover:text-accent transition-all text-center min-h-[48px]"
                >
                  BOOK FREE TRIAL
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-heading text-lg tracking-wider uppercase font-bold hover:border-accent hover:text-accent transition-all text-center min-h-[48px]"
                >
                  BOOK FREE TRIAL
                </Link>
              )}
            </div>

            {/* Feature row */}
            <div className="hero-animate-features border-t border-[var(--border-subtle)]/70 pt-3 lg:pt-4 w-full">
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-3 sm:gap-x-5">
                {features.map((feat, idx) => {
                  const IconComponent = feat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center shrink-0">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                      </div>
                      <div className="flex flex-col text-left leading-tight">
                        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                          {feat.line1}
                        </span>
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                          {feat.line2}
                        </span>
                      </div>
                      {idx < features.length - 1 && (
                        <span
                          className="hidden sm:inline-block w-px h-6 bg-[var(--border-subtle)] ml-2 sm:ml-3"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
