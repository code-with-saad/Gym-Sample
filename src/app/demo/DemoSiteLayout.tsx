import { ReactNode } from "react";
import Preloader from "@/components/common/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/common/FloatingContactButton";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import ThemeSetter from "@/components/common/ThemeSetter";
import { LeadItem } from "@/lib/leads";

interface DemoSiteLayoutProps {
  lead: LeadItem;
  children: ReactNode;
}

export default function DemoSiteLayout({ lead, children }: DemoSiteLayoutProps) {
  const isLadies = lead.audience === "ladies";
  const theme = isLadies ? "rose" : "gold";
  const basePath = `/demo/${lead.slug}`;

  return (
    <div
      data-theme={theme}
      className="w-full min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)]"
    >
      <ThemeSetter theme={theme} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-theme', '${theme}');`,
        }}
      />

      {/* Lead-specific Preloader */}
      <Preloader
        gymName={lead.name}
        tagline={
          isLadies
            ? "Women's Wellness & Strength Studio"
            : "Strength & Conditioning Club"
        }
      />

      {/* Lead-specific Navbar with integrated banner */}
      <Navbar
        gymName={lead.name}
        phone={lead.phoneE164}
        whatsapp={lead.whatsapp}
        isDemo
        basePath={basePath}
        banner={
          <div
            className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black text-[11px] font-bold py-1.5 px-4 text-center shadow"
            style={{ paddingTop: "max(6px, env(safe-area-inset-top, 6px))" }}
          >
            DEMO PREVIEW &mdash; {lead.name.toUpperCase()}
          </div>
        }
      />

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <div className="bg-[var(--bg-surface)] py-4 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
        Demo preview. Sample content will be replaced with your real photos, trainers and reviews.
      </div>

      <Footer
        gymName={lead.name}
        tagline={
          isLadies
            ? "Your strength. Your journey."
            : "Train hard. Stay unstoppable."
        }
        address={lead.address}
        phone={lead.phoneE164}
        email=""
        hours={lead.hours}
        isDemo
        basePath={basePath}
      />

      {/* Lead-specific floating contact */}
      <FloatingContactButton
        whatsapp={lead.whatsapp}
        phone={lead.phoneE164}
        gymName={lead.name}
      />

      {/* Mobile bottom bar */}
      <MobileBottomBar
        whatsapp={lead.whatsapp}
        phone={lead.phoneE164}
        isDemo
        basePath={basePath}
      />
    </div>
  );
}
