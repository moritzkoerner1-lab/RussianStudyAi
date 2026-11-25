import type { Chunk, VocabItem } from "./types";

/**
 * Friend-group / girlfriend-circle Russian.
 * Goal: understand rapid informal talk — fillers, reactions, plans, gossip tone.
 * For 1–3h/day volume: treat these as listening + speaking fuel, not tourist phrases.
 */

export const SOCIAL_CHUNKS: Chunk[] = [
  { id: "s1", ru: "Ну… не знаю.", en: "Well… I don't know.", de: "Na ja… ich weiß nicht.", tags: ["filler", "social"] },
  { id: "s2", ru: "Слушай, ты где?", en: "Hey, where are you?", de: "Hör mal, wo bist du?", tags: ["filler", "social"] },
  { id: "s3", ru: "Короче, было так.", en: "Anyway, it was like this.", de: "Kurz gesagt, es war so.", tags: ["filler", "story"] },
  { id: "s4", ru: "Типа она сказала…", en: "Like, she said…", de: "So ungefähr hat sie gesagt…", tags: ["filler", "gossip"] },
  { id: "s5", ru: "Как бы да.", en: "Kinda yes.", de: "Irgendwie ja.", tags: ["filler"] },
  { id: "s6", ru: "Ага. / Угу.", en: "Yeah. / Mm-hm.", de: "Ja. / Mhm.", tags: ["react"] },
  { id: "s7", ru: "Да ладно! Серьёзно?", en: "No way! Seriously?", de: "Nee! Ernsthaft?", tags: ["react"] },
  { id: "s8", ru: "Правда? Круто!", en: "Really? Cool!", de: "Wirklich? Cool!", tags: ["react"] },
  { id: "s9", ru: "Блин…", en: "Damn… (mild)", de: "Mist…", tags: ["react"] },
  { id: "s10", ru: "Норм.", en: "It's fine / OK.", de: "Passt / OK.", tags: ["react"] },
  { id: "s11", ru: "Прикольно.", en: "Funny / neat.", de: "Lustig / cool.", tags: ["react"] },
  { id: "s12", ru: "Жесть.", en: "Wild / intense.", de: "Krass.", tags: ["react"] },
  { id: "s13", ru: "Пойдём потусим.", en: "Let's hang out.", de: "Lass uns abhängen.", tags: ["plans"] },
  { id: "s14", ru: "Сегодня будет движ.", en: "There's something going on tonight.", de: "Heute ist was los.", tags: ["plans"] },
  { id: "s15", ru: "Давай встретимся после работы.", en: "Let's meet after work.", de: "Treffen wir uns nach der Arbeit.", tags: ["plans"] },
  { id: "s16", ru: "Мне скучно.", en: "I'm bored.", de: "Mir ist langweilig.", tags: ["feel"] },
  { id: "s17", ru: "Мне кажется, она права.", en: "I think she's right.", de: "Ich finde, sie hat recht.", tags: ["opinion"] },
  { id: "s18", ru: "Я так не думаю.", en: "I don't think so.", de: "Ich denke nicht.", tags: ["opinion"] },
  { id: "s19", ru: "А ты как думаешь?", en: "What do you think?", de: "Was denkst du?", tags: ["opinion"] },
  { id: "s20", ru: "Она сказала, что он опоздал.", en: "She said that he was late.", de: "Sie sagte, dass er zu spät war.", tags: ["gossip"] },
  { id: "s21", ru: "Между нами…", en: "Between us…", de: "Unter uns…", tags: ["gossip"] },
  { id: "s22", ru: "Не говори никому.", en: "Don't tell anyone.", de: "Sag es niemandem.", tags: ["gossip"] },
  { id: "s23", ru: "Мы вчера зависали у неё.", en: "We chilled at hers yesterday.", de: "Wir haben gestern bei ihr gechillt.", tags: ["plans"] },
  { id: "s24", ru: "Щас приду.", en: "I'll be there in a sec. (fast speech)", de: "Bin gleich da.", tags: ["fast"] },
  { id: "s25", ru: "Чё случилось?", en: "What happened? (fast чё)", de: "Was ist passiert?", tags: ["fast"] },
  { id: "s26", ru: "Ваще не понимаю.", en: "I totally don't get it.", de: "Ich check das total nicht.", tags: ["fast"] },
  { id: "s27", ru: "Забей.", en: "Forget it / drop it.", de: "Vergiss es.", tags: ["social"] },
  { id: "s28", ru: "Ребят, пойдём!", en: "Guys, let's go!", de: "Leute, kommen wir!", tags: ["social"] },
  { id: "s29", ru: "Я почти понял, о чём вы.", en: "I almost got what you're talking about. (m)", de: "Ich hab fast verstanden, worüber ihr redet.", tags: ["meta"] },
  { id: "s30", ru: "Повтори медленнее, пожалуйста.", en: "Say that slower, please. (ты)", de: "Sag das bitte langsamer.", tags: ["meta"] },
  { id: "s31", ru: "Вы сейчас о чём?", en: "What are you talking about right now?", de: "Worüber redet ihr gerade?", tags: ["meta"] },
  { id: "s32", ru: "Я слушаю, продолжайте.", en: "I'm listening, go on.", de: "Ich höre zu, macht weiter.", tags: ["meta"] },
];

