import type { Metadata } from "next";
import PricingSection from "@/components/home/PricingSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { defaultGymConfig } from "@/config/gym.config";

export const metadata: Metadata = {
  title: "Membership Plans & Pricing | IronForge Fitness",
  description: "Explore monthly, quarterly, and yearly gym memberships in Lahore. No hidden joining fees, flexible access passes.",
};

export default function PricingPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <PricingSection
        plans={defaultGymConfig.pricing}
        whatsapp={defaultGymConfig.whatsapp}
        gymName={defaultGymConfig.name}
      />
      <FaqAccordion faq={defaultGymConfig.faq} />
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </div>
  );
}
