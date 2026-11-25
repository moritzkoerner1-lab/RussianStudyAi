"use client";

import { useEffect, useState } from "react";
import {
  chunksForDay,
  currentDayIndex,
  DAYS,
  daysUntil,
} from "@/lib/curriculum";
import { speakRu } from "@/lib/speech";
import { grindStats, loadPathDone, markDayDone } from "@/lib/store";
import type { Profile } from "@/lib/types";

export function LessonsSurface({
  profile,
  onSpeakLesson,
}: {
  profile: Profile;
  onSpeakLesson: (hint: string) => void;
}) {
  const dayNow = currentDayIndex(profile.startedOn);
  const [selected, setSelected] = useState(dayNow);
  const [done, setDone] = useState<number[]>([]);
  const [hidden, setHidden] = useState(false);
  const plan = DAYS.find((d) => d.day === selected) || DAYS[0];
  const chunks = chunksForDay(plan.day);
  const until = daysUntil(profile.landOn);
  const stats = grindStats();

  useEffect(() => {
    setDone(loadPathDone());
  }, []);

  return (
    <div className="shell-panel flex h-full flex-col">
      <header className="mb-3">
        <p className="eyebrow">
          Day {dayNow}/14 · {until} until Moscow · Grind {stats.mastered} solid
        </p>
        <h1 className="ru mt-1 text-[2.7rem]">{plan.titleRu}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {plan.mission}
        </p>
      </header>

      <div className="rail mb-4">
        {DAYS.map((d) => {
          const active = d.day === selected;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => {
                setSelected(d.day);
                setHidden(false);
              }}
              className="rounded-2xl px-4 py-3 text-left"
              style={{
                width: "8.2rem",
                background: active ? "#fff" : "rgba(12,13,16,0.04)",
                boxShadow: active ? "inset 0 0 0 1px rgba(122,27,40,0.35)" : "none",
              }}
            >
              <span className="eyebrow">
                {d.day}
                {done.includes(d.day) ? " ✓" : ""}
              </span>
              <p className="ru mt-1 text-lg leading-tight">{d.titleRu}</p>
            </button>
          );
        })}
      </div>

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          className={hidden ? "cta-ghost flex-1" : "cta flex-1"}
          onClick={() => setHidden(false)}
        >
          Read
        </button>
        <button
          type="button"
          className={hidden ? "cta flex-1" : "cta-ghost flex-1"}
          onClick={() => setHidden(true)}
        >
          Recall
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-3">
        {chunks.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => void speakRu(c.ru)}
            className="w-full rounded-2xl bg-[rgba(255,255,255,0.65)] px-4 py-3 text-left shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <p className="ru text-xl">{hidden ? "••••••••" : c.ru}</p>
            {!hidden && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {profile.helpLang === "de" ? c.de : c.en}
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          type="button"
          className="cta w-full"
          onClick={() => onSpeakLesson(plan.speakPrompt)}
        >
          Practice with {profile.tutor === "lev" ? "Lev" : "Ara"}
        </button>
        <button
          type="button"
          className="cta-ghost w-full"
          onClick={() => {
            markDayDone(plan.day);
            setDone(loadPathDone());
          }}
        >
          Mark day done
        </button>
      </div>
    </div>
  );
}
