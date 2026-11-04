import Image from "next/image";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import StatCounter from "@/components/common/StatCounter";
import ProcessSteps from "@/components/home/ProcessSteps";
import TrainersSection from "@/components/home/TrainersSection";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import FitnessCalculator from "@/components/calculator/FitnessCalculator";
import { AdaptedSiteConfig } from "@/lib/lead-adapter";
import { CheckCircle2, Wifi, ParkingCircle, Flame, Laptop, Baby, MapPin, Clock, Phone } from "lucide-react";

interface AboutPageBodyProps {
  config: AdaptedSiteConfig;
  isDemo?: boolean;
  basePath?: string;
}

export default function AboutPageBody({
  config,
  isDemo = false,
  basePath = "",
}: AboutPageBodyProps) {
  const flags = config.amenities;

  return (
    <div className={isDemo ? "pt-[110px] sm:pt-[118px]" : "pt-[72px] sm:pt-[80px]"}>
      {/* Page Hero Banner */}
      <PageHeroBanner
        breadcrumb="About"
        title="ENGINEERED FOR DISCIPLINE, COMMITTED TO EXCELLENCE."
        accentWord="EXCELLENCE"
        subtitle={config.subtagline}
        bgImage={config.aboutBannerImage}
        homeHref={isDemo ? basePath || "/" : "/"}
      />

      {/* Core Philosophy Section */}
      <section className="py-14 lg:py-24 bg-[var(--bg-main)]">
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
                {config.subtagline}
              </p>
              <div className="space-y-3">
                {(isDemo
                  ? [
                      "Dedicated fitness and training spaces",
                      "Structured workout routines for all experience levels",
                      "Coaching guidance focused on member goals",
                      config.saunaAvailable
                        ? "On-site sauna facility"
                        : "Well-maintained member facilities",
                    ]
                  : [
                      "Quality resistance and free-weight training equipment",
                      "Air-conditioned training zones with specialized flooring",
                      "Certified coaching staff available for guidance",
                      config.saunaAvailable
                        ? "On-site sauna facility and recovery amenities"
                        : "Clean, hygienic, and well-maintained facility",
                    ]
                ).map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Location details for demo */}
              {isDemo && (
                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-2 text-sm text-[var(--text-muted)]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{config.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{config.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span>{config.phone}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl">
                <Image
                  src={config.aboutBannerImage}
                  alt={config.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Stats & Amenities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {config.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center"
              >
                <StatCounter end={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
            {flags?.wifi && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
                <Wifi className="w-8 h-8 text-accent mb-2" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  High Speed Wi-Fi
                </span>
              </div>
            )}
            {flags?.parking && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
                <ParkingCircle className="w-8 h-8 text-accent mb-2" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Parking Available
                </span>
              </div>
            )}
            {flags?.sauna && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
                <Flame className="w-8 h-8 text-accent mb-2" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Sauna Facility
                </span>
              </div>
            )}
            {flags?.onlineClasses && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
                <Laptop className="w-8 h-8 text-accent mb-2" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Online Classes
                </span>
              </div>
            )}
            {flags?.childCare && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
                <Baby className="w-8 h-8 text-accent mb-2" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Child Care
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <TrainersSection
        trainers={config.trainers}
        isDemo={isDemo}
        basePath={basePath}
      />

      {/* Process Steps */}
      <ProcessSteps steps={config.processSteps} />

      {/* Fitness Calculator Section */}
      <section className="py-14 lg:py-24 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FitnessCalculator />
        </div>
      </section>

      {/* Final CTA Band */}
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

