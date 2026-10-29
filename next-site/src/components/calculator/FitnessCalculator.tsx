"use client";

import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

export default function FitnessCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("28");
  const [weightKg, setWeightKg] = useState<string>("75");
  const [heightCm, setHeightCm] = useState<string>("178");
  const [activity, setActivity] = useState<number>(1.55); // moderate default
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">("maintain");

  const [result, setResult] = useState<{
    bmi: number;
    bmiCategory: string;
    bmiColor: string;
    bmr: number;
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();

    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 20 || w >= 300 || h <= 80 || h >= 250 || a <= 10 || a >= 100) {
      alert("Please enter valid biometric numbers (Weight 20-300kg, Height 80-250cm, Age 10-100).");
      return;
    }

    // BMI calculation
    const heightM = h / 100;
    const bmiVal = parseFloat((w / (heightM * heightM)).toFixed(1));

    let cat = "Normal weight";
    let col = "text-emerald-400";
    if (bmiVal < 18.5) {
      cat = "Underweight";
      col = "text-amber-400";
    } else if (bmiVal >= 25 && bmiVal < 30) {
      cat = "Overweight";
      col = "text-amber-400";
    } else if (bmiVal >= 30) {
      cat = "Obese";
      col = "text-rose-400";
    }

    // Mifflin-St Jeor Formula for BMR
    let bmrVal = 10 * w + 6.25 * h - 5 * a;
    if (gender === "male") {
      bmrVal += 5;
    } else {
      bmrVal -= 161;
    }

    const tdeeVal = Math.round(bmrVal * activity);
    let target = tdeeVal;
    if (goal === "lose") target -= 500;
    if (goal === "gain") target += 400;

    // Daily protein target (approx 2g per kg bodyweight for lifters)
    const protein = Math.round(w * 2.0);

    setResult({
      bmi: bmiVal,
      bmiCategory: cat,
      bmiColor: col,
      bmr: Math.round(bmrVal),
      tdee: tdeeVal,
      targetCalories: target,
      proteinGrams: protein,
    });
  };

  const reset = () => {
    setResult(null);
    setWeightKg("75");
    setHeightCm("178");
    setAge("28");
  };

  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-accent">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading text-2xl text-[var(--text-primary)]">
            BMI & DAILY MACRO CALORIE CALCULATOR
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Science-backed Mifflin-St Jeor formula for accurate caloric expenditure.
          </p>
        </div>
      </div>

      <form onSubmit={calculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  gender === "male"
                    ? "bg-accent text-black shadow-glow-sm"
                    : "bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  gender === "female"
                    ? "bg-accent text-black shadow-glow-sm"
                    : "bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Age (Years)
            </label>
            <input
              type="number"
              min="10"
              max="100"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              min="20"
              max="300"
              step="0.5"
              required
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              min="80"
              max="250"
              required
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Activity Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Activity Multiplier
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-base focus:outline-none focus:border-accent"
            >
              <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
              <option value={1.375}>Lightly Active (1-3 gym days/week)</option>
              <option value={1.55}>Moderately Active (3-5 intense lifting sessions/week)</option>
              <option value={1.725}>Very Active (6-7 intense sessions/week)</option>
              <option value={1.9}>Extra Active (Competitive athlete or physical job)</option>
            </select>
          </div>

          {/* Target Goal */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Primary Fitness Objective
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGoal("lose")}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  goal === "lose"
                    ? "bg-accent text-black shadow-glow-sm"
                    : "bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                Fat Loss
              </button>
              <button
                type="button"
                onClick={() => setGoal("maintain")}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  goal === "maintain"
                    ? "bg-accent text-black shadow-glow-sm"
                    : "bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                Recomp
              </button>
              <button
                type="button"
                onClick={() => setGoal("gain")}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  goal === "gain"
                    ? "bg-accent text-black shadow-glow-sm"
                    : "bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                Mass Gain
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black font-heading text-lg tracking-wider uppercase font-bold hover:brightness-110 active:scale-95 transition-all shadow-glow-sm"
          >
            CALCULATE BIOMETRICS
          </button>
          <button
            type="button"
            onClick={reset}
            className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-accent transition-colors"
            aria-label="Reset calculator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Result Card */}
      {result && (
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] animate-fadeIn">
          <div className="p-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-accent)] shadow-glow-sm">
            <h4 className="font-heading text-2xl text-[var(--text-primary)] mb-4">
              YOUR PERSONALIZED BIOMETRIC RESULTS
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  BMI Score
                </span>
                <div className="font-heading text-3xl sm:text-4xl text-[var(--text-primary)] my-1">
                  {result.bmi}
                </div>
                <span className={`text-xs font-bold ${result.bmiColor}`}>
                  {result.bmiCategory}
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Basal Metabolic (BMR)
                </span>
                <div className="font-heading text-3xl sm:text-4xl text-[var(--text-primary)] my-1">
                  {result.bmr}
                </div>
                <span className="text-xs text-[var(--text-muted)]">kcal / day resting</span>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Maintenance (TDEE)
                </span>
                <div className="font-heading text-3xl sm:text-4xl text-[var(--text-primary)] my-1">
                  {result.tdee}
                </div>
                <span className="text-xs text-[var(--text-muted)]">kcal / day total</span>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border-2 border-accent">
                <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                  Target Daily Intake
                </span>
                <div className="font-heading text-3xl sm:text-4xl text-accent my-1">
                  {result.targetCalories}
                </div>
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  kcal • ~{result.proteinGrams}g Protein
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
              *Calculated values are recommendations. Our certified coaches provide structured bi-weekly adjustments tailored to metabolic responses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
