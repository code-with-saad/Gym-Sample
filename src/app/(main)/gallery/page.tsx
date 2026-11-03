import type { Metadata } from "next";
import GalleryPageBody from "@/components/pages/GalleryPageBody";
import { getDefaultSiteConfig } from "@/lib/lead-adapter";

export const metadata: Metadata = {
  title: "Facility Gallery | IronForge Fitness",
  description: "Browse photographs of our gym floor, strength platforms, cardio stations, and training areas.",
};

export default function GalleryPage() {
  const config = getDefaultSiteConfig();
  return <GalleryPageBody config={config} />;
}
