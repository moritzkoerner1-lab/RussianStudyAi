import type { NoteKind } from "./types";

/** Lightweight typology for notebook entries — rule-first, API can refine. */
export function classifyLocal(text: string): NoteKind {
  const t = text.trim().toLowerCase();
  if (!t) return "word";

  const grammarHints =
    /падеж|склонен|спряжен|род|число|совершен|несовершен|глагол|прилагат|окончан|граммат|case|conjugat|aspect|gender|plural|dative|genitive|accusative|instrumental|prepositional|perfekt|aspekt/i;
  const usecaseHints =
    /когда|если|в такси|в метро|у бабушки|в кафе|в магазине|на улице|ситуац|use case|wenn|situation|scenario/i;

  if (grammarHints.test(t)) return "grammar";
  if (usecaseHints.test(t) || t.includes("—") || t.includes("→")) return "usecase";
  if (t.split(/\s+/).length >= 3 || /[.!?…]/.test(t)) return "phrase";
  return "word";
}
