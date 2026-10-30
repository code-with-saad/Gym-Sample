import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { defaultGymConfig } from "@/config/gym.config";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import BackToTop from "@/components/common/BackToTop";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
      data-theme="gold"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent)] selection:text-black">
        <ScrollProgressBar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
