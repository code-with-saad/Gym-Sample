import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";
import JoinForm from "@/components/forms/JoinForm";
import FaqAccordion from "@/components/home/FaqAccordion";
import { defaultGymConfig } from "@/config/gym.config";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Free Trial Pass | IronForge Fitness",
  description: "Visit our DHA Phase 3 facility in Lahore, book your free trial session, or contact our head coaches via WhatsApp.",
};

const contactFaq = [
  {
    question: "How do I claim my complimentary trial workout?",
    answer: "Fill out the contact form or drop us a WhatsApp message. Our front desk concierge will confirm your schedule and provide a complimentary guest day pass.",
  },
  {
    question: "What are your peak training hours?",
    answer: "Peak floor occupancy is generally 6:30 PM to 9:30 PM on weekdays. Morning (6:00 AM - 11:00 AM) and early afternoon hours are quieter for undisturbed lifting.",
  },
  {
    question: "Is there secure on-site vehicle parking?",
    answer: "Yes, dedicated on-site parking spots and security surveillance are provided for all registered members.",
  },
  {
    question: "Do you offer private consultations before joining?",
    answer: "Every prospective member is entitled to a complimentary 15-minute facility walk-through and coaching goal setting session before enrolling.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="GET IN TOUCH"
            title="VISIT OUR FACILITY OR BOOK A TRIAL."
            accentWord="FACILITY"
            description="Our front desk and coaching team are on standby to give you a private tour of the gym."
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info & Google Maps Embed */}
            <div className="lg:col-span-6 space-y-8">
              <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
                <h3 className="font-heading text-3xl text-[var(--text-primary)]">
                  CLUB HEADQUARTERS
                </h3>

                <div className="space-y-4 text-sm text-[var(--text-muted)]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Address:</strong>
                      <span>{defaultGymConfig.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Direct Hotline:</strong>
                      <a
                        href={`tel:${defaultGymConfig.displayPhone.replace(/[^0-9+]/g, "")}`}
                        className="text-accent hover:underline"
                      >
                        {defaultGymConfig.displayPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Inquiries:</strong>
                      <a href={`mailto:${defaultGymConfig.email}`} className="hover:text-accent">
                        {defaultGymConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Operating Hours:</strong>
                      <span>{defaultGymConfig.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={defaultGymConfig.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-accent" />
                    <span>Get Driving Directions</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Lazy iframe Embed */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] aspect-[16/10] relative shadow-lg">
                <iframe
                  title="Gym Google Maps Location"
                  src={defaultGymConfig.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-6">
              <JoinForm
                gymName={defaultGymConfig.name}
                whatsapp={defaultGymConfig.whatsapp}
                phone={defaultGymConfig.displayPhone}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Short FAQ Section */}
      <FaqAccordion faq={contactFaq} />
    </div>
  );
}
