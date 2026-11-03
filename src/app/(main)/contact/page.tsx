import type { Metadata } from "next";
import ContactPageBody from "@/components/pages/ContactPageBody";
import { getDefaultSiteConfig } from "@/lib/lead-adapter";

export const metadata: Metadata = {
  title: "Contact Us & Free Trial Pass | IronForge Fitness",
  description: "Visit our DHA Phase 3 facility in Lahore, book your free trial session, or contact our head coaches via WhatsApp.",
};

export default function ContactPage() {
  const config = getDefaultSiteConfig();
  return <ContactPageBody config={config} />;
}
