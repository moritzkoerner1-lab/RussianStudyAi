"use client";

import { useMemo, useState } from "react";
import { GRIND_POOL } from "@/lib/grindCatalog";
import { speakRu } from "@/lib/speech";
import {
  addNote,
  grindStats,
  loadGrind,
  recordGrindResult,
} from "@/lib/store";
import type { Profile, VocabItem } from "@/lib/types";

type Target = 50 | 100 | 150 | 200;
type Phase = "prompt" | "reveal";

function nextItem(exclude?: string): VocabItem {
  const p = loadGrind();
  const now = Date.now();
  const scored = GRIND_POOL.map((v) => {
    if (v.id === exclude) return { v, score: -99 };
    const seen = p.seen[v.id] || 0;
    const correct = p.correct[v.id] || 0;
    const last = p.lastSeen[v.id] || 0;
    const mastered = Boolean(p.mastered[v.id]);
    const due = now - last > 1000 * 60 * 30 || seen === 0;
    const mastery = seen === 0 ? 0 : correct / Math.max(seen, 1);
    return {
      v,
      score:
        (mastered ? -1 : 2) +
        (due ? 3 : 0) +
        (1 - mastery) * 2 +
        1 / v.frequency +
        Math.random() * 0.2,
    };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.v || GRIND_POOL[0];
}

export function GrindSurface({ profile }: { profile: Profile }) {
  const [target, setTarget] = useState<Target>(100);
  const [done, setDone] = useState(0);
  const [item, setItem] = useState<VocabItem>(() => nextItem());
  const [phase, setPhase] = useState<Phase>("prompt");
  const [stats, setStats] = useState(() => grindStats());
  const gloss = profile.helpLang === "de" ? item.de : item.en;
  const sentence = item.sentences[0];
  const sentGloss =
    profile.helpLang === "de" ? sentence.de : sentence.en;

  const pct = useMemo(
    () => Math.min(100, Math.round((done / target) * 100)),
    [done, target],
  );

  function advance(ok: boolean) {
    const p = recordGrindResult(item.id, ok, done + 1);
    setStats({
      seen: Object.keys(p.seen).length,
      mastered: Object.values(p.mastered).filter(Boolean).length,
      totalCorrect: p.totalCorrect,
      sessionBest: p.sessionBest,
    });
    if (ok) {
      addNote({
        text: `${item.lemma} — ${sentence.ru}`,
        kind: "phrase",
        source: "grind",
        note: gloss,
        meta: { lemmaId: item.id },
      });
    }
    setDone((n) => n + 1);
    setItem(nextItem(item.id));
    setPhase("prompt");
  }

  return (
    <div className="shell-panel flex h-full flex-col">
      <header className="mb-2">
        <p className="eyebrow">Lock-in · usage inside every card</p>
        <h1 className="ru mt-1 text-[2.7rem]">Grind</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {GRIND_POOL.length} lemmas · each locked in a real sentence. Hit{" "}
          {target} this session.
        </p>
      </header>

      <div className="seg mb-3">
        {([50, 100, 150, 200] as Target[]).map((n) => (
          <button
            key={n}
            type="button"
            data-on={target === n}
            onClick={() => setTarget(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="grind-meter mb-1">
        <div>
          <strong>
            {done}
            <span className="text-[var(--faint)]">/{target}</span>
          </strong>
          <p className="text-xs text-[var(--faint)]">this session</p>
        </div>
        <div className="text-right text-xs text-[var(--muted)]">
          <div>{stats.mastered} mastered</div>
          <div>{stats.seen} touched</div>
          <div>best {stats.sessionBest}</div>
        </div>
      </div>
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-[rgba(12,13,16,0.06)]">
        <div
          className="h-full rounded-full bg-[var(--garnet)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grind-stage">
        <p className="eyebrow mb-3">{item.domains[0]} · {item.pos}</p>
        <button
          type="button"
          className="ru text-[3.2rem] leading-none"
          onClick={() => void speakRu(item.lemma)}
        >
          {item.lemma}
        </button>
        <p className="mt-3 text-base text-[var(--muted)]">{gloss}</p>

        {phase === "prompt" ? (
          <>
            <p className="mt-8 text-sm text-[var(--faint)]">
              Say the Russian line for:
            </p>
            <p className="mt-2 text-lg text-[var(--fg)]">{sentGloss}</p>
            <div className="mt-10 flex flex-col gap-2">
              <button
                type="button"
                className="cta w-full"
                onClick={() => {
                  setPhase("reveal");
                  void speakRu(sentence.ru);
                }}
              >
                I said it — show line
              </button>
              <button
                type="button"
                className="cta-ghost w-full"
                onClick={() => {
                  setPhase("reveal");
                  void speakRu(sentence.ru);
                }}
              >
                Show example first
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="ru mt-8 text-[1.85rem] leading-snug text-[var(--garnet)]"
              onClick={() => void speakRu(sentence.ru)}
            >
              {sentence.ru}
            </button>
            <p className="mt-2 text-sm text-[var(--muted)]">{sentGloss}</p>
            <div className="mt-10 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="cta-ghost w-full"
                onClick={() => advance(false)}
              >
                Miss
              </button>
              <button
                type="button"
                className="cta w-full"
                onClick={() => advance(true)}
              >
                Got it
              </button>
            </div>
          </>
        )}
      </div>

      {done >= target && (
        <p className="pb-2 text-center text-sm text-[var(--garnet)]">
          Target hit. Keep going or open Talk — Ara/Lev already know your weak words.
        </p>
      )}
    </div>
  );
}
