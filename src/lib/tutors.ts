import type { HelpLang } from "./types";

export const ARA = {
  id: "ara" as const,
  name: "Ara",
  nameRu: "Ара",
  voiceHint: "warm, brief Moscow female — close native teacher",
};

export function araSystemPrompt(
  helpLang: HelpLang,
  learnerName: string,
  genderPast: "был" | "была",
  ownedHint?: string,
): string {
  const help =
    helpLang === "de"
      ? "HELP line only when truly needed — one short German sentence."
      : "HELP line only when truly needed — one short English sentence.";

  return [
    `You are Ара (Ara): a close native Russian teacher in Moscow who remembers yesterday.`,
    `Warm. Brief. You speak Russian first. You are the only tutor.`,
    `Learner: ${learnerName || "друг"}. Past gender form: ${genderPast}.`,
    `Items they own (heard/mastered) — prefer these; do not invent new lemmas they have not heard, except the tiny survival set (здравствуйте, спасибо, пожалуйста, извините, да, нет, медленнее, не понимаю):`,
    ownedHint || "(survival set only)",
    `Persona rules:`,
    `- Never praise a mistake.`,
    `- One miss → give the right Moscow line → one retry. Then continue.`,
    `- If their line is understandable but not what Moscow says, say the native line aloud (do not celebrate the near-miss).`,
    `- If native: answer «Да.» and continue.`,
    `- No lesson gates. No menus. Stay in one conversation.`,
    `- If they say «покажи» / «show me», attach SEE for the last bend.`,
    help,
    `Response format (strict):`,
    `1) Short Russian (1–2 lines).`,
    `2) Optional NATIVE: <exact Moscow line to say>`,
    `3) Optional SEE: <stressed bend> || <full audio line> || <optional one help-language sentence>`,
    `   Stress with combining acute (́) on the stressed vowel, e.g. спаси́бо, пожа́луйста.`,
    `4) Optional HELP: <one short tip> — only if stuck.`,
    `Keep it spoken, not textbook.`,
  ].join("\n");
}

export type AraTurn = {
  reply: string;
  native?: string;
  see?: { bend: string; audio: string; gloss?: string };
  help?: string;
};

export function mockAraReply(
  userText: string,
  helpLang: HelpLang,
  ownedOpening?: { reply: string; see: { bend: string; audio: string; gloss?: string } },
): AraTurn {
  const raw = userText.trim();
  const lower = raw.toLowerCase();

  if (!raw && ownedOpening) {
    return { reply: ownedOpening.reply, see: ownedOpening.see };
  }

  if (/покажи|show me|zeig/i.test(lower)) {
    return {
      reply: "Вот.",
      see: {
        bend: "пожа́луйста",
        audio: "Пожа́луйста.",
        gloss: helpLang === "de" ? "Bitte." : "Please / you're welcome.",
      },
    };
  }

  if (/здравств/i.test(lower)) {
    return {
      reply: "Здра́вствуйте. Как вас зову́т?",
      see: {
        bend: "зову́т",
        audio: "Как вас зову́т?",
        gloss: helpLang === "de" ? "Wie heißen Sie?" : undefined,
      },
    };
  }

  if (/меня зовут|зовут/i.test(lower)) {
    return {
      reply: "Да. О́чень прия́тно.",
      see: {
        bend: "прия́тно",
        audio: "О́чень прия́тно.",
      },
    };
  }

  if (/[a-z]/i.test(raw) && !/[а-яё]/i.test(raw)) {
    return {
      reply: "По-ру́сски. Ещё раз.",
      native: "По-ру́сски, пожа́луйста.",
      help: helpLang === "de" ? "Auf Russisch bitte." : "In Russian, please.",
      see: {
        bend: "по-ру́сски",
        audio: "По-ру́сски, пожа́луйста.",
        gloss: helpLang === "de" ? "Auf Russisch bitte." : "In Russian, please.",
      },
    };
  }

  // Accusative: вода → воду (JS \b is Latin-only — use Cyrillic edges)
  if (/(^|[^а-яё])вода([^а-яё]|$)/i.test(lower) && !/(^|[^а-яё])воду([^а-яё]|$)/i.test(lower)) {
    return {
      reply: "Воду.",
      native: "Мне, пожалуйста, воду.",
      help:
        helpLang === "de"
          ? "Wenn du bestellst, wird вода zu воду."
          : "When you ask, вода becomes воду.",
      see: {
        bend: "вода → воду",
        audio: "Мне, пожалуйста, воду.",
        gloss:
          helpLang === "de"
            ? "In Moskau sagt man es so."
            : "В Москве чаще говорят так.",
      },
    };
  }

  if (/(^|[^а-яё])воду([^а-яё]|$)/i.test(lower) || /мне,?\s*пожалуйста,?\s*воду/i.test(lower)) {
    return {
      reply: "Да. Ещё что-нибудь?",
      see: {
        bend: "воду",
        audio: "Ещё что-нибудь?",
      },
    };
  }

  if (/кафе|где\s+сейчас|(^|[^а-яё])я\s+в([^а-яё]|$)/i.test(lower)) {
    return {
      reply: "Хорошо. Что хочешь?",
      native: "Что вы хотите?",
      see: {
        bend: "хоти́те",
        audio: "Что вы хотите?",
        gloss: helpLang === "de" ? "Was möchten Sie?" : "What do you want?",
      },
    };
  }

  if (/спасибо|благодар/i.test(lower)) {
    return {
      reply: "Пожа́луйста.",
      see: {
        bend: "пожа́луйста",
        audio: "Пожа́луйста.",
      },
    };
  }

  if (/^(да|нет)([!.]?)$/i.test(lower)) {
    return { reply: "Хорошо." };
  }

  // Soft path only when they already sound complete (not a known miss)
  if (
    /[а-яё]{3,}/i.test(raw) &&
    raw.length < 28 &&
    !/я\s+хочу/i.test(lower)
  ) {
    return { reply: "Да." };
  }

  return {
    reply: "Ещё раз, чуть ме́дленнее.",
    help: helpLang === "de" ? "Noch einmal, etwas langsamer." : "Once more, a bit slower.",
    see: {
      bend: "ме́дленнее",
      audio: "Говори́те ме́дленнее.",
      gloss: helpLang === "de" ? "Sprechen Sie langsamer." : "Speak more slowly.",
    },
  };
}

/** @deprecated — keep import paths compiling during migration */
export const TUTORS = {
  ara: { ...ARA, blurb: "", blurbDe: "", accent: "#7a1b28" },
  lev: {
    id: "lev" as const,
    name: "Lev",
    nameRu: "Лев",
    voiceHint: "",
    blurb: "",
    blurbDe: "",
    accent: "#7a1b28",
  },
};

export function tutorSystemPrompt(
  _tutor: "ara" | "lev",
  helpLang: HelpLang,
  learnerName: string,
  genderPast: "был" | "была",
  _mode: "speak" | "walk" | "lesson",
  lessonHint?: string,
) {
  return araSystemPrompt(helpLang, learnerName, genderPast, lessonHint);
}

export type MockTurn = AraTurn & { correction?: string };

export function mockTutorReply(
  userText: string,
  _tutor: "ara" | "lev",
  helpLang: HelpLang,
  mode?: "speak" | "walk" | "lesson",
): MockTurn {
  void mode;
  const t = mockAraReply(userText, helpLang);
  return { ...t, correction: t.native };
}
