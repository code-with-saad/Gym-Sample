import { Dumbbell, Users, Clock, HeartHandshake, ShieldAlert } from "lucide-react";

interface FeatureStripProps {
  saunaAvailable?: boolean;
}

export default function FeatureStrip({ saunaAvailable = true }: FeatureStripProps) {
  const features = [
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

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 lg:-mt-12 mb-16">
      <div className="glass-panel bg-[var(--bg-surface-glass)] rounded-2xl border border-[var(--border-subtle)] p-6 lg:p-8 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)]">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-3 ${
                  idx > 0 ? "pt-4 md:pt-0" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg tracking-wider text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
