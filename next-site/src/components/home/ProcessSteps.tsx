import SectionTitle from "@/components/common/SectionTitle";

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
    <section className="py-20 lg:py-28 bg-[var(--bg-main)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="HOW IT WORKS"
          title="OUR 4-STEP BLUEPRINT TO TRANSFORMATION."
          accentWord="BLUEPRINT"
          description="We take the guesswork out of fitness. A systematic approach from day zero to long-term peak physical condition."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover relative flex flex-col justify-between"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-4xl text-accent font-bold">
                    {item.step}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                    #{idx + 1}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-3 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom accent dash */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]/40 flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-accent" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
                  Step {idx + 1} of 4
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
