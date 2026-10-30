export default function MarqueeStrip() {
  const items = [
    "POWERLIFTING",
    "HYPERTROPHY",
    "CROSS TRAINING",
    "METABOLIC CONDITIONING",
    "OLYMPIC WEIGHTLIFTING",
    "ATHLETIC MOBILITY",
    "FREE WEIGHT TRAINING",
    "VO2 MAX ENDURANCE",
  ];

  return (
    <div className="py-4 bg-[var(--bg-surface-elevated)] border-y border-[var(--border-subtle)] overflow-hidden relative">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-heading text-xl sm:text-2xl text-[var(--text-muted)] tracking-widest hover:text-accent transition-colors">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
