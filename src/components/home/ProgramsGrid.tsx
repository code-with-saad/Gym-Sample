import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { ArrowRight, Flame, Dumbbell, Activity, Users, UserCheck, HeartPulse } from "lucide-react";
import { ProgramItem } from "@/config/gym.config";
import { StaggerContainer } from "@/components/common/Reveal";

interface ProgramsGridProps {
  programs: ProgramItem[];
  isDemo?: boolean;
}

const iconsMap: Record<string, React.ElementType> = {
  "gym-training": Dumbbell,
  "weight-loss": Flame,
  "muscle-building": Activity,
  "personal-training": UserCheck,
  "cardio": HeartPulse,
  "group-classes": Users,
};

export default function ProgramsGrid({ programs, isDemo = false }: ProgramsGridProps) {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-[var(--bg-surface)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionTitle
            align="left"
            subtitle="OUR PROGRAMS"
            title="TRAINING DESIGNED FOR PEAK PERFORMANCE."
            accentWord="PERFORMANCE"
            description="Whether your goal is sheer strength, athletic agility, or rapid fat loss, our 6 core programs deliver measurable results."
            className="mb-0"
          />
          {!isDemo && (
            <Link
              href="/programs"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:text-[var(--accent-light)] transition-colors self-start md:self-end"
            >
              <span>View All Program Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* 6 Programs Grid with Staggered reveal */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program) => {
            const Icon = iconsMap[program.id] || Dumbbell;
            return (
              <div
                key={program.id}
                className="group rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] overflow-hidden card-hover flex flex-col h-full"
              >
                {/* Program image with dark overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-wider text-accent">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{program.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl text-[var(--text-primary)] group-hover:text-accent transition-colors">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {program.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                      Duration: <strong className="text-[var(--text-primary)]">{program.duration}</strong>
                    </span>
                    {isDemo ? (
                      <a
                        href="#pricing"
                        className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider text-accent group-hover:translate-x-1 transition-transform"
                      >
                        <span>Join</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href="/programs"
                        className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider text-accent group-hover:translate-x-1 transition-transform"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
