import PageHeroBanner from "@/components/common/PageHeroBanner";
import JoinForm from "@/components/forms/JoinForm";
import FaqAccordion from "@/components/home/FaqAccordion";
import { AdaptedSiteConfig } from "@/lib/lead-adapter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactPageBodyProps {
  config: AdaptedSiteConfig;
  isDemo?: boolean;
  basePath?: string;
}

export default function ContactPageBody({
  config,
  isDemo = false,
  basePath = "",
}: ContactPageBodyProps) {
  return (
    <div className={isDemo ? "pt-24 lg:pt-28" : "pt-20 lg:pt-24"}>
      {/* Page Hero Banner */}
      <PageHeroBanner
        breadcrumb="Contact"
        title="VISIT OUR FACILITY OR BOOK A TRIAL."
        accentWord="FACILITY"
        subtitle="Our team is on standby to provide a walk-through or get you set up with a trial pass."
        bgImage={config.contactBannerImage}
        homeHref={isDemo ? basePath || "/" : "/"}
      />

      {/* Main Content Grid */}
      <section className="py-14 lg:py-24 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Info & Google Maps Embed */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
                <h3 className="font-heading text-2xl sm:text-3xl text-[var(--text-primary)]">
                  CLUB HEADQUARTERS
                </h3>

                <div className="space-y-4 text-sm text-[var(--text-muted)]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Address:</strong>
                      <span>{config.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Direct Hotline:</strong>
                      <a
                        href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-accent hover:underline"
                      >
                        {config.phone}
                      </a>
                    </div>
                  </div>

                  {config.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--text-primary)] block">General Inquiries:</strong>
                        <a
                          href={`mailto:${config.email}`}
                          className="text-accent hover:underline"
                        >
                          {config.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-primary)] block">Operating Hours:</strong>
                      <span>{config.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed iframe */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] aspect-[16/10] relative shadow-lg">
                  <iframe
                    title={`${config.name} Location Map`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${config.name}, ${config.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="pt-1">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${config.name} ${config.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-[var(--accent-light)] transition-colors"
                  >
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-6">
              <JoinForm
                gymName={config.name}
                whatsapp={config.whatsapp}
                phone={config.phone}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Short FAQ */}
      <FaqAccordion faq={config.faq.slice(0, 4)} />
    </div>
  );
}

