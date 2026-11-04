import Image from "next/image";
import Link from "next/link";

interface PageHeroBannerProps {
  title: string;
  accentWord?: string;
  subtitle: string;
  breadcrumb: string;
  bgImage: string;
  homeHref?: string;
}

export default function PageHeroBanner({
  title,
  accentWord,
  subtitle,
  breadcrumb,
  bgImage,
  homeHref = "/",
}: PageHeroBannerProps) {
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(new RegExp(`(${accentWord})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === accentWord.toLowerCase() ? (
        <span
          key={i}
          className="text-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-main)] min-h-[250px] sm:min-h-[280px] lg:min-h-[320px] flex items-center justify-center py-8 sm:py-10">
      {/* Background photo */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient overlay: about 55-60 percent at the bottom fading to 25-30 percent at the top */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/45 to-black/30"
        aria-hidden="true"
      />

      {/* Content wrapper: centered, breadcrumb always first line at least 20px below top */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 sm:mb-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 backdrop-blur-sm text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]"
        >
          <Link href={homeHref} prefetch={false} className="hover:text-accent transition-colors">
            HOME
          </Link>
          <span className="text-[var(--text-muted)] opacity-60">/</span>
          <span className="text-accent">{breadcrumb.toUpperCase()}</span>
        </nav>

        {/* Section title */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-[0.95] tracking-wide mb-3 max-w-4xl">
          {renderTitle()}
        </h1>

        {/* Accent divider */}
        <div className="flex items-center gap-2 my-2 sm:my-3">
          <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[var(--accent)] block" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[var(--accent)] block" />
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed mt-1">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
