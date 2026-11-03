import type { Metadata } from "next";
import HomePageBody from "@/components/pages/HomePageBody";
import { getDefaultSiteConfig } from "@/lib/lead-adapter";

export const metadata: Metadata = {
  title: "IronForge Fitness | Elite Strength & Conditioning Gym Lahore",
  description: "Premier strength, conditioning, and barbell sanctuary in DHA Phase 3, Lahore. Free trial pass, certified coaches, sauna, and modern facilities.",
};

export default function HomePage() {
  const config = getDefaultSiteConfig();
  return <HomePageBody config={config} />;
}
