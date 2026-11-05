import type { Metadata } from "next";
import AboutPageBody from "@/components/pages/AboutPageBody";
import { getDefaultSiteConfig } from "@/lib/lead-adapter";

export const metadata: Metadata = {
  title: "About Us | Elite Athletic Strength Facility",
  description: "Learn about the mission, training principles, coaches, and elite facilities behind IronForge Fitness Lahore.",
};

export default function AboutPage() {
  const config = getDefaultSiteConfig();
  return <AboutPageBody config={config} />;
}
