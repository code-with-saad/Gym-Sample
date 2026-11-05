"use client";

import { useEffect, useState, useRef } from "react";
import { defaultGymConfig } from "@/config/gym.config";

interface PreloaderProps {
  gymName?: string;
  tagline?: string;
}

export default function Preloader({
  gymName = defaultGymConfig.name,
  tagline = defaultGymConfig.tagline,
}: PreloaderProps) {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.setAttribute("data-preloader", "done");
      const id = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(id);
    }

    // Check sessionStorage
    try {
      if (sessionStorage.getItem("gym_preloader_seen")) {
        document.documentElement.setAttribute("data-preloader", "done");
        const id = requestAnimationFrame(() => setVisible(false));
        return () => cancelAnimationFrame(id);
      }
    } catch {
      // sessionStorage not available
    }

    document.documentElement.setAttribute("data-preloader", "pending");
    document.body.style.overflow = "hidden";

    // Counter animation: 1 to 100 over ~2.4s (2400ms) with cubic ease-out
    const startTime = performance.now();
    const duration = 2400;
    let holdTimer: NodeJS.Timeout | null = null;
    let exitTimer: NodeJS.Timeout | null = null;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic: rapid early progress then easing into 100
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.max(1, Math.min(100, Math.round(easedProgress * 100)));

      setCount(currentVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(100);
        // 0.3s hold at 100
        holdTimer = setTimeout(() => {
          setIsExiting(true);
          document.body.style.overflow = "";

          // 0.7s slide-up exit
          exitTimer = setTimeout(() => {
            setVisible(false);
            document.documentElement.setAttribute("data-preloader", "done");
            try {
              sessionStorage.setItem("gym_preloader_seen", "true");
            } catch {
              // Ignore
            }
          }, 700);
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (holdTimer) clearTimeout(holdTimer);
      if (exitTimer) clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  const nameParts = gymName.trim().split(" ");
  const firstPart = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastPart = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return (
    <div
      aria-hidden="true"
      className={`preloader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-main)] px-4 select-none pointer-events-auto ${
        isExiting ? "preloader-exit-active" : ""
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full px-6 preloader-brand-fade">
        {/* Title */}
        <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-tight tracking-wider uppercase m-0 max-h-[4.5em] overflow-hidden break-words line-clamp-3">
          {lastPart ? (
            <>
              {firstPart}{" "}
              <span className="bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] bg-clip-text text-transparent inline-block">
                {lastPart}
              </span>
            </>
          ) : (
            <span className="bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] bg-clip-text text-transparent inline-block">
              {gymName}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        {tagline && (
          <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[var(--text-muted)] uppercase mt-2 mb-8 font-medium px-2">
            {tagline}
          </p>
        )}

        {/* Counter Number */}
        <div className="font-heading text-6xl sm:text-7xl md:text-8xl text-[var(--accent)] mb-6 tabular-nums tracking-wider leading-none">
          {count}
        </div>
      </div>

      {/* Thin full-width progress bar along bottom edge synced to count */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--border-subtle)] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] transition-all duration-75 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}
