import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";
import ScheduleTimetable from "@/components/schedule/ScheduleTimetable";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import { defaultGymConfig } from "@/config/gym.config";

export const metadata: Metadata = {
  title: "Class Schedule & Timetable | Weekly Gym Sessions",
  description: "View our comprehensive 7-day schedule for strength training, HIIT, cardio conditioning, and ladies-only fitness classes.",
};

export default function SchedulePage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            subtitle="CLASS TIMETABLE"
            title="WEEKLY TRAINING SCHEDULE & TIME SLOTS."
            accentWord="TIMETABLE"
            description="Select any day of the week to view available morning, afternoon, and evening coach-led sessions."
          />
        </div>
      </section>

      {/* Interactive Schedule Component */}
      <section className="py-20 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScheduleTimetable schedule={defaultGymConfig.schedule} />
        </div>
      </section>

      {/* Final CTA */}
      <FinalCtaBand
        gymName={defaultGymConfig.name}
        whatsapp={defaultGymConfig.whatsapp}
        phone={defaultGymConfig.displayPhone}
      />
    </div>
  );
}
