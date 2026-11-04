"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // If reduced motion is requested, immediately reveal all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const checkAndObserve = () => {
      const vh = window.innerHeight;
      const elements = document.querySelectorAll("[data-reveal]:not(.revealed)");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal elements that are already within the viewport on load
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          el.classList.add("revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    checkAndObserve();
    const timer = setTimeout(checkAndObserve, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

