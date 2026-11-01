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
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.dataset.preloader = "skipped";
      const id = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(id);
    }

    // Check sessionStorage
    try {
      if (sessionStorage.getItem("gym_preloader_seen")) {
        document.body.dataset.preloader = "skipped";
        const id = requestAnimationFrame(() => setVisible(false));
        return () => cancelAnimationFrame(id);
      }
      sessionStorage.setItem("gym_preloader_seen", "true");
    } catch {
      // sessionStorage not available
    }

    document.body.dataset.preloader = "shown";

    const initId = requestAnimationFrame(() => {
      setMounted(true);
      document.body.style.overflow = "hidden";
    });

    // Counter animation 0 to 100 over ~2.2s (easeOutCubic)
    const startTime = performance.now();
    const duration = 2200;
    let holdTimer: NodeJS.Timeout | null = null;
    let exitTimer: NodeJS.Timeout | null = null;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easedProgress * 100);

      setCount(currentVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(100);
        // Hold for 0.3s (300ms) at 100 before starting slide-up exit
        holdTimer = setTimeout(() => {
          setIsExiting(true);
          document.body.style.overflow = "";
          // Slide-up exit takes ~0.7s (700ms)
          exitTimer = setTimeout(() => {
            setVisible(false);
          }, 700);
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(initId);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (holdTimer) clearTimeout(holdTimer);
      if (exitTimer) clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  // Split gymName into two parts for styling if applicable
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
      <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full px-6">
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
        <div className="font-heading text-6xl sm:text-7xl md:text-8xl text-[var(--accent)] mb-4 tabular-nums tracking-wider leading-none">
          {mounted ? count : 100}
        </div>

        {/* Minimal Progress Line synced to count */}
        <div className="w-36 sm:w-44 h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${mounted ? count : 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
