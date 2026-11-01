import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import ScheduleTimetable from "@/components/schedule/ScheduleTimetable";
import PricingSection from "@/components/home/PricingSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { defaultGymConfig } from "@/config/gym.config";
import { Check, Clock, Flame, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs, Schedule & Pricing | Strength, Conditioning & Personal Training",
  description: "Explore our comprehensive training disciplines, weekly class timetable, flexible membership pricing tiers, and membership FAQ.",
};

export default function ProgramsPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="PERFORMANCE PROTOCOLS"
            title="SYSTEMATIC TRAINING DESIGNED FOR MEASURABLE ADAPTATION."
            accentWord="SYSTEMATIC"
            description="Every program at IronForge is built on evidence-based periodization, biomechanical screening, and dedicated coaching accountability."
          />
        </div>
      </section>

      {/* Deep Dive Program Cards */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {defaultGymConfig.programs.map((program, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={program.id}
                id={program.slug}
                className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden card-hover"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  {/* Visual */}
                  <div className={`lg:col-span-5 relative aspect-[16/11] lg:aspect-auto lg:h-full min-h-[320px] ${isReversed ? "lg:order-2" : ""}`}>
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent lg:hidden" />
                    
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-accent">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{program.category}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between ${isReversed ? "lg:order-1" : ""}`}>
                    <div>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-accent" />
                          {program.duration}
                        </span>
                        <span>•</span>
                        <span>Intensity: <strong className="text-accent">{program.intensity}</strong></span>
                      </div>

                      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-4">
                        {program.title}
                      </h2>

                      <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                        {program.fullDesc}
                      </p>

                      <h4 className="font-heading text-xl text-[var(--text-primary)] mb-3">
                        KEY PROGRAM HIGHLIGHTS:
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {program.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-[var(--text-primary)] font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 items-center">
                      <a
                        href={`https://wa.me/${defaultGymConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hi ${defaultGymConfig.name}, I want to enroll in the ${program.title} program.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-heading text-lg uppercase tracking-wider font-bold shadow-glow-sm hover:brightness-110 active:scale-95 transition-all"
                      >
                        <span>START THIS PROGRAM</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Class Schedule Timetable */}
      <section className="py-20 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="CLASS TIMETABLE"
            title="WEEKLY TRAINING SCHEDULE & TIME SLOTS."
            accentWord="TIMETABLE"
            description="Select any day of the week to view available morning, afternoon, and evening coach-led sessions."
          />
          <ScheduleTimetable schedule={defaultGymConfig.schedule} />
        </div>
      </section>

      {/* Pricing Section (with id="pricing" anchor) */}
      <PricingSection
        plans={defaultGymConfig.pricing}
        whatsapp={defaultGymConfig.whatsapp}
        gymName={defaultGymConfig.name}
      />

      {/* Membership FAQ */}
      <FaqAccordion faq={defaultGymConfig.faq} />

      {/* Final CTA */}
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </div>
  );
}
