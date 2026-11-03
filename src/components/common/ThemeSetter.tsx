"use client";

import { useEffect } from "react";

export default function ThemeSetter({ theme }: { theme: "gold" | "rose" }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.setAttribute("data-theme", "gold");
    };
  }, [theme]);

  return null;
}

