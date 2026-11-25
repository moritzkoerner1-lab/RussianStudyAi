"use client";

import type { AraThreadApi } from "@/hooks/useAraThread";
import { Postures, SpeakBar, TopBar, TypeFallback } from "@/components/Chrome";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
  thread: AraThreadApi;
};

/** Same chrome — walk tray later. Thread still lives here. */
export function IdtiScreen({ posture, onPosture, thread }: Props) {
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

  return (
    <div className="phone">
      <TopBar />

      <div className="stage">
        <p className="kicker">Идти</p>
        <div className="gap-18" />
        <p className="line-her">{lastAra?.text || "Пойдём."}</p>
        <div className="gap-10" />
        <p className="line-help">Камера — позже. Пока говори здесь.</p>
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
