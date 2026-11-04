import Image from "next/image";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ScheduleTimetable from "@/components/schedule/ScheduleTimetable";
import PricingSection from "@/components/home/PricingSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { AdaptedSiteConfig } from "@/lib/lead-adapter";
import { Check, Clock, Flame } from "lucide-react";

interface ProgramsPageBodyProps {
  config: AdaptedSiteConfig;
  isDemo?: boolean;
  basePath?: string;
}

export default function ProgramsPageBody({
  config,
  isDemo = false,
  basePath = "",
}: ProgramsPageBodyProps) {
  return (
    <div className={isDemo ? "pt-[110px] sm:pt-[118px]" : "pt-[72px] sm:pt-[80px]"}>
      {/* Page Hero Banner */}
      <PageHeroBanner
        breadcrumb="Programs"
        title="SYSTEMATIC TRAINING DESIGNED FOR MEASURABLE ADAPTATION."
        accentWord="SYSTEMATIC"
        subtitle="Explore our comprehensive training disciplines, class timetable, and membership pricing options."
        bgImage={config.programsBannerImage}
        homeHref={isDemo ? basePath || "/" : "/"}
      />

      {/* Deep Dive Program Cards */}
      <section className="py-14 lg:py-24 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {config.programs.map((program, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={program.id}
                id={program.slug}
                data-card="true"
                data-reveal="true"
                className="card-entrance rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden card-hover"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  {/* Visual */}
                  <div className={`lg:col-span-5 relative aspect-[16/11] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[320px] ${isReversed ? "lg:order-2" : ""}`}>
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
                  <div className={`lg:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-between ${isReversed ? "lg:order-1" : ""}`}>
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
                        KEY CURRICULUM HIGHLIGHTS
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                        {program.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-primary)]">
                            <Check className="w-4 h-4 text-accent shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <a
                        href={isDemo ? `${basePath}/contact` : "/contact"}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:border-accent hover:text-accent font-heading text-lg tracking-wider uppercase transition-colors"
                      >
                        ENROLL IN THIS DISCIPLINE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Class Schedule Section */}
      <section className="py-14 lg:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              WEEKLY TIMETABLE
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[var(--text-primary)] leading-tight">
              GROUP CLASS SCHEDULE
            </h2>
          </div>
          <ScheduleTimetable schedule={config.schedule} />
        </div>
      </section>

      {/* Pricing Section (with anchor id="pricing") */}
      <PricingSection
        plans={config.pricing}
        whatsapp={config.whatsapp}
        gymName={config.name}
        isDemo={isDemo}
        basePath={basePath}
      />

      {/* Membership FAQ Accordion */}
      <FaqAccordion faq={config.faq} />

      {/* Final CTA */}
      <FinalCtaBand
        gymName={config.name}
        whatsapp={config.whatsapp}
        phone={config.phone}
        isDemo={isDemo}
        basePath={basePath}
      />
    </div>
  );
}

