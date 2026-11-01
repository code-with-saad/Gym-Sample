import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import AboutSection from "@/components/home/AboutSection";
import ProgramsGrid from "@/components/home/ProgramsGrid";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { defaultGymConfig } from "@/config/gym.config";

export default function HomePage() {
  return (
    <>
      <Hero
        gymName={defaultGymConfig.name}
        tagline={defaultGymConfig.tagline}
        subtagline={defaultGymConfig.subtagline}
        rating={defaultGymConfig.rating}
        reviews={defaultGymConfig.reviewCount}
        heroBadge={defaultGymConfig.heroBadge}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
      <FeatureStrip saunaAvailable={defaultGymConfig.amenities.sauna} />
      <AboutSection
        gymName={defaultGymConfig.name}
        stats={defaultGymConfig.stats}
        rating={defaultGymConfig.rating}
        reviews={defaultGymConfig.reviewCount}
      />
      <ProgramsGrid programs={defaultGymConfig.programs} />
      <PricingSection
        plans={defaultGymConfig.pricing}
        whatsapp={defaultGymConfig.whatsapp}
        gymName={defaultGymConfig.name}
        showTeaserLink={true}
      />
      <TestimonialsCarousel testimonials={defaultGymConfig.testimonials} />
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </>
  );
}
