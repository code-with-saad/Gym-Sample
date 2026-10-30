"use client";

import { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { FaqItem } from "@/config/gym.config";
import { ChevronDown } from "lucide-react";
import { StaggerContainer } from "@/components/common/Reveal";

interface FaqAccordionProps {
  faq: FaqItem[];
}

export default function FaqAccordion({ faq }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--bg-surface)] relative overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="FREQUENT QUESTIONS"
          title="EVERYTHING YOU NEED TO KNOW."
          accentWord="KNOW"
          description="Clear answers on memberships, amenities, personal training, and coaching schedules."
        />

        <StaggerContainer className="space-y-4">
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-[var(--accent)] min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-xl sm:text-2xl text-[var(--text-primary)] tracking-wide">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-accent transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 bg-[var(--accent)] text-black" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-subtle)]/40 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
