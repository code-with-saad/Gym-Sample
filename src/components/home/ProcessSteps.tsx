import SectionTitle from "@/components/common/SectionTitle";
import { StaggerContainer } from "@/components/common/Reveal";

interface ProcessStepsProps {
  steps?: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export default function ProcessSteps({
  steps = [
    {
      step: "01",
      title: "Book a Consult",
      desc: "Meet 1-on-1 with an elite coach. We evaluate your baseline, medical history, movement patterns, and exact goals.",
    },
    {
      step: "02",
      title: "Assess & Plan",
      desc: "Receive a tailored nutrition plan and periodized training split calibrated specifically for your lifestyle.",
    },
    {
      step: "03",
      title: "Train & Track",
      desc: "Execute structured sessions using professional training equipment with coach oversight and bi-weekly biometric check-ins.",
    },
    {
      step: "04",
      title: "Achieve Goals",
      desc: "Break personal records, gain sustainable lean muscle, shred body fat, and maintain your peak physique permanently.",
    },
  ],
}: ProcessStepsProps) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--bg-main)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="HOW IT WORKS"
          title="OUR 4-STEP BLUEPRINT TO TRANSFORMATION."
          accentWord="BLUEPRINT"
          description="We take the guesswork out of fitness. A systematic approach from day zero to long-term peak physical condition."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover relative flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-4xl sm:text-5xl text-accent/40 font-bold tracking-tight">
                    {item.step}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <h3 className="font-heading text-2xl text-[var(--text-primary)] tracking-wide mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent to-transparent z-10 transform -translate-y-1/2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
