"use client";

import { useMemo, useState } from "react";
import { speakRu } from "@/lib/speech";
import { addNote } from "@/lib/store";
import { OVERHEAR, SOCIAL_CHUNKS } from "@/lib/social";
import type { Profile } from "@/lib/types";

export function OverhearMode({ profile }: { profile: Profile }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const scene = OVERHEAR[sceneIdx];
  const gloss = (en: string, de: string) =>
    profile.helpLang === "de" ? de : en;

  const fillers = useMemo(
    () => SOCIAL_CHUNKS.filter((c) => c.tags.includes("filler") || c.tags.includes("react")),
    [],
  );

  function playThrough() {
    const line = scene.lines[lineIdx];
    if (!line) return;
    void speakRu(line.ru, 0.95);
  }

  return (
    <div className="fade-up">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          Friends talking · comprehension first
        </p>
        <h2 className="font-display text-4xl">Слух</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Not tourist Russian — catch what your girlfriend and her friends are
          saying: fillers, reactions, plans, soft gossip. Swipe scenes below.
        </p>
      </header>

      <div className="h-rail mb-4">
        {OVERHEAR.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSceneIdx(i);
              setLineIdx(0);
              setHidden(false);
            }}
            className="h-card surface px-4 py-3 text-left"
            style={{
              width: "9.5rem",
              borderColor: i === sceneIdx ? "var(--primary)" : "var(--line)",
              background: i === sceneIdx ? "var(--raised)" : "var(--surface)",
            }}
          >
            <span className="text-[10px] uppercase tracking-wider text-[var(--faint)]">
              Scene {i + 1}
            </span>
            <p className="mt-1 font-display text-xl leading-tight">{s.titleRu}</p>
          </button>
        ))}
      </div>

      <div className="surface p-4">
        <p className="text-xs text-[var(--faint)]">{scene.setting}</p>
        <h3 className="mt-2 font-display text-3xl">{scene.titleRu}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{scene.title}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="pill pill-fill text-sm"
            onClick={() => {
              setHidden(false);
              setLineIdx(0);
              playThrough();
            }}
          >
            Play line
          </button>
          <button
            type="button"
            className="pill text-sm"
            onClick={() => setHidden((h) => !h)}
          >
            {hidden ? "Show text" : "Hide & listen"}
          </button>
          <button
            type="button"
            className="pill text-sm"
            onClick={() =>
              setLineIdx((i) => Math.min(scene.lines.length - 1, i + 1))
            }
          >
            Next line
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {scene.lines.map((line, i) => {
            const active = i === lineIdx;
            return (
              <button
                key={`${scene.id}-${i}`}
                type="button"
                onClick={() => {
                  setLineIdx(i);
                  void speakRu(line.ru);
                }}
                className="w-full rounded-[1rem] border px-4 py-3 text-left"
                style={{
                  borderColor: active ? "var(--primary)" : "var(--line)",
                  background: active ? "rgba(226,90,50,0.08)" : "transparent",
                }}
              >
                <span className="text-[11px] uppercase tracking-wider text-[var(--primary)]">
                  {line.who}
                </span>
                <p className="ru-line mt-1 text-2xl">
                  {hidden && !active ? "••••••••" : line.ru}
                </p>
                {!hidden && (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {gloss(line.en, line.de)}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {scene.focus.map((f) => (
            <button
              key={f}
              type="button"
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--muted)]"
              onClick={() =>
                addNote({
                  text: f,
                  kind: "word",
                  source: "path",
                  note: `From overhear: ${scene.titleRu}`,
                })
              }
            >
              keep · {f}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-display text-2xl">Fillers you will hear</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          These glue friend-talk together. Volume + recognition beats translation.
        </p>
        <div className="mt-3 space-y-2">
          {fillers.slice(0, 8).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => void speakRu(c.ru)}
              className="surface flex w-full flex-col items-start px-4 py-3 text-left"
            >
              <span className="ru-line text-xl">{c.ru}</span>
              <span className="mt-1 text-xs text-[var(--muted)]">
                {gloss(c.en, c.de)}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
