"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { loadProfile } from "@/lib/store";
import { listenRu, speakRu } from "@/lib/speech";
import { openingLine, ownedLines } from "@/lib/survival";
import {
  appendTurn,
  loadThread,
  patchLastAraSee,
  wantsSee,
  type ThreadTurn,
} from "@/lib/thread";

export function useAraThread() {
  const [turns, setTurns] = useState<ThreadTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const listenRef = useRef<ReturnType<typeof listenRu> | null>(null);
  const booted = useRef(false);
  const [, startTransition] = useTransition();

  const profile = loadProfile();

  useEffect(() => {
    setTurns(loadThread());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || booted.current) return;
    booted.current = true;

    const existing = loadThread();
    if (existing.length > 0) {
      const lastAra = [...existing].reverse().find((t) => t.role === "ara");
      if (lastAra) void speakRu(lastAra.native || lastAra.text);
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
    setMicError(null);

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
        bend: (lastAra?.see?.bend || bendSource.split(/\s+/)[0] || bendSource).slice(0, 48),
        audio: lastAra?.see?.audio || bendSource,
        gloss: lastAra?.see?.gloss,
      };
      next = patchLastAraSee(see);
      next = appendTurn({
        id: `ara_${Date.now()}`,
        role: "ara",
        text: "Вот.",
        at: Date.now(),
        see,
        native: lastAra?.native,
      });
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
        help: data.help,
      };
      const next = appendTurn(araTurn);
      startTransition(() => setTurns(next));
      void speakRu(data.native || data.reply);
    } finally {
      setBusy(false);
    }
  }

  function stopListen() {
    listenRef.current?.stop();
    listenRef.current = null;
    setListening(false);
  }

  function toggleListen() {
    if (listening) {
      stopListen();
      return;
    }
    setMicError(null);
    setListening(true);
    const handle = listenRu(
      (text, final) => {
        setDraft(text);
        if (final) {
          stopListen();
          void send(text);
        }
      },
      (message) => {
        stopListen();
        setMicError(message);
        setTyping(true);
      },
    );
    if (!handle) {
      setListening(false);
      setTyping(true);
      setMicError("Mic unavailable — type below.");
    } else {
      listenRef.current = handle;
    }
  }

  const lastAra = [...turns].reverse().find((t) => t.role === "ara");
  const recent = turns.slice(-6);

  return {
    ready,
    turns,
    recent,
    lastAra,
    draft,
    setDraft,
    listening,
    busy,
    micError,
    typing,
    setTyping,
    toggleListen,
    stopListen,
    send,
  };
}

export type AraThreadApi = ReturnType<typeof useAraThread>;
