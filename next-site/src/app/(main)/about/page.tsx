import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import StatCounter from "@/components/common/StatCounter";
import ProcessSteps from "@/components/home/ProcessSteps";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import FitnessCalculator from "@/components/calculator/FitnessCalculator";
import { defaultGymConfig } from "@/config/gym.config";
import { images } from "@/config/images";
import { CheckCircle2, Shield, Target, Trophy, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Elite Athletic Strength Facility",
  description: "Learn about the mission, training principles, and elite facilities behind IronForge Fitness Lahore.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header Banner */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="WHO WE ARE"
            title="ENGINEERED FOR DISCIPLINE, COMMITTED TO EXCELLENCE."
            accentWord="EXCELLENCE"
            description="IronForge Fitness is not just another gym. It is an unapologetic strength club built for everyday athletes and seasoned lifters."
          />
        </div>
      </section>

      {/* Core Philosophy with Main Facility Photo */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl text-[var(--text-primary)] mb-6 leading-tight">
                SCIENCE OVER GIMMICKS. EFFORT OVER SHORTCUTS.
              </h2>
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6">
                Founded in Lahore with one singular directive: establish a barbell-centric training facility with zero overcrowding and maximum training efficiency. We believe genuine transformation requires progressive overload, sound nutritional periodization, and relentless consistency.
              </p>
              <div className="space-y-3">
                {[
                  "Calibrated competition barbells and machined plates",
                  "Air-conditioned lifting zones with specialized rubber flooring",
                  "100% certified coaches who actively train and compete",
                  "Private recovery facilities with Finnish sauna",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl">
                <Image
                  src={images.aboutMain}
                  alt="IronForge Fitness Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Shield className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-1">
                  UNCOMPROMISED SAFETY
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Rigorous spotter protocols, heavy-duty safety straps, and injury prevention screenings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Target className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-1">
                  TARGET METRICS
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Every weight, set, rep, and body fat percentage is systematically logged and analyzed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Trophy className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-1">
                  PROVEN RESULTS
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Over 1,500 local transformations without fad diets or dangerous crash programs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Flame className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-1">
                  FOCUS CULTURE
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  A high-energy gym floor where people come to put in hard work and celebrate each other.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Stats counter band */}
      <section className="py-16 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {defaultGymConfig.stats.map((s, idx) => (
              <StatCounter key={idx} end={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <ProcessSteps steps={defaultGymConfig.processSteps} />

      {/* Embedded Fitness Calculator on About */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="INTERACTIVE TOOLS"
            title="CALCULATE YOUR BASELINE METRICS TODAY."
            accentWord="METRICS"
            description="Use our built-in physiological calculator to uncover your recommended daily caloric target."
          />
          <FitnessCalculator />
        </div>
      </section>

      {/* Final CTA */}
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </div>
  );
}
