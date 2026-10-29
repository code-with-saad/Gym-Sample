import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import StatCounter from "@/components/common/StatCounter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface AboutSectionProps {
  gymName?: string;
  aboutText?: string;
  stats?: { label: string; value: number; suffix: string }[];
  rating?: number;
  reviews?: number;
}

export default function AboutSection({
  gymName = "IronForge Fitness",
  aboutText,
  stats = [
    { label: "Active Members", value: 1500, suffix: "+" },
    { label: "Elite Coaches", value: 20, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Client Success Rate", value: 98, suffix: "%" },
  ],
}: AboutSectionProps) {
  const displayParagraph =
    aboutText ||
    `At ${gymName}, we discard the generic commercial gym model. We operate as an uncompromising strength and conditioning sanctuary engineered for individuals who demand tangible progress. Combining competitive powerlifting equipment, metabolic science, and individualized coach accountability, we empower you to surpass your physical boundaries.`;

  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--bg-main)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <SectionTitle
              align="left"
              subtitle={`ABOUT ${gymName.toUpperCase()}`}
              title="BUILDING STRONG BODIES, BUILDING STRONGER LIVES."
              accentWord="STRONGER"
              className="mb-8"
            />

            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8">
              {displayParagraph}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Personalized periodized training systems",
                "Certified professional strength coaches",
                "Evidence-based nutrition blueprints",
                "Clean, private, distraction-free environment",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-heading text-lg tracking-wider uppercase hover:border-accent hover:text-accent transition-colors"
              >
                <span>OUR FULL STORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl relative">
              {/* Subtle accent border glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,var(--accent-glow)_0%,transparent_60%)] pointer-events-none"
                aria-hidden="true"
              />

              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10"
                >
                  <StatCounter end={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
