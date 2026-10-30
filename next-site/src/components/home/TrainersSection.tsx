import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { TrainerItem } from "@/config/gym.config";
import { Award, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { StaggerContainer } from "@/components/common/Reveal";

interface TrainersSectionProps {
  trainers: TrainerItem[];
  isDemo?: boolean;
}

export default function TrainersSection({ trainers, isDemo = false }: TrainersSectionProps) {
  return (
    <section id="trainers" className="py-20 lg:py-28 bg-[var(--bg-surface)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionTitle
            align="left"
            subtitle={isDemo ? "OUR COACHES" : "ELITE COACHING"}
            title={isDemo ? "MEET OUR COACHING TEAM." : "TRAIN UNDER CERTIFIED STRENGTH MASTERS."}
            accentWord={isDemo ? "COACHING" : "STRENGTH"}
            description={
              isDemo
                ? "Our coaches are here to guide you through your fitness journey with personalised support."
                : "Our coaches hold international certifications and have guided hundreds of clients to personal records and sustainable body transformations."
            }
            className="mb-0"
          />
          {!isDemo && (
            <Link
              href="/trainers"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:text-[var(--accent-light)] transition-colors self-start md:self-end"
            >
              <span>Meet All Coaches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((coach) => (
            <div
              key={coach.id}
              className="rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] overflow-hidden card-hover group flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent" />

                {isDemo && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Sample
                  </div>
                )}

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${coach.name} Instagram`}
                    className="w-8 h-8 rounded-full bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-accent hover:scale-110 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl text-[var(--text-primary)] group-hover:text-accent transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mt-0.5">
                    {coach.role}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed line-clamp-2">
                    {coach.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    Specialty: <span className="text-[var(--text-primary)] font-semibold">{coach.specialty}</span>
                  </span>
                  {!isDemo && (
                    <Award className="w-4 h-4 text-accent shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
