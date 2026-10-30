"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Tag, Mail, MessageCircle, Phone } from "lucide-react";
import { defaultGymConfig } from "@/config/gym.config";

interface MobileBottomBarProps {
  whatsapp?: string;
  phone?: string;
  isDemo?: boolean;
}

export default function MobileBottomBar({
  whatsapp = defaultGymConfig.whatsapp,
  phone = defaultGymConfig.displayPhone,
  isDemo = false,
}: MobileBottomBarProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const hasWhatsapp = Boolean(whatsapp && whatsapp.trim() !== "");
  const cleanWa = whatsapp ? whatsapp.replace(/[^0-9]/g, "") : "";
  const cleanPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";

  const primaryHref = hasWhatsapp
    ? `https://wa.me/${cleanWa}?text=${encodeURIComponent("Hi! I would like to inquire about membership and claim a free pass.")}`
    : `tel:${cleanPhone}`;

  // Observe demo page sections
  useEffect(() => {
    if (!isDemo) return;

    const sectionIds = ["hero", "programs", "pricing", "location", "about"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDemo]);

  // Check if mobile menu is open by listening to body overflow or mutation
  useEffect(() => {
    const checkOverflow = () => {
      setMenuOpen(document.body.style.overflow === "hidden");
    };

    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  if (menuOpen) return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isDemo) return;
    e.preventDefault();
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveSection(id);
  };

  const isHomeActive = isDemo ? activeSection === "hero" : pathname === "/";
  const isProgramsActive = isDemo ? activeSection === "programs" : pathname.startsWith("/programs");
  const isPricingActive = isDemo ? activeSection === "pricing" : pathname.startsWith("/pricing");
  const isContactActive = isDemo ? activeSection === "location" : pathname.startsWith("/contact");

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-main)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-2 shadow-2xl"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        height: "calc(64px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {/* 1. Home */}
        {isDemo ? (
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            aria-label="Home"
            aria-current={isHomeActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isHomeActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Home</span>
          </a>
        ) : (
          <Link
            href="/"
            aria-label="Home"
            aria-current={isHomeActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isHomeActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Home</span>
          </Link>
        )}

        {/* 2. Programs */}
        {isDemo ? (
          <a
            href="#programs"
            onClick={(e) => scrollToSection(e, "programs")}
            aria-label="Programs"
            aria-current={isProgramsActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isProgramsActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Dumbbell className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Programs</span>
          </a>
        ) : (
          <Link
            href="/programs"
            aria-label="Programs"
            aria-current={isProgramsActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isProgramsActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Dumbbell className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Programs</span>
          </Link>
        )}

        {/* 3. Raised Center Primary Action */}
        <div className="relative -top-3 flex flex-col items-center justify-center">
          <a
            href={primaryHref}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noopener noreferrer" : undefined}
            aria-label={hasWhatsapp ? "Chat on WhatsApp" : "Call gym"}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-black flex items-center justify-center shadow-glow active:scale-95 transition-transform border-2 border-[var(--bg-main)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] min-w-[48px] min-h-[48px]"
          >
            {hasWhatsapp ? (
              <MessageCircle className="w-6 h-6 fill-current" />
            ) : (
              <Phone className="w-6 h-6 fill-current" />
            )}
          </a>
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent mt-0.5">
            {hasWhatsapp ? "WhatsApp" : "Call"}
          </span>
        </div>

        {/* 4. Pricing */}
        {isDemo ? (
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            aria-label="Pricing"
            aria-current={isPricingActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isPricingActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Tag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Pricing</span>
          </a>
        ) : (
          <Link
            href="/pricing"
            aria-label="Pricing"
            aria-current={isPricingActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isPricingActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Tag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Pricing</span>
          </Link>
        )}

        {/* 5. Contact */}
        {isDemo ? (
          <a
            href="#location"
            onClick={(e) => scrollToSection(e, "location")}
            aria-label="Contact and Location"
            aria-current={isContactActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isContactActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Mail className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Contact</span>
          </a>
        ) : (
          <Link
            href="/contact"
            aria-label="Contact"
            aria-current={isContactActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              isContactActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Mail className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Contact</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

