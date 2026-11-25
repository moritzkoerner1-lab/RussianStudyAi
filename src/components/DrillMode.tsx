"use client";

import { useMemo, useState } from "react";
import { VOCAB } from "@/lib/curriculum";
import { SOCIAL_VOCAB } from "@/lib/social";
import { speakRu } from "@/lib/speech";
import { addNote, loadDrill, saveDrill } from "@/lib/store";
import type { HelpLang, Profile, VocabItem } from "@/lib/types";

type Phase = "reveal" | "build" | "recall";
type Deck = "moscow" | "social";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQueue(pool: VocabItem[], count: number): VocabItem[] {
  const progress = loadDrill();
  const now = Date.now();
  const scored = pool.map((v) => {
    const seen = progress.seen[v.id] || 0;
    const correct = progress.correct[v.id] || 0;
    const last = progress.lastSeen[v.id] || 0;
    const due = now - last > 1000 * 60 * 60 * 8 || seen === 0;
    const mastery = seen === 0 ? 0 : correct / seen;
    return { v, score: (due ? 3 : 0) + (1 - mastery) * 2 + 1 / v.frequency };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.v);
}

export function DrillMode({ profile }: { profile: Profile }) {
  const helpLang: HelpLang = profile.helpLang;
  const [deck, setDeck] = useState<Deck>("social");
  const pool = deck === "social" ? SOCIAL_VOCAB : VOCAB;
  const [queue, setQueue] = useState<VocabItem[]>(() => pickQueue(SOCIAL_VOCAB, 8));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("reveal");
  const [tokens, setTokens] = useState<string[]>([]);
  const [wordPool, setWordPool] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [sessionDone, setSessionDone] = useState(0);

  const item = queue[idx];
  const sentence = item?.sentences[0];
  const gloss = helpLang === "de" ? item?.de : item?.en;
  const sentGloss = helpLang === "de" ? sentence?.de : sentence?.en;

  const progressLabel = useMemo(
    () => `${Math.min(idx + 1, queue.length)} / ${queue.length}`,
    [idx, queue.length],
  );

  function switchDeck(next: Deck) {
    setDeck(next);
    const p = next === "social" ? SOCIAL_VOCAB : VOCAB;
    setQueue(pickQueue(p, 8));
    setIdx(0);
    setPhase("reveal");
    setFeedback("");
  }

  function startBuild(v: VocabItem) {
    const words = v.sentences[0].ru.replace(/[«»]/g, "").split(/\s+/);
    setTokens([]);
    setWordPool(shuffle(words));
    setPhase("build");
    setFeedback("");
  }

  function mark(v: VocabItem, ok: boolean) {
    const p = loadDrill();
    p.seen[v.id] = (p.seen[v.id] || 0) + 1;
    if (ok) p.correct[v.id] = (p.correct[v.id] || 0) + 1;
    p.lastSeen[v.id] = Date.now();
    saveDrill(p);
  }

  function next() {
    if (idx >= queue.length - 1) {
      setSessionDone((n) => n + queue.length);
      setQueue(pickQueue(pool, 8));
      setIdx(0);
      setPhase("reveal");
      setFeedback("Новый круг. Keep the volume high.");
      return;
    }
    setIdx((i) => i + 1);
    setPhase("reveal");
    setFeedback("");
  }

  if (!item || !sentence) {
    return <p className="text-[var(--muted)]">No vocabulary loaded.</p>;
  }

  return (
    <div className="fade-up flex h-full flex-col">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          Chunk drill · swipe modes anytime
        </p>
        <h2 className="font-display text-4xl">Строй</h2>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Build sentences, don&apos;t memorize orphans. Social deck = friend talk.
          Moscow deck = taxi, café, metro.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="pill text-sm"
            style={{
              background: deck === "social" ? "var(--fg)" : "transparent",
              color: deck === "social" ? "var(--ink)" : "var(--fg)",
            }}
            onClick={() => switchDeck("social")}
          >
            Friends
          </button>
          <button
            type="button"
            className="pill text-sm"
            style={{
              background: deck === "moscow" ? "var(--fg)" : "transparent",
              color: deck === "moscow" ? "var(--ink)" : "var(--fg)",
            }}
            onClick={() => switchDeck("moscow")}
          >
            Moscow
          </button>
        </div>
        <p className="mt-2 text-xs tabular-nums text-[var(--faint)]">
          Session {progressLabel}
          {sessionDone > 0 ? ` · ${sessionDone} done` : ""}
        </p>
      </header>

      <div className="surface flex-1 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[rgba(226,90,50,0.16)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)]">
            {item.pos}
          </span>
          <span className="text-xs text-[var(--faint)]">
            {item.domains.join(" · ")}
          </span>
        </div>

        {phase === "reveal" && (
          <div className="mt-6">
            <p className="ru-line text-4xl">{item.lemma}</p>
            <p className="mt-2 text-base text-[var(--muted)]">{gloss}</p>
            <button
              type="button"
              className="mt-6 w-full text-left"
              onClick={() => void speakRu(sentence.ru)}
            >
              <p className="ru-line text-2xl leading-snug">{sentence.ru}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{sentGloss}</p>
            </button>
            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => startBuild(item)}
                className="pill pill-ink h-14 w-full text-sm"
              >
                Build the sentence
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase("recall");
                  setFeedback("");
                }}
                className="pill h-12 w-full text-sm"
              >
                Hide & recall
              </button>
              <button
                type="button"
                onClick={() =>
                  addNote({
                    text: `${item.lemma} — ${sentence.ru}`,
                    kind: "phrase",
                    source: "drill",
                    note: gloss,
                  })
                }
                className="h-11 text-sm text-[var(--primary)]"
              >
                Keep in notebook
              </button>
            </div>
          </div>
        )}

        {phase === "build" && (
          <div className="mt-6">
            <p className="text-sm text-[var(--muted)]">Tap words into the line</p>
            <p className="mt-1 text-sm text-[var(--faint)]">{sentGloss}</p>
            <div className="mt-4 min-h-20 rounded-[1rem] border border-dashed border-[var(--line)] bg-[var(--raised)] p-3">
              <p className="ru-line text-2xl leading-snug">
                {tokens.join(" ") || "…"}
              </p>
            </div>
            <div className="mt-4 flex min-h-[4.5rem] flex-wrap content-start gap-2">
              {wordPool.map((w, i) => (
                <button
                  key={`${w}-${i}`}
                  type="button"
                  className="pill text-sm"
                  onClick={() => {
                    setTokens((t) => [...t, w]);
                    setWordPool((p) => p.filter((_, j) => j !== i));
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="pill h-12 flex-1"
                onClick={() => startBuild(item)}
              >
                Reset
              </button>
              <button
                type="button"
                className="pill pill-fill h-12 flex-1"
                onClick={() => {
                  const built = tokens.join(" ").replace(/\s+/g, " ").trim();
                  const target = sentence.ru.replace(/\s+/g, " ").trim();
                  const ok =
                    built.replace(/[.,!?…]/g, "") ===
                    target.replace(/[.,!?…]/g, "");
                  mark(item, ok);
                  setFeedback(ok ? "Да. В точку." : `Близко → ${sentence.ru}`);
                  void speakRu(sentence.ru);
                  if (ok) setTimeout(next, 1100);
                }}
              >
                Check
              </button>
            </div>
            {feedback && (
              <p className="mt-3 text-sm text-[var(--muted)]">{feedback}</p>
            )}
          </div>
        )}

        {phase === "recall" && (
          <div className="mt-6">
            <p className="text-sm text-[var(--muted)]">Say the Russian line for:</p>
            <p className="mt-3 text-lg text-[var(--fg)]">{sentGloss}</p>
            <p className="mt-2 text-sm text-[var(--faint)]">Hint: {item.lemma}</p>
            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                className="pill pill-ink h-14"
                onClick={() => {
                  mark(item, true);
                  setFeedback(sentence.ru);
                  void speakRu(sentence.ru);
                }}
              >
                I said it — reveal
              </button>
              <button
                type="button"
                className="pill h-12"
                onClick={() => {
                  mark(item, false);
                  next();
                }}
              >
                Missed · next
              </button>
              {feedback && (
                <button
                  type="button"
                  className="ru-line mt-2 text-left text-2xl text-[var(--primary)]"
                  onClick={next}
                >
                  {feedback}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
