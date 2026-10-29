import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionTitle from "@/components/common/SectionTitle";
import { getAllLeads } from "@/lib/leads";
import { ArrowRight, Star, MapPin, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/common/FloatingContactButton";

export const metadata: Metadata = {
  title: "Demo Client Portals | IronForge Fitness",
  description: "Preview personalized demo websites generated for gym owners in Lahore.",
  robots: { index: false, follow: false },
};

export default function DemoIndexPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const leads = getAllLeads();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-36">
        <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="PERSONALIZED CLIENT DEMOS"
            title="TAILORED PITCH PROPOSALS FOR GYM OWNERS."
            accentWord="PROPOSALS"
            description="Select any prospective client below to preview how their personalized brand, ratings, hours, and audience palette render in real-time."
          />
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leads.map((lead) => {
              const isLadies = lead.audience === "ladies";
              const themeBadgeColor = isLadies ? "text-rose-400 border-rose-500/30" : "text-amber-400 border-amber-500/30";

              return (
                <div
                  key={lead.slug}
                  className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between card-hover relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border bg-[var(--bg-surface-elevated)] ${themeBadgeColor}`}
                      >
                        {isLadies ? "Ladies Studio (Rose Theme)" : "Mixed Club (Gold Theme)"}
                      </span>
                      <div className="flex items-center gap-1 text-accent text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{lead.rating}</span>
                        <span className="text-[var(--text-muted)]">({lead.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl text-[var(--text-primary)] group-hover:text-accent transition-colors mb-2">
                      {lead.name}
                    </h3>

                    <div className="flex items-start gap-2 text-xs text-[var(--text-muted)] mb-3">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{lead.address}</span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed mb-4">
                      {lead.about}
                    </p>

                    {/* Flags */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {lead.flags.sauna && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          Sauna
                        </span>
                      )}
                      {lead.flags.wifi && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          High Speed Wifi
                        </span>
                      )}
                      {lead.flags.parking && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          Parking
                        </span>
                      )}
                      {lead.flags.childCare && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          Child Care
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      {lead.whatsapp ? (
                        <span className="flex items-center gap-1 text-[#25D366]">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WA Ready</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-blue-400">
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Only</span>
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/demo/${lead.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:border-accent hover:text-accent transition-colors"
                    >
                      <span>Preview Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingContactButton />
  </>
);
}
