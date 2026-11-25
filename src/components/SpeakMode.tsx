"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { listenRu, speakRu } from "@/lib/speech";
import { addNote } from "@/lib/store";
import { TUTORS } from "@/lib/tutors";
import type { HelpLang, Profile, TutorId, TutorMessage } from "@/lib/types";

export function SpeakMode({
  profile,
  lessonHint,
  onProfile,
}: {
  profile: Profile;
  lessonHint?: string;
  onProfile: (p: Profile) => void;
}) {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);
  const [, startTransition] = useTransition();
  const listenRef = useRef<ReturnType<typeof listenRu> | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = TUTORS[profile.tutor];
    const opener = lessonHint
      ? `Здравствуйте${profile.name ? `, ${profile.name}` : ""}! Я ${t.nameRu}. Сегодня: ${lessonHint}`
      : `Здравствуйте${profile.name ? `, ${profile.name}` : ""}! Я ${t.nameRu}. Давайте говорить.`;
    setMessages([
      {
        id: `boot_${lessonHint || "free"}`,
        role: "tutor",
        text: opener,
        at: Date.now(),
      },
    ]);
  }, [profile.tutor, profile.name, lessonHint]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function send(text: string) {
    const cleaned = text.trim();
    if (!cleaned || busy) return;
    setDraft("");
    const userMsg: TutorMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      text: cleaned,
      at: Date.now(),
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setBusy(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
          tutor: profile.tutor,
          helpLang: profile.helpLang,
          mode: lessonHint ? "lesson" : "speak",
          learnerName: profile.name,
          genderPast: profile.genderPast,
          lessonHint,
        }),
      });
      const data = (await res.json()) as {
        reply: string;
        correction?: string;
        help?: string;
        demo?: boolean;
      };
      setDemo(Boolean(data.demo));
      const tutorMsg: TutorMessage = {
        id: `t_${Date.now()}`,
        role: "tutor",
        text: data.reply,
        correction: data.correction,
        translation: data.help,
        at: Date.now(),
      };
      startTransition(() => setMessages((m) => [...m, tutorMsg]));
      void speakRu(data.reply);
    } finally {
      setBusy(false);
    }
  }

  function toggleListen() {
    if (listening) {
      listenRef.current?.stop();
      listenRef.current = null;
      setListening(false);
      return;
    }
    setListening(true);
    listenRef.current = listenRu(
      (text, final) => {
        setDraft(text);
        if (final) {
          setListening(false);
          listenRef.current = null;
          void send(text);
        }
      },
      () => setListening(false),
    );
  }

  return (
    <div className="fade-up flex h-full min-h-[70vh] flex-col">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="hud-chip">
              <span className="dot" />
              channel open
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
            Live tutor · swipe to Overhear
          </p>
          <h2 className="font-display text-4xl text-[var(--fg)]">
            {TUTORS[profile.tutor].nameRu}
          </h2>
          <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
            {profile.helpLang === "de"
              ? TUTORS[profile.tutor].blurbDe
              : TUTORS[profile.tutor].blurb}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
            {(["ara", "lev"] as TutorId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onProfile({ ...profile, tutor: id })}
                className="rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: profile.tutor === id ? "var(--fg)" : "transparent",
                  color: profile.tutor === id ? "var(--ink)" : "var(--muted)",
                }}
              >
                {TUTORS[id].name}
              </button>
            ))}
          </div>
          <div className="flex gap-1 text-xs">
            {(["en", "de"] as HelpLang[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onProfile({ ...profile, helpLang: lang })}
                className="min-h-9 min-w-9 uppercase"
                style={{
                  color:
                    profile.helpLang === lang ? "var(--fg)" : "var(--faint)",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {demo && (
        <p className="mb-2 text-xs text-[var(--primary)]">
          Demo tutor — bind OPENAI_API_KEY for live Ara/Lev.
        </p>
      )}
      {lessonHint && (
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
          Lesson · {lessonHint}
        </p>
      )}

      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-3">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "bubble-user" : "bubble-tutor"}>
            <p className={m.role === "tutor" ? "ru-line text-xl" : "text-[15px] leading-relaxed"}>
              {m.text}
            </p>
            {m.correction && (
              <p className="mt-2 text-sm text-[var(--primary)]">
                → {m.correction}{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() =>
                    addNote({
                      text: m.correction!,
                      kind: "phrase",
                      source: "speak",
                      note: "Correction from tutor",
                    })
                  }
                >
                  keep
                </button>
              </p>
            )}
            {m.translation && (
              <p className="mt-1 text-xs text-[var(--muted)]">{m.translation}</p>
            )}
          </div>
        ))}
        {busy && (
          <div className="wave px-1">
            <i /><i /><i /><i /><i />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 space-y-2 border-t border-[var(--line)] bg-[rgba(243,241,236,0.92)] pt-3 backdrop-blur">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            placeholder="Говорите или пишите…"
            className="input-dark min-h-14 flex-1 resize-none px-4 py-3 text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
          />
          <div className={`hud-ring ${listening ? "mic-live" : ""}`}>
            <button
              type="button"
              onClick={toggleListen}
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${
                listening ? "bg-[var(--primary)]" : "bg-[var(--fg)]"
              }`}
              aria-label="Microphone"
            >
              ●
            </button>
          </div>
          <button
            type="button"
            onClick={() => void send(draft)}
            disabled={!draft.trim() || busy}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-semibold text-white disabled:opacity-40"
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
