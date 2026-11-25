"use client";

import { useEffect } from "react";
import { BendLine, parseBend } from "@/lib/bend";
import { speakRu } from "@/lib/speech";
import type { AraThreadApi } from "@/hooks/useAraThread";
import { Postures, SpeakBar, TopBar, TypeFallback } from "@/components/Chrome";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
  step: "hear" | "see" | "say";
  onStep: (s: "hear" | "see" | "say") => void;
  thread: AraThreadApi;
  drillIndex: number;
};

export function SestScreen({
  posture,
  onPosture,
  step,
  onStep,
  thread,
  drillIndex,
}: Props) {
  const {
    lastAra,
    draft,
    setDraft,
    listening,
    busy,
    micError,
    typing,
    setTyping,
    toggleListen,
    send,
  } = thread;

  const line = lastAra?.native || lastAra?.text || "Мне, пожалуйста, воду.";
  const see = lastAra?.see || {
    bend: "вода → воду",
    audio: line,
    gloss: "Слышишь окончание. Только оно изменилось.",
  };
  const bendParts = parseBend(see.bend);
  const prompt =
    lastAra?.help && /want|möchten|вода|воду/i.test(lastAra.help)
      ? "I want water."
      : see.gloss && /^[A-Za-zÄÖÜäöüß]/.test(see.gloss)
        ? see.gloss
        : "I want water.";

  useEffect(() => {
    if (step === "hear") void speakRu(see.audio || line);
  }, [step, see.audio, line]);

  return (
    <div className="phone">
      <TopBar />

      <div className="stage">
        <p className="kicker">Сесть · {drillIndex}</p>
        <div className="gap-18" />
        <p className="line-her">{line}</p>

        {(step === "see" || step === "hear" || step === "say") && (
          <>
            <div className="gap-18" />
            <hr className="hair" />
            <div className="gap-18" />
            <BendLine from={bendParts.from} to={bendParts.to} bend={see.bend} />
            <div className="gap-14" />
            <p className="line-help">
              Слышишь окончание. Только оно изменилось.
            </p>
            <div className="gap-14" />
            <button
              type="button"
              className="text-btn"
              onClick={() => void speakRu(see.audio || line)}
            >
              ещё раз
            </button>
          </>
        )}

        {step === "say" || step === "see" ? (
          <>
            <div className="gap-22" />
            <p className="say-label">Скажи</p>
            <div className="gap-8" />
            <p className="say-prompt">{prompt}</p>
          </>
        ) : null}

        <div className="gap-18" />
        <div className="steps">
          <button
            type="button"
            data-on={step === "hear"}
            onClick={() => onStep("hear")}
          >
            Слышать
          </button>
          <button
            type="button"
            data-on={step === "see"}
            onClick={() => onStep("see")}
          >
            Видеть
          </button>
          <button
            type="button"
            data-on={step === "say"}
            onClick={() => onStep("say")}
          >
            Сказать
          </button>
        </div>
      </div>

      <div className="bottom">
        {(typing || micError) && (
          <TypeFallback
            value={draft}
            onChange={setDraft}
            onSend={() => {
              void send(draft);
              setTyping(false);
            }}
            hint={micError}
          />
        )}
        <SpeakBar listening={listening} busy={busy} onClick={toggleListen} />
        <Postures posture={posture} onPosture={onPosture} />
      </div>
    </div>
  );
}
