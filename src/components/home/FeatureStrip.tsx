import { Dumbbell, Users, Clock, HeartHandshake, ShieldAlert, Sparkles } from "lucide-react";
import MobileCarousel from "@/components/common/MobileCarousel";

interface FeatureStripProps {
  saunaAvailable?: boolean;
  isDemo?: boolean;
  hours?: string;
}

export default function FeatureStrip({
  saunaAvailable = true,
  isDemo = false,
  hours = "",
}: FeatureStripProps) {
  const genericFeatures = [
    {
      icon: Dumbbell,
      title: "TOP TIER EQUIPMENT",
      desc: "Comprehensive free weights & machines",
    },
    {
      icon: Users,
      title: "EXPERT COACHING",
      desc: "1:1 programming & oversight",
    },
    {
      icon: Clock,
      title: "FLEXIBLE TIMINGS",
      desc: "Extended hours 7 days/wk",
    },
    {
      icon: HeartHandshake,
      title: "MOTIVATING ATMOSPHERE",
      desc: "Zero clutter, pure discipline",
    },
    {
      icon: ShieldAlert,
      title: saunaAvailable ? "SAUNA FACILITY" : "HYGIENE FIRST",
      desc: saunaAvailable ? "On-site sauna & recovery" : "Sanitized & ventilated facility",
    },
  ];

  const demoFeatures = [
    {
      icon: Dumbbell,
      title: "FITNESS & STRENGTH",
      desc: "Dedicated fitness workout area",
    },
    {
      icon: Users,
      title: "COACHING SUPPORT",
      desc: "Training guidance and support",
    },
    {
      icon: Clock,
      title: "FACILITY TIMINGS",
      desc: hours ? (hours.length > 34 ? `${hours.slice(0, 31)}...` : hours) : "Scheduled operating hours",
    },
    {
      icon: HeartHandshake,
      title: "MEMBER COMMUNITY",
      desc: "Focused training atmosphere",
    },
    {
      icon: saunaAvailable ? ShieldAlert : Sparkles,
      title: saunaAvailable ? "SAUNA FACILITY" : "MEMBERSHIP PLANS",
      desc: saunaAvailable ? "On-site sauna facility access" : "Flexible enrollment options",
    },
  ];

  const features = isDemo ? demoFeatures : genericFeatures;

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:-mt-6 lg:-mt-12 mb-14 lg:mb-16">
      <div
        data-reveal="true"
        className="glass-panel bg-[var(--bg-surface-glass)] rounded-2xl border border-[var(--border-subtle)] p-4 sm:p-6 lg:p-8 shadow-2xl"
      >
        <MobileCarousel
          ariaLabel="Facility Features"
          gridClassName="md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:divide-x md:divide-[var(--border-subtle)]"
        >
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-card="true"
                data-reveal="true"
                style={{ "--reveal-delay": `${(idx * 0.08).toFixed(2)}s` } as React.CSSProperties}
                className="card-entrance flex flex-col items-center text-center p-4 md:p-0 md:px-3 rounded-xl md:rounded-none bg-[var(--bg-surface)] md:bg-transparent border border-[var(--border-subtle)] md:border-0 h-full justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg tracking-wider text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
