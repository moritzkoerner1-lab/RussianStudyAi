"use client";

type Props = {
  posture: "govorit" | "sest" | "idti";
  onPosture: (p: "govorit" | "sest" | "idti") => void;
};

/** Same chrome only — content deferred. */
export function IdtiScreen({ posture, onPosture }: Props) {
  return (
    <div className="phone">
      <div className="top">
        <span className="brand">ВЖИВУЮ</span>
        <span className="dot" aria-hidden />
      </div>

      <div className="stage" />

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
