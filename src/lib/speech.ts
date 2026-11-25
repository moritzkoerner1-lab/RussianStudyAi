"use client";

export function speakRu(text: string, rate = 0.92): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";
    u.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const ru = voices.find((v) => v.lang.startsWith("ru"));
    if (ru) u.voice = ru;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export type ListenHandle = {
  stop: () => void;
};

export function listenRu(
  onResult: (text: string, final: boolean) => void,
  onError?: (message: string) => void,
): ListenHandle | null {
  const SR =
    typeof window !== "undefined"
      ? (window as unknown as { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition
      : undefined;

  if (!SR) {
    onError?.("Speech recognition needs Chrome/Edge on this device.");
    return null;
  }

  const rec = new SR();
  rec.lang = "ru-RU";
  rec.interimResults = true;
  rec.continuous = false;

  rec.onresult = (event: SpeechRecognitionEvent) => {
    let text = "";
    let final = false;
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
      if (event.results[i].isFinal) final = true;
    }
    onResult(text.trim(), final);
  };

  rec.onerror = () => onError?.("Mic error — check permissions.");
  rec.start();

  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    },
  };
}

// Minimal DOM speech types for TS without full lib.dom dependency quirks
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: { length: number; [i: number]: { isFinal: boolean; [j: number]: { transcript: string } } };
}
