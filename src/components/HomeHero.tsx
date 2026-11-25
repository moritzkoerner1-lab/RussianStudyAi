"use client";

import {
  currentDayIndex,
  DAYS,
  daysUntil,
} from "@/lib/curriculum";
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
    <div className="relative flex min-h-full flex-col">
      <div className="relative -mx-5 -mt-2 mb-6 overflow-hidden rounded-b-[2rem]">
        <div
          className="relative min-h-[72vh] w-full"
          style={{
            background:
              "linear-gradient(160deg, rgba(12,18,32,0.15) 0%, rgba(12,18,32,0.55) 48%, rgba(12,18,32,0.82) 100%), radial-gradient(900px 500px at 80% 10%, rgba(196,30,58,0.35), transparent 55%), linear-gradient(145deg, #2a3d5c 0%, #0f1a2b 55%, #1a0f14 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.04) 48px, rgba(255,255,255,0.04) 49px), repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px)",
            }}
          />
          <div className="relative flex min-h-[72vh] flex-col justify-end px-6 pb-10 pt-16 text-white">
            <p className="anim-rise text-[11px] uppercase tracking-[0.28em] text-white/70">
              vzhivuyu · live, in person
            </p>
            <h1 className="anim-rise-delay font-display text-[3.4rem] leading-[0.95] tracking-tight sm:text-6xl">
              ВЖИВУЮ
            </h1>
            <p className="anim-rise-delay-2 mt-4 max-w-sm text-base leading-relaxed text-white/80">
              Moscow in two weeks — speak first, correct live, keep what matters.
            </p>
            <div className="anim-rise-delay-2 mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onGo("speak")}
                className="h-14 rounded-full bg-[var(--signal)] px-6 text-sm font-semibold text-white"
              >
                Speak with {TUTORS[profile.tutor].name}
              </button>
              <button
                type="button"
                onClick={() => onGo("walk")}
                className="h-14 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur"
              >
                Walk mode
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="anim-rise px-1 pb-28">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          Day {day} of 14 · {until} days until you land
        </p>
        <h2 className="mt-2 font-display text-3xl text-[var(--ink)]">
          {plan.titleRu}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          {plan.mission}
        </p>

        <div className="mt-6 grid gap-2">
          <button
            type="button"
            onClick={() => onGo("path")}
            className="flex h-14 items-center justify-between rounded-full bg-[var(--ink)] px-5 text-sm font-semibold text-white"
          >
            <span>Open today&apos;s path</span>
            <span className="text-white/50">→</span>
          </button>
          <button
            type="button"
            onClick={() => onGo("drill")}
            className="flex h-14 items-center justify-between rounded-full border border-[var(--line)] bg-white/70 px-5 text-sm font-semibold"
          >
            <span>Drill Moscow chunks</span>
            <span className="text-[var(--faint)]">→</span>
          </button>
        </div>

        <div className="mt-8 space-y-3 border-t border-[var(--line)] pt-6">
          <label className="block text-sm text-[var(--muted)]" htmlFor="name">
            What should they call you
          </label>
          <input
            id="name"
            value={profile.name}
            onChange={(e) => onProfile({ ...profile, name: e.target.value })}
            placeholder="Moritz"
            className="h-12 w-full rounded-full border border-[var(--line)] bg-white/70 px-4 outline-none focus:border-[var(--signal)]"
          />
          <label className="block text-sm text-[var(--muted)]" htmlFor="land">
            You land
          </label>
          <input
            id="land"
            type="date"
            value={profile.landOn}
            onChange={(e) => onProfile({ ...profile, landOn: e.target.value })}
            className="h-12 w-full rounded-full border border-[var(--line)] bg-white/70 px-4 outline-none"
          />
          <div className="flex gap-2 pt-1">
            {(["был", "была"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onProfile({ ...profile, genderPast: g })}
                className="h-11 rounded-full px-4 text-sm"
                style={{
                  background:
                    profile.genderPast === g ? "var(--ink)" : "transparent",
                  color: profile.genderPast === g ? "#fff" : "var(--ink)",
                  border:
                    profile.genderPast === g
                      ? "none"
                      : "1px solid var(--line)",
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
                className="h-11 rounded-full px-4 text-sm"
                style={{
                  background: profile.tutor === id ? "var(--ink)" : "transparent",
                  color: profile.tutor === id ? "#fff" : "var(--ink)",
                  border:
                    profile.tutor === id ? "none" : "1px solid var(--line)",
                }}
              >
                {TUTORS[id].name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
