"use client";

import { useState } from "react";
import { defaultGymConfig } from "@/config/gym.config";
import { Send, CheckCircle2 } from "lucide-react";

interface JoinFormProps {
  gymName?: string;
  whatsapp?: string;
  phone?: string;
}

export default function JoinForm({
  gymName = defaultGymConfig.name,
  whatsapp = defaultGymConfig.whatsapp,
  phone = defaultGymConfig.displayPhone,
}: JoinFormProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [goal, setGoal] = useState("Muscle Building");
  const [preferredTime, setPreferredTime] = useState("Evening (5PM - 9PM)");
  const [submitted, setSubmitted] = useState(false);

  // Sanitize helper
  const cleanInput = (val: string) => val.replace(/<[^>]*>?/gm, "").trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const safeName = cleanInput(name).slice(0, 50);
    const safePhone = cleanInput(phoneNumber).slice(0, 20);

    if (!safeName || !safePhone) {
      alert("Please provide both your name and phone number.");
      return;
    }

    const message = `Hi ${gymName}! I would like to book a free trial / consultation pass.\n\nName: ${safeName}\nPhone: ${safePhone}\nPrimary Goal: ${goal}\nPreferred Timing: ${preferredTime}`;

    if (whatsapp && whatsapp.trim() !== "") {
      const cleanWa = whatsapp.replace(/[^0-9]/g, "");
      const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      // Fallback if no whatsapp
      window.location.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
    }

    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-xl">
      <h3 className="font-heading text-3xl text-[var(--text-primary)] mb-2">
        BOOK YOUR FREE TRIAL PASS
      </h3>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
        Experience our high-performance facility firsthand. No obligations, zero sales pressure.
      </p>

      {submitted ? (
        <div className="p-6 rounded-xl bg-[var(--bg-main)] border border-emerald-500/40 text-center flex flex-col items-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
          <h4 className="font-heading text-2xl text-[var(--text-primary)]">
            REQUEST INITIATED!
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-sm">
            Your WhatsApp chat has been opened with your prefilled details. Our front desk coach will confirm your scheduled slot immediately.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-5 px-4 py-2 rounded-lg text-xs font-semibold text-accent border border-[var(--border-subtle)] hover:border-accent"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              maxLength={50}
              placeholder="e.g. Bilal Khan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              WhatsApp / Mobile Number *
            </label>
            <input
              type="tel"
              required
              maxLength={20}
              placeholder="e.g. 0300 1234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Primary Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
              >
                <option value="Muscle Building">Muscle Building & Strength</option>
                <option value="Weight Loss & Shred">Weight Loss & Fat Reduction</option>
                <option value="1:1 Personal Training">1:1 Dedicated Personal Training</option>
                <option value="Cardio & Endurance">Cardiovascular Endurance</option>
                <option value="General Health">General Athletic Fitness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Preferred Slot
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
              >
                <option value="Morning (6AM - 11AM)">Morning (6AM - 11AM)</option>
                <option value="Afternoon (11AM - 4PM)">Afternoon (11AM - 4PM)</option>
                <option value="Evening (5PM - 9PM)">Evening (5PM - 9PM)</option>
                <option value="Night (9PM - 11PM)">Night (9PM - 11PM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-heading text-xl uppercase tracking-wider font-bold shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>SEND VIA WHATSAPP</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
