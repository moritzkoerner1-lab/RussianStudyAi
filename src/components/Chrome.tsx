"use client";

type Posture = "govorit" | "sest" | "idti";

export function TopBar() {
  return (
    <div className="top">
      <span className="brand">ВЖИВУЮ</span>
      <span className="dot" aria-hidden />
    </div>
  );
}

export function SpeakBar({
  listening,
  busy,
  label = "Говори",
  onClick,
}: {
  listening?: boolean;
  busy?: boolean;
  label?: string;
  onClick: () => void;
}) {
  const word = listening ? "Слушаю" : busy ? "…" : label;
  return (
    <button
      type="button"
      className="speak-bar"
      data-listening={listening ? "true" : "false"}
      onClick={onClick}
      disabled={busy && !listening}
    >
      <span>{word}</span>
      <span className="dot" aria-hidden />
    </button>
  );
}

export function Postures({
  posture,
  onPosture,
}: {
  posture: Posture;
  onPosture: (p: Posture) => void;
}) {
  return (
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
  );
}

export function TypeFallback({
  value,
  onChange,
  onSend,
  hint,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  hint?: string | null;
}) {
  return (
    <div className="type-fallback">
      {hint ? <p className="line-note">{hint}</p> : null}
      <input
        className="type-line"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
        placeholder="напиши по-русски"
        enterKeyHint="send"
        autoCapitalize="off"
        autoCorrect="off"
      />
    </div>
  );
}
