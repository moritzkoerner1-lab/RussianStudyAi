"use client";

import { BendLine, parseBend } from "@/lib/bend";
import type { AraThreadApi } from "@/hooks/useAraThread";
import { Postures, SpeakBar, TopBar, TypeFallback } from "@/components/Chrome";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
  thread: AraThreadApi;
};

export function GovoritScreen({ posture, onPosture, thread }: Props) {
  const {
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
    send,
  } = thread;

  const see = lastAra?.see;
  const bendParts = parseBend(see?.bend);
  const showSee = Boolean(see?.bend || lastAra?.native);

  return (
    <div className="phone">
      <TopBar />

      <div className="stage">
        {recent.map((t) =>
          t.role === "user" ? (
            <div key={t.id}>
              <p className="line-you">{t.text}</p>
              <div className="gap-8" />
            </div>
          ) : (
            <div key={t.id}>
              <p className="line-her">{t.text}</p>
              {t.help ? (
                <>
                  <div className="gap-10" />
                  <p className="line-help">{t.help}</p>
                </>
              ) : null}
              <div className="gap-14" />
            </div>
          ),
        )}

        {draft && listening ? (
          <>
            <p className="line-you draft">{draft}</p>
            <div className="gap-14" />
          </>
        ) : null}

        {showSee ? (
          <>
            <hr className="hair" />
            <div className="gap-18" />
            <BendLine from={bendParts.from} to={bendParts.to} bend={see?.bend} />
            {lastAra?.native ? (
              <>
                <div className="gap-14" />
                <p className="native-line">{lastAra.native}</p>
              </>
            ) : null}
            {see?.gloss ? (
              <>
                <div className="gap-10" />
                <p className="line-note">{see.gloss}</p>
              </>
            ) : null}
          </>
        ) : null}
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
        {!typing && !micError ? (
          <button
            type="button"
            className="type-toggle"
            onClick={() => setTyping(true)}
          >
            писать
          </button>
        ) : null}
        <Postures posture={posture} onPosture={onPosture} />
      </div>
    </div>
  );
}
