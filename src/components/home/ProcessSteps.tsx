import SectionTitle from "@/components/common/SectionTitle";
import MobileCarousel from "@/components/common/MobileCarousel";

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
    <section className="py-14 lg:py-28 bg-[var(--bg-main)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="HOW IT WORKS"
          title="OUR 4-STEP BLUEPRINT TO TRANSFORMATION."
          accentWord="BLUEPRINT"
          description="We take the guesswork out of fitness. A systematic approach from day zero to long-term peak physical condition."
        />

        <MobileCarousel
          ariaLabel="Transformation Process Steps"
          gridClassName="md:grid-cols-2 lg:grid-cols-4 md:gap-6 relative"
        >
          {steps.map((item, idx) => (
            <div
              key={item.step}
              data-card="true"
              className="card-entrance p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover relative flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-4xl sm:text-5xl text-accent font-bold opacity-80">
                    {item.step}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                    {idx + 1}/4
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--border-subtle)]/50">
                <div className="h-1 bg-[var(--bg-main)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] rounded-full"
                    style={{ width: `${(idx + 1) * 25}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
