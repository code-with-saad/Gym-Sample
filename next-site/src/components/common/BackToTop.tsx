"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      id="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-24 md:bottom-6 right-5 z-40 p-3 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent hover:shadow-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
