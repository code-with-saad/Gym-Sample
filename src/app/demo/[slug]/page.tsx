import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLeads, getLeadBySlug, LeadItem } from "@/lib/leads";
import { defaultGymConfig, ProgramItem } from "@/config/gym.config";
import { images } from "@/config/images";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/common/FloatingContactButton";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import Preloader from "@/components/common/Preloader";
import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import ProgramsGrid from "@/components/home/ProgramsGrid";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ProcessSteps from "@/components/home/ProcessSteps";
import TrainersSection from "@/components/home/TrainersSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FaqAccordion from "@/components/home/FaqAccordion";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import StatCounter from "@/components/common/StatCounter";
import {
  Wifi,
  ParkingCircle,
  Flame,
  Laptop,
  Baby,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

interface LeadDemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const leads = getAllLeads();
  if (leads.length === 0) {
    return [{ slug: "__placeholder" }];
  }
  return leads.map((lead) => ({
    slug: lead.slug,
  }));
}

export async function generateMetadata({
  params,
}: LeadDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    return { title: "Client Demo Not Found" };
  }

  return {
    title: {
      absolute: `${lead.name} | Exclusive Fitness Demo`,
    },
    description: `Visit ${lead.name} in Lahore.`,
    authors: [{ name: lead.name }],
    keywords: [`${lead.name}`, "Gym Lahore", "Fitness Club Lahore"],
    openGraph: {
      title: `${lead.name} | Exclusive Fitness Demo`,
      description: `Visit ${lead.name} in Lahore.`,
      siteName: lead.name,
    },
    twitter: {
      title: `${lead.name} | Exclusive Fitness Demo`,
      description: `Visit ${lead.name} in Lahore.`,
    },
    robots: { index: false, follow: false },
  };
}

function sanitizeEquipment(text: string): string {
  return text
    .replace(/Olympic lifting areas?,?/gi, "lifting areas")
    .replace(/Olympic lifting/gi, "strength training")
    .replace(/curved treadmills?/gi, "cardio equipment")
    .replace(/rowing stations?/gi, "cardio stations")
    .replace(/non-motorized curved treadmills?/gi, "cardio equipment")
    .replace(/air resistance rowers?/gi, "cardio machines")
    .replace(/SkiErgs?/gi, "cardio machines")
    .replace(/bumper plates?/gi, "weight plates")
    .replace(/power racks?/gi, "training racks")
    .replace(/squat racks?/gi, "training racks")
    .replace(/barbell complexes?/gi, "resistance complexes")
    .replace(/barbells?/gi, "free weights")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function deriveSubtagline(lead: LeadItem, isLadies: boolean): string {
  if (isLadies) {
    return `A dedicated women's fitness and wellness studio offering strength training, group classes, and personalised coaching in a supportive environment.`;
  }
  return `A professional fitness facility offering structured training programs, personal coaching, and the amenities you need to reach your goals.`;
}

function AmenityChips({ flags }: { flags: LeadItem["flags"] }) {
  const chips: { label: string; Icon: React.ElementType }[] = [];
  if (flags.sauna) chips.push({ label: "Sauna", Icon: Flame });
  if (flags.wifi) chips.push({ label: "Free Wi-Fi", Icon: Wifi });
  if (flags.parking) chips.push({ label: "Parking", Icon: ParkingCircle });
  if (flags.onlineClasses) chips.push({ label: "Online Classes", Icon: Laptop });
  if (flags.childCare) chips.push({ label: "Child Care", Icon: Baby });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {chips.map(({ label, Icon }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--bg-surface-elevated)] text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider"
        >
          <Icon className="w-3.5 h-3.5 text-accent" />
          {label}
        </span>
      ))}
    </div>
  );
}