export type OverhearScene = {
  id: string;
  title: string;
  titleRu: string;
  setting: string;
  lines: { who: string; ru: string; en: string; de: string }[];
  focus: string[];
};

/** Mini dialogues to train understanding friends talking past you. */
export const OVERHEAR: OverhearScene[] = [
  {
    id: "oh1",
    title: "Plans tonight",
    titleRu: "Сегодня вечером",
    setting: "Your girlfriend and a friend text-voice at the table.",
    focus: ["давай", "пойдём", "скучно", "круто"],
    lines: [
      { who: "Аня", ru: "Слушай, сегодня скучно дома.", en: "Hey, it's boring at home today.", de: "Hör mal, zu Hause ist's heute langweilig." },
      { who: "Маша", ru: "Давай пойдём куда-нибудь.", en: "Let's go somewhere.", de: "Lass uns irgendwo hingehen." },
      { who: "Аня", ru: "Короче, в кафе около метро?", en: "Anyway — the café by the metro?", de: "Kurz: das Café an der Metro?" },
      { who: "Маша", ru: "Круто. Щас напишу.", en: "Cool. I'll text now.", de: "Cool. Schreibe jetzt." },
    ],
  },
  {
    id: "oh2",
    title: "Gossip soft",
    titleRu: "Она сказала",
    setting: "Two friends talking about someone else — keep up with the thread.",
    focus: ["типа", "она сказала", "серьёзно", "мне кажется"],
    lines: [
      { who: "Лена", ru: "Типа она сказала, что он не придёт.", en: "Like, she said he won't come.", de: "Sie hat so ungefähr gesagt, er kommt nicht." },
      { who: "Катя", ru: "Да ладно? Серьёзно?", en: "No way? Seriously?", de: "Nee? Ernsthaft?" },
      { who: "Лена", ru: "Мне кажется, она права.", en: "I think she's right.", de: "Ich finde, sie hat recht." },
      { who: "Катя", ru: "Блин. Ну ладно.", en: "Damn. Well, okay.", de: "Mist. Na gut." },
    ],
  },
  {
    id: "oh3",
    title: "You in the circle",
    titleRu: "Ты с нами?",
    setting: "They pull you into the conversation.",
    focus: ["а ты", "норм", "я слушаю", "о чём"],
    lines: [
      { who: "Саша", ru: "Ребят, пойдём потусим.", en: "Guys, let's hang out.", de: "Leute, lass uns abhängen." },
      { who: "Аня", ru: "А ты с нами?", en: "Are you coming with us?", de: "Kommst du mit?" },
      { who: "Вы", ru: "Ага. Я почти понял, о чём вы.", en: "Yeah. I almost got what you mean.", de: "Ja. Ich hab fast verstanden, worum's geht." },
      { who: "Саша", ru: "Норм. Потом объясню.", en: "Cool. I'll explain later.", de: "Passt. Erklär ich später." },
    ],
  },
  {
    id: "oh4",
    title: "Fast street talk",
    titleRu: "Быстрый разговор",
    setting: "Street pace — catch чё / щас / ваще.",
    focus: ["чё", "щас", "ваще", "забей"],
    lines: [
      { who: "Дима", ru: "Чё случилось?", en: "What happened?", de: "Was ist passiert?" },
      { who: "Оля", ru: "Ваще ничего. Забей.", en: "Absolutely nothing. Drop it.", de: "Absolut nichts. Vergiss es." },
      { who: "Дима", ru: "Щас кофе возьму.", en: "I'll grab coffee in a sec.", de: "Hol schnell Kaffee." },
      { who: "Оля", ru: "Давай. Я с тобой.", en: "Let's. I'm with you.", de: "Komm. Ich mit." },
    ],
  },
];

