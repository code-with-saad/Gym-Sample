"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  durationMs?: number;
  label: string;
}

export default function StatCounter({
  end,
  suffix = "",
  durationMs = 1800,
  label,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, durationMs]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold tracking-tight">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}