export default async function LeadDemoPage({ params }: LeadDemoPageProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    notFound();
  }

  const isLadies = lead.audience === "ladies";
  const theme = isLadies ? "rose" : "gold";

  const heroBadge = isLadies
    ? "PREMIER WOMEN'S WELLNESS & STRENGTH STUDIO"
    : "PREMIER FITNESS & STRENGTH FACILITY";

  const subtagline = deriveSubtagline(lead, isLadies);

  // Only real data: rating and review count. No invented numbers.
  const leadStats = [
    {
      label: "Google Star Rating",
      value: Math.floor(lead.rating),
      suffix: `.${Math.round((lead.rating % 1) * 10)} ★`,
    },
    { label: "Google Reviews", value: lead.reviews, suffix: "+" },
  ];

  const ladiesPrograms: ProgramItem[] = [
    {
      id: "gym-training",
      slug: "gym-training",
      title: "Strength & Tone",
      category: "Strength",
      shortDesc: "Progressive resistance training tailored for lean muscle sculpting, core stability, and functional tone.",
      fullDesc: "Designed specifically for women seeking empowered strength, optimal bone density, and posture enhancement in a private, supportive studio setting.",
      image: images.ladies.programs.strength,
      intensity: "High",
      duration: "55-60 min",
      features: [
        "Dedicated women's lifting zone",
        "Posture & biomechanics focus",
        "Progressive overload fundamentals",
        "Joint-friendly resistance protocols",
      ],
    },
    {
      id: "group-classes",
      slug: "group-classes",
      title: "Group Fitness",
      category: "Community",
      shortDesc: "High-energy boutique group workouts combining rhythmic cardio intervals, resistance bands, and functional movement.",
      fullDesc: "Energizing classes led by professional female instructors fostering community motivation, cardiovascular stamina, and total body agility.",
      image: images.ladies.programs.classes,
      intensity: "High",
      duration: "45-50 min",
      features: [
        "Professional female instructors",
        "Cardio and core intervals",
        "Supportive group dynamic",
        "All fitness levels welcome",
      ],
    },
    {
      id: "muscle-building",
      slug: "muscle-building",
      title: "Muscle Building",
      category: "Hypertrophy",
      shortDesc: "Targeted hypertrophy splits focusing on glute development, posterior chain strength, and upper body definition.",
      fullDesc: "Evidence-based hypertrophy programming tailored for feminine aesthetic curves, athletic definition, and functional strength without bulk.",
      image: images.ladies.programs.muscleBuilding,
      intensity: "High",
      duration: "60 min",
      features: [
        "Glute & posterior chain focus",
        "Progressive overload mesocycles",
        "Upper body posture & sculpt",
        "Dedicated recovery guidance",
      ],
    },
    {
      id: "cardio",
      slug: "cardio",
      title: "Cardio Endurance",
      category: "Stamina & VO2",
      shortDesc: "Cardiovascular conditioning, interval sprint drills, and low-impact stamina circuits designed to boost your energy.",
      fullDesc: "Build an unstoppable cardiovascular foundation with heart-rate monitored workouts, rowing stations, and non-motorized curved treadmills.",
      image: images.ladies.programs.cardio,
      intensity: "Medium",
      duration: "45 min",
      features: [
        "Heart-rate zone pacing",
        "Low-impact stamina builders",
        "Curved treadmill drills",
        "Endurance benchmarks",
      ],
    },
    {
      id: "weight-loss",
      slug: "weight-loss",
      title: "Weight Loss",
      category: "Conditioning",
      shortDesc: "Metabolic conditioning circuits and structured resistance designed for efficient fat loss and metabolic longevity.",
      fullDesc: "A complete fat loss blueprint combining metabolic barbell complexes, high-intensity intervals, and sustainable lifestyle habit tracking.",
      image: images.ladies.programs.weightLoss,
      intensity: "High",
      duration: "45-50 min",
      features: [
        "Metabolic conditioning circuits",
        "Fat-burning resistance splits",
        "Sustainable macro guidance",
        "Weekly progress evaluations",
      ],
    },
    {
      id: "personal-training",
      slug: "personal-training",
      title: "Personal Training",
      category: "1:1 Coaching",
      shortDesc: "Private, dedicated 1-on-1 coaching customized to your exact physique, schedule, and biomechanical targets.",
      fullDesc: "One-on-one sessions with our dedicated female trainers ensuring immaculate exercise form, safety, and rapid goal achievement.",
      image: images.ladies.programs.personalTraining,
      intensity: "Custom",
      duration: "60 min",
      features: [
        "1:1 female trainer guidance",
        "Custom exercise periodization",
        "Private studio space",
        "Biometric goal tracking",
      ],
    },
  ];

  return (
    <div
      data-theme={theme}
      className="w-full min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)]"
    >
      {/* Lead-specific Preloader */}
      <Preloader
        gymName={lead.name}
        tagline={
          isLadies
            ? "Women's Wellness & Strength Studio"
            : "Strength & Conditioning Club"
        }
      />

      {/* Lead-specific Navbar with integrated banner */}
      <Navbar
        gymName={lead.name}
        phone={lead.phoneE164}
        whatsapp={lead.whatsapp}
        isDemo
        banner={
          <div
            className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black text-[11px] font-bold py-1.5 px-4 text-center shadow"
            style={{ paddingTop: "max(6px, env(safe-area-inset-top, 6px))" }}
          >
            DEMO PREVIEW &mdash; {lead.name.toUpperCase()}
          </div>
        }
      />

      <main className="flex-1 pb-20 md:pb-0">
        <div id="hero" className="scroll-mt-24">
          <Hero
            gymName={lead.name}
            subtagline={subtagline}
            rating={lead.rating}
            reviews={lead.reviews}
            heroBadge={heroBadge}
            whatsapp={lead.whatsapp}
            phone={lead.phoneE164}
            audience={lead.audience}
            isDemo
            offsetTop={100}
          />

          <FeatureStrip saunaAvailable={Boolean(lead.flags.sauna)} />

          {/* About section — curated copy, amenity chips, real stats only */}
          <section id="about" className="py-20 lg:py-28 bg-[var(--bg-main)] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-semibold uppercase tracking-widest text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    About {lead.name}
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-[0.95] tracking-wide mb-4">
                    YOUR FITNESS{" "}
                    <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
                      JOURNEY STARTS HERE.
                    </span>
                  </h2>
                  <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-6">
                    {subtagline}
                  </p>
                  <div id="location" className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{lead.address}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{lead.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <a
                        href={`tel:${lead.phoneE164.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-accent transition-colors"
                      >
                        {lead.phoneE164}
                        {!lead.whatsapp && (
                          <span className="text-xs text-[var(--text-muted)] ml-1">(Call Only)</span>
                        )}
                      </a>
                    </div>
                  </div>
                  <AmenityChips flags={lead.flags} />
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl relative">
                    <div
                      className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,var(--accent-glow)_0%,transparent_60%)] pointer-events-none"
                      aria-hidden="true"
                    />
                    {leadStats.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10"
                      >
                        <StatCounter end={s.value} suffix={s.suffix} label={s.label} />
                      </div>
                    ))}
                    {lead.flags.wifi && (
                      <div className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10">
                        <Wifi className="w-8 h-8 text-accent mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] text-center">
                          High Speed Wi-Fi
                        </span>
                      </div>
                    )}
                    {lead.flags.parking && (
                      <div className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10">
                        <ParkingCircle className="w-8 h-8 text-accent mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] text-center">
                          Parking Available
                        </span>
                      </div>
                    )}
                    {lead.flags.sauna && (
                      <div className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10">
                        <Flame className="w-8 h-8 text-accent mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] text-center">
                          Sauna Facility
                        </span>
                      </div>
                    )}
                    {lead.flags.onlineClasses && (
                      <div className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10">
                        <Laptop className="w-8 h-8 text-accent mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] text-center">
                          Online Classes
                        </span>
                      </div>
                    )}
                    {lead.flags.childCare && (
                      <div className="p-4 sm:p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative z-10">
                        <Baby className="w-8 h-8 text-accent mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] text-center">
                          Child Care
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <MarqueeStrip />
          <ProgramsGrid
            isDemo
            programs={(isLadies ? ladiesPrograms : defaultGymConfig.programs).map((p) => ({
              ...p,
              shortDesc: sanitizeEquipment(p.shortDesc),
              fullDesc: sanitizeEquipment(p.fullDesc),
              features: p.features.map(sanitizeEquipment),
            }))}
          />
          <ProcessSteps steps={defaultGymConfig.processSteps} />
          <TrainersSection
            isDemo
            trainers={(isLadies
              ? defaultGymConfig.trainers.filter((t) => t.id === "zainab-malik" || t.id === "ayesha-khan")
              : defaultGymConfig.trainers
            ).map((t) => ({
              ...t,
              name: "Coach Name",
              role: "Fitness Coach",
              specialty: "General Fitness & Conditioning",
              experience: "",
              certifications: [],
              bio: "",
            }))}
          />
          <PricingSection
            isDemo
            plans={defaultGymConfig.pricing.map((plan) => {
              const features = plan.features
                .filter((f) => !f.includes("pre-workout shake") && !f.includes("guest pass") && !f.includes("coach WhatsApp line"))
                .map((f) => {
                  if (f.includes("IronForge app")) return "Online member portal access";
                  if (f.includes("Finnish sauna")) return lead.flags.sauna ? "On-site sauna facility access" : "Locker room access";
                  if (f.includes("towel service")) return "Locker room access";
                  return f;
                });
              return { ...plan, features };
            })}
            whatsapp={lead.whatsapp}
            gymName={lead.name}
          />
          <TestimonialsCarousel
            isDemo
            testimonials={defaultGymConfig.testimonials.map((t, idx) => {
              const sampleQuotes = [
                "The coaching here made a real difference to my routine. I feel stronger and more motivated than ever.",
                "Great atmosphere, supportive staff, and a facility that keeps me coming back every week.",
                "Joining was one of the best decisions I made for my health. The programs are well structured and easy to follow.",
              ];
              return {
                ...t,
                name: "Member Name",
                role: "Gym Member",
                avatarText: "M",
                quote: sampleQuotes[idx % sampleQuotes.length],
                results: "Sample Result",
                rating: 5,
              };
            })}
          />
          <div id="gallery">
            <BeforeAfterSlider audience={lead.audience} />
          </div>
          <FaqAccordion
            faq={[
              {
                question: "How do I get started?",
                answer: "Simply reach out via phone or WhatsApp and our team will walk you through membership options, schedule a consultation, and get you set up with an initial fitness assessment.",
              },
              {
                question: "Do you have dedicated timings or spaces for female members?",
                answer: "Yes, dedicated female-only training sessions and private spaces are available. Please contact us for the current schedule.",
              },
              {
                question: "Is personal training included in memberships?",
                answer: "Personal training options are available across our membership tiers. Contact us to find out which plan includes coaching sessions and what standalone packages are offered.",
              },
              {
                question: "Can beginners join without prior experience?",
                answer: "Absolutely. All fitness levels are welcome. Every new member receives an orientation and a baseline assessment so our coaches can guide you safely from day one.",
              },
              {
                question: "What are your payment and cancellation policies?",
                answer: "We offer flexible payment options with no hidden lock-in fees. Contact us directly for the current terms.",
              },
              {
                question: "Where are you located and what are your hours?",
                answer: `${lead.address ? `Located at ${lead.address}. ` : ""}${lead.hours ? `Hours: ${lead.hours}.` : "Contact us for current opening hours."}`,
              },
            ]}
          />
          <FinalCtaBand
            gymName={lead.name}
            whatsapp={lead.whatsapp}
            phone={lead.phoneE164}
            isDemo
          />
          <div id="contact" className="sr-only" aria-hidden="true" />

          <div className="bg-[var(--bg-surface)] py-4 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
            Demo preview. Sample content will be replaced with your real photos, trainers and reviews.
          </div>
        </div>
      </main>

      <Footer
        gymName={lead.name}
        tagline={
          isLadies
            ? "Your strength. Your journey."
            : "Train hard. Stay unstoppable."
        }
        address={lead.address}
        phone={lead.phoneE164}
        email=""
        hours={lead.hours}
        isDemo
      />

      {/* Lead-specific floating contact */}
      <FloatingContactButton
        whatsapp={lead.whatsapp}
        phone={lead.phoneE164}
        gymName={lead.name}
      />

      {/* Mobile bottom bar */}
      <MobileBottomBar
        whatsapp={lead.whatsapp}
        phone={lead.phoneE164}
        isDemo
      />
    </div>
  );
}
