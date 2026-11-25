"use client";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
  step: "hear" | "see" | "say";
  onStep: (s: "hear" | "see" | "say") => void;
};

export function SestScreen({ posture, onPosture, step, onStep }: Props) {
  return (
    <div className="phone">
      <div className="top">
        <span className="brand">ВЖИВУЮ</span>
        <span className="dot" aria-hidden />
      </div>

      <div className="stage">
        <p className="kicker">Сесть · 1</p>
        <div className="gap-18" />
        <p className="line-her">Мне, пожалуйста, воду.</p>

        <div className="gap-18" />
        <hr className="hair" />
        <div className="gap-18" />

        <p className="bend-row">
          вода → вод<span className="bend-red">у</span>
        </p>
        <div className="gap-14" />
        <p className="line-help">Слышишь окончание. Только оно изменилось.</p>
        <div className="gap-14" />
        <button type="button" className="text-btn">
          ещё раз
        </button>

        <div className="gap-22" />
        <p className="say-label">Скажи</p>
        <div className="gap-8" />
        <p className="say-prompt">I want water.</p>

        <div className="gap-18" />
        <div className="steps">
          <button type="button" data-on={step === "hear"} onClick={() => onStep("hear")}>
            Слышать
          </button>
          <button type="button" data-on={step === "see"} onClick={() => onStep("see")}>
            Видеть
          </button>
          <button type="button" data-on={step === "say"} onClick={() => onStep("say")}>
            Сказать
          </button>
        </div>
      </div>

      <div className="bottom">
        <button type="button" className="speak-bar">
          <span>Говори</span>
          <span className="dot" aria-hidden />
        </button>
        <div className="postures">
          <button
            type="button"
            data-on={posture === "govorit"}
            onClick={() => onPosture("govorit")}
          >
            Говорить
          </button>
          <button
            type="button"
            data-on={posture === "sest"}
            onClick={() => onPosture("sest")}
          >
            Сесть
          </button>
          <button
            type="button"
            data-on={posture === "idti"}
            onClick={() => onPosture("idti")}
          >
            Идти
          </button>
        </div>
      </div>
    </div>
  );
}
