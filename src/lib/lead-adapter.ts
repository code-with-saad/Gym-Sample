import { LeadItem } from "@/lib/leads";
import { defaultGymConfig, ProgramItem, PricingPlan, TrainerItem } from "@/config/gym.config";
import { images } from "@/config/images";

export interface AdaptedSiteConfig {
  name: string;
  tagline: string;
  subtagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  email: string;
  rating: number;
  reviews: number;
  heroBadge: string;
  audience: "mixed" | "ladies";
  theme: "gold" | "rose";
  saunaAvailable: boolean;
  amenities: LeadItem["flags"];
  programs: ProgramItem[];
  pricing: PricingPlan[];
  trainers: TrainerItem[];
  stats: { label: string; value: number; suffix: string }[];
  processSteps: typeof defaultGymConfig.processSteps;
  testimonials: typeof defaultGymConfig.testimonials;
  schedule: typeof defaultGymConfig.schedule;
  faq: typeof defaultGymConfig.faq;
  heroImageDesktop: string;
  aboutBannerImage: string;
  programsBannerImage: string;
  galleryBannerImage: string;
  contactBannerImage: string;
}

export function getDefaultSiteConfig(): AdaptedSiteConfig {
  return {
    name: defaultGymConfig.name,
    tagline: defaultGymConfig.tagline,
    subtagline: defaultGymConfig.subtagline,
    address: defaultGymConfig.address,
    phone: defaultGymConfig.displayPhone,
    whatsapp: defaultGymConfig.whatsapp,
    hours: defaultGymConfig.hours,
    email: defaultGymConfig.email,
    rating: defaultGymConfig.rating,
    reviews: defaultGymConfig.reviewCount,
    heroBadge: defaultGymConfig.heroBadge,
    audience: "mixed",
    theme: "gold",
    saunaAvailable: defaultGymConfig.amenities.sauna,
    amenities: {
      sauna: defaultGymConfig.amenities.sauna,
      wifi: true,
      parking: true,
    },
    programs: defaultGymConfig.programs,
    pricing: defaultGymConfig.pricing,
    trainers: defaultGymConfig.trainers,
    stats: defaultGymConfig.stats,
    processSteps: defaultGymConfig.processSteps,
    testimonials: defaultGymConfig.testimonials,
    schedule: defaultGymConfig.schedule,
    faq: defaultGymConfig.faq,
    heroImageDesktop: images.hero.main,
    aboutBannerImage: images.aboutMain,
    programsBannerImage: images.programs.strength,
    galleryBannerImage: images.gallery[2].src,
    contactBannerImage: images.ctaBg,
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

export function getLeadConfig(lead: LeadItem): AdaptedSiteConfig {
  const isLadies = lead.audience === "ladies";
  const theme = isLadies ? "rose" : "gold";

  const heroBadge = isLadies
    ? "PREMIER WOMEN'S WELLNESS & STRENGTH STUDIO"
    : "PREMIER FITNESS & STRENGTH FACILITY";

  const subtagline = isLadies
    ? "A dedicated women's fitness and wellness studio offering strength training, group classes, and personalised coaching in a supportive environment."
    : "A professional fitness facility offering structured training programs, personal coaching, and the amenities you need to reach your goals.";

  // Ladies specific programs
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

  const rawPrograms = isLadies ? ladiesPrograms : defaultGymConfig.programs;
  const sanitizedPrograms = rawPrograms.map((p) => ({
    ...p,
    shortDesc: sanitizeEquipment(p.shortDesc),
    fullDesc: sanitizeEquipment(p.fullDesc),
    features: p.features.map(sanitizeEquipment),
  }));

  // Demo Pricing Perks — Item 10: Remove invented perks, use generic access-level bullets
  const demoPricing: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      tagline: "Essential access for regular workouts.",
      prices: {
        monthly: 8500,
        quarterly: 23000,
        yearly: 82000,
      },
      features: [
        "Full workout area access",
        "Standard facility access",
        "Initial session orientation",
      ],
      ctaText: "Choose Basic",
    },
    {
      id: "standard",
      name: "Standard Plan",
      badge: "MOST POPULAR",
      isPopular: true,
      tagline: "Comprehensive membership with group sessions.",
      prices: {
        monthly: 14500,
        quarterly: 39000,
        yearly: 139000,
      },
      features: [
        "All Basic Plan privileges",
        "Full access to group fitness classes",
        lead.flags.sauna ? "On-site sauna facility access" : "General facility amenities",
      ],
      ctaText: "Choose Standard",
    },
    {
      id: "premium",
      name: "Elite VIP",
      badge: "ULTIMATE",
      tagline: "Full access including personal coaching.",
      prices: {
        monthly: 24500,
        quarterly: 66000,
        yearly: 235000,
      },
      features: [
        "All Standard Plan privileges",
        "Personal coaching session access",
        "Dedicated support & scheduling",
      ],
      ctaText: "Choose VIP",
    },
  ];

  const demoTrainers: TrainerItem[] = (
    isLadies
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
  }));

  const sampleTestimonials = defaultGymConfig.testimonials.map((t, idx) => {
    const sampleQuotes = [
      "The coaching made a genuine difference to my routine. I feel stronger and more motivated each week.",
      "Supportive coaches, great atmosphere, and an environment that keeps me consistent and accountable.",
      "Joining was one of the best decisions for my health. The programs are structured and easy to follow.",
      "Training here has helped me build lasting discipline. Every session feels productive and purposeful.",
      "A welcoming community with coaches who truly care about proper technique and steady progression.",
    ];
    return {
      ...t,
      name: "Member Name",
      role: "Gym Member",
      avatarText: "M",
      quote: sampleQuotes[idx % sampleQuotes.length],
      results: "Consistent progress",
      rating: 5,
    };
  });

  const leadStats = [
    {
      label: "Google Star Rating",
      value: Math.floor(lead.rating),
      suffix: `.${Math.round((lead.rating % 1) * 10)} ★`,
    },
    { label: "Google Reviews", value: lead.reviews, suffix: "+" },
  ];

  return {
    name: lead.name,
    tagline: isLadies ? "Women's Wellness & Strength Studio" : "Strength & Conditioning Club",
    subtagline,
    address: lead.address,
    phone: lead.phoneE164,
    whatsapp: lead.whatsapp,
    hours: lead.hours,
    email: "",
    rating: lead.rating,
    reviews: lead.reviews,
    heroBadge,
    audience: lead.audience,
    theme,
    saunaAvailable: Boolean(lead.flags.sauna),
    amenities: lead.flags,
    programs: sanitizedPrograms,
    pricing: demoPricing,
    trainers: demoTrainers,
    stats: leadStats,
    processSteps: defaultGymConfig.processSteps,
    testimonials: sampleTestimonials,
    schedule: defaultGymConfig.schedule,
    faq: [
      {
        question: "How do I get started?",
        answer: "Simply reach out via phone or WhatsApp and our team will walk you through membership options, schedule a consultation, and get you set up with an initial assessment.",
      },
      {
        question: "Do you have dedicated timings or spaces for female members?",
        answer: "Yes, dedicated female-only training sessions and private spaces are available. Please contact us for the current schedule.",
      },
      {
        question: "Is personal training included in memberships?",
        answer: "Personal training options are available across our membership tiers. Contact us to find out which plan includes coaching sessions.",
      },
      {
        question: "Can beginners join without prior experience?",
        answer: "Absolutely. All fitness levels are welcome. Every new member receives an orientation so our coaches can guide you safely from day one.",
      },
      {
        question: "What are your payment and cancellation policies?",
        answer: "We offer flexible payment options with no hidden lock-in fees. Contact us directly for current terms.",
      },
      {
        question: "Where are you located and what are your hours?",
        answer: `${lead.address ? `Located at ${lead.address}. ` : ""}${lead.hours ? `Hours: ${lead.hours}.` : "Contact us for current opening hours."}`,
      },
    ],
    heroImageDesktop: isLadies ? images.ladies.hero.main : images.hero.main,
    aboutBannerImage: isLadies ? "/images/ladies/ladies-strength.webp" : images.aboutMain,
    programsBannerImage: isLadies ? "/images/ladies/ladies-classes.webp" : images.programs.strength,
    galleryBannerImage: isLadies ? "/images/ladies/ladies-community.webp" : images.gallery[2].src,
    contactBannerImage: isLadies ? "/images/ladies/ladies-classes.webp" : images.ctaBg,
  };
}

