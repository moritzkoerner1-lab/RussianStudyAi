"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { OVERHEAR } from "@/lib/social";
import { listenRu, speakRu } from "@/lib/speech";
import { addNote, grindStats, weakLemmaIds } from "@/lib/store";
import { lemmaById } from "@/lib/grindCatalog";
import { TUTORS } from "@/lib/tutors";
import type { HelpLang, Profile, TalkChannel, TutorId, TutorMessage } from "@/lib/types";

export function TalkSurface({
  profile,
  onProfile,
  lessonHint,
}: {
  profile: Profile;
  onProfile: (p: Profile) => void;
  lessonHint?: string;
}) {
  const [channel, setChannel] = useState<TalkChannel>("chat");
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [camOn, setCamOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const listenRef = useRef<ReturnType<typeof listenRu> | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();
  const stats = grindStats();
  const weak = weakLemmaIds(6)
    .map((id) => lemmaById(id)?.lemma)
    .filter(Boolean)
    .slice(0, 4);

  useEffect(() => {
    const t = TUTORS[profile.tutor];
    const weakNow = weakLemmaIds(6)
      .map((id) => lemmaById(id)?.lemma)
      .filter(Boolean)
      .slice(0, 4);
    const grindHint =
      weakNow.length > 0
        ? ` Слабые слова из Grind: ${weakNow.join(", ")}.`
        : "";
    const opener = lessonHint
      ? `Здравствуйте${profile.name ? `, ${profile.name}` : ""}! Я ${t.nameRu}. Урок: ${lessonHint}.${grindHint}`
      : `Здравствуйте${profile.name ? `, ${profile.name}` : ""}! Я ${t.nameRu}. Давайте говорить.${grindHint}`;
    setMessages([{ id: `boot_${Date.now()}`, role: "tutor", text: opener, at: Date.now() }]);
  }, [profile.tutor, profile.name, lessonHint]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

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
          mode: channel === "walk" ? "walk" : lessonHint ? "lesson" : "speak",
          learnerName: profile.name,
          genderPast: profile.genderPast,
          lessonHint:
            lessonHint ||
            (weak.length
              ? `Learner is grinding these weak words — weave them in: ${weak.join(", ")}`
              : undefined),
        }),
      });
      const data = (await res.json()) as {
        reply: string;
        correction?: string;
        help?: string;
      };
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
      if (data.correction) {
        addNote({
          text: data.correction,
          kind: "phrase",
          source: "speak",
          note: "From Talk",
        });
      }
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

  async function enableCam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamOn(true);
    } catch {
      setCamOn(false);
    }
  }

  const scene = OVERHEAR[sceneIdx];
  const gloss = (en: string, de: string) =>
    profile.helpLang === "de" ? de : en;

  return (
    <div className="shell-panel flex h-full flex-col !pb-2">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="live">
            <i />
            {TUTORS[profile.tutor].nameRu} · live
          </p>
          <h1 className="ru mt-1 text-[2.6rem]">{TUTORS[profile.tutor].name}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {stats.mastered} mastered in Grind · always in this chat
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="seg !w-auto">
            {(["ara", "lev"] as TutorId[]).map((id) => (
              <button
                key={id}
                type="button"
                data-on={profile.tutor === id}
                onClick={() => onProfile({ ...profile, tutor: id })}
                className="!px-3"
              >
                {TUTORS[id].name}
              </button>
            ))}
          </div>
          <div className="flex gap-2 text-xs uppercase tracking-wider">
            {(["en", "de"] as HelpLang[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onProfile({ ...profile, helpLang: lang })}
                style={{ color: profile.helpLang === lang ? "var(--fg)" : "var(--faint)" }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="seg mb-3">
        {(
          [
            ["chat", "Chat"],
            ["overhear", "Overhear"],
            ["walk", "Walk"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            data-on={channel === id}
            onClick={() => setChannel(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {channel === "chat" && (
        <>
          {lessonHint && (
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--garnet)]">
              Lesson · {lessonHint}
            </p>
          )}
          <div ref={scroller} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto pb-2">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "msg-me" : "msg-them"}>
                <p className={m.role === "tutor" ? "ru text-xl" : "text-[15px] leading-relaxed"}>
                  {m.text}
                </p>
                {m.correction && (
                  <p className="mt-2 text-sm text-[var(--garnet)]">→ {m.correction}</p>
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
        </>
      )}

      {channel === "overhear" && (
        <div className="min-h-0 flex-1 overflow-y-auto pb-2">
          <div className="rail mb-3">
            {OVERHEAR.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSceneIdx(i)}
                className="rounded-2xl px-4 py-3 text-left"
                style={{
                  width: "9rem",
                  background: i === sceneIdx ? "#fff" : "rgba(12,13,16,0.04)",
                  boxShadow: i === sceneIdx ? "inset 0 0 0 1px rgba(122,27,40,0.35)" : "none",
                }}
              >
                <span className="eyebrow">Scene {i + 1}</span>
                <p className="ru mt-1 text-xl">{s.titleRu}</p>
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)]">{scene.setting}</p>
          <div className="mt-3 space-y-2">
            {scene.lines.map((line, i) => (
              <button
                key={`${scene.id}-${i}`}
                type="button"
                className="msg-them !mx-0 w-full text-left"
                onClick={() => void speakRu(line.ru)}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--garnet)]">
                  {line.who}
                </span>
                <p className="ru mt-1 text-xl">{line.ru}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{gloss(line.en, line.de)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {channel === "walk" && (
        <div className="min-h-0 flex-1 overflow-y-auto pb-2">
          <div className="overflow-hidden rounded-[1.5rem] bg-[rgba(12,13,16,0.04)]">
            <video
              ref={videoRef}
              playsInline
              muted
              className={`aspect-[4/3] w-full object-cover ${camOn ? "" : "hidden"}`}
            />
            {!camOn && (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="ru text-3xl">Камера</p>
                <p className="max-w-xs text-sm text-[var(--muted)]">
                  Point at the world. Ask in Russian. {TUTORS[profile.tutor].name} corrects live.
                </p>
                <button type="button" className="cta" onClick={() => void enableCam()}>
                  Enable camera
                </button>
              </div>
            )}
          </div>
          <div ref={scroller} className="mt-3 space-y-2">
            {messages.slice(-4).map((m) => (
              <div key={m.id} className={m.role === "user" ? "msg-me" : "msg-them"}>
                <p className={m.role === "tutor" ? "ru text-lg" : "text-sm"}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(channel === "chat" || channel === "walk") && (
        <div className="mt-auto flex items-end gap-2 border-t border-[var(--line)] pt-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            placeholder="Говорите…"
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
            className="orb"
            data-live={listening}
            onClick={toggleListen}
            aria-label="Mic"
          >
            ●
          </button>
          <button
            type="button"
            className="cta !min-h-14 !px-4"
            disabled={!draft.trim() || busy}
            onClick={() => void send(draft)}
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}
