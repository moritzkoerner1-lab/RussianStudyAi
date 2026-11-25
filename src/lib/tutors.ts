import type { HelpLang, TutorId } from "./types";

export const TUTORS: Record<
  TutorId,
  {
    id: TutorId;
    name: string;
    nameRu: string;
    voiceHint: string;
    blurb: string;
    blurbDe: string;
    accent: string;
  }
> = {
  ara: {
    id: "ara",
    name: "Ara",
    nameRu: "Ара",
    voiceHint: "warm, clear Moscow female",
    blurb: "Warm native tutor. Corrects gently, keeps you talking.",
    blurbDe: "Warme Muttersprachlerin. Korrigiert sanft, hält dich im Gespräch.",
    accent: "#C41E3A",
  },
  lev: {
    id: "lev",
    name: "Lev",
    nameRu: "Лев",
    voiceHint: "calm, precise Moscow male",
    blurb: "Calm native tutor. Precise fixes, then back to the line.",
    blurbDe: "Ruhiger Muttersprachler. Präzise Korrektur, dann zurück zur Linie.",
    accent: "#1F4E79",
  },
};

export function tutorSystemPrompt(
  tutor: TutorId,
  helpLang: HelpLang,
  learnerName: string,
  genderPast: "был" | "была",
  mode: "speak" | "walk" | "lesson",
  lessonHint?: string,
): string {
  const t = TUTORS[tutor];
  const help =
    helpLang === "de"
      ? "When the learner is stuck, briefly help in German, then return to Russian."
      : "When the learner is stuck, briefly help in English, then return to Russian.";

  return [
    `You are ${t.name} (${t.nameRu}), a native Russian-speaking tutor from Moscow.`,
    `Voice: ${t.voiceHint}. Speak mostly in Russian. Sound natural, not textbook.`,
    `Learner name: ${learnerName || "друг"}. Past tense gender form they use: ${genderPast}.`,
    `Mission: get them conversational for Moscow in ~2 weeks — taxi, food, metro, grandma talks, daily errands.`,
    `Method: volume of usable lines. Prefer short exchanges. Correct errors immediately with the right line, then continue.`,
    `Never dump grammar lectures. Embed grammar inside the correct sentence.`,
    help,
    `Response format (strict):`,
    `1) One short Russian reply the learner should hear/say next (or a correction).`,
    `2) If you corrected them, include CORRECT: <right Russian line>`,
    `3) Optionally HELP: <one short ${helpLang === "de" ? "German" : "English"} tip>`,
    `Keep each turn under 3 short lines of Russian.`,
    mode === "walk"
      ? "Mode: WALK. The learner may describe what they see or ask what something is. Name objects, colors, actions in Russian. If a photo description is given, ground your Russian in what is visible."
      : mode === "lesson"
        ? `Mode: LESSON. Focus: ${lessonHint || "today's Moscow lines"}. Drill the lines out loud. Push retrieval, not reading.`
        : "Mode: FREE SPEAK. Hold a living conversation. Steer toward situations they will face in Moscow.",
  ].join("\n");
}

export type MockTurn = {
  reply: string;
  correction?: string;
  help?: string;
};

/** Offline demo tutor so training works before OPENAI_API_KEY is bound. */
export function mockTutorReply(
  userText: string,
  tutor: TutorId,
  helpLang: HelpLang,
  mode: "speak" | "walk" | "lesson",
): MockTurn {
  const name = TUTORS[tutor].nameRu;
  const raw = userText.trim();
  const lower = raw.toLowerCase();

  if (!raw) {
    return {
      reply: mode === "walk" ? "Что вы видите? Скажите по-русски." : "Здравствуйте! Как вас зовут?",
      help: helpLang === "de" ? "Sag deinen Namen auf Russisch." : "Say your name in Russian.",
    };
  }

  // Soft corrections for common beginner patterns
  if (/меня зовут/i.test(raw) && !/меня зовут /.test(raw)) {
    return {
      reply: "Отлично. Очень приятно!",
      correction: "Меня зовут …",
    };
  }

  if (/привет/i.test(lower) && mode !== "walk") {
    return {
      reply: `Здравствуйте! Я ${name}. Как дела?`,
      help: helpLang === "de" ? "Antworte: Хорошо, спасибо." : "Answer: Хорошо, спасибо.",
    };
  }

  if (/где|what is|was ist|это/i.test(lower) || mode === "walk") {
    if (/стен|wall|wand/i.test(lower)) {
      return {
        reply: "Это стена. Какого она цвета?",
        help: helpLang === "de" ? "Farbe: зелёная / синяя / белая…" : "Color: зелёная / синяя / белая…",
      };
    }
    if (/машин|car|auto/i.test(lower)) {
      return {
        reply: "Это машина. Она большая или маленькая?",
      };
    }
    if (/дерев|tree|baum/i.test(lower)) {
      return {
        reply: "Это дерево. Красивое дерево!",
      };
    }
    return {
      reply: "Хорошо. Скажите: «Это …» и название.",
      help:
        helpLang === "de"
          ? "Muster: Это зелёная стена."
          : "Pattern: Это зелёная стена.",
    };
  }

  if (/такси|арбат|метро|борщ|бабушк/i.test(lower)) {
    return {
      reply: "Хорошо, продолжайте. Говорите полными фразами.",
      help:
        helpLang === "de"
          ? "Versuch einen ganzen Satz, nicht nur ein Wort."
          : "Try a full sentence, not just one word.",
    };
  }

  // Generic gentle correction path: echo a cleaner line if Latin-heavy
  if (/[a-z]/i.test(raw) && !/[а-яё]/i.test(raw)) {
    return {
      reply: "По-русски, пожалуйста. Я помогу.",
      help:
        helpLang === "de"
          ? "Versuch es auf Russisch — ich helfe."
          : "Try it in Russian — I'll help.",
    };
  }

  return {
    reply: "Хорошо. Ещё раз, чуть медленнее… Теперь ваш ход: спросите что-нибудь.",
    help:
      helpLang === "de"
        ? "Frag etwas: Где метро? Сколько стоит?"
        : "Ask something: Где метро? Сколько стоит?",
  };
}
