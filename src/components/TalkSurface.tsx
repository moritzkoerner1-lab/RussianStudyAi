"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { SeeStrip } from "@/components/SeeStrip";
import { openingLine, ownedLines } from "@/lib/survival";
import { listenRu, speakRu } from "@/lib/speech";
import {
  appendTurn,
  loadThread,
  patchLastAraSee,
  wantsSee,
  type ThreadTurn,
} from "@/lib/thread";
import { ARA } from "@/lib/tutors";
import type { Profile } from "@/lib/types";

export function TalkSurface({ profile }: { profile: Profile }) {
  const [turns, setTurns] = useState<ThreadTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const listenRef = useRef<ReturnType<typeof listenRu> | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const existing = loadThread();
    setTurns(existing);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || booted.current) return;
    booted.current = true;

    const existing = loadThread();
    if (existing.length > 0) {
      const lastAra = [...existing].reverse().find((t) => t.role === "ara");
      if (lastAra) void speakRu(lastAra.text);
      return;
    }

    const open = openingLine(profile.helpLang, profile.name);
    const turn: ThreadTurn = {
      id: `ara_open_${Date.now()}`,
      role: "ara",
      text: open.reply,
      at: Date.now(),
      see: open.see,
    };
    setTurns(appendTurn(turn));
    void speakRu(open.reply);
  }, [ready, profile.helpLang, profile.name]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns, busy]);

  function ownedHint(): string {
    return ownedLines(profile.helpLang)
      .slice(0, 24)
      .map((l) => `${l.lemma} → ${l.ru}`)
      .join(" | ");
  }

  async function send(text: string) {
    const cleaned = text.trim();
    if (!cleaned || busy) return;
    setDraft("");

    if (wantsSee(cleaned)) {
      const userTurn: ThreadTurn = {
        id: `u_${Date.now()}`,
        role: "user",
        text: cleaned,
        at: Date.now(),
      };
      let next = appendTurn(userTurn);
      setTurns(next);

      const lastAra = [...next].reverse().find((t) => t.role === "ara");
      const bendSource = lastAra?.native || lastAra?.text || "Пожа́луйста.";
      const see = {
        bend: (lastAra?.see?.bend || bendSource.split(/\s+/)[0] || bendSource).slice(0, 40),
        audio: lastAra?.see?.audio || bendSource,
        gloss: lastAra?.see?.gloss,
      };
      next = patchLastAraSee(see);
      const araAck: ThreadTurn = {
        id: `ara_${Date.now()}`,
        role: "ara",
        text: "Вот.",
        at: Date.now(),
        see,
      };
      next = appendTurn(araAck);
      setTurns(next);
      void speakRu("Вот.");
      return;
    }

    const userTurn: ThreadTurn = {
      id: `u_${Date.now()}`,
      role: "user",
      text: cleaned,
      at: Date.now(),
    };
    const withUser = appendTurn(userTurn);
    setTurns(withUser);
    setBusy(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: withUser.map((t) => ({
            role: t.role === "ara" ? "ara" : "user",
            text: t.text,
          })),
          helpLang: profile.helpLang,
          learnerName: profile.name,
          genderPast: profile.genderPast,
          ownedHint: ownedHint(),
        }),
      });
      const data = (await res.json()) as {
        reply: string;
        native?: string;
        see?: { bend: string; audio: string; gloss?: string };
        help?: string;
      };

      const araTurn: ThreadTurn = {
        id: `ara_${Date.now()}`,
        role: "ara",
        text: data.reply,
        at: Date.now(),
        see: data.see,
        native: data.native,
      };
      const next = appendTurn(araTurn);
      startTransition(() => setTurns(next));
      void speakRu(data.native || data.reply);
    } finally {
      setBusy(false);
    }
  }

  function toggleListen() {
    if (listening) {
      listenRef.current?.stop();
      setListening(false);
      return;
    }
    setListening(true);
    listenRef.current = listenRu(
      (text, final) => {
        setDraft(text);
        if (final) {
          setListening(false);
          void send(text);
        }
      },
      () => setListening(false),
    );
  }

  if (!ready) {
    return (
      <div className="shell-panel flex h-full items-center justify-center">
        <p className="ru text-2xl">{ARA.nameRu}</p>
      </div>
    );
  }

  return (
    <div className="shell-panel flex h-full flex-col !pb-2">
      <header className="mb-3">
        <p className="live">
          <i />
          {ARA.nameRu} · one thread
        </p>
        <h1 className="ru mt-1 text-[2.75rem]">{ARA.name}</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Continues where you left. Voice first. Say «покажи» for See.
        </p>
      </header>

      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-3">
        {turns.map((t) => (
          <div key={t.id}>
            <div className={t.role === "user" ? "msg-me" : "msg-them"}>
              <p className={t.role === "ara" ? "ru text-xl" : "text-[15px] leading-relaxed"}>
                {t.text}
              </p>
              {t.native && t.native !== t.text && (
                <p className="mt-2 text-sm text-[var(--garnet)]">→ {t.native}</p>
              )}
            </div>
            {t.role === "ara" && t.see?.bend ? <SeeStrip see={t.see} /> : null}
          </div>
        ))}
        {busy && (
          <div className="wave px-1">
            <i /><i /><i /><i /><i />
          </div>
        )}
      </div>

      <div className="thread-composer" data-type={typing}>
        <button
          type="button"
          className="type-toggle"
          onClick={() => setTyping((v) => !v)}
        >
          {typing ? "voice" : "type"}
        </button>

        {typing ? (
          <>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder="…"
              className="field min-h-14 flex-1 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(draft);
                }
              }}
            />
            <button
              type="button"
              className="cta !min-h-14 !px-4"
              disabled={!draft.trim() || busy}
              onClick={() => void send(draft)}
            >
              ↑
            </button>
          </>
        ) : (
          <button
            type="button"
            className="orb"
            data-live={listening}
            onClick={toggleListen}
            aria-label="Speak"
          >
            {listening ? "…" : "speak"}
          </button>
        )}
      </div>
    </div>
  );
}
