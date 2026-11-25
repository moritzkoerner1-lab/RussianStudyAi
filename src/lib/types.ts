export type TutorId = "ara" | "lev";
export type HelpLang = "en" | "de";
export type NoteKind = "word" | "grammar" | "usecase" | "phrase";

/** Three surfaces only — smartphone shell */
export type ShellTab = "talk" | "lessons" | "grind";

/** Modes inside Talk — not separate pages */
export type TalkChannel = "chat" | "overhear" | "walk";

export type Chunk = {
  id: string;
  ru: string;
  en: string;
  de: string;
  gloss?: string;
  tags: string[];
  day?: number;
};

export type VocabItem = {
  id: string;
  lemma: string;
  ipa?: string;
  en: string;
  de: string;
  gender?: "m" | "f" | "n" | "pl";
  pos: "noun" | "verb" | "adj" | "adv" | "phrase" | "other";
  sentences: { ru: string; en: string; de: string }[];
  frequency: number;
  domains: string[];
};

export type DayPlan = {
  day: number;
  titleRu: string;
  titleEn: string;
  mission: string;
  imageHint: string;
  chunkIds: string[];
  speakPrompt: string;
};

export type NotebookEntry = {
  id: string;
  text: string;
  note?: string;
  kind: NoteKind;
  createdAt: number;
  source: "manual" | "speak" | "drill" | "walk" | "path" | "grind";
  meta?: Record<string, string>;
};

export type Profile = {
  name: string;
  genderPast: "был" | "была";
  tutor: TutorId;
  helpLang: HelpLang;
  landOn: string;
  startedOn: string;
};

export type TutorMessage = {
  id: string;
  role: "user" | "tutor" | "system";
  text: string;
  correction?: string;
  translation?: string;
  at: number;
};

export type GrindProgress = {
  seen: Record<string, number>;
  correct: Record<string, number>;
  lastSeen: Record<string, number>;
  /** lemmas marked solid after enough correct recalls */
  mastered: Record<string, boolean>;
  sessionBest: number;
  totalCorrect: number;
};

/** @deprecated alias — keep old key readable */
export type DrillProgress = GrindProgress;
