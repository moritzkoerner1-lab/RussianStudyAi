import { VOCAB } from "./curriculum";
import { SOCIAL_VOCAB } from "./social";
import type { VocabItem } from "./types";

/** Extra high-utility items for 100–200 word lock-in sessions */
const EXTRA: VocabItem[] = [
  { id: "x1", lemma: "потому что", en: "because", de: "weil", pos: "phrase", frequency: 1, domains: ["core"], sentences: [{ ru: "Я устал, потому что мало спал.", en: "I'm tired because I slept little. (m)", de: "Ich bin müde, weil ich wenig geschlafen habe." }] },
  { id: "x2", lemma: "поэтому", en: "therefore / so", de: "deshalb", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Поэтому я опаздываю.", en: "That's why I'm late.", de: "Deshalb komme ich zu spät." }] },
  { id: "x3", lemma: "хотя", en: "although", de: "obwohl", pos: "adv", frequency: 2, domains: ["core"], sentences: [{ ru: "Хотя холодно, я иду.", en: "Although it's cold, I'm going.", de: "Obwohl es kalt ist, gehe ich." }] },
  { id: "x4", lemma: "уже", en: "already", de: "schon", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Я уже дома.", en: "I'm already home.", de: "Ich bin schon zu Hause." }] },
  { id: "x5", lemma: "ещё", en: "still / yet / more", de: "noch", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Ещё одну минуту.", en: "One more minute.", de: "Noch eine Minute." }] },
  { id: "x6", lemma: "только", en: "only", de: "nur", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Только сегодня.", en: "Only today.", de: "Nur heute." }] },
  { id: "x7", lemma: "тоже", en: "also / too", de: "auch", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Я тоже хочу.", en: "I want that too.", de: "Ich will auch." }] },
  { id: "x8", lemma: "очень", en: "very", de: "sehr", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Очень хорошо.", en: "Very good.", de: "Sehr gut." }] },
  { id: "x9", lemma: "хорошо", en: "good / well", de: "gut", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Всё хорошо.", en: "Everything's fine.", de: "Alles gut." }] },
  { id: "x10", lemma: "плохо", en: "badly / poorly", de: "schlecht", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Я плохо понимаю.", en: "I understand poorly.", de: "Ich verstehe schlecht." }] },
  { id: "x11", lemma: "быстро", en: "fast / quickly", de: "schnell", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Говорите не так быстро.", en: "Don't speak so fast.", de: "Sprechen Sie nicht so schnell." }] },
  { id: "x12", lemma: "медленно", en: "slowly", de: "langsam", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Говорите медленно.", en: "Speak slowly.", de: "Sprechen Sie langsam." }] },
  { id: "x13", lemma: "сейчас", en: "now", de: "jetzt", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Сейчас неудобно.", en: "Now is inconvenient.", de: "Jetzt ist ungünstig." }] },
  { id: "x14", lemma: "потом", en: "then / later", de: "dann / später", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Потом объясню.", en: "I'll explain later.", de: "Erklär ich später." }] },
  { id: "x15", lemma: "всегда", en: "always", de: "immer", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Я всегда рад вас видеть.", en: "I'm always glad to see you. (m)", de: "Ich freue mich immer, Sie zu sehen." }] },
  { id: "x16", lemma: "никогда", en: "never", de: "nie", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Я никогда не был в Москве.", en: "I've never been to Moscow. (m)", de: "Ich war nie in Moskau." }] },
  { id: "x17", lemma: "часто", en: "often", de: "oft", pos: "adv", frequency: 2, domains: ["time"], sentences: [{ ru: "Я часто хожу пешком.", en: "I often walk.", de: "Ich gehe oft zu Fuß." }] },
  { id: "x18", lemma: "иногда", en: "sometimes", de: "manchmal", pos: "adv", frequency: 2, domains: ["time"], sentences: [{ ru: "Иногда я ошибаюсь.", en: "Sometimes I make mistakes.", de: "Manchmal irre ich mich." }] },
  { id: "x19", lemma: "дом", en: "home / house", de: "Haus / Zuhause", pos: "noun", gender: "m", frequency: 1, domains: ["home"], sentences: [{ ru: "Я иду домой.", en: "I'm going home.", de: "Ich gehe nach Hause." }] },
  { id: "x20", lemma: "работа", en: "work", de: "Arbeit", pos: "noun", gender: "f", frequency: 1, domains: ["social"], sentences: [{ ru: "После работы.", en: "After work.", de: "Nach der Arbeit." }] },
  { id: "x21", lemma: "друг", en: "friend", de: "Freund", pos: "noun", gender: "m", frequency: 1, domains: ["social"], sentences: [{ ru: "Мой друг живёт здесь.", en: "My friend lives here.", de: "Mein Freund wohnt hier." }] },
  { id: "x22", lemma: "девушка", en: "girl / girlfriend", de: "Mädchen / Freundin", pos: "noun", gender: "f", frequency: 1, domains: ["social"], sentences: [{ ru: "Моя девушка из Москвы.", en: "My girlfriend is from Moscow.", de: "Meine Freundin kommt aus Moskau." }] },
  { id: "x23", lemma: "люди", en: "people", de: "Leute", pos: "noun", gender: "pl", frequency: 1, domains: ["core"], sentences: [{ ru: "Много людей в метро.", en: "Many people in the metro.", de: "Viele Leute in der Metro." }] },
  { id: "x24", lemma: "город", en: "city", de: "Stadt", pos: "noun", gender: "m", frequency: 1, domains: ["directions"], sentences: [{ ru: "Москва — большой город.", en: "Moscow is a big city.", de: "Moskau ist eine große Stadt." }] },
  { id: "x25", lemma: "страна", en: "country", de: "Land", pos: "noun", gender: "f", frequency: 2, domains: ["core"], sentences: [{ ru: "Я люблю эту страну.", en: "I love this country.", de: "Ich liebe dieses Land." }] },
  { id: "x26", lemma: "язык", en: "language / tongue", de: "Sprache", pos: "noun", gender: "m", frequency: 1, domains: ["meta"], sentences: [{ ru: "Русский язык сложный.", en: "Russian is difficult.", de: "Russisch ist schwer." }] },
  { id: "x27", lemma: "слово", en: "word", de: "Wort", pos: "noun", gender: "n", frequency: 1, domains: ["meta"], sentences: [{ ru: "Я не знаю это слово.", en: "I don't know this word.", de: "Ich kenne dieses Wort nicht." }] },
  { id: "x28", lemma: "вопрос", en: "question", de: "Frage", pos: "noun", gender: "m", frequency: 1, domains: ["meta"], sentences: [{ ru: "У меня вопрос.", en: "I have a question.", de: "Ich habe eine Frage." }] },
  { id: "x29", lemma: "ответ", en: "answer", de: "Antwort", pos: "noun", gender: "m", frequency: 2, domains: ["meta"], sentences: [{ ru: "Я не знаю ответ.", en: "I don't know the answer.", de: "Ich weiß die Antwort nicht." }] },
  { id: "x30", lemma: "думать", en: "to think", de: "denken", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Я думаю, да.", en: "I think so.", de: "Ich denke ja." }] },
  { id: "x31", lemma: "хотеть", en: "to want", de: "wollen", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Я хочу понять.", en: "I want to understand.", de: "Ich will verstehen." }] },
  { id: "x32", lemma: "мочь", en: "can / to be able", de: "können", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Я могу помочь.", en: "I can help.", de: "Ich kann helfen." }] },
  { id: "x33", lemma: "нужно", en: "need / necessary", de: "nötig", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Мне нужно время.", en: "I need time.", de: "Ich brauche Zeit." }] },
  { id: "x34", lemma: "любить", en: "to love / like", de: "lieben / mögen", pos: "verb", frequency: 1, domains: ["feel"], sentences: [{ ru: "Я люблю Москву.", en: "I love Moscow.", de: "Ich liebe Moskau." }] },
  { id: "x35", lemma: "нравиться", en: "to like (to be pleasing)", de: "gefallen", pos: "verb", frequency: 1, domains: ["feel"], sentences: [{ ru: "Мне нравится этот район.", en: "I like this neighborhood.", de: "Mir gefällt dieses Viertel." }] },
  { id: "x36", lemma: "жить", en: "to live", de: "leben / wohnen", pos: "verb", frequency: 1, domains: ["home"], sentences: [{ ru: "Где вы живёте?", en: "Where do you live?", de: "Wo wohnen Sie?" }] },
  { id: "x37", lemma: "работать", en: "to work", de: "arbeiten", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Я работаю из дома.", en: "I work from home.", de: "Ich arbeite von zu Hause." }] },
  { id: "x38", lemma: "учить", en: "to learn / teach", de: "lernen / unterrichten", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Я учу русский.", en: "I'm learning Russian.", de: "Ich lerne Russisch." }] },
  { id: "x39", lemma: "помнить", en: "to remember", de: "sich erinnern", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Я помню это слово.", en: "I remember this word.", de: "Ich erinnere mich an dieses Wort." }] },
  { id: "x40", lemma: "забыть", en: "to forget", de: "vergessen", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Я забыл.", en: "I forgot. (m)", de: "Ich habe vergessen." }] },
  { id: "x41", lemma: "спрашивать", en: "to ask", de: "fragen", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Можно спросить?", en: "May I ask?", de: "Darf ich fragen?" }] },
  { id: "x42", lemma: "отвечать", en: "to answer", de: "antworten", pos: "verb", frequency: 2, domains: ["meta"], sentences: [{ ru: "Ответьте, пожалуйста.", en: "Please answer.", de: "Antworten Sie bitte." }] },
  { id: "x43", lemma: "встречать", en: "to meet", de: "treffen", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Где встретимся?", en: "Where shall we meet?", de: "Wo treffen wir uns?" }] },
  { id: "x44", lemma: "позвать", en: "to call / invite", de: "rufen / einladen", pos: "verb", frequency: 2, domains: ["social"], sentences: [{ ru: "Позови меня.", en: "Call me / invite me. (ты)", de: "Ruf mich." }] },
  { id: "x45", lemma: "интересно", en: "interesting", de: "interessant", pos: "adv", frequency: 1, domains: ["feel"], sentences: [{ ru: "Это очень интересно.", en: "That's very interesting.", de: "Das ist sehr interessant." }] },
  { id: "x46", lemma: "важно", en: "important", de: "wichtig", pos: "adv", frequency: 1, domains: ["feel"], sentences: [{ ru: "Это важно для меня.", en: "This is important to me.", de: "Das ist mir wichtig." }] },
  { id: "x47", lemma: "понятно", en: "clear / got it", de: "klar / verstanden", pos: "adv", frequency: 1, domains: ["meta"], sentences: [{ ru: "Понятно. Спасибо.", en: "Got it. Thanks.", de: "Verstanden. Danke." }] },
  { id: "x48", lemma: "конечно", en: "of course", de: "natürlich", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Конечно, давай.", en: "Of course, let's.", de: "Natürlich, klar." }] },
  { id: "x49", lemma: "наверное", en: "probably", de: "wahrscheinlich", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Наверное, он дома.", en: "He's probably home.", de: "Wahrscheinlich ist er zu Hause." }] },
  { id: "x50", lemma: "может быть", en: "maybe", de: "vielleicht", pos: "phrase", frequency: 1, domains: ["social"], sentences: [{ ru: "Может быть завтра.", en: "Maybe tomorrow.", de: "Vielleicht morgen." }] },
  { id: "x51", lemma: "правда", en: "truth / really", de: "Wahrheit / wirklich", pos: "noun", gender: "f", frequency: 1, domains: ["social"], sentences: [{ ru: "Это правда?", en: "Is that true?", de: "Ist das wahr?" }] },
  { id: "x52", lemma: "жизнь", en: "life", de: "Leben", pos: "noun", gender: "f", frequency: 1, domains: ["feel"], sentences: [{ ru: "Расскажите о жизни.", en: "Tell me about life.", de: "Erzählen Sie vom Leben." }] },
  { id: "x53", lemma: "дело", en: "matter / business", de: "Sache / Angelegenheit", pos: "noun", gender: "n", frequency: 1, domains: ["core"], sentences: [{ ru: "В чём дело?", en: "What's the matter?", de: "Was ist los?" }] },
  { id: "x54", lemma: "раз", en: "time / once", de: "Mal", pos: "noun", gender: "m", frequency: 1, domains: ["time"], sentences: [{ ru: "Ещё раз, пожалуйста.", en: "One more time, please.", de: "Noch einmal bitte." }] },
  { id: "x55", lemma: "минута", en: "minute", de: "Minute", pos: "noun", gender: "f", frequency: 1, domains: ["time"], sentences: [{ ru: "Одну минуту.", en: "One minute.", de: "Einen Moment." }] },
  { id: "x56", lemma: "час", en: "hour", de: "Stunde", pos: "noun", gender: "m", frequency: 1, domains: ["time"], sentences: [{ ru: "Через час.", en: "In an hour.", de: "In einer Stunde." }] },
  { id: "x57", lemma: "неделя", en: "week", de: "Woche", pos: "noun", gender: "f", frequency: 1, domains: ["time"], sentences: [{ ru: "На две недели.", en: "For two weeks.", de: "Für zwei Wochen." }] },
  { id: "x58", lemma: "месяц", en: "month", de: "Monat", pos: "noun", gender: "m", frequency: 2, domains: ["time"], sentences: [{ ru: "В этом месяце.", en: "This month.", de: "In diesem Monat." }] },
  { id: "x59", lemma: "год", en: "year", de: "Jahr", pos: "noun", gender: "m", frequency: 1, domains: ["time"], sentences: [{ ru: "В этом году.", en: "This year.", de: "In diesem Jahr." }] },
  { id: "x60", lemma: "слева", en: "on the left", de: "links", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Аптека слева.", en: "The pharmacy is on the left.", de: "Die Apotheke ist links." }] },
  { id: "x61", lemma: "справа", en: "on the right", de: "rechts", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Вход справа.", en: "Entrance on the right.", de: "Eingang rechts." }] },
  { id: "x62", lemma: "рядом", en: "nearby", de: "in der Nähe", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Кафе рядом.", en: "There's a café nearby.", de: "Ein Café ist in der Nähe." }] },
  { id: "x63", lemma: "далеко", en: "far", de: "weit", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Это далеко?", en: "Is it far?", de: "Ist das weit?" }] },
  { id: "x64", lemma: "близко", en: "close / near", de: "nah", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Метро близко.", en: "The metro is close.", de: "Die Metro ist nah." }] },
  { id: "x65", lemma: "дорого", en: "expensive", de: "teuer", pos: "adv", frequency: 1, domains: ["money"], sentences: [{ ru: "Это дорого.", en: "That's expensive.", de: "Das ist teuer." }] },
  { id: "x66", lemma: "дёшево", en: "cheap", de: "billig", pos: "adv", frequency: 2, domains: ["money"], sentences: [{ ru: "Здесь дёшево.", en: "It's cheap here.", de: "Hier ist es billig." }] },
  { id: "x67", lemma: "бесплатно", en: "free (no cost)", de: "kostenlos", pos: "adv", frequency: 2, domains: ["money"], sentences: [{ ru: "Wi-Fi бесплатно.", en: "Wi-Fi is free.", de: "WLAN ist kostenlos." }] },
  { id: "x68", lemma: "наличные", en: "cash", de: "Bargeld", pos: "noun", gender: "pl", frequency: 2, domains: ["money"], sentences: [{ ru: "У вас наличные?", en: "Do you have cash?", de: "Haben Sie Bargeld?" }] },
  { id: "x69", lemma: "пароль", en: "password", de: "Passwort", pos: "noun", gender: "m", frequency: 1, domains: ["home"], sentences: [{ ru: "Какой пароль от Wi-Fi?", en: "What's the Wi-Fi password?", de: "Wie ist das WLAN-Passwort?" }] },
  { id: "x70", lemma: "сообщение", en: "message", de: "Nachricht", pos: "noun", gender: "n", frequency: 1, domains: ["phone"], sentences: [{ ru: "Я прочитал сообщение.", en: "I read the message. (m)", de: "Ich habe die Nachricht gelesen." }] },
];

function dedupe(items: VocabItem[]): VocabItem[] {
  const seen = new Set<string>();
  const out: VocabItem[] = [];
  for (const item of items) {
    const key = item.lemma.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export const GRIND_POOL: VocabItem[] = dedupe([
  ...SOCIAL_VOCAB,
  ...VOCAB,
  ...EXTRA,
]);

export function lemmaById(id: string): VocabItem | undefined {
  return GRIND_POOL.find((v) => v.id === id);
}
