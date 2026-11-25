"use client";

import { useEffect, useRef, useState } from "react";
import { listenRu, speakRu } from "@/lib/speech";
import { addNote } from "@/lib/store";
import { TUTORS } from "@/lib/tutors";
import type { Profile, TutorMessage } from "@/lib/types";

export function WalkMode({ profile }: { profile: Profile }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camOn, setCamOn] = useState(false);
  const [camError, setCamError] = useState("");
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const listenRef = useRef<ReturnType<typeof listenRu> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: "w0",
        role: "tutor",
        text: `Идём. Покажите что-нибудь и скажите: «Что это?» Я ${TUTORS[profile.tutor].nameRu}.`,
        at: Date.now(),
      },
    ]);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [profile.tutor]);

  async function enableCam() {
    setCamError("");
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
      setCamError("Camera blocked — you can still speak what you see.");
      setCamOn(false);
    }
  }

  async function captureHint(): Promise<string | undefined> {
    const video = videoRef.current;
    if (!video || !camOn) return undefined;
    const canvas = document.createElement("canvas");
    canvas.width = Math.min(960, video.videoWidth || 640);
    canvas.height = Math.round(
      (canvas.width / (video.videoWidth || 640)) * (video.videoHeight || 480),
    );
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
    const base64 = dataUrl.split(",")[1];
    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: "image/jpeg" }),
      });
      const data = (await res.json()) as {
        description?: string;
        labels?: string[];
      };
      if (data.labels?.length) setLabels(data.labels);
      return data.description;
    } catch {
      return undefined;
    }
  }

  async function send(text: string) {
    const cleaned = text.trim();
    if (!cleaned || busy) return;
    setDraft("");
    const userMsg: TutorMessage = {
      id: `wu_${Date.now()}`,
      role: "user",
      text: cleaned,
      at: Date.now(),
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setBusy(true);
    const visionHint = await captureHint();
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
          tutor: profile.tutor,
          helpLang: profile.helpLang,
          mode: "walk",
          learnerName: profile.name,
          genderPast: profile.genderPast,
          visionHint,
        }),
      });
      const data = (await res.json()) as {
        reply: string;
        correction?: string;
        help?: string;
      };
      const tutorMsg: TutorMessage = {
        id: `wt_${Date.now()}`,
        role: "tutor",
        text: data.reply,
        correction: data.correction,
        translation: data.help,
        at: Date.now(),
      };
      setMessages((m) => [...m, tutorMsg]);
      void speakRu(data.reply);
      if (data.correction) {
        addNote({
          text: data.correction,
          kind: "phrase",
          source: "walk",
          note: "Walk correction",
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

  return (
    <div className="fade-up flex h-full flex-col gap-3">
      <header>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          Real world · ~20 min walk
        </p>
        <h2 className="font-display text-4xl">Шаг</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Point. Ask. Get corrected live — tutor in your pocket.
        </p>
      </header>

      <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--ink)]">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`aspect-[4/3] w-full object-cover ${camOn ? "opacity-100" : "absolute opacity-0"}`}
        />
        {!camOn && (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-[linear-gradient(145deg,#2a221c,#141210)] px-6 text-center">
            <p className="font-display text-3xl text-[var(--fg)]">Камера</p>
            <p className="max-w-xs text-sm text-[var(--muted)]">
              Turn it on when you walk. Name colors, walls, cars, animals —{" "}
              {TUTORS[profile.tutor].name} answers in Russian.
            </p>
            <button
              type="button"
              onClick={() => void enableCam()}
              className="pill pill-fill mt-2"
            >
              Enable camera
            </button>
            {camError && <p className="text-xs text-[var(--faint)]">{camError}</p>}
          </div>
        )}
        {camOn && (
          <button
            type="button"
            onClick={() => {
              streamRef.current?.getTracks().forEach((t) => t.stop());
              setCamOn(false);
            }}
            className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white"
          >
            Stop cam
          </button>
        )}
      </div>

      {labels.length > 0 && (
        <div className="h-rail">
          {labels.map((l) => (
            <button
              key={l}
              type="button"
              className="h-card pill text-sm"
              onClick={() => void send(`Это ${l}?`)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "bubble-user" : "bubble-tutor"}
          >
            <p className={m.role === "tutor" ? "ru-line text-lg" : "text-sm"}>
              {m.text}
            </p>
            {m.correction && (
              <p className="mt-1 text-sm text-[var(--primary)]">→ {m.correction}</p>
            )}
            {m.translation && (
              <p className="mt-1 text-xs text-[var(--muted)]">{m.translation}</p>
            )}
          </div>
        ))}
        {busy && (
          <div className="wave">
            <i /><i /><i /><i /><i />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Что это? / Это зелёная стена…"
          className="input-dark h-14 flex-1 rounded-full px-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") void send(draft);
          }}
        />
        <button
          type="button"
          onClick={toggleListen}
          className={`h-14 w-14 rounded-full ${listening ? "mic-live bg-[var(--primary)]" : "bg-[var(--fg)]"} text-[var(--ink)]`}
        >
          ●
        </button>
        <button
          type="button"
          onClick={() => void send(draft)}
          className="pill pill-fill h-14 px-5"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
