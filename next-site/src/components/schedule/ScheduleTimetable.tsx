"use client";

import { useState } from "react";
import { DaySchedule } from "@/config/gym.config";
import { Clock, MapPin, User, Flame } from "lucide-react";

interface ScheduleTimetableProps {
  schedule: DaySchedule[];
}

export default function ScheduleTimetable({ schedule }: ScheduleTimetableProps) {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Strength", "Cardio", "HIIT", "Mobility", "Ladies Only"];

  const activeDaySchedule = schedule.find((d) => d.day === selectedDay);

  const filteredClasses = (activeDaySchedule?.classes || []).filter((c) => {
    if (selectedCategory === "All") return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory" style={{WebkitOverflowScrolling: "touch"}}>
        {schedule.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`px-5 py-3 rounded-xl font-heading text-xl uppercase tracking-wider whitespace-nowrap transition-all snap-start min-h-[44px] ${
              selectedDay === d.day
                ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-black shadow-glow font-bold"
                : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x" style={{WebkitOverflowScrolling: "touch"}}>
        <span className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mr-2 whitespace-nowrap shrink-0">
          Filter by:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 min-h-[44px] ${
              selectedCategory === cat
                ? "bg-accent text-black font-bold"
                : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Class Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-main)] text-accent border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]">
                    {item.intensity}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-4">
                  {item.name}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-semibold text-[var(--text-primary)]">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-accent shrink-0" />
                    <span>Coach: <strong className="text-[var(--text-primary)]">{item.trainer}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                    <span>Studio: {item.room}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href={`https://wa.me/923001234567?text=${encodeURIComponent(
                    `Hi, I want to book a spot for the ${item.name} class on ${selectedDay} (${item.time}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-2.5 rounded-lg text-center font-heading text-lg uppercase tracking-wider text-accent bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:border-accent hover:bg-accent hover:text-black transition-all"
                >
                  Reserve Spot
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
            No classes scheduled under &ldquo;{selectedCategory}&rdquo; on {selectedDay}. Please check another filter.
          </div>
        )}
      </div>
    </div>
  );
}
