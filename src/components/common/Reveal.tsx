"use client";

import React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  scale = false,
}: RevealProps) {
  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
    : undefined;

  return (
    <div
      data-reveal={scale ? "scale" : "true"}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const delay = Math.min(idx * staggerDelay, 0.4);
        const childProps = child.props as Record<string, unknown>;
        const childStyle = (childProps.style as React.CSSProperties) || {};
        return React.cloneElement(child, {
          "data-reveal": childProps["data-reveal"] || "true",
          style: {
            ...childStyle,
            "--reveal-delay": `${delay}s`,
          },
        } as React.HTMLAttributes<HTMLElement>);
      })}
    </div>
  );
}
