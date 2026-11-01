"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const easeCurve = [0.22, 1, 0.36, 1] as const;
const TRAVEL = 16;

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: TRAVEL }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: easeCurve }}
      className={className}
    >
      {children}
    </m.div>
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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: TRAVEL },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCurve,
      },
    },
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const cappedDelay = Math.min(idx * staggerDelay, 0.32);
        return (
          <m.div
            variants={itemVariants}
            transition={{
              duration: 0.6,
              delay: cappedDelay,
              ease: easeCurve,
            }}
          >
            {child}
          </m.div>
        );
      })}
    </m.div>
  );
}
