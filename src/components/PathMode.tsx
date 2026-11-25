"use client";

import { useEffect, useState } from "react";
import {
  chunksForDay,
  currentDayIndex,
  DAYS,
  daysUntil,
} from "@/lib/curriculum";
import { speakRu } from "@/lib/speech";
import { loadPathDone, markDayDone } from "@/lib/store";
import type { Profile } from "@/lib/types";

export function PathMode({
  profile,
  onSpeakLesson,
}: {
  profile: Profile;
  onSpeakLesson: (hint: string) => void;
}) {
  const dayNow = currentDayIndex(profile.startedOn);
  const [selected, setSelected] = useState(dayNow);
  const [done, setDone] = useState<number[]>([]);
  const [sitting, setSitting] = useState<"read" | "recall" | "again">("read");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setDone(loadPathDone());
  }, []);

  const plan = DAYS.find((d) => d.day === selected) || DAYS[0];
  const chunks = chunksForDay(plan.day);
  const until = daysUntil(profile.landOn);

  return (
    <div className="fade-up flex h-full flex-col">
      <header className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          Viewing day {selected} · you are on day {dayNow} · {until} until landing
        </p>
        <h2 className="font-display text-4xl">{plan.titleRu}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{plan.mission}</p>
      </header>

      <div className="h-rail mb-4">
        {DAYS.map((d) => {
          const active = d.day === selected;
          const finished = done.includes(d.day);
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => {
                setSelected(d.day);
                setSitting("read");
                setHidden(false);
              }}
              className="h-card rounded-[1.2rem] border px-4 py-3 text-left"
              style={{
                width: "8.5rem",
                borderColor: active ? "var(--primary)" : "var(--line)",
                background: active ? "var(--raised)" : "var(--surface)",
              }}
            >
              <span className="text-[11px] uppercase tracking-wider text-[var(--faint)]">
                Day {d.day}
                {finished ? " · ✓" : ""}
              </span>
              <p className="mt-1 font-display text-lg leading-tight">{d.titleRu}</p>
            </button>
          );
        })}
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {(
          [
            ["read", "Read", "See the lines"],
            ["recall", "Recall", "Pull them out"],
            ["again", "Again", "What slipped"],
          ] as const
        ).map(([id, label, sub]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setSitting(id);
              setHidden(id !== "read");
            }}
            className="rounded-[1rem] border px-3 py-3 text-left"
            style={{
              borderColor: sitting === id ? "var(--primary)" : "var(--line)",
              background:
                sitting === id ? "rgba(226,90,50,0.1)" : "var(--surface)",
            }}
          >
            <span className="block text-sm font-semibold">{label}</span>
            <span className="text-[11px] text-[var(--muted)]">{sub}</span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-3">
        {chunks.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => void speakRu(c.ru)}
            className="surface w-full px-4 py-3 text-left"
          >
            <p className="ru-line text-xl">
              {hidden && sitting !== "read" ? "••••••••••" : c.ru}
            </p>
            {!hidden && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {profile.helpLang === "de" ? c.de : c.en}
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onSpeakLesson(plan.speakPrompt)}
          className="pill pill-fill h-14 text-sm"
        >
          Speak this day with {profile.tutor === "lev" ? "Lev" : "Ara"}
        </button>
        <button
          type="button"
          onClick={() => {
            markDayDone(plan.day);
            setDone(loadPathDone());
          }}
          className="pill h-12 text-sm"
        >
          Mark day done
        </button>
      </div>
    </div>
  );
}
