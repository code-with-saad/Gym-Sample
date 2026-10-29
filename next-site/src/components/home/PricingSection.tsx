"use client";

import { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { PricingPlan } from "@/config/gym.config";
import { Check, Sparkles } from "lucide-react";

interface PricingSectionProps {
  plans: PricingPlan[];
  whatsapp?: string;
  gymName?: string;
  isDemo?: boolean;
}

export default function PricingSection({
  plans,
  whatsapp = "923001234567",
  gymName = "IronForge Fitness",
  isDemo = false,
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const getWaLink = (planName: string, price: number) => {
    const text = encodeURIComponent(
      `Hi ${gymName}, I want to join the ${planName} (${billingCycle} plan - PKR ${price.toLocaleString()}). Please send details.`
    );
    return `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${text}`;
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[var(--bg-main)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="MEMBERSHIP OPTIONS"
          title="TRANSPARENT PRICING. ZERO HIDDEN FEES."
          accentWord="PRICING"
          description="Invest in your long-term health and strength with flexible commitment options."
        />

        {isDemo && (
          <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            Sample pricing — actual rates will be confirmed by the gym
          </p>
        )}

        {/* Billing cycle toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-inner">
            {(["monthly", "quarterly", "yearly"] as const).map((cycle) => {
              const isSelected = billingCycle === cycle;
              return (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`inline-flex items-center justify-center px-4 sm:px-6 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black shadow-sm font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{cycle}</span>
                  {cycle === "yearly" && (
                    <span
                      className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold leading-none ${
                        isSelected
                          ? "bg-black/25 text-black"
                          : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-accent"
                      }`}
                    >
                      Save 20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = plan.prices[billingCycle];
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "bg-[var(--bg-surface-elevated)] border-2 border-accent shadow-glow lg:-translate-y-2"
                    : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black text-xs font-bold uppercase tracking-widest shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{plan.badge || "MOST POPULAR"}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-3xl text-[var(--text-primary)] tracking-wide">
                      {plan.name}
                    </h3>
                    {!isPopular && plan.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-accent">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-muted)] mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-[var(--border-subtle)]">
                    <span className="text-sm font-semibold text-[var(--text-muted)]">PKR</span>
                    <span className="font-heading text-5xl sm:text-6xl text-[var(--text-primary)] font-bold tracking-tight">
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
                        <span className="text-[var(--text-primary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={getWaLink(plan.name, price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-lg text-center font-heading text-xl uppercase tracking-wider font-bold transition-all ${
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
        </div>
      </div>
    </section>
  );
}
