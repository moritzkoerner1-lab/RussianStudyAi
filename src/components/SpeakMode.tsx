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
    setMessages([
      {
        id: "boot",
        role: "tutor",
        text: `Здравствуйте${profile.name ? `, ${profile.name}` : ""}! Я ${t.nameRu}. Давайте говорить.`,
        at: Date.now(),
      },
    ]);
  }, [profile.tutor, profile.name]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
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

  function setTutor(id: TutorId) {
    onProfile({ ...profile, tutor: id });
  }

  function setHelp(lang: HelpLang) {
    onProfile({ ...profile, helpLang: lang });
  }

  return (
    <div className="mode-enter flex h-full flex-col">
      <header className="flex items-start justify-between gap-3 px-1 pb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
            Live tutor
          </p>
          <h2 className="font-display text-3xl text-[var(--ink)]">
            {TUTORS[profile.tutor].nameRu}
          </h2>
          <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
            {profile.helpLang === "de"
              ? TUTORS[profile.tutor].blurbDe
              : TUTORS[profile.tutor].blurb}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1 rounded-full border border-[var(--line)] bg-white/60 p-1">
            {(["ara", "lev"] as TutorId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTutor(id)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: profile.tutor === id ? "var(--ink)" : "transparent",
                  color: profile.tutor === id ? "#fff" : "var(--muted)",
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
                onClick={() => setHelp(lang)}
                className="min-h-9 min-w-9 uppercase"
                style={{ color: profile.helpLang === lang ? "var(--ink)" : "var(--faint)" }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {demo && (
        <p className="mb-2 rounded-full bg-[rgba(47,93,140,0.1)] px-3 py-1.5 text-xs text-[var(--steel)]">
          Demo tutor — bind OPENAI_API_KEY for live Ara/Lev.
        </p>
      )}

      {lessonHint && (
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--signal)]">
          Lesson · {lessonHint}
        </p>
      )}

      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[92%] ${m.role === "user" ? "ml-auto" : ""}`}
          >
            <div
              className="rounded-[1.2rem] px-4 py-3"
              style={{
                background:
                  m.role === "user" ? "var(--ink)" : "rgba(255,255,255,0.78)",
                color: m.role === "user" ? "#fff" : "var(--ink)",
                border: m.role === "user" ? "none" : "1px solid var(--line)",
              }}
            >
              <p className={m.role === "tutor" ? "ru-line text-xl" : "text-[15px] leading-relaxed"}>
                {m.text}
              </p>
              {m.correction && (
                <p className="mt-2 text-sm" style={{ color: "var(--signal)" }}>
                  → {m.correction}
                  <button
                    type="button"
                    className="ml-2 underline"
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
          </div>
        ))}
        {busy && (
          <div className="wave px-2">
            <span /><span /><span /><span /><span />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 space-y-2 border-t border-[var(--line)] bg-[rgba(238,242,246,0.88)] pt-3 backdrop-blur">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            placeholder="Говорите или пишите…"
            className="min-h-14 flex-1 resize-none rounded-[1.1rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-base outline-none focus:border-[var(--signal)]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
          />
          <button
            type="button"
            onClick={toggleListen}
            className={`live-glow relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${listening ? "bg-[var(--signal)]" : "bg-[var(--ink)]"}`}
            aria-label="Microphone"
          >
            {listening && (
              <span className="pulse-ring absolute inset-0 rounded-full border-2 border-[var(--signal)]" />
            )}
            <MicIcon />
          </button>
          <button
            type="button"
            onClick={() => void send(draft)}
            disabled={!draft.trim() || busy}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--signal)] text-white disabled:opacity-40"
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z"
        fill="currentColor"
      />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
