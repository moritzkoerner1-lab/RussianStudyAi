"use client";

import {
  currentDayIndex,
  DAYS,
  daysUntil,
} from "@/lib/curriculum";
import { DAILY_INTENSE } from "@/lib/social";
import { TUTORS } from "@/lib/tutors";
import type { AppMode, Profile } from "@/lib/types";

export function HomeHero({
  profile,
  onProfile,
  onGo,
}: {
  profile: Profile;
  onProfile: (p: Profile) => void;
  onGo: (mode: AppMode) => void;
}) {
  const day = currentDayIndex(profile.startedOn);
  const until = daysUntil(profile.landOn);
  const plan = DAYS[day - 1] || DAYS[0];

  return (
    <div className="fade-up">
      <div className="hero-plane -mx-5 -mt-4 mb-6">
        <div className="relative z-[1] flex min-h-[58vh] flex-col justify-end px-5 pb-9 pt-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--faint)]">
            vzhivuyu · live, in person
          </p>
          <h1 className="mt-3 font-display text-[3.5rem] leading-[0.92] text-[var(--fg)] sm:text-6xl">
            ВЖИВУЮ
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
            Speak first. Overhear friends. Correct live. Swipe between modes —
            one immersive deck.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onGo("speak")}
              className="pill pill-fill h-14 px-6 text-sm"
            >
              Speak with {TUTORS[profile.tutor].name}
            </button>
            <button
              type="button"
              onClick={() => onGo("overhear")}
              className="pill h-14 px-6 text-sm"
            >
              Overhear friends
            </button>
          </div>
          <p className="mt-4 text-xs text-[var(--faint)]">
            Swipe left for Speak · or use the dock
          </p>
        </div>
      </div>

      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
        Day {day} of 14 · {until} days until you land
      </p>
      <h2 className="mt-2 font-display text-4xl text-[var(--fg)]">
        {plan.titleRu}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
        {plan.mission}
      </p>

      <div className="mt-5 grid gap-2">
        <button
          type="button"
          onClick={() => onGo("path")}
          className="pill pill-ink flex h-14 w-full items-center justify-between px-5 text-sm"
        >
          <span>Open today&apos;s path</span>
          <span className="opacity-50">→</span>
        </button>
        <button
          type="button"
          onClick={() => onGo("drill")}
          className="pill flex h-14 w-full items-center justify-between px-5 text-sm"
        >
          <span>Drill chunks + social speech</span>
          <span className="text-[var(--faint)]">→</span>
        </button>
      </div>

      <div className="surface mt-6 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
          Heavy day · 1–3 hours
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Speak {DAILY_INTENSE.speakMin}m · Overhear {DAILY_INTENSE.overhearMin}m ·
          Drill {DAILY_INTENSE.drillMin}m · Walk {DAILY_INTENSE.walkMin}m · Keep{" "}
          {DAILY_INTENSE.notebookMin}m. {DAILY_INTENSE.totalHint}.
        </p>
      </div>

      <div className="mt-8 space-y-3 border-t border-[var(--line)] pt-6 pb-4">
        <label className="block text-sm text-[var(--muted)]" htmlFor="name">
          What should they call you
        </label>
        <input
          id="name"
          value={profile.name}
          onChange={(e) => onProfile({ ...profile, name: e.target.value })}
          placeholder="Moritz"
          className="input-dark h-12 rounded-full px-4"
        />
        <label className="block text-sm text-[var(--muted)]" htmlFor="land">
          You land
        </label>
        <input
          id="land"
          type="date"
          value={profile.landOn}
          onChange={(e) => onProfile({ ...profile, landOn: e.target.value })}
          className="input-dark h-12 rounded-full px-4"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {(["был", "была"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onProfile({ ...profile, genderPast: g })}
              className="pill h-11 text-sm"
              style={{
                background: profile.genderPast === g ? "var(--fg)" : "transparent",
                color: profile.genderPast === g ? "var(--ink)" : "var(--fg)",
                borderColor: profile.genderPast === g ? "transparent" : "var(--line)",
              }}
            >
              I say {g}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["ara", "lev"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onProfile({ ...profile, tutor: id })}
              className="pill h-11 text-sm"
              style={{
                background: profile.tutor === id ? "var(--fg)" : "transparent",
                color: profile.tutor === id ? "var(--ink)" : "var(--fg)",
                borderColor: profile.tutor === id ? "transparent" : "var(--line)",
              }}
            >
              {TUTORS[id].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
