import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { defaultGymConfig } from "@/config/gym.config";
import { Award, CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "@/components/common/SocialIcons";

export const metadata: Metadata = {
  title: "Elite Trainers & Coaches | IronForge Fitness",
  description: "Meet our certified CSCS, NSCA, and CrossFit coaches dedicated to your biomechanics, powerlifting, and fat-loss goals.",
};

export default function TrainersPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="COACHING ROSTER"
            title="INDUSTRY-CERTIFIED STRENGTH & HYPERTROPHY SPECIALISTS."
            accentWord="SPECIALISTS"
            description="Our coaches do not hand out cookie-cutter routines. We teach proper kinematics, optimize bar speed, and keep you safe under heavy loads."
          />
        </div>
      </section>

      {/* Coaches Detailed Profiles */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {defaultGymConfig.trainers.map((coach) => (
              <div
                key={coach.id}
                className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden card-hover flex flex-col sm:flex-row"
              >
                <div className="relative aspect-[4/5] sm:w-2/5 shrink-0 overflow-hidden">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent sm:hidden" />
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                        <Award className="w-4 h-4" />
                        {coach.experience}
                      </span>
                      <a
                        href={coach.socials.instagram || "https://instagram.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-accent"
                        aria-label={`${coach.name} Instagram`}
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    </div>

                    <h2 className="font-heading text-3xl text-[var(--text-primary)]">
                      {coach.name}
                    </h2>
                    <p className="text-xs font-bold text-accent mb-3">
                      {coach.role} • {coach.specialty}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {coach.bio}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] block">
                        Certifications & Credentials:
                      </span>
                      {coach.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <a
                      href={`https://wa.me/${defaultGymConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${defaultGymConfig.name}, I want to request 1:1 personal training with coach ${coach.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-block py-2.5 rounded-lg text-center font-heading text-lg uppercase tracking-wider text-black bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] font-bold shadow-glow-sm hover:brightness-110 active:scale-95 transition-all"
                    >
                      Book Session with {coach.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
