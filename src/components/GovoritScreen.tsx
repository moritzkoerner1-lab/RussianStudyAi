"use client";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
};

export function GovoritScreen({ posture, onPosture }: Props) {
  return (
    <div className="phone">
      <div className="top">
        <span className="brand">ВЖИВУЮ</span>
        <span className="dot" aria-hidden />
      </div>

      <div className="stage">
        <p className="line-you">Ты где сейчас?</p>
        <div className="gap-8" />
        <p className="line-you">Я в кафе. Я хочу вода.</p>
        <div className="gap-14" />
        <p className="line-her">Воду.</p>
        <div className="gap-10" />
        <p className="line-help">When you ask, вода becomes воду.</p>

        <div className="gap-18" />
        <hr className="hair" />
        <div className="gap-18" />

        <p className="bend-row">
          вода → вод<span className="bend-red">у</span>
        </p>
        <div className="gap-14" />
        <p className="native-line">Мне, пожалуйста, воду.</p>
        <div className="gap-10" />
        <p className="line-note">В Москве чаще говорят так.</p>
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
