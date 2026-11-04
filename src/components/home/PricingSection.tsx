"use client";

import { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { PricingPlan } from "@/config/gym.config";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import MobileCarousel from "@/components/common/MobileCarousel";

interface PricingSectionProps {
  plans: PricingPlan[];
  whatsapp?: string;
  gymName?: string;
  isDemo?: boolean;
  showTeaserLink?: boolean;
  basePath?: string;
}

export default function PricingSection({
  plans,
  whatsapp = "923001234567",
  gymName = "IronForge Fitness",
  isDemo = false,
  showTeaserLink = false,
  basePath = "",
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const getWaLink = (planName: string, price: number) => {
    const text = encodeURIComponent(
      `Hi ${gymName}, I want to join the ${planName} (${billingCycle} plan - PKR ${price.toLocaleString()}). Please send details.`
    );
    return `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${text}`;
  };

  const programsHref = isDemo ? `${basePath}/programs#pricing` : "/programs#pricing";

  return (
    <section id="pricing" className="py-14 lg:py-28 bg-[var(--bg-main)] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <SectionTitle
            align={showTeaserLink ? "left" : "center"}
            subtitle="MEMBERSHIP OPTIONS"
            title="TRANSPARENT PRICING. ZERO HIDDEN FEES."
            accentWord="PRICING"
            description="Invest in your long-term health and strength with flexible commitment options."
            className="mb-0"
          />
          {showTeaserLink && (
            <a
              href={programsHref}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:text-[var(--accent-light)] transition-colors self-start md:self-end"
            >
              <span>View Full Membership Details</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {isDemo && (
          <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            Sample pricing — actual rates will be confirmed by the gym
          </p>
        )}

        {/* Billing cycle toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-inner max-w-full">
            {(["monthly", "quarterly", "yearly"] as const).map((cycle) => {
              const isSelected = billingCycle === cycle;
              return (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-2.5 sm:px-5 py-2 rounded-lg text-xs uppercase font-bold tracking-wider transition-all min-h-[44px] inline-flex items-center justify-center whitespace-nowrap ${
                    isSelected
                      ? "bg-accent text-black shadow-glow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{cycle}</span>
                  {cycle === "yearly" && (
                    <span
                      className={`ml-1 sm:ml-1.5 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                        isSelected
                          ? "bg-black/90 text-white"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      -20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile carousel / Desktop grid */}
        <MobileCarousel
          ariaLabel="Membership Pricing Plans"
          gridClassName="md:grid-cols-3 md:gap-8 items-stretch"
        >
          {plans.map((plan, idx) => {
            const price = plan.prices[billingCycle];
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                data-card="true"
                data-reveal="true"
                style={{ "--reveal-delay": `${(idx * 0.08).toFixed(2)}s` } as React.CSSProperties}
                className={`card-entrance rounded-2xl p-5 sm:p-8 flex flex-col justify-between relative transition-all duration-300 h-full ${
                  isPopular
                    ? "bg-[var(--bg-surface-elevated)] border-2 border-accent shadow-glow md:-translate-y-2"
                    : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{plan.badge || "MOST POPULAR"}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl sm:text-3xl text-[var(--text-primary)] tracking-wide">
                      {plan.name}
                    </h3>
                    {!isPopular && plan.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-accent whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-muted)] mb-6 min-h-[32px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[var(--border-subtle)]">
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)]">PKR</span>
                    <span className="font-heading text-[clamp(2.25rem,9vw,3rem)] text-[var(--text-primary)] font-bold tracking-tight leading-none">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      /{billingCycle === "monthly" ? "mo" : billingCycle === "quarterly" ? "3 mos" : "year"}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[var(--text-primary)] leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={getWaLink(plan.name, price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-lg text-center font-heading text-xl uppercase tracking-wider font-bold transition-all min-h-[48px] flex items-center justify-center ${
                    isPopular
                      ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black shadow-glow hover:brightness-110 active:scale-95"
                      : "bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent hover:text-accent"
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
