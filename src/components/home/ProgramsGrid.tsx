import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import { ArrowRight, Flame, Dumbbell, Activity, Users, UserCheck, HeartPulse } from "lucide-react";
import { ProgramItem } from "@/config/gym.config";
import MobileCarousel from "@/components/common/MobileCarousel";

interface ProgramsGridProps {
  programs: ProgramItem[];
  isDemo?: boolean;
  basePath?: string;
}

const iconsMap: Record<string, React.ElementType> = {
  "gym-training": Dumbbell,
  "weight-loss": Flame,
  "muscle-building": Activity,
  "personal-training": UserCheck,
  "cardio": HeartPulse,
  "group-classes": Users,
};

export default function ProgramsGrid({
  programs,
  isDemo = false,
  basePath = "",
}: ProgramsGridProps) {
  const programsHref = isDemo ? `${basePath}/programs` : "/programs";

  return (
    <section id="programs" className="py-14 lg:py-28 bg-[var(--bg-surface)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <SectionTitle
            align="left"
            subtitle="OUR PROGRAMS"
            title="TRAINING DESIGNED FOR PEAK PERFORMANCE."
            accentWord="PERFORMANCE"
            description="Whether your goal is sheer strength, athletic agility, or rapid fat loss, our core programs deliver measurable results."
            className="mb-0"
          />
          <a
            href={programsHref}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:text-[var(--accent-light)] transition-colors self-start md:self-end"
          >
            <span>View All Program Details</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Programs with Mobile Carousel / Desktop Grid */}
        <MobileCarousel
          ariaLabel="Training Programs"
          gridClassName="md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {programs.map((program, idx) => {
            const Icon = iconsMap[program.id] || Dumbbell;
            return (
              <div
                key={program.id}
                data-card="true"
                data-reveal="true"
                style={{ "--reveal-delay": `${Math.min(idx * 0.08, 0.4).toFixed(2)}s` } as React.CSSProperties}
                className="card-entrance group rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] overflow-hidden card-hover flex flex-col h-full"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-wider text-accent">
                    <Icon className="w-3 h-3" />
                    <span>{program.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                      <span>Duration: {program.duration}</span>
                      <span>
                        Intensity: <strong className="text-accent">{program.intensity}</strong>
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl text-[var(--text-primary)] mb-2 group-hover:text-accent transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed mb-4">
                      {program.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <a
                      href={`${programsHref}#${program.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent group-hover:text-[var(--accent-light)] transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
