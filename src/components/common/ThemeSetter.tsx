"use client";

import { useLayoutEffect } from "react";

export default function ThemeSetter({ theme }: { theme: "gold" | "rose" }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.setAttribute("data-theme", "gold");
    };
  }, [theme]);

  return null;
}

