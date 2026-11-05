import type { Metadata } from "next";
import ProgramsPageBody from "@/components/pages/ProgramsPageBody";
import { getDefaultSiteConfig } from "@/lib/lead-adapter";

export const metadata: Metadata = {
  title: "Programs, Schedule & Pricing | Strength, Conditioning & Personal Training",
  description: "Explore our comprehensive training disciplines, weekly class timetable, flexible membership pricing tiers, and membership FAQ.",
};

export default function ProgramsPage() {
  const config = getDefaultSiteConfig();
  return <ProgramsPageBody config={config} />;
}
