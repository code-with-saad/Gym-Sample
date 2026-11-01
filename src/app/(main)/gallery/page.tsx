import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import { defaultGymConfig } from "@/config/gym.config";
import { images } from "@/config/images";

export const metadata: Metadata = {
  title: "Facility Gallery | IronForge Fitness",
  description: "Browse photographs of our gym floor, strength platforms, cardio stations, and training areas.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="FACILITY TOUR"
            title="INSIDE THE FACILITY."
            accentWord="FACILITY"
            description="Inspect our strength equipment, free weights, cardio area, and dedicated training zones."
          />
        </div>
      </section>

      {/* Gallery Grid with Lightbox */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={[...images.gallery]} />
        </div>
      </section>

      {/* Before / After Transformation Sliders */}
      <BeforeAfterSlider />

      {/* Final CTA */}
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </div>
  );
}
