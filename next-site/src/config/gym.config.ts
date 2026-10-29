import { images } from "./images";

export type ThemeName = "gold" | "lime" | "rose";

export interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  intensity: "High" | "Medium" | "Custom";
  duration: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  prices: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  features: string[];
  ctaText: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  certifications: string[];
  socials: {
    instagram?: string;
    facebook?: string;
  };
}

export interface ScheduleClass {
  id: string;
  name: string;
  time: string;
  category: "Strength" | "Cardio" | "HIIT" | "Mobility" | "Ladies Only";
  trainer: string;
  room: string;
  intensity: "High" | "Medium" | "All Levels";
}

export interface DaySchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  classes: ScheduleClass[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  rating: number;
  results: string;
  avatarText: string;
}


export interface GymConfig {
  name: string;
  tagline: string;
  subtagline: string;
  heroBadge: string;
  theme: ThemeName;
  phoneE164: string;
  displayPhone: string;
  whatsapp: string; // phone number with country code, or empty string
  email: string;
  address: string;
  city: string;
  country: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  hours: string;
  rating: number;
  reviewCount: number;
  stats: {
    label: string;
    value: number;
    suffix: string;
  }[];
  socials: {
    instagram: string;
    facebook: string;
    youtube?: string;
    tiktok?: string;
  };
  amenities: {
    sauna: boolean;
    wifi: boolean;
    parking: boolean;
    onlineClasses: boolean;
    childCare: boolean;
    lockers: boolean;
    supplementBar: boolean;
  };
  programs: ProgramItem[];
  pricing: PricingPlan[];
  trainers: TrainerItem[];
  schedule: DaySchedule[];
  faq: FaqItem[];
  testimonials: TestimonialItem[];
  processSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export const defaultGymConfig: GymConfig = {
  name: "IronForge Fitness",
  tagline: "BUILD YOUR STRONGEST SELF",
  subtagline:
    "Lahore's premier high-performance strength facility. Elite coaching, calibrated Olympic equipment, and an uncompromising atmosphere built for real results.",
  heroBadge: "PREMIER STRENGTH & CONDITIONING CLUB",
  theme: "gold",
  phoneE164: "+923001234567",
  displayPhone: "+92 300 1234567",
  whatsapp: "923001234567",
  email: "info@ironforgefitness.pk",
  address: "Plot 42, Sector Z, Phase 3, DHA, Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108856.88219597375!2d74.329376!3d31.4826352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905ac8680d9db%3A0x7d6c5df583bf4e8c!2sDHA%20Phase%203%2C%20Lahore!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk",
  googleMapsDirectionsUrl:
    "https://maps.google.com/?q=DHA+Phase+3+Lahore+Pakistan",
  hours: "Monday – Saturday: 6:00 AM – 11:00 PM | Sunday: 10:00 AM – 8:00 PM",
  rating: 4.9,
  reviewCount: 380,
  stats: [
    { label: "Active Members", value: 1500, suffix: "+" },
    { label: "Elite Coaches", value: 20, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Client Success Rate", value: 98, suffix: "%" },
  ],
  socials: {
    instagram: "https://instagram.com/ironforgefitness",
    facebook: "https://facebook.com/ironforgefitness",
    youtube: "https://youtube.com/@ironforgefitness",
  },
  amenities: {
    sauna: true,
    wifi: true,
    parking: true,
    onlineClasses: true,
    childCare: false,
    lockers: true,
    supplementBar: true,
  },
  processSteps: [
    {
      step: "01",
      title: "Book a Consult",
      desc: "Meet 1-on-1 with an elite coach. We evaluate your baseline, medical history, movement patterns, and exact goals.",
    },
    {
      step: "02",
      title: "Assess & Plan",
      desc: "Receive a tailored nutrition plan and periodized training split calibrated specifically for your lifestyle.",
    },
    {
      step: "03",
      title: "Train & Track",
      desc: "Execute structured sessions using professional training equipment with coach oversight and bi-weekly biometric check-ins.",
    },
    {
      step: "04",
      title: "Achieve Goals",
      desc: "Break personal records, gain sustainable lean muscle, shred body fat, and maintain your peak physique permanently.",
    },
  ],
  programs: [
    {
      id: "gym-training",
      slug: "gym-training",
      title: "Gym Training",
      category: "Strength & Power",
      shortDesc: "Full access to Olympic lifting areas, barbells, and heavy-duty selectorized resistance machinery.",
      fullDesc:
        "Our gym floor is engineered for serious lifters and dedicated athletes. Packed with custom power cages, squat racks, specialized bars, and bumper plates, you get zero bottlenecks and maximum stimulus.",
      image: images.programs.strength,
      intensity: "High",
      duration: "60-90 min",
      features: [
        "Competition-grade bumper plates",
        "Multi-grip pull-up rigs & chalk stations",
        "Custom power racks with safety straps",
        "Unrestricted access during all hours",
      ],
    },
    {
      id: "weight-loss",
      slug: "weight-loss",
      title: "Weight Loss",
      category: "Conditioning",
      shortDesc: "Metabolic conditioning and progressive HIIT designed to burn fat while preserving dense muscle.",
      fullDesc:
        "Forget starvation diets. Our proven metabolic conditioning approach combines compound barbell complexes, resistance sprints, and deficit tracking to optimize thyroid health and boost metabolic burn.",
      image: images.programs.weightLoss,
      intensity: "High",
      duration: "45-60 min",
      features: [
        "Metabolic conditioning circuits",
        "Targeted heart-rate zone cardio",
        "Individual macronutrient blueprint",
        "Weekly body composition scanning",
      ],
    },
    {
      id: "muscle-building",
      slug: "muscle-building",
      title: "Muscle Building",
      category: "Hypertrophy",
      shortDesc: "Periodized hypertrophy splits targeting biomechanically optimal tension and muscular growth.",
      fullDesc:
        "Science-backed hypertrophy programming focused on mechanical tension, progressive overload, and intelligent recovery. Designed for rapid, symmetrical muscle development without joint wear.",
      image: images.programs.muscle,
      intensity: "High",
      duration: "60-75 min",
      features: [
        "Periodized mesocycles",
        "Specialized isolateral equipment",
        "Volume & load progression tracking",
        "Post-workout recovery protocols",
      ],
    },
    {
      id: "personal-training",
      slug: "personal-training",
      title: "Personal Training",
      category: "1:1 Coaching",
      shortDesc: "1-on-1 private coaching tailored entirely to your biometrics, daily schedule, and target milestones.",
      fullDesc:
        "Work directly alongside an elite CSCS-certified coach. Every repetition is scrutinized for optimal biomechanics, injury prevention, and rapid athletic progress.",
      image: images.programs.personalTraining,
      intensity: "Custom",
      duration: "60 min",
      features: [
        "Dedicated private coach",
        "Biomechanical movement screening",
        "Daily nutrition & habit logging",
        "Priority rack & lane reservation",
      ],
    },
    {
      id: "cardio",
      slug: "cardio",
      title: "Cardio Endurance",
      category: "Stamina & VO2",
      shortDesc: "Cardio conditioning equipment, curved treadmills, and rowing stations to maximize cardiovascular output.",
      fullDesc:
        "Build an unstoppable engine. Our cardiovascular section features non-motorized curved treadmills, air resistance rowers, and skiergs to increase VO2 max and lower resting heart rate.",
      image: images.programs.cardio,
      intensity: "Medium",
      duration: "45 min",
      features: [
        "Air resistance rowers & SkiErgs",
        "Curved mechanical treadmills",
        "Heart rate telemetry monitors",
        "Endurance pacing benchmarks",
      ],
    },
    {
      id: "group-classes",
      slug: "group-classes",
      title: "Group Classes",
      category: "Community",
      shortDesc: "High-octane team training environments led by energizing instructors to push your thresholds.",
      fullDesc:
        "Feed off the collective energy of driven individuals. Our group classes mix functional kettlebell drills, battle ropes, and team relays to make fitness both ruthless and fun.",
      image: images.programs.groupClasses,
      intensity: "High",
      duration: "50 min",
      features: [
        "Certified group instructors",
        "Dynamic lighting & playlist soundscape",
        "Supportive community team challenges",
        "Scalable for all experience levels",
      ],
    },
  ],
  pricing: [
    {
      id: "basic",
      name: "Basic Plan",
      tagline: "Essential access for disciplined solo athletes.",
      prices: {
        monthly: 8500,
        quarterly: 23000,
        yearly: 82000,
      },
      features: [
        "Full gym floor & free weights access",
        "Standard locker room & shower access",
        "Free initial fitness assessment",
        "Mobile check-in via IronForge app",
      ],
      ctaText: "Choose Basic",
    },
    {
      id: "standard",
      name: "Standard Plan",
      badge: "MOST POPULAR",
      isPopular: true,
      tagline: "Our premier all-inclusive training package.",
      prices: {
        monthly: 14500,
        quarterly: 39000,
        yearly: 139000,
      },
      features: [
        "All Basic Plan privileges",
        "Unlimited group functional classes",
        "Custom nutritional macros & guide",
        "2 Complimentary 1-on-1 PT sessions",
        "Full Finnish sauna & cold plunge access",
      ],
      ctaText: "Choose Standard",
    },
    {
      id: "premium",
      name: "Elite VIP",
      badge: "ULTIMATE",
      tagline: "Unrestricted coaching, private lockers & amenities.",
      prices: {
        monthly: 24500,
        quarterly: 66000,
        yearly: 235000,
      },
      features: [
        "All Standard Plan privileges",
        "Weekly 1-on-1 personal training",
        "Dedicated reserved executive locker",
        "Daily complimentary pre-workout shake",
        "Free guest passes (2 per month)",
        "24/7 Priority coach WhatsApp line",
      ],
      ctaText: "Choose VIP",
    },
  ],
  trainers: [
    {
      id: "hamza-tariq",
      name: "Hamza Tariq",
      role: "Head Strength Coach",
      specialty: "Powerlifting & Athletic Development",
      experience: "8+ Years",
      image: images.trainers.trainer1,
      bio: "Former national powerlifter dedicated to turning standard lifters into biomechanically sound, injury-resilient athletes.",
      certifications: ["CSCS", "NSCA-CPT", "USA Weightlifting Level 2"],
      socials: {
        instagram: "https://instagram.com",
      },
    },
    {
      id: "zainab-malik",
      name: "Zainab Malik",
      role: "Conditioning Specialist",
      specialty: "Metabolic HIIT & Female Physique",
      experience: "6+ Years",
      image: images.trainers.trainer2,
      bio: "Specializes in high-intensity cardiovascular conditioning, sustainable fat reduction, and posture correction.",
      certifications: ["CrossFit Level 2", "Precision Nutrition L1"],
      socials: {
        instagram: "https://instagram.com",
      },
    },
    {
      id: "bilal-ahmed",
      name: "Bilal Ahmed",
      role: "Hypertrophy & Physique Coach",
      specialty: "Bodybuilding & Functional Hypertrophy",
      experience: "10+ Years",
      image: images.trainers.trainer3,
      bio: "Veteran physique athlete specializing in aesthetic muscular proportions, peak week preparation, and mass gain splits.",
      certifications: ["ISSA Master Trainer", "Rehab Biomechanics"],
      socials: {
        instagram: "https://instagram.com",
      },
    },
    {
      id: "ayesha-khan",
      name: "Ayesha Khan",
      role: "Mobility & Strength Coach",
      specialty: "Functional Movement & Calisthenics",
      experience: "5+ Years",
      image: images.trainers.trainer4,
      bio: "Focuses on joint mobility, athletic recovery, and kettlebell conditioning to build supple, explosive athleticism.",
      certifications: ["FRC Specialist", "Kettlebell Athletics L2"],
      socials: {
        instagram: "https://instagram.com",
      },
    },
  ],
  schedule: [
    {
      day: "Monday",
      classes: [
        { id: "m1", name: "Heavy Barbell Foundations", time: "06:30 AM - 07:30 AM", category: "Strength", trainer: "Hamza Tariq", room: "Zone A", intensity: "High" },
        { id: "m2", name: "Metabolic Inferno HIIT", time: "08:00 AM - 09:00 AM", category: "HIIT", trainer: "Zainab Malik", room: "Turf Arena", intensity: "High" },
        { id: "m3", name: "Ladies Power & Tone", time: "11:00 AM - 12:00 PM", category: "Ladies Only", trainer: "Zainab Malik", room: "Studio 1", intensity: "Medium" },
        { id: "m4", name: "Upper Body Hypertrophy", time: "06:00 PM - 07:15 PM", category: "Strength", trainer: "Bilal Ahmed", room: "Zone B", intensity: "High" },
        { id: "m5", name: "Engine Cardio Burn", time: "07:30 PM - 08:30 PM", category: "Cardio", trainer: "Ayesha Khan", room: "Turf Arena", intensity: "High" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { id: "t1", name: "Deadlift & Pull Dynamics", time: "07:00 AM - 08:15 AM", category: "Strength", trainer: "Hamza Tariq", room: "Platform 1-4", intensity: "High" },
        { id: "t2", name: "Functional Core & Mobility", time: "09:30 AM - 10:30 AM", category: "Mobility", trainer: "Ayesha Khan", room: "Studio 2", intensity: "All Levels" },
        { id: "t3", name: "Ladies HIIT & Conditioning", time: "11:30 AM - 12:30 PM", category: "Ladies Only", trainer: "Ayesha Khan", room: "Studio 1", intensity: "High" },
        { id: "t4", name: "Legs & Posterior Chain", time: "06:30 PM - 07:45 PM", category: "Strength", trainer: "Bilal Ahmed", room: "Zone A", intensity: "High" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { id: "w1", name: "Olympic Lifting Drills", time: "06:30 AM - 07:45 AM", category: "Strength", trainer: "Hamza Tariq", room: "Zone A", intensity: "High" },
        { id: "w2", name: "VO2 Max Assault Circuit", time: "08:15 AM - 09:15 AM", category: "Cardio", trainer: "Zainab Malik", room: "Cardio Loft", intensity: "High" },
        { id: "w3", name: "Ladies Sculpt & Core", time: "05:00 PM - 06:00 PM", category: "Ladies Only", trainer: "Zainab Malik", room: "Studio 1", intensity: "Medium" },
        { id: "w4", name: "Bench & Arm Specialization", time: "07:00 PM - 08:00 PM", category: "Strength", trainer: "Bilal Ahmed", room: "Zone B", intensity: "High" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { id: "th1", name: "Dynamic Kettlebell Sport", time: "07:00 AM - 08:00 AM", category: "HIIT", trainer: "Ayesha Khan", room: "Turf Arena", intensity: "Medium" },
        { id: "th2", name: "Joint Decompression & Flow", time: "10:00 AM - 11:00 AM", category: "Mobility", trainer: "Ayesha Khan", room: "Studio 2", intensity: "All Levels" },
        { id: "th3", name: "Squat Volume Block", time: "06:30 PM - 07:45 PM", category: "Strength", trainer: "Hamza Tariq", room: "Zone A", intensity: "High" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { id: "f1", name: "Cardio Sprint Conditioning", time: "06:30 AM - 07:30 AM", category: "Cardio", trainer: "Zainab Malik", room: "Turf Arena", intensity: "High" },
        { id: "f2", name: "Ladies Glute & Hamstrings", time: "10:30 AM - 11:30 AM", category: "Ladies Only", trainer: "Zainab Malik", room: "Studio 1", intensity: "High" },
        { id: "f3", name: "Full Body Density Pump", time: "06:00 PM - 07:15 PM", category: "Strength", trainer: "Bilal Ahmed", room: "Zone B", intensity: "High" },
        { id: "f4", name: "Friday Iron Throwdown", time: "07:30 PM - 08:45 PM", category: "HIIT", trainer: "Hamza Tariq", room: "Turf Arena", intensity: "High" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { id: "s1", name: "Strongman & Odd Objects", time: "09:00 AM - 10:30 AM", category: "Strength", trainer: "Hamza Tariq", room: "Turf Arena", intensity: "High" },
        { id: "s2", name: "Weekend Warrior Team HIIT", time: "11:00 AM - 12:15 PM", category: "HIIT", trainer: "Zainab Malik", room: "Zone A", intensity: "High" },
        { id: "s3", name: "Full Body Mobility & Sauna Prep", time: "04:00 PM - 05:00 PM", category: "Mobility", trainer: "Ayesha Khan", room: "Studio 2", intensity: "All Levels" },
      ],
    },
    {
      day: "Sunday",
      classes: [
        { id: "su1", name: "Open Gym & Recovery Lab", time: "11:00 AM - 02:00 PM", category: "Mobility", trainer: "Coach on Duty", room: "Facility-Wide", intensity: "All Levels" },
        { id: "su2", name: "Breathwork & Cold Immersion", time: "04:00 PM - 05:00 PM", category: "Mobility", trainer: "Ayesha Khan", room: "Sauna Suite", intensity: "All Levels" },
      ],
    },
  ],
  faq: [
    {
      question: "What makes IronForge different from standard commercial gyms?",
      answer:
        "We are purpose-built for progression: heavy-duty barbells, dedicated lifting platforms, zero broken cables, capped capacity to prevent overcrowding, and coaches who actively lift and train clients.",
    },
    {
      question: "Do you have dedicated timings or spaces for female members?",
      answer:
        "Yes, we offer specialized female-only training time slots and private studios led by certified female strength coaches, along with private female locker and shower rooms.",
    },
    {
      question: "Is personal training included in standard memberships?",
      answer:
        "Our Standard Plan includes 2 complimentary one-on-one sessions to get your technique dialed in. VIP memberships include weekly dedicated PT, and standalone PT packages can be booked anytime.",
    },
    {
      question: "Can beginners join without prior lifting experience?",
      answer:
        "Absolutely. Every newcomer receives an orientation and baseline movement assessment. Our coaches ensure you learn safe barbell mechanics before adding heavy loads.",
    },
    {
      question: "What are your payment terms and cancellation policies?",
      answer:
        "We accept bank transfers, credit/debit cards, and cash at front reception. Memberships are flexible with no hidden lock-in contracts.",
    },
    {
      question: "Do you offer parking and secure locker facilities?",
      answer:
        "Yes, we provide dedicated monitored parking on premises, biometric front-door access, and digital keypad lockers in fully serviced executive locker rooms.",
    },
  ],
  testimonials: [
    {
      name: "Ahmed Raza",
      role: "Corporate Executive",
      quote:
        "IronForge completely transformed my approach to fitness. The equipment is world-class, the community is fiercely supportive, and I dropped 14kg in 4 months while hitting a 180kg deadlift.",
      rating: 5,
      results: "Lost 14 kg & gained 6 kg lean muscle",
      avatarText: "AR",
    },
    {
      name: "Mariam Siddiqui",
      role: "Software Architect",
      quote:
        "As a beginner, I was intimidated by barbells until Coach Zainab broke down the fundamentals. I feel stronger, more confident, and pain-free despite long hours at my desk.",
      rating: 5,
      results: "Eliminated back pain & gained 12kg squat",
      avatarText: "MS",
    },
    {
      name: "Usman Butt",
      role: "Competitive Lifter",
      quote:
        "Best gym in Lahore hands down. Professional bumper plates, dedicated chalk stations, and an atmosphere that commands focus. No influencers hogging machines for selfies.",
      rating: 5,
      results: "Qualified for National Powerlifting 2025",
      avatarText: "UB",
    },
  ],
};
