import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import AboutSection from "@/components/home/AboutSection";
import ProgramsGrid from "@/components/home/ProgramsGrid";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { AdaptedSiteConfig } from "@/lib/lead-adapter";

interface HomePageBodyProps {
  config: AdaptedSiteConfig;
  isDemo?: boolean;
  basePath?: string;
}

export default function HomePageBody({
  config,
  isDemo = false,
  basePath = "",
}: HomePageBodyProps) {
  return (
    <>
      <Hero
        gymName={config.name}
        tagline={config.tagline}
        subtagline={config.subtagline}
        rating={config.rating}
        reviews={config.reviews}
        heroBadge={config.heroBadge}
        whatsapp={config.whatsapp}
        phone={config.phone}
        audience={config.audience}
        heroImageDesktop={config.heroImageDesktop}
        isDemo={isDemo}
        offsetTop={isDemo ? 100 : 70}
        basePath={basePath}
      />
      <FeatureStrip
        saunaAvailable={config.saunaAvailable}
        isDemo={isDemo}
        hours={config.hours}
      />
      <AboutSection
        gymName={config.name}
        stats={config.stats}
        rating={config.rating}
        reviews={config.reviews}
        aboutText={config.subtagline}
        basePath={basePath}
        isDemo={isDemo}
      />
      <ProgramsGrid
        programs={config.programs}
        isDemo={isDemo}
        basePath={basePath}
      />
      <PricingSection
        plans={config.pricing}
        whatsapp={config.whatsapp}
        gymName={config.name}
        isDemo={isDemo}
        showTeaserLink={true}
        basePath={basePath}
      />
      <TestimonialsCarousel
        testimonials={config.testimonials}
        isDemo={isDemo}
      />
      <FinalCtaBand
        gymName={config.name}
        whatsapp={config.whatsapp}
        phone={config.phone}
        isDemo={isDemo}
        basePath={basePath}
      />
    </>
  );
}

