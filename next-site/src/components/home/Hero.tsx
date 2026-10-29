import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Zap, ArrowRight, Phone } from "lucide-react";
import { images } from "@/config/images";

interface HeroProps {
  gymName?: string;
  tagline?: string;
  subtagline?: string;
  rating?: number;
  reviews?: number;
  heroBadge?: string;
  whatsapp?: string;
  phone?: string;
  isDemo?: boolean;
  audience?: "mixed" | "ladies";
  heroImageDesktop?: string;
  heroImageMobile?: string;
}

export default function Hero({
  gymName = "IronForge Fitness",
  subtagline = "Lahore's premier high-performance strength facility. Elite coaching, calibrated Olympic equipment, and an uncompromising atmosphere built for real results.",
  rating = 4.9,
  reviews = 380,
  heroBadge = "PREMIER STRENGTH & CONDITIONING CLUB",
  whatsapp = "923001234567",
  phone = "+92 300 1234567",
  isDemo = false,
  audience = "mixed",
  heroImageDesktop,
  heroImageMobile,
}: HeroProps) {
  const hasWhatsapp = Boolean(whatsapp && whatsapp.trim() !== "");

  const primaryHref = hasWhatsapp
    ? `https://wa.me/${whatsapp!.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${gymName}, I want to book a free trial session.`
      )}`
    : `tel:${phone.replace(/[^0-9+]/g, "")}`;

  const primaryLabel = hasWhatsapp ? "JOIN NOW" : "CALL TO JOIN";
  const primaryTarget = hasWhatsapp ? "_blank" : undefined;
  const primaryRel = hasWhatsapp ? "noopener noreferrer" : undefined;

  const isLadies = audience === "ladies";
  const defaultDesktop = isLadies ? images.ladies.hero.portrait : images.hero.main;
  const defaultMobile = isLadies ? images.ladies.hero.portrait : images.hero.portrait;
  const desktopSrc = heroImageDesktop || defaultDesktop;
  const mobileSrc = heroImageMobile || defaultMobile;

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 right-5 sm:right-1/4 w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] pointer-events-none filter blur-2xl"
        aria-hidden="true"
      />

      {/* Diagonal accent slash lines */}
      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20"
        aria-hidden="true"
      >
        <div className="absolute right-[12%] top-[-10%] w-[2px] h-[130%] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent transform rotate-[25deg]" />
        <div className="absolute right-[28%] top-[-10%] w-[1px] h-[130%] bg-gradient-to-b from-transparent via-[var(--accent-light)] to-transparent transform rotate-[25deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-xs font-semibold uppercase tracking-widest text-accent mb-6 shadow-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0" />
              <span className="overflow-hidden text-ellipsis">{heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-[clamp(2.5rem,10vw,8rem)] text-[var(--text-primary)] leading-[0.92] tracking-wide mb-6">
              TRAIN HARD. <br />
              <span className="text-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
                STAY UNSTOPPABLE.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[var(--text-muted)] text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              {subtagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={primaryHref}
                target={primaryTarget}
                rel={primaryRel}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-heading text-xl tracking-wider uppercase font-bold shadow-glow hover:brightness-110 active:scale-95 transition-all text-center"
              >
                {!hasWhatsapp && <Phone className="w-5 h-5 text-black" />}
                <span>{primaryLabel}</span>
                {hasWhatsapp && <ArrowRight className="w-5 h-5 text-black" />}
              </a>

              {isDemo ? (
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border-2 border-[var(--accent)] text-[var(--text-primary)] font-heading text-xl tracking-wider uppercase font-bold hover:bg-[var(--accent)] hover:text-black transition-all text-center"
                >
                  <span>MEMBERSHIP PLANS</span>
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border-2 border-[var(--accent)] text-[var(--text-primary)] font-heading text-xl tracking-wider uppercase font-bold hover:bg-[var(--accent)] hover:text-black transition-all text-center"
                >
                  <span>BOOK FREE TRIAL</span>
                </Link>
              )}
            </div>

            {/* Social Proof & Rating Badge */}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)] w-full max-w-md">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-[var(--text-primary)]">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  Rated {rating} across {reviews}+ Google reviews in Lahore
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl group">
                <div className="aspect-[4/5] relative w-full">
                  {/* Mobile-only portrait photo */}
                  <Image
                    src={mobileSrc}
                    alt={`${gymName} Training`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top sm:hidden group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Desktop / tablet main photo */}
                  <Image
                    src={desktopSrc}
                    alt={`${gymName} Training`}
                    fill
                    priority
                    sizes="(max-width: 1200px) 50vw, 40vw"
                    className="hidden sm:block object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating info badges — only shown on default (non-demo) site */}
                {!isDemo && (
                  <>
                    <div className="absolute top-4 left-4 glass-panel px-3.5 py-2 rounded-lg flex items-center gap-2.5 shadow-lg border border-[var(--border-subtle)]">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                          Certified Coaches
                        </span>
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          Professional & Accredited
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-2 rounded-lg flex items-center gap-2.5 shadow-lg border border-[var(--border-subtle)]">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                          Quality Equipment
                        </span>
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          Full-Service Facility
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* In demo mode: show rating badge instead */}
                {isDemo && (
                  <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg border border-[var(--border-subtle)]">
                    <div className="flex text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {rating.toFixed(1)} on Google
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {reviews}+ Google reviews
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