export const SOCIAL_VOCAB: VocabItem[] = [
  { id: "sv1", lemma: "ну", en: "well / so (filler)", de: "na / also", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Ну, давай.", en: "Well, come on.", de: "Na, komm." }] },
  { id: "sv2", lemma: "короче", en: "anyway / long story short", de: "kurz gesagt", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Короче, мы опоздали.", en: "Anyway, we were late.", de: "Kurz gesagt, wir waren zu spät." }] },
  { id: "sv3", lemma: "типа", en: "like / sort of", de: "so ungefähr / wie", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Типа да.", en: "Like, yes.", de: "So ungefähr ja." }] },
  { id: "sv4", lemma: "слушай", en: "listen / hey (to a friend)", de: "hör mal", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Слушай, у меня идея.", en: "Hey, I have an idea.", de: "Hör mal, ich habe eine Idee." }] },
  { id: "sv5", lemma: "круто", en: "cool", de: "cool", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Это круто!", en: "That's cool!", de: "Das ist cool!" }] },
  { id: "sv6", lemma: "норм", en: "fine / OK (colloquial)", de: "passt / OK", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Как дела? Норм.", en: "How's it going? Fine.", de: "Wie geht's? Passt." }] },
  { id: "sv7", lemma: "давай", en: "let's / come on / okay", de: "lass uns / komm", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Давай встретимся.", en: "Let's meet.", de: "Lass uns treffen." }] },
  { id: "sv8", lemma: "пойдём", en: "let's go", de: "gehen wir", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Пойдём в кафе.", en: "Let's go to a café.", de: "Gehen wir ins Café." }] },
  { id: "sv9", lemma: "тусить", en: "to hang out", de: "abhängen / feiern", pos: "verb", frequency: 1, domains: ["social"], sentences: [{ ru: "Пойдём потусим.", en: "Let's hang out.", de: "Lass uns abhängen." }] },
  { id: "sv10", lemma: "мне кажется", en: "it seems to me / I think", de: "mir scheint / ich finde", pos: "phrase", frequency: 1, domains: ["social"], sentences: [{ ru: "Мне кажется, это важно.", en: "I think this is important.", de: "Ich finde, das ist wichtig." }] },
  { id: "sv11", lemma: "серьёзно", en: "seriously", de: "ernsthaft", pos: "adv", frequency: 1, domains: ["social"], sentences: [{ ru: "Серьёзно?", en: "Seriously?", de: "Ernsthaft?" }] },
  { id: "sv12", lemma: "забить", en: "to drop it / forget it", de: "vergessen / drauf scheißen (milder: lassen)", pos: "verb", frequency: 2, domains: ["social"], sentences: [{ ru: "Забей на это.", en: "Forget about it.", de: "Vergiss das." }] },
];

export const DAILY_INTENSE = {
  speakMin: 40,
  drillMin: 30,
  overhearMin: 25,
  walkMin: 20,
  notebookMin: 15,
  totalHint: "≈ 2 hours — stretch to 3 with a second Speak block",
};
