"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell, Phone } from "lucide-react";
import { defaultGymConfig } from "@/config/gym.config";

interface NavbarProps {
  gymName?: string;
  phone?: string;
  whatsapp?: string;
  banner?: React.ReactNode;
  isDemo?: boolean;
}

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Trainers", href: "/trainers" },
  { name: "Schedule", href: "/schedule" },
  { name: "Pricing", href: "/pricing" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const demoNavLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Coaches", href: "#trainers" },
  { name: "Pricing", href: "#pricing" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Location", href: "#location" },
];

export default function Navbar({
  gymName = defaultGymConfig.name,
  phone = defaultGymConfig.displayPhone,
  whatsapp = defaultGymConfig.whatsapp,
  banner,
  isDemo = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = isDemo ? demoNavLinks : mainNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isLongName = gymName.length > 24;

  const waTarget = whatsapp
    ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${gymName}, I want to claim a free trial pass.`
      )}`
    : `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Render banner directly above navbar inside fixed header */}
        {banner}

        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[var(--bg-surface-glass)] backdrop-blur-xl py-2.5 sm:py-3 border-b border-[var(--border-subtle)] shadow-md"
              : "bg-[var(--bg-main)]/95 backdrop-blur-sm py-3.5 sm:py-5 border-b border-[var(--border-subtle)]/40"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Logo */}
              <Link
                href={isDemo ? "#hero" : "/"}
                className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-md px-1 min-w-0"
                aria-label={`${gymName} Home`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-black shadow-glow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-black transform -rotate-45" />
                </div>
                <div className="flex flex-col min-w-0 justify-center">
                  <span
                    className={`font-heading text-[var(--text-primary)] tracking-wide leading-tight line-clamp-2 ${
                      isLongName
                        ? "text-xs sm:text-base lg:text-lg xl:text-xl"
                        : "text-base sm:text-2xl lg:text-3xl"
                    }`}
                  >
                    {gymName.toUpperCase()}
                  </span>
                  {!isLongName && (
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold truncate">
                      Strength & Fitness
                    </span>
                  )}
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav
                className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium shrink-0"
                aria-label="Main Navigation"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-2.5 xl:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-accent font-semibold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Right Action */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="hidden 2xl:flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-accent transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{phone}</span>
                </a>
                <a
                  href={waTarget}
                  target={whatsapp ? "_blank" : undefined}
                  rel={whatsapp ? "noopener noreferrer" : undefined}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-glow-sm hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                >
                  Join Now
                </a>
              </div>

              {/* Mobile hamburger button */}
              <div className="flex items-center lg:hidden shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-md text-[var(--text-primary)] hover:text-accent hover:bg-[var(--bg-surface-elevated)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — outside header so it can be full screen */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[min(320px,85vw)] bg-[var(--bg-surface-elevated)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile Navigation Panel"
      >
        {/* Close button at top */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
          <span className="font-heading text-xl text-[var(--text-primary)]">MENU</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md text-[var(--text-muted)] hover:text-accent"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-3.5 rounded-md text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive
                    ? "bg-[var(--bg-surface)] text-accent font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-8 pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
          <a
            href={waTarget}
            target={whatsapp ? "_blank" : undefined}
            rel={whatsapp ? "noopener noreferrer" : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3.5 min-h-[44px] rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-semibold text-sm uppercase tracking-wider"
          >
            Join Now / Free Trial
          </a>
          <div className="text-center text-xs text-[var(--text-muted)]">
            Direct Line: {phone}
          </div>
        </div>
      </div>
    </>
  );
}
