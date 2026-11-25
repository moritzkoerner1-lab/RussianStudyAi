import { GRIND_POOL, lemmaById } from "./grindCatalog";
import { loadGrind } from "./store";
import type { HelpLang } from "./types";

/** Tiny set Ara may use when the learner owns nothing yet. */
export const SURVIVAL = [
  {
    lemma: "здравствуйте",
    bend: "здра́вствуйте",
    ru: "Здра́вствуйте!",
    en: "Hello. (formal)",
    de: "Guten Tag.",
  },
  {
    lemma: "спасибо",
    bend: "спаси́бо",
    ru: "Спаси́бо.",
    en: "Thank you.",
    de: "Danke.",
  },
  {
    lemma: "пожалуйста",
    bend: "пожа́луйста",
    ru: "Пожа́луйста.",
    en: "Please / you're welcome.",
    de: "Bitte.",
  },
  {
    lemma: "извините",
    bend: "извини́те",
    ru: "Извини́те.",
    en: "Excuse me / sorry.",
    de: "Entschuldigung.",
  },
  {
    lemma: "да",
    bend: "да",
    ru: "Да.",
    en: "Yes.",
    de: "Ja.",
  },
  {
    lemma: "нет",
    bend: "нет",
    ru: "Нет.",
    en: "No.",
    de: "Nein.",
  },
  {
    lemma: "медленно",
    bend: "ме́дленнее",
    ru: "Говори́те, пожа́луйста, ме́дленнее.",
    en: "Please speak more slowly.",
    de: "Sprechen Sie bitte langsamer.",
  },
  {
    lemma: "не понимаю",
    bend: "понима́ю",
    ru: "Я не понима́ю.",
    en: "I don't understand.",
    de: "Ich verstehe nicht.",
  },
] as const;

export type OwnedLine = {
  id: string;
  lemma: string;
  bend: string;
  ru: string;
  gloss: string;
  source: "owned" | "survival";
};

/** Stress mark helper: put acute on first vowel if none present. */
export function markStress(ru: string): string {
  if (/[аеёиоуыэюя]\u0301|[́]/.test(ru) || /[аеёиоуыэюя]́/i.test(ru)) return ru;
  // Prefer precomposed forms already in survival; else accent first vowel
  return ru.replace(/[АЕЁИОУЫЭЮЯаеёиоуыэюя]/, (ch) => `${ch}\u0301`);
}

export function ownedLines(helpLang: HelpLang): OwnedLine[] {
  const grind = loadGrind();
  const ownedIds = Object.keys(grind.mastered).filter((id) => grind.mastered[id]);
  // Also treat frequently correct items as owned enough to speak from
  const strong = Object.keys(grind.correct).filter(
    (id) => (grind.correct[id] || 0) >= 2 && !ownedIds.includes(id),
  );
  const ids = [...new Set([...ownedIds, ...strong])];

  const fromGrind: OwnedLine[] = ids
    .map((id) => {
      const v = lemmaById(id) || GRIND_POOL.find((x) => x.id === id);
      if (!v) return null;
      const s = v.sentences[0];
      return {
        id: v.id,
        lemma: v.lemma,
        bend: markStress(v.lemma),
        ru: markStress(s.ru),
        gloss: helpLang === "de" ? s.de : s.en,
        source: "owned" as const,
      };
    })
    .filter(Boolean) as OwnedLine[];

  if (fromGrind.length > 0) return fromGrind;

  return SURVIVAL.map((s, i) => ({
    id: `surv_${i}`,
    lemma: s.lemma,
    bend: s.bend,
    ru: s.ru,
    gloss: helpLang === "de" ? s.de : s.en,
    source: "survival" as const,
  }));
}

export function openingLine(helpLang: HelpLang, learnerName: string): {
  reply: string;
  see: { bend: string; audio: string; gloss?: string };
} {
  const lines = ownedLines(helpLang);
  const pick = lines[Math.floor(Math.random() * Math.min(lines.length, 4))] || lines[0];
  const name = learnerName?.trim();
  const hello = name ? `Здра́вствуйте, ${name}.` : "Здра́вствуйте.";
  const fromOwned = pick.source === "owned";
  const reply = fromOwned
    ? `${hello} Дава́йте. Скажи́те: «${pick.ru.replace(/\.$/, "")}».`
    : `${hello} Я А́ра. Скажи́те: «${pick.ru.replace(/\.$/, "")}».`;

  return {
    reply,
    see: {
      bend: pick.bend,
      audio: pick.ru,
      // Survival: show gloss once so they can start; owned: omit unless needed
      gloss: fromOwned ? undefined : pick.gloss,
    },
  };
}
