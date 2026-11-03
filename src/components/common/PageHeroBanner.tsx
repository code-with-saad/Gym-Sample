import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

interface PageHeroBannerProps {
  title: string;
  accentWord?: string;
  subtitle: string;
  breadcrumb: string;
  bgImage: string;
  homeHref?: string;
  accentColor?: string;
}

export default function PageHeroBanner({
  title,
  accentWord,
  subtitle,
  breadcrumb,
  bgImage,
  homeHref = "/",
}: PageHeroBannerProps) {
  return (
    <section className="relative w-full h-[32vh] sm:h-[35vh] lg:h-[40vh] min-h-[240px] max-h-[460px] flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-main)]">
      {/* Background photo */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient overlay: about 55 percent at the bottom fading to 25 percent at the top */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/40 to-black/25"
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-8 sm:pt-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-sm text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]"
        >
          <Link href={homeHref} className="hover:text-accent transition-colors">
            HOME
          </Link>
          <span className="text-[var(--text-muted)] opacity-60">/</span>
          <span className="text-accent">{breadcrumb.toUpperCase()}</span>
        </nav>

        {/* Section title with divider */}
        <SectionTitle
          title={title}
          accentWord={accentWord}
          description={subtitle}
          align="center"
          className="mb-0"
        />
      </div>
    </section>
  );
}

