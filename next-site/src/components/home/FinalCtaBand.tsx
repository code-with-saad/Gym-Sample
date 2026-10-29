import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { images } from "@/config/images";

interface FinalCtaBandProps {
  gymName?: string;
  whatsapp?: string;
  phone?: string;
  isDemo?: boolean;
}

export default function FinalCtaBand({
  gymName = "IronForge Fitness",
  whatsapp = "923001234567",
  phone = "+92 300 1234567",
  isDemo = false,
}: FinalCtaBandProps) {
  const waTarget = whatsapp
    ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${gymName}, I am ready to start training. Please share details on membership registration.`
      )}`
    : `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--bg-main)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      {/* Background photo with dark gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src={images.ctaBg}
          alt="Gym Training Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/90 to-[var(--bg-main)]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-accent font-semibold text-xs uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4 fill-current text-accent" />
              <span>LIMITED REGISTRATION WINDOW</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-[0.95] tracking-wide">
              READY TO UNLEASH YOUR TRUE POTENTIAL?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] font-medium">
              Join today and claim a complimentary body composition scan and personal training consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={waTarget}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              className="px-8 py-4 rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-heading text-xl uppercase tracking-wider font-bold hover:brightness-110 active:scale-95 transition-all shadow-glow flex items-center gap-2"
            >
              <span>CLAIM FREE PASS</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </a>
            {isDemo ? (
              <a
                href="#pricing"
                className="px-8 py-4 rounded-md border-2 border-[var(--accent)] text-[var(--text-primary)] font-heading text-xl uppercase tracking-wider font-bold hover:bg-[var(--accent)] hover:text-black transition-all"
              >
                VIEW ALL PLANS
              </a>
            ) : (
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-md border-2 border-[var(--accent)] text-[var(--text-primary)] font-heading text-xl uppercase tracking-wider font-bold hover:bg-[var(--accent)] hover:text-black transition-all"
              >
                VIEW ALL PLANS
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
