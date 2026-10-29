"use client";

import Link from "next/link";
import { Dumbbell, MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/common/SocialIcons";
import { defaultGymConfig } from "@/config/gym.config";

interface FooterProps {
  gymName?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  isDemo?: boolean;
}

export default function Footer({
  gymName = defaultGymConfig.name,
  tagline = defaultGymConfig.tagline,
  address = defaultGymConfig.address,
  phone = defaultGymConfig.displayPhone,
  email = defaultGymConfig.email,
  hours = defaultGymConfig.hours,
  isDemo = false,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href={isDemo ? "#hero" : "/"} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-black">
                <Dumbbell className="w-5 h-5 text-black transform -rotate-45" />
              </div>
              <span className="font-heading text-2xl text-[var(--text-primary)] tracking-wider">
                {gymName.toUpperCase()}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {tagline.replace(/\.+$/, "")}. Engineered for high performers and dedicated members who demand quality equipment, proven coaching methodologies, and zero compromises.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-accent hover:border-accent transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-accent hover:border-accent transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-accent hover:border-accent transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg text-[var(--text-primary)] tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {isDemo ? (
                <>
                  <li>
                    <a href="#hero" className="hover:text-accent transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-accent transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#programs" className="hover:text-accent transition-colors">
                      Training Programs
                    </a>
                  </li>
                  <li>
                    <a href="#trainers" className="hover:text-accent transition-colors">
                      Coaches
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-accent transition-colors">
                      Membership Plans
                    </a>
                  </li>
                  <li>
                    <a href="#reviews" className="hover:text-accent transition-colors">
                      Member Reviews
                    </a>
                  </li>
                  <li>
                    <a href="#location" className="hover:text-accent transition-colors">
                      Location & Hours
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/" className="hover:text-accent transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-accent transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="hover:text-accent transition-colors">
                      Training Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/trainers" className="hover:text-accent transition-colors">
                      Elite Coaches
                    </Link>
                  </li>
                  <li>
                    <Link href="/schedule" className="hover:text-accent transition-colors">
                      Class Schedule
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-accent transition-colors">
                      Membership Plans
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="hover:text-accent transition-colors">
                      Facility Gallery
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-lg text-[var(--text-primary)] tracking-wider mb-4">
              Club Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hover:text-accent">
                  {phone}
                </a>
              </li>
              {email && email.trim() !== "" && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-accent">
                    {email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{hours}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-lg text-[var(--text-primary)] tracking-wider mb-4">
              Get VIP Pass
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              Subscribe for exclusive workout programming splits, nutrition blueprints, and limited membership openings.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to workout updates!");
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                required
                maxLength={60}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-md bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
              >
                Claim Updates
              </button>
            </form>
          </div>
        </div>

        {/* Demo disclaimer if lead demo */}
        {isDemo && (
          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] text-center text-xs text-accent bg-[var(--bg-surface-elevated)] p-3 rounded-lg border border-dashed">
            Demo preview. Sample content will be replaced with your real photos, trainers and reviews.
          </div>
        )}

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <p>© {currentYear} {gymName}. All rights reserved.</p>
          <div className="flex gap-6">
            {isDemo ? (
              <>
                <a href="#about" className="hover:text-accent">Terms of Service</a>
                <a href="#about" className="hover:text-accent">Privacy Policy</a>
              </>
            ) : (
              <>
                <Link href="/pricing" className="hover:text-accent">Terms of Service</Link>
                <Link href="/contact" className="hover:text-accent">Privacy Policy</Link>
                {process.env.NODE_ENV !== "production" && (
                  <Link href="/demo" className="text-accent hover:underline font-medium">Demo Leads Index</Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
