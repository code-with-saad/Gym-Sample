export const images = {
  hero: {
    main: "/images/hero/hero-main.webp",
    portrait: "/images/hero/hero-portrait.webp",
    wide: "/images/hero/hero-wide.webp",
  },
  // Backward compatibility alias for hero main
  heroAthlete: "/images/hero/hero-main.webp",
  aboutMain: "/images/about/about-main.webp",
  ctaBg: "/images/cta/cta-bg.webp",
  ogImage: "/images/og/og-image.jpg",
  programs: {
    strength: "/images/programs/gym-training.webp",
    weightLoss: "/images/programs/weight-loss.webp",
    muscle: "/images/programs/muscle-building.webp",
    personalTraining: "/images/programs/personal-training.webp",
    cardio: "/images/programs/cardio.webp",
    groupClasses: "/images/programs/group-classes.webp",
  },
  trainers: {
    trainer1: "/images/trainers/trainer-male-1.webp",
    trainer2: "/images/ladies/ladies-muscle-building.webp",
    trainer3: "/images/trainers/trainer-male-2.webp",
    trainer4: "/images/ladies/ladies-lunge.webp",
  },
  gallery: [
    {
      src: "/images/gallery/gallery-01.webp",
      title: "Strength Zone",
      category: "strength",
      alt: "Strength training platforms and barbell station",
    },
    {
      src: "/images/gallery/gallery-02.webp",
      title: "Free Weights",
      category: "weights",
      alt: "Dumbbells and free weight training rack",
    },
    {
      src: "/images/gallery/gallery-03.webp",
      title: "Training Floor",
      category: "equipment",
      alt: "Resistance machinery on main training floor",
    },
    {
      src: "/images/gallery/gallery-04.webp",
      title: "Cardio Area",
      category: "cardio",
      alt: "Cardiovascular conditioning equipment area",
    },
    {
      src: "/images/gallery/gallery-05.webp",
      title: "Functional Zone",
      category: "functional",
      alt: "Functional training turf and conditioning area",
    },
    {
      src: "/images/gallery/gallery-06.webp",
      title: "Stretching & Recovery Area",
      category: "recovery",
      alt: "Mat area for stretching and mobility work",
    },
    {
      src: "/images/gallery/gallery-07.webp",
      title: "Group Sessions Studio",
      category: "studio",
      alt: "Multi-purpose group fitness training studio",
    },
    {
      src: "/images/gallery/gallery-08.webp",
      title: "Locker Area & Amenities",
      category: "amenities",
      alt: "Member locker and change area",
    },
  ],
  ladies: {
    hero: {
      portrait: "/images/ladies/ladies-hero-portrait.webp",
      wide: "/images/ladies/ladies-hero-wide.webp",
      main: "/images/ladies/ladies-hero-portrait.webp",
    },
    programs: {
      strength: "/images/ladies/ladies-pullup.webp",
      classes: "/images/ladies/ladies-classes.webp",
      muscleBuilding: "/images/ladies/ladies-muscle-building.webp",
      cardio: "/images/ladies/ladies-cardio.webp",
      weightLoss: "/images/ladies/ladies-cardio-2.webp",
      personalTraining: "/images/ladies/ladies-lunge.webp",
    },
  },
} as const;

export type ImagesConfig = typeof images;
