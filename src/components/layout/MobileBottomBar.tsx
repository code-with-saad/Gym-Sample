"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Image as ImageIcon, Mail, Phone } from "lucide-react";
import { defaultGymConfig } from "@/config/gym.config";

interface MobileBottomBarProps {
  whatsapp?: string;
  phone?: string;
  isDemo?: boolean;
  basePath?: string;
}

export default function MobileBottomBar({
  whatsapp = defaultGymConfig.whatsapp,
  phone = defaultGymConfig.displayPhone,
  isDemo = false,
  basePath = "",
}: MobileBottomBarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const hasWhatsapp = Boolean(whatsapp && whatsapp.trim() !== "");
  const cleanWa = whatsapp ? whatsapp.replace(/[^0-9]/g, "") : "";
  const cleanPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";

  const primaryHref = hasWhatsapp
    ? `https://wa.me/${cleanWa}?text=${encodeURIComponent("Hi! I would like to inquire about membership and claim a free pass.")}`
    : `tel:${cleanPhone}`;

  // Check if mobile menu is open by listening to body overflow
  useEffect(() => {
    const checkOverflow = () => {
      setMenuOpen(document.body.style.overflow === "hidden");
    };

    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  if (menuOpen) return null;

  // Determine paths
  const homePath = isDemo ? basePath || "/" : "/";
  const programsPath = isDemo ? `${basePath}/programs` : "/programs";
  const galleryPath = isDemo ? `${basePath}/gallery` : "/gallery";
  const contactPath = isDemo ? `${basePath}/contact` : "/contact";

  const isHomeActive = pathname === homePath;
  const isProgramsActive = pathname.startsWith(programsPath);
  const isGalleryActive = pathname.startsWith(galleryPath);
  const isContactActive = pathname.startsWith(contactPath);

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
        <Link
          href={homePath}
          prefetch={false}
          aria-label="Home"
          aria-current={isHomeActive ? "page" : undefined}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
            isHomeActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Home</span>
        </Link>

        {/* 2. Programs */}
        <Link
          href={programsPath}
          prefetch={false}
          aria-label="Programs"
          aria-current={isProgramsActive ? "page" : undefined}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
            isProgramsActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Dumbbell className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Programs</span>
        </Link>

        {/* 3. Raised Center Primary Action (Real WhatsApp Glyph or Phone) */}
        <div className="relative -top-3 flex flex-col items-center justify-center">
          <a
            href={primaryHref}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noopener noreferrer" : undefined}
            aria-label={hasWhatsapp ? "Chat on WhatsApp" : "Call gym"}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-black flex items-center justify-center shadow-glow active:scale-95 transition-transform border-2 border-[var(--bg-main)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] min-w-[48px] min-h-[48px]"
          >
            {hasWhatsapp ? (
              <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            ) : (
              <Phone className="w-6 h-6 fill-black" />
            )}
          </a>
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent mt-0.5">
            {hasWhatsapp ? "WhatsApp" : "Call"}
          </span>
        </div>

        {/* 4. Gallery */}
        <Link
          href={galleryPath}
          prefetch={false}
          aria-label="Gallery"
          aria-current={isGalleryActive ? "page" : undefined}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
            isGalleryActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          <ImageIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Gallery</span>
        </Link>

        {/* 5. Contact */}
        <Link
          href={contactPath}
          prefetch={false}
          aria-label="Contact"
          aria-current={isContactActive ? "page" : undefined}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
            isContactActive ? "text-accent font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Contact</span>
        </Link>
      </div>
    </nav>
  );
}
