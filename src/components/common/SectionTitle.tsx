"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  accentWord?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

const easeCurve = [0.22, 1, 0.36, 1] as const;
const TRAVEL = 16;

export default function SectionTitle({
  subtitle,
  title,
  accentWord,
  description,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const isCentered = align === "center";
  const shouldReduceMotion = useReducedMotion();

  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(new RegExp(`(${accentWord})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === accentWord.toLowerCase() ? (
        <span
          key={i}
          className="text-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: TRAVEL }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeCurve }}
      className={`mb-12 md:mb-16 ${
        isCentered ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {subtitle && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-semibold uppercase tracking-widest text-accent ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {subtitle}
        </div>
      )}

      <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-[0.95] tracking-wide">
        {renderTitle()}
      </h2>

      {/* Dumbbell divider bar with drawing in scaleX animation */}
      <div
        className={`flex items-center gap-2 my-4 ${
          isCentered ? "justify-center" : ""
        }`}
      >
        <m.span
          initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
          style={{ originX: 1 }}
          className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[var(--accent)] block"
        />
        <svg
          className="w-5 h-5 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <m.span
          initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
          style={{ originX: 0 }}
          className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[var(--accent)] block"
        />
      </div>

      {description && (
        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mt-2">
          {description}
        </p>
      )}
    </m.div>
  );
}
