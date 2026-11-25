export type TutorId = "ara" | "lev";
export type HelpLang = "en" | "de";
export type NoteKind = "word" | "grammar" | "usecase" | "phrase";
export type AppMode = "home" | "speak" | "walk" | "drill" | "notebook" | "path";

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
  frequency: number; // 1 = most useful for Moscow trip
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
  source: "manual" | "speak" | "drill" | "walk" | "path";
  meta?: Record<string, string>;
};

export type Profile = {
  name: string;
  genderPast: "был" | "была";
  tutor: TutorId;
  helpLang: HelpLang;
  landOn: string; // ISO date
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

export type DrillProgress = {
  seen: Record<string, number>;
  correct: Record<string, number>;
  lastSeen: Record<string, number>;
};
