import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { defaultGymConfig } from "@/config/gym.config";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import BackToTop from "@/components/common/BackToTop";
import MotionProvider from "@/components/common/MotionProvider";
import ScrollRevealObserver from "@/components/common/ScrollRevealObserver";

const bebasNeue = localFont({
  src: [{ path: "../fonts/bebas-neue-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-bebas",
  display: "swap",
  fallback: ["Arial"],
  adjustFontFallback: false,
});

const inter = localFont({
  src: [{ path: "../fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["Arial"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: `${defaultGymConfig.name} | Lahore's Premier Strength & Fitness Club`,
    template: `%s | ${defaultGymConfig.name}`,
  },
  description: defaultGymConfig.subtagline,
  keywords: [
    "Gym Lahore",
    "Fitness Club DHA Lahore",
    "Powerlifting gym",
    "Personal Trainer Lahore",
    "IronForge Fitness",
    "Strength and conditioning",
  ],
  authors: [{ name: defaultGymConfig.name }],
  metadataBase: new URL("https://ironforgefitness.pk"),
  openGraph: {
    title: defaultGymConfig.name,
    description: defaultGymConfig.subtagline,
    url: "https://ironforgefitness.pk",
    siteName: defaultGymConfig.name,
    images: [
      {
        url: "/images/placeholders/og-image.svg",
        width: 1200,
        height: 630,
        alt: defaultGymConfig.name,
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultGymConfig.name,
    description: defaultGymConfig.subtagline,
    images: ["/images/placeholders/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="gold"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              document.documentElement.classList.add('js');
              try {
                var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var seen = sessionStorage.getItem('gym_preloader_seen');
                document.documentElement.setAttribute('data-preloader', (seen || reduced) ? 'done' : 'pending');
              } catch(e) {
                document.documentElement.setAttribute('data-preloader', 'done');
              }
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent)] selection:text-black">
        <MotionProvider>
          <ScrollRevealObserver />
          <ScrollProgressBar />
          {children}
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
