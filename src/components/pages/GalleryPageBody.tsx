import PageHeroBanner from "@/components/common/PageHeroBanner";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import { AdaptedSiteConfig } from "@/lib/lead-adapter";
import { images } from "@/config/images";

interface GalleryPageBodyProps {
  config: AdaptedSiteConfig;
  isDemo?: boolean;
  basePath?: string;
}

export default function GalleryPageBody({
  config,
  isDemo = false,
  basePath = "",
}: GalleryPageBodyProps) {
  return (
    <div className={isDemo ? "pt-[110px] sm:pt-[118px]" : "pt-[72px] sm:pt-[80px]"}>
      {/* Page Hero Banner */}
      <PageHeroBanner
        breadcrumb="Gallery"
        title="INSIDE THE FACILITY."
        accentWord="FACILITY"
        subtitle="Inspect our training floor, equipment platforms, and dedicated member facilities."
        bgImage={config.galleryBannerImage}
        homeHref={isDemo ? basePath || "/" : "/"}
      />

      {/* Gallery Grid with Lightbox */}
      <section className="py-14 lg:py-24 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={[...images.gallery]} />
        </div>
      </section>

      {/* Before / After Transformation Sliders */}
      <BeforeAfterSlider audience={config.audience} />

      {/* Final CTA */}
      <FinalCtaBand
        gymName={config.name}
        whatsapp={config.whatsapp}
        phone={config.phone}
        isDemo={isDemo}
        basePath={basePath}
      />
    </div>
  );
}

