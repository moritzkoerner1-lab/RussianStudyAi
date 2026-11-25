import type { Chunk, DayPlan, VocabItem } from "./types";

/** ~14 days × ~12 lines = survivable Moscow volume. Chunks beat word lists. */
export const CHUNKS: Chunk[] = [
  // Day 1 — contact
  { id: "c1", day: 1, ru: "Здравствуйте!", en: "Hello! (formal)", de: "Guten Tag!", tags: ["greet"] },
  { id: "c2", day: 1, ru: "Меня зовут Мориц.", en: "My name is Moritz.", de: "Ich heiße Moritz.", tags: ["greet"] },
  { id: "c3", day: 1, ru: "Очень приятно.", en: "Nice to meet you.", de: "Freut mich.", tags: ["greet"] },
  { id: "c4", day: 1, ru: "Я плохо говорю по-русски.", en: "I speak Russian poorly.", de: "Ich spreche schlecht Russisch.", tags: ["meta"] },
  { id: "c5", day: 1, ru: "Говорите, пожалуйста, медленнее.", en: "Please speak more slowly.", de: "Sprechen Sie bitte langsamer.", tags: ["meta"] },
  { id: "c6", day: 1, ru: "Повторите, пожалуйста.", en: "Please repeat.", de: "Wiederholen Sie bitte.", tags: ["meta"] },
  { id: "c7", day: 1, ru: "Как вас зовут?", en: "What is your name?", de: "Wie heißen Sie?", tags: ["greet"] },
  { id: "c8", day: 1, ru: "Я из Германии.", en: "I'm from Germany.", de: "Ich komme aus Deutschland.", tags: ["greet"] },
  { id: "c9", day: 1, ru: "Спасибо большое.", en: "Thank you very much.", de: "Vielen Dank.", tags: ["polite"] },
  { id: "c10", day: 1, ru: "Извините.", en: "Excuse me / sorry.", de: "Entschuldigung.", tags: ["polite"] },
  { id: "c11", day: 1, ru: "Да. / Нет.", en: "Yes. / No.", de: "Ja. / Nein.", tags: ["core"] },
  { id: "c12", day: 1, ru: "Вы говорите по-английски?", en: "Do you speak English?", de: "Sprechen Sie Englisch?", tags: ["meta"] },

  // Day 2 — taxi
  { id: "c13", day: 2, ru: "Мне нужно на Арбат.", en: "I need to go to Arbat.", de: "Ich muss zum Arbat.", tags: ["taxi"] },
  { id: "c14", day: 2, ru: "Сколько это будет стоить?", en: "How much will it cost?", de: "Was wird das kosten?", tags: ["taxi"] },
  { id: "c15", day: 2, ru: "Остановите здесь, пожалуйста.", en: "Stop here, please.", de: "Halten Sie bitte hier.", tags: ["taxi"] },
  { id: "c16", day: 2, ru: "Налево. / Направо. / Прямо.", en: "Left. / Right. / Straight.", de: "Links. / Rechts. / Geradeaus.", tags: ["directions"] },
  { id: "c17", day: 2, ru: "Я опаздываю.", en: "I'm running late.", de: "Ich habe Verspätung.", tags: ["taxi"] },
  { id: "c18", day: 2, ru: "Можно картой?", en: "Can I pay by card?", de: "Kann ich mit Karte zahlen?", tags: ["money"] },
  { id: "c19", day: 2, ru: "Вот адрес.", en: "Here's the address.", de: "Hier ist die Adresse.", tags: ["taxi"] },
  { id: "c20", day: 2, ru: "Сколько ехать?", en: "How long is the ride?", de: "Wie lange dauert die Fahrt?", tags: ["taxi"] },
  { id: "c21", day: 2, ru: "До метро, пожалуйста.", en: "To the metro, please.", de: "Zur Metro bitte.", tags: ["taxi"] },
  { id: "c22", day: 2, ru: "Я выхожу.", en: "I'm getting out.", de: "Ich steige aus.", tags: ["taxi"] },
  { id: "c23", day: 2, ru: "Сдачи не надо.", en: "Keep the change.", de: "Stimmt so.", tags: ["money"] },
  { id: "c24", day: 2, ru: "Подъезжайте к подъезду.", en: "Pull up to the entrance.", de: "Fahren Sie zum Eingang.", tags: ["taxi"] },

  // Day 3 — food
  { id: "c25", day: 3, ru: "Можно меню, пожалуйста?", en: "Can I have the menu, please?", de: "Kann ich die Speisekarte haben?", tags: ["cafe"] },
  { id: "c26", day: 3, ru: "Я буду борщ.", en: "I'll have borscht.", de: "Ich nehme Borschtsch.", tags: ["cafe"] },
  { id: "c27", day: 3, ru: "И чай без сахара.", en: "And tea without sugar.", de: "Und Tee ohne Zucker.", tags: ["cafe"] },
  { id: "c28", day: 3, ru: "Это острое?", en: "Is this spicy?", de: "Ist das scharf?", tags: ["cafe"] },
  { id: "c29", day: 3, ru: "Я вегетарианец.", en: "I'm vegetarian. (m)", de: "Ich bin Vegetarier.", tags: ["cafe"] },
  { id: "c30", day: 3, ru: "Счёт, пожалуйста.", en: "The bill, please.", de: "Die Rechnung bitte.", tags: ["cafe"] },
  { id: "c31", day: 3, ru: "Что вы рекомендуете?", en: "What do you recommend?", de: "Was empfehlen Sie?", tags: ["cafe"] },
  { id: "c32", day: 3, ru: "Ещё одну воду, пожалуйста.", en: "One more water, please.", de: "Noch ein Wasser bitte.", tags: ["cafe"] },
  { id: "c33", day: 3, ru: "Это вкусно!", en: "This is delicious!", de: "Das ist lecker!", tags: ["cafe"] },
  { id: "c34", day: 3, ru: "Можно без лука?", en: "Without onion, please?", de: "Ohne Zwiebel bitte?", tags: ["cafe"] },
  { id: "c35", day: 3, ru: "На двоих.", en: "For two.", de: "Für zwei.", tags: ["cafe"] },
  { id: "c36", day: 3, ru: "Я голоден.", en: "I'm hungry. (m)", de: "Ich habe Hunger.", tags: ["cafe"] },

  // Day 4 — metro
  { id: "c37", day: 4, ru: "Где метро?", en: "Where is the metro?", de: "Wo ist die Metro?", tags: ["metro"] },
  { id: "c38", day: 4, ru: "Какая станция?", en: "Which station?", de: "Welche Station?", tags: ["metro"] },
  { id: "c39", day: 4, ru: "Мне нужна Troika.", en: "I need a Troika card.", de: "Ich brauche eine Troika-Karte.", tags: ["metro"] },
  { id: "c40", day: 4, ru: "Это выход?", en: "Is this the exit?", de: "Ist das der Ausgang?", tags: ["metro"] },
  { id: "c41", day: 4, ru: "Пересадка на кольцевую.", en: "Transfer to the Circle line.", de: "Umstieg auf den Ring.", tags: ["metro"] },
  { id: "c42", day: 4, ru: "Я проехал станцию.", en: "I missed my stop.", de: "Ich bin zu weit gefahren.", tags: ["metro"] },
  { id: "c43", day: 4, ru: "Сколько остановок?", en: "How many stops?", de: "Wie viele Stationen?", tags: ["metro"] },
  { id: "c44", day: 4, ru: "Где эскалатор?", en: "Where is the escalator?", de: "Wo ist die Rolltreppe?", tags: ["metro"] },
  { id: "c45", day: 4, ru: "Не толкайтесь, пожалуйста.", en: "Please don't push.", de: "Bitte nicht drängeln.", tags: ["metro"] },
  { id: "c46", day: 4, ru: "Это конечная?", en: "Is this the last stop?", de: "Ist das die Endstation?", tags: ["metro"] },
  { id: "c47", day: 4, ru: "Карта не работает.", en: "The card isn't working.", de: "Die Karte funktioniert nicht.", tags: ["metro"] },
  { id: "c48", day: 4, ru: "Как пройти к Красной площади?", en: "How do I get to Red Square?", de: "Wie komme ich zum Roten Platz?", tags: ["directions"] },

  // Day 5 — shop
  { id: "c49", day: 5, ru: "Сколько это стоит?", en: "How much is this?", de: "Was kostet das?", tags: ["shop"] },
  { id: "c50", day: 5, ru: "Можно примерить?", en: "Can I try it on?", de: "Kann ich das anprobieren?", tags: ["shop"] },
  { id: "c51", day: 5, ru: "У вас есть меньше?", en: "Do you have a smaller size?", de: "Haben Sie eine kleinere Größe?", tags: ["shop"] },
  { id: "c52", day: 5, ru: "Я просто смотрю.", en: "I'm just looking.", de: "Ich schaue nur.", tags: ["shop"] },
  { id: "c53", day: 5, ru: "Пакет не нужен.", en: "I don't need a bag.", de: "Ich brauche keine Tüte.", tags: ["shop"] },
  { id: "c54", day: 5, ru: "Где касса?", en: "Where is the checkout?", de: "Wo ist die Kasse?", tags: ["shop"] },
  { id: "c55", day: 5, ru: "Есть скидка?", en: "Is there a discount?", de: "Gibt es Rabatt?", tags: ["shop"] },
  { id: "c56", day: 5, ru: "Мне вот это.", en: "I'll take this one.", de: "Das hier nehme ich.", tags: ["shop"] },
  { id: "c57", day: 5, ru: "Чек, пожалуйста.", en: "Receipt, please.", de: "Den Beleg bitte.", tags: ["shop"] },
  { id: "c58", day: 5, ru: "Это свежее?", en: "Is this fresh?", de: "Ist das frisch?", tags: ["shop"] },
  { id: "c59", day: 5, ru: "Полкило, пожалуйста.", en: "Half a kilo, please.", de: "Ein halbes Kilo bitte.", tags: ["shop"] },
  { id: "c60", day: 5, ru: "Я заплатил.", en: "I already paid. (m)", de: "Ich habe bezahlt.", tags: ["money"] },

  // Day 6 — grandma
  { id: "c61", day: 6, ru: "Здравствуйте, бабушка!", en: "Hello, grandma!", de: "Hallo, Oma!", tags: ["family"] },
  { id: "c62", day: 6, ru: "Как вы себя чувствуете?", en: "How are you feeling?", de: "Wie geht es Ihnen?", tags: ["family"] },
  { id: "c63", day: 6, ru: "Я очень рад вас видеть.", en: "I'm very glad to see you. (m)", de: "Ich freue mich sehr, Sie zu sehen.", tags: ["family"] },
  { id: "c64", day: 6, ru: "Расскажите, пожалуйста.", en: "Please tell me.", de: "Erzählen Sie bitte.", tags: ["family"] },
  { id: "c65", day: 6, ru: "Я понимаю не всё.", en: "I don't understand everything.", de: "Ich verstehe nicht alles.", tags: ["meta"] },
  { id: "c66", day: 6, ru: "Это очень интересно.", en: "That's very interesting.", de: "Das ist sehr interessant.", tags: ["family"] },
  { id: "c67", day: 6, ru: "Чай будете?", en: "Would you like tea?", de: "Möchten Sie Tee?", tags: ["family"] },
  { id: "c68", day: 6, ru: "Я могу помочь.", en: "I can help.", de: "Ich kann helfen.", tags: ["family"] },
  { id: "c69", day: 6, ru: "Какая красивая квартира!", en: "What a beautiful apartment!", de: "Was für eine schöne Wohnung!", tags: ["family"] },
  { id: "c70", day: 6, ru: "Я приехал на две недели.", en: "I came for two weeks. (m)", de: "Ich bin für zwei Wochen gekommen.", tags: ["family"] },
  { id: "c71", day: 6, ru: "Спасибо за угощение.", en: "Thanks for the treat.", de: "Danke für die Bewirtung.", tags: ["family"] },
  { id: "c72", day: 6, ru: "До свидания. Обнимаю вас.", en: "Goodbye. Sending a hug.", de: "Auf Wiedersehen. Ich umarme Sie.", tags: ["family"] },

  // Day 7 — street help
  { id: "c73", day: 7, ru: "Подскажите, пожалуйста…", en: "Could you tell me…", de: "Können Sie mir bitte sagen…", tags: ["help"] },
  { id: "c74", day: 7, ru: "Я заблудился.", en: "I'm lost. (m)", de: "Ich habe mich verlaufen.", tags: ["help"] },
  { id: "c75", day: 7, ru: "Далеко ли это?", en: "Is it far?", de: "Ist das weit?", tags: ["help"] },
  { id: "c76", day: 7, ru: "Можно войти?", en: "May I come in?", de: "Darf ich eintreten?", tags: ["help"] },
  { id: "c77", day: 7, ru: "Где туалет?", en: "Where is the toilet?", de: "Wo ist die Toilette?", tags: ["help"] },
  { id: "c78", day: 7, ru: "У меня нет интернета.", en: "I have no internet.", de: "Ich habe kein Internet.", tags: ["help"] },
  { id: "c79", day: 7, ru: "Вы можете показать на карте?", en: "Can you show me on the map?", de: "Können Sie es auf der Karte zeigen?", tags: ["help"] },
  { id: "c80", day: 7, ru: "Я ищу аптеку.", en: "I'm looking for a pharmacy.", de: "Ich suche eine Apotheke.", tags: ["help"] },
  { id: "c81", day: 7, ru: "Это бесплатно?", en: "Is this free?", de: "Ist das kostenlos?", tags: ["help"] },
  { id: "c82", day: 7, ru: "Подождите минутку.", en: "Wait a minute.", de: "Warten Sie einen Moment.", tags: ["help"] },
  { id: "c83", day: 7, ru: "Я вас не слышу.", en: "I can't hear you.", de: "Ich höre Sie nicht.", tags: ["help"] },
  { id: "c84", day: 7, ru: "Всё хорошо.", en: "Everything's fine.", de: "Alles gut.", tags: ["core"] },

  // Day 8 — time & plans
  { id: "c85", day: 8, ru: "Который час?", en: "What time is it?", de: "Wie spät ist es?", tags: ["time"] },
  { id: "c86", day: 8, ru: "Сегодня вечером.", en: "This evening.", de: "Heute Abend.", tags: ["time"] },
  { id: "c87", day: 8, ru: "Завтра утром.", en: "Tomorrow morning.", de: "Morgen früh.", tags: ["time"] },
  { id: "c88", day: 8, ru: "Во сколько встреча?", en: "What time is the meeting?", de: "Um wie viel Uhr ist das Treffen?", tags: ["time"] },
  { id: "c89", day: 8, ru: "Я свободен после трёх.", en: "I'm free after three. (m)", de: "Ich bin nach drei frei.", tags: ["time"] },
  { id: "c90", day: 8, ru: "Давайте встретимся.", en: "Let's meet.", de: "Lassen Sie uns treffen.", tags: ["time"] },
  { id: "c91", day: 8, ru: "Я занят.", en: "I'm busy. (m)", de: "Ich bin beschäftigt.", tags: ["time"] },
  { id: "c92", day: 8, ru: "На выходных.", en: "On the weekend.", de: "Am Wochenende.", tags: ["time"] },
  { id: "c93", day: 8, ru: "Сколько времени нужно?", en: "How much time is needed?", de: "Wie viel Zeit braucht man?", tags: ["time"] },
  { id: "c94", day: 8, ru: "Я уже иду.", en: "I'm already on my way.", de: "Ich bin schon unterwegs.", tags: ["time"] },
  { id: "c95", day: 8, ru: "Позже позвоню.", en: "I'll call later.", de: "Ich rufe später an.", tags: ["time"] },
  { id: "c96", day: 8, ru: "До завтра!", en: "See you tomorrow!", de: "Bis morgen!", tags: ["time"] },

  // Day 9 — polite / feelings
  { id: "c97", day: 9, ru: "Мне нравится Москва.", en: "I like Moscow.", de: "Moskau gefällt mir.", tags: ["feel"] },
  { id: "c98", day: 9, ru: "Мне холодно.", en: "I'm cold.", de: "Mir ist kalt.", tags: ["feel"] },
  { id: "c99", day: 9, ru: "Мне жарко.", en: "I'm hot.", de: "Mir ist heiß.", tags: ["feel"] },
  { id: "c100", day: 9, ru: "Я устал.", en: "I'm tired. (m)", de: "Ich bin müde.", tags: ["feel"] },
  { id: "c101", day: 9, ru: "Какая жалость!", en: "What a pity!", de: "Wie schade!", tags: ["feel"] },
  { id: "c102", day: 9, ru: "Не беспокойтесь.", en: "Don't worry.", de: "Machen Sie sich keine Sorgen.", tags: ["polite"] },
  { id: "c103", day: 9, ru: "Будьте здоровы!", en: "Bless you! / Take care.", de: "Gesundheit!", tags: ["polite"] },
  { id: "c104", day: 9, ru: "С удовольствием.", en: "With pleasure.", de: "Gerne.", tags: ["polite"] },
  { id: "c105", day: 9, ru: "Ничего страшного.", en: "No big deal.", de: "Kein Problem.", tags: ["polite"] },
  { id: "c106", day: 9, ru: "Я рад.", en: "I'm glad. (m)", de: "Ich bin froh.", tags: ["feel"] },
  { id: "c107", day: 9, ru: "Мне это важно.", en: "This is important to me.", de: "Das ist mir wichtig.", tags: ["feel"] },
  { id: "c108", day: 9, ru: "Вы очень добры.", en: "You're very kind.", de: "Sie sind sehr freundlich.", tags: ["polite"] },

  // Day 10 — problems
  { id: "c109", day: 10, ru: "У меня проблема.", en: "I have a problem.", de: "Ich habe ein Problem.", tags: ["problem"] },
  { id: "c110", day: 10, ru: "Я потерял паспорт.", en: "I lost my passport. (m)", de: "Ich habe meinen Pass verloren.", tags: ["problem"] },
  { id: "c111", day: 10, ru: "Вызовите такси.", en: "Call a taxi.", de: "Rufen Sie ein Taxi.", tags: ["problem"] },
  { id: "c112", day: 10, ru: "Мне нужна помощь.", en: "I need help.", de: "Ich brauche Hilfe.", tags: ["problem"] },
  { id: "c113", day: 10, ru: "Это срочно.", en: "This is urgent.", de: "Das ist dringend.", tags: ["problem"] },
  { id: "c114", day: 10, ru: "Телефон сел.", en: "My phone died.", de: "Das Handy ist leer.", tags: ["problem"] },
  { id: "c115", day: 10, ru: "Где полиция?", en: "Where is the police?", de: "Wo ist die Polizei?", tags: ["problem"] },
  { id: "c116", day: 10, ru: "Мне плохо.", en: "I feel sick.", de: "Mir ist schlecht.", tags: ["problem"] },
  { id: "c117", day: 10, ru: "Я опоздал на поезд.", en: "I missed the train. (m)", de: "Ich habe den Zug verpasst.", tags: ["problem"] },
  { id: "c118", day: 10, ru: "Можно зарядку?", en: "Can I get a charger?", de: "Kann ich ein Ladegerät bekommen?", tags: ["problem"] },
  { id: "c119", day: 10, ru: "Это ошибка.", en: "That's a mistake.", de: "Das ist ein Fehler.", tags: ["problem"] },
  { id: "c120", day: 10, ru: "Всё в порядке?", en: "Is everything okay?", de: "Ist alles in Ordnung?", tags: ["problem"] },

  // Day 11 — phone
  { id: "c121", day: 11, ru: "Алло?", en: "Hello? (on phone)", de: "Hallo?", tags: ["phone"] },
  { id: "c122", day: 11, ru: "Вы меня слышите?", en: "Can you hear me?", de: "Können Sie mich hören?", tags: ["phone"] },
  { id: "c123", day: 11, ru: "Связь плохая.", en: "The connection is bad.", de: "Die Verbindung ist schlecht.", tags: ["phone"] },
  { id: "c124", day: 11, ru: "Я перезвоню.", en: "I'll call back.", de: "Ich rufe zurück.", tags: ["phone"] },
  { id: "c125", day: 11, ru: "Напишите мне.", en: "Write to me.", de: "Schreiben Sie mir.", tags: ["phone"] },
  { id: "c126", day: 11, ru: "Мой номер…", en: "My number is…", de: "Meine Nummer ist…", tags: ["phone"] },
  { id: "c127", day: 11, ru: "Отправьте геолокацию.", en: "Send your location.", de: "Senden Sie den Standort.", tags: ["phone"] },
  { id: "c128", day: 11, ru: "Я в пути.", en: "I'm on the way.", de: "Ich bin unterwegs.", tags: ["phone"] },
  { id: "c129", day: 11, ru: "Сейчас неудобно говорить.", en: "It's a bad time to talk.", de: "Es ist gerade ungünstig.", tags: ["phone"] },
  { id: "c130", day: 11, ru: "Давайте в WhatsApp.", en: "Let's use WhatsApp.", de: "Nehmen wir WhatsApp.", tags: ["phone"] },
  { id: "c131", day: 11, ru: "Я сбросил звонок.", en: "I missed the call. (m)", de: "Ich habe den Anruf verpasst.", tags: ["phone"] },
  { id: "c132", day: 11, ru: "Держите на линии.", en: "Hold the line.", de: "Bleiben Sie in der Leitung.", tags: ["phone"] },

  // Day 12 — home
  { id: "c133", day: 12, ru: "Где я буду спать?", en: "Where will I sleep?", de: "Wo werde ich schlafen?", tags: ["home"] },
  { id: "c134", day: 12, ru: "Можно душ?", en: "May I take a shower?", de: "Darf ich duschen?", tags: ["home"] },
  { id: "c135", day: 12, ru: "Где полотенце?", en: "Where is the towel?", de: "Wo ist das Handtuch?", tags: ["home"] },
  { id: "c136", day: 12, ru: "Wi-Fi пароль?", en: "Wi-Fi password?", de: "WLAN-Passwort?", tags: ["home"] },
  { id: "c137", day: 12, ru: "Ключ от квартиры.", en: "The apartment key.", de: "Der Wohnungsschlüssel.", tags: ["home"] },
  { id: "c138", day: 12, ru: "Не шумите, пожалуйста.", en: "Please don't make noise.", de: "Bitte nicht laut sein.", tags: ["home"] },
  { id: "c139", day: 12, ru: "Я закрыл дверь.", en: "I locked the door. (m)", de: "Ich habe die Tür abgeschlossen.", tags: ["home"] },
  { id: "c140", day: 12, ru: "Где мусорка?", en: "Where is the trash?", de: "Wo ist der Müll?", tags: ["home"] },
  { id: "c141", day: 12, ru: "Можно открыть окно?", en: "May I open the window?", de: "Darf ich das Fenster öffnen?", tags: ["home"] },
  { id: "c142", day: 12, ru: "Мне удобно.", en: "I'm comfortable.", de: "Es ist mir bequem.", tags: ["home"] },
  { id: "c143", day: 12, ru: "Спокойной ночи.", en: "Good night.", de: "Gute Nacht.", tags: ["home"] },
  { id: "c144", day: 12, ru: "Доброе утро.", en: "Good morning.", de: "Guten Morgen.", tags: ["home"] },

  // Day 13 — thanks / goodbye
  { id: "c145", day: 13, ru: "Спасибо за всё.", en: "Thank you for everything.", de: "Danke für alles.", tags: ["bye"] },
  { id: "c146", day: 13, ru: "Было очень приятно.", en: "It was very nice.", de: "Es war sehr schön.", tags: ["bye"] },
  { id: "c147", day: 13, ru: "Я буду скучать.", en: "I'll miss you.", de: "Ich werde dich vermissen.", tags: ["bye"] },
  { id: "c148", day: 13, ru: "Передайте привет.", en: "Say hello for me.", de: "Richten Sie Grüße aus.", tags: ["bye"] },
  { id: "c149", day: 13, ru: "Удачи!", en: "Good luck!", de: "Viel Glück!", tags: ["bye"] },
  { id: "c150", day: 13, ru: "До скорой встречи.", en: "See you soon.", de: "Bis bald.", tags: ["bye"] },
  { id: "c151", day: 13, ru: "Хорошего дня!", en: "Have a good day!", de: "Einen schönen Tag!", tags: ["bye"] },
  { id: "c152", day: 13, ru: "Берегите себя.", en: "Take care of yourself.", de: "Passen Sie auf sich auf.", tags: ["bye"] },
  { id: "c153", day: 13, ru: "Я обязательно вернусь.", en: "I'll definitely come back.", de: "Ich komme bestimmt zurück.", tags: ["bye"] },
  { id: "c154", day: 13, ru: "Это был прекрасный день.", en: "It was a wonderful day.", de: "Es war ein wunderschöner Tag.", tags: ["bye"] },
  { id: "c155", day: 13, ru: "Ещё раз спасибо.", en: "Thanks again.", de: "Nochmals danke.", tags: ["bye"] },
  { id: "c156", day: 13, ru: "Пока!", en: "Bye! (informal)", de: "Tschüss!", tags: ["bye"] },

  // Day 14 — free conversation scaffolds
  { id: "c157", day: 14, ru: "Расскажите о своей жизни.", en: "Tell me about your life.", de: "Erzählen Sie von Ihrem Leben.", tags: ["free"] },
  { id: "c158", day: 14, ru: "Что вы любите делать?", en: "What do you like to do?", de: "Was machen Sie gern?", tags: ["free"] },
  { id: "c159", day: 14, ru: "В Германии тоже холодно.", en: "It's cold in Germany too.", de: "In Deutschland ist es auch kalt.", tags: ["free"] },
  { id: "c160", day: 14, ru: "Я учу русский две недели.", en: "I've been learning Russian for two weeks.", de: "Ich lerne seit zwei Wochen Russisch.", tags: ["free"] },
  { id: "c161", day: 14, ru: "Можно проще?", en: "Can you make it simpler?", de: "Können Sie es einfacher sagen?", tags: ["free"] },
  { id: "c162", day: 14, ru: "Я имею в виду…", en: "I mean…", de: "Ich meine…", tags: ["free"] },
  { id: "c163", day: 14, ru: "Например…", en: "For example…", de: "Zum Beispiel…", tags: ["free"] },
  { id: "c164", day: 14, ru: "Подождите, я подумаю.", en: "Wait, let me think.", de: "Warten Sie, ich überlege.", tags: ["free"] },
  { id: "c165", day: 14, ru: "Правильно ли я сказал?", en: "Did I say that correctly? (m)", de: "Habe ich das richtig gesagt?", tags: ["free"] },
  { id: "c166", day: 14, ru: "Давайте ещё раз.", en: "Let's do it again.", de: "Machen wir es noch einmal.", tags: ["free"] },
  { id: "c167", day: 14, ru: "Я почти понял.", en: "I almost understood. (m)", de: "Ich habe es fast verstanden.", tags: ["free"] },
  { id: "c168", day: 14, ru: "Это было хорошо.", en: "That was good.", de: "Das war gut.", tags: ["free"] },
];

export const DAYS: DayPlan[] = [
  { day: 1, titleRu: "Первый контакт", titleEn: "First contact", mission: "Greet someone, say who you are, ask them to slow down.", imageHint: "Moscow café window in winter light", chunkIds: ids(1), speakPrompt: "Practice greeting a stranger and asking them to speak slowly." },
  { day: 2, titleRu: "Водитель", titleEn: "The driver", mission: "Tell a taxi where to go, pay, get out cleanly.", imageHint: "Taxi on a snowy Moscow street", chunkIds: ids(2), speakPrompt: "You are in a taxi. Give an address, ask the price, stop the car." },
  { day: 3, titleRu: "Заказ", titleEn: "Ordering food", mission: "Order a meal, ask for the bill, say what you want without onion.", imageHint: "Steam over a bowl of borscht", chunkIds: ids(3), speakPrompt: "Order food and tea in a café. Ask for the bill." },
  { day: 4, titleRu: "Метро", titleEn: "Metro", mission: "Find stations, transfer, recover when you miss a stop.", imageHint: "Deep Moscow metro escalator", chunkIds: ids(4), speakPrompt: "Ask for the right metro station and a transfer." },
  { day: 5, titleRu: "Магазин", titleEn: "Shop", mission: "Price, size, checkout — no panic at the register.", imageHint: "Market stall with fruit", chunkIds: ids(5), speakPrompt: "Buy something. Ask the price and pay by card." },
  { day: 6, titleRu: "У бабушки", titleEn: "At grandma's", mission: "Five to ten minutes of warm, simple conversation.", imageHint: "Tea table with jam and cups", chunkIds: ids(6), speakPrompt: "Talk with a friend's grandmother. Be warm. Ask her to slow down if needed." },
  { day: 7, titleRu: "На улице", titleEn: "On the street", mission: "Ask for help without freezing up.", imageHint: "Pedestrian under a Moscow street sign", chunkIds: ids(7), speakPrompt: "You are lost. Ask a stranger for a pharmacy." },
  { day: 8, titleRu: "Планы", titleEn: "Plans", mission: "Time, tomorrow, after three, see you.", imageHint: "Wristwatch on a winter coat sleeve", chunkIds: ids(8), speakPrompt: "Make a plan to meet tomorrow evening." },
  { day: 9, titleRu: "Как я", titleEn: "How I feel", mission: "Cold, tired, glad, polite soft landings.", imageHint: "Breath in cold air outside", chunkIds: ids(9), speakPrompt: "Say how you feel and thank someone kindly." },
  { day: 10, titleRu: "Проблема", titleEn: "A problem", mission: "Lost passport, dead phone, need help now.", imageHint: "Phone with empty battery icon", chunkIds: ids(10), speakPrompt: "Your phone died and you need help urgently." },
  { day: 11, titleRu: "На связи", titleEn: "On the line", mission: "Phone, WhatsApp, location, call back.", imageHint: "Hand holding a phone on a metro platform", chunkIds: ids(11), speakPrompt: "Call someone, say the connection is bad, promise to call back." },
  { day: 12, titleRu: "Дома", titleEn: "At home", mission: "Shower, keys, Wi-Fi, good night.", imageHint: "Apartment hallway with keys on a hook", chunkIds: ids(12), speakPrompt: "Ask for the Wi-Fi password and where you will sleep." },
  { day: 13, titleRu: "До встречи", titleEn: "Until next time", mission: "Thank, hug in words, leave cleanly.", imageHint: "Doorway goodbye in warm light", chunkIds: ids(13), speakPrompt: "Say a proper goodbye and thank someone for everything." },
  { day: 14, titleRu: "Свободно", titleEn: "Free talk", mission: "Hold a short conversation. Recover when you stall.", imageHint: "Two people talking by a winter window", chunkIds: ids(14), speakPrompt: "Hold a five-minute conversation. Ask for simpler words when stuck." },
];

function ids(day: number): string[] {
  return CHUNKS.filter((c) => c.day === day).map((c) => c.id);
}

export function chunkById(id: string): Chunk | undefined {
  return CHUNKS.find((c) => c.id === id);
}

export function chunksForDay(day: number): Chunk[] {
  return CHUNKS.filter((c) => c.day === day);
}

/** High-utility lemmas for Moscow, each locked inside usable sentences. */
export const VOCAB: VocabItem[] = [
  { id: "v1", lemma: "пожалуйста", en: "please", de: "bitte", pos: "adv", frequency: 1, domains: ["polite"], sentences: [{ ru: "Повторите, пожалуйста.", en: "Please repeat.", de: "Wiederholen Sie bitte." }] },
  { id: "v2", lemma: "спасибо", en: "thank you", de: "danke", pos: "phrase", frequency: 1, domains: ["polite"], sentences: [{ ru: "Спасибо большое.", en: "Thank you very much.", de: "Vielen Dank." }] },
  { id: "v3", lemma: "извините", en: "excuse me / sorry", de: "entschuldigung", pos: "phrase", frequency: 1, domains: ["polite"], sentences: [{ ru: "Извините, где метро?", en: "Excuse me, where is the metro?", de: "Entschuldigung, wo ist die Metro?" }] },
  { id: "v4", lemma: "нужно", en: "need to / necessary", de: "brauchen / nötig", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Мне нужно на Арбат.", en: "I need to go to Arbat.", de: "Ich muss zum Arbat." }] },
  { id: "v5", lemma: "хочу", en: "I want", de: "ich will", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Я хочу чай.", en: "I want tea.", de: "Ich möchte Tee." }] },
  { id: "v6", lemma: "можно", en: "may / is it allowed", de: "darf man", pos: "adv", frequency: 1, domains: ["core"], sentences: [{ ru: "Можно картой?", en: "Can I pay by card?", de: "Kann ich mit Karte zahlen?" }] },
  { id: "v7", lemma: "где", en: "where", de: "wo", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Где туалет?", en: "Where is the toilet?", de: "Wo ist die Toilette?" }] },
  { id: "v8", lemma: "сколько", en: "how much / how many", de: "wie viel", pos: "adv", frequency: 1, domains: ["money"], sentences: [{ ru: "Сколько это стоит?", en: "How much is this?", de: "Was kostet das?" }] },
  { id: "v9", lemma: "сегодня", en: "today", de: "heute", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Я сегодня приехал.", en: "I arrived today. (m)", de: "Ich bin heute angekommen." }] },
  { id: "v10", lemma: "завтра", en: "tomorrow", de: "morgen", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "До завтра!", en: "See you tomorrow!", de: "Bis morgen!" }] },
  { id: "v11", lemma: "сейчас", en: "now", de: "jetzt", pos: "adv", frequency: 1, domains: ["time"], sentences: [{ ru: "Я сейчас иду.", en: "I'm going now.", de: "Ich gehe jetzt." }] },
  { id: "v12", lemma: "здесь", en: "here", de: "hier", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Остановите здесь.", en: "Stop here.", de: "Halten Sie hier." }] },
  { id: "v13", lemma: "туда", en: "there (direction)", de: "dort hin", pos: "adv", frequency: 2, domains: ["directions"], sentences: [{ ru: "Мне туда надо.", en: "I need to go there.", de: "Ich muss dorthin." }] },
  { id: "v14", lemma: "налево", en: "to the left", de: "nach links", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Поверните налево.", en: "Turn left.", de: "Biegen Sie links ab." }] },
  { id: "v15", lemma: "направо", en: "to the right", de: "nach rechts", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Потом направо.", en: "Then right.", de: "Dann rechts." }] },
  { id: "v16", lemma: "прямо", en: "straight", de: "geradeaus", pos: "adv", frequency: 1, domains: ["directions"], sentences: [{ ru: "Идите прямо.", en: "Go straight.", de: "Gehen Sie geradeaus." }] },
  { id: "v17", lemma: "метро", en: "metro", de: "Metro", pos: "noun", gender: "n", frequency: 1, domains: ["metro"], sentences: [{ ru: "Где метро?", en: "Where is the metro?", de: "Wo ist die Metro?" }] },
  { id: "v18", lemma: "такси", en: "taxi", de: "Taxi", pos: "noun", gender: "n", frequency: 1, domains: ["taxi"], sentences: [{ ru: "Вызовите такси.", en: "Call a taxi.", de: "Rufen Sie ein Taxi." }] },
  { id: "v19", lemma: "адрес", en: "address", de: "Adresse", pos: "noun", gender: "m", frequency: 1, domains: ["taxi"], sentences: [{ ru: "Вот адрес.", en: "Here's the address.", de: "Hier ist die Adresse." }] },
  { id: "v20", lemma: "карта", en: "card / map", de: "Karte", pos: "noun", gender: "f", frequency: 1, domains: ["money", "metro"], sentences: [{ ru: "Можно картой?", en: "By card?", de: "Mit Karte?" }] },
  { id: "v21", lemma: "деньги", en: "money", de: "Geld", pos: "noun", gender: "pl", frequency: 1, domains: ["money"], sentences: [{ ru: "У меня мало денег.", en: "I have little money.", de: "Ich habe wenig Geld." }] },
  { id: "v22", lemma: "счёт", en: "bill / check", de: "Rechnung", pos: "noun", gender: "m", frequency: 1, domains: ["cafe"], sentences: [{ ru: "Счёт, пожалуйста.", en: "The bill, please.", de: "Die Rechnung bitte." }] },
  { id: "v23", lemma: "меню", en: "menu", de: "Speisekarte", pos: "noun", gender: "n", frequency: 1, domains: ["cafe"], sentences: [{ ru: "Можно меню?", en: "May I have a menu?", de: "Die Speisekarte bitte?" }] },
  { id: "v24", lemma: "вода", en: "water", de: "Wasser", pos: "noun", gender: "f", frequency: 1, domains: ["cafe"], sentences: [{ ru: "Воду без газа.", en: "Still water.", de: "Wasser ohne Gas." }] },
  { id: "v25", lemma: "чай", en: "tea", de: "Tee", pos: "noun", gender: "m", frequency: 1, domains: ["cafe", "family"], sentences: [{ ru: "Чай будете?", en: "Would you like tea?", de: "Möchten Sie Tee?" }] },
  { id: "v26", lemma: "кофе", en: "coffee", de: "Kaffee", pos: "noun", gender: "m", frequency: 1, domains: ["cafe"], sentences: [{ ru: "Один кофе, пожалуйста.", en: "One coffee, please.", de: "Einen Kaffee bitte." }] },
  { id: "v27", lemma: "хлеб", en: "bread", de: "Brot", pos: "noun", gender: "m", frequency: 2, domains: ["cafe", "shop"], sentences: [{ ru: "Хлеб свежий?", en: "Is the bread fresh?", de: "Ist das Brot frisch?" }] },
  { id: "v28", lemma: "борщ", en: "borscht", de: "Borschtsch", pos: "noun", gender: "m", frequency: 2, domains: ["cafe"], sentences: [{ ru: "Я буду борщ.", en: "I'll have borscht.", de: "Ich nehme Borschtsch." }] },
  { id: "v29", lemma: "вкусный", en: "tasty", de: "lecker", pos: "adj", frequency: 2, domains: ["cafe"], sentences: [{ ru: "Очень вкусный суп.", en: "Very tasty soup.", de: "Sehr leckere Suppe." }] },
  { id: "v30", lemma: "станция", en: "station", de: "Station", pos: "noun", gender: "f", frequency: 1, domains: ["metro"], sentences: [{ ru: "Какая станция?", en: "Which station?", de: "Welche Station?" }] },
  { id: "v31", lemma: "выход", en: "exit", de: "Ausgang", pos: "noun", gender: "m", frequency: 1, domains: ["metro"], sentences: [{ ru: "Где выход?", en: "Where is the exit?", de: "Wo ist der Ausgang?" }] },
  { id: "v32", lemma: "вход", en: "entrance", de: "Eingang", pos: "noun", gender: "m", frequency: 2, domains: ["directions"], sentences: [{ ru: "Вход слева.", en: "Entrance on the left.", de: "Eingang links." }] },
  { id: "v33", lemma: "аптека", en: "pharmacy", de: "Apotheke", pos: "noun", gender: "f", frequency: 1, domains: ["help"], sentences: [{ ru: "Я ищу аптеку.", en: "I'm looking for a pharmacy.", de: "Ich suche eine Apotheke." }] },
  { id: "v34", lemma: "магазин", en: "store", de: "Geschäft", pos: "noun", gender: "m", frequency: 1, domains: ["shop"], sentences: [{ ru: "Где ближайший магазин?", en: "Where is the nearest store?", de: "Wo ist der nächste Laden?" }] },
  { id: "v35", lemma: "квартира", en: "apartment", de: "Wohnung", pos: "noun", gender: "f", frequency: 1, domains: ["home", "family"], sentences: [{ ru: "Какая красивая квартира!", en: "What a beautiful apartment!", de: "Was für eine schöne Wohnung!" }] },
  { id: "v36", lemma: "ключ", en: "key", de: "Schlüssel", pos: "noun", gender: "m", frequency: 1, domains: ["home"], sentences: [{ ru: "Где ключ?", en: "Where is the key?", de: "Wo ist der Schlüssel?" }] },
  { id: "v37", lemma: "дверь", en: "door", de: "Tür", pos: "noun", gender: "f", frequency: 2, domains: ["home"], sentences: [{ ru: "Закройте дверь.", en: "Close the door.", de: "Schließen Sie die Tür." }] },
  { id: "v38", lemma: "окно", en: "window", de: "Fenster", pos: "noun", gender: "n", frequency: 2, domains: ["home", "walk"], sentences: [{ ru: "Откройте окно.", en: "Open the window.", de: "Öffnen Sie das Fenster." }] },
  { id: "v39", lemma: "улица", en: "street", de: "Straße", pos: "noun", gender: "f", frequency: 1, domains: ["directions"], sentences: [{ ru: "На какой улице?", en: "On which street?", de: "In welcher Straße?" }] },
  { id: "v40", lemma: "площадь", en: "square", de: "Platz", pos: "noun", gender: "f", frequency: 2, domains: ["directions"], sentences: [{ ru: "Красная площадь близко.", en: "Red Square is close.", de: "Der Rote Platz ist nah." }] },
  { id: "v41", lemma: "бабушка", en: "grandmother", de: "Oma", pos: "noun", gender: "f", frequency: 1, domains: ["family"], sentences: [{ ru: "Здравствуйте, бабушка!", en: "Hello, grandma!", de: "Hallo, Oma!" }] },
  { id: "v42", lemma: "друг", en: "friend (m)", de: "Freund", pos: "noun", gender: "m", frequency: 1, domains: ["family"], sentences: [{ ru: "Это мой друг.", en: "This is my friend.", de: "Das ist mein Freund." }] },
  { id: "v43", lemma: "семья", en: "family", de: "Familie", pos: "noun", gender: "f", frequency: 2, domains: ["family"], sentences: [{ ru: "У вас большая семья?", en: "Do you have a big family?", de: "Haben Sie eine große Familie?" }] },
  { id: "v44", lemma: "понимать", en: "to understand", de: "verstehen", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Я понимаю не всё.", en: "I don't understand everything.", de: "Ich verstehe nicht alles." }] },
  { id: "v45", lemma: "говорить", en: "to speak", de: "sprechen", pos: "verb", frequency: 1, domains: ["meta"], sentences: [{ ru: "Говорите медленнее.", en: "Speak more slowly.", de: "Sprechen Sie langsamer." }] },
  { id: "v46", lemma: "знать", en: "to know", de: "wissen / kennen", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Я не знаю.", en: "I don't know.", de: "Ich weiß nicht." }] },
  { id: "v47", lemma: "идти", en: "to go (on foot)", de: "gehen", pos: "verb", frequency: 1, domains: ["directions"], sentences: [{ ru: "Я уже иду.", en: "I'm already walking.", de: "Ich gehe schon." }] },
  { id: "v48", lemma: "ехать", en: "to go (by vehicle)", de: "fahren", pos: "verb", frequency: 1, domains: ["taxi"], sentences: [{ ru: "Мы едем в центр.", en: "We're going to the center.", de: "Wir fahren ins Zentrum." }] },
  { id: "v49", lemma: "помочь", en: "to help", de: "helfen", pos: "verb", frequency: 1, domains: ["help"], sentences: [{ ru: "Вы можете помочь?", en: "Can you help?", de: "Können Sie helfen?" }] },
  { id: "v50", lemma: "ждать", en: "to wait", de: "warten", pos: "verb", frequency: 1, domains: ["core"], sentences: [{ ru: "Подождите минутку.", en: "Wait a minute.", de: "Warten Sie einen Moment." }] },
  { id: "v51", lemma: "открыть", en: "to open", de: "öffnen", pos: "verb", frequency: 2, domains: ["home"], sentences: [{ ru: "Можно открыть окно?", en: "May I open the window?", de: "Darf ich das Fenster öffnen?" }] },
  { id: "v52", lemma: "закрыть", en: "to close", de: "schließen", pos: "verb", frequency: 2, domains: ["home"], sentences: [{ ru: "Я закрыл дверь.", en: "I closed the door. (m)", de: "Ich habe die Tür geschlossen." }] },
  { id: "v53", lemma: "купить", en: "to buy", de: "kaufen", pos: "verb", frequency: 1, domains: ["shop"], sentences: [{ ru: "Я хочу купить воду.", en: "I want to buy water.", de: "Ich möchte Wasser kaufen." }] },
  { id: "v54", lemma: "платить", en: "to pay", de: "zahlen", pos: "verb", frequency: 1, domains: ["money"], sentences: [{ ru: "Я уже заплатил.", en: "I already paid. (m)", de: "Ich habe schon bezahlt." }] },
  { id: "v55", lemma: "звонить", en: "to call", de: "anrufen", pos: "verb", frequency: 1, domains: ["phone"], sentences: [{ ru: "Я перезвоню.", en: "I'll call back.", de: "Ich rufe zurück." }] },
  { id: "v56", lemma: "писать", en: "to write", de: "schreiben", pos: "verb", frequency: 2, domains: ["phone"], sentences: [{ ru: "Напишите мне.", en: "Write to me.", de: "Schreiben Sie mir." }] },
  { id: "v57", lemma: "видеть", en: "to see", de: "sehen", pos: "verb", frequency: 1, domains: ["walk", "family"], sentences: [{ ru: "Я рад вас видеть.", en: "Glad to see you. (m)", de: "Ich freue mich, Sie zu sehen." }] },
  { id: "v58", lemma: "слышать", en: "to hear", de: "hören", pos: "verb", frequency: 1, domains: ["phone"], sentences: [{ ru: "Вы меня слышите?", en: "Can you hear me?", de: "Können Sie mich hören?" }] },
  { id: "v59", lemma: "холодный", en: "cold", de: "kalt", pos: "adj", frequency: 1, domains: ["feel", "walk"], sentences: [{ ru: "Сегодня холодно.", en: "It's cold today.", de: "Heute ist es kalt." }] },
  { id: "v60", lemma: "тёплый", en: "warm", de: "warm", pos: "adj", frequency: 2, domains: ["feel"], sentences: [{ ru: "В квартире тепло.", en: "It's warm in the apartment.", de: "In der Wohnung ist es warm." }] },
  { id: "v61", lemma: "большой", en: "big", de: "groß", pos: "adj", frequency: 1, domains: ["core", "walk"], sentences: [{ ru: "Большой дом.", en: "A big house.", de: "Ein großes Haus." }] },
  { id: "v62", lemma: "маленький", en: "small", de: "klein", pos: "adj", frequency: 1, domains: ["core", "walk"], sentences: [{ ru: "Маленькая улица.", en: "A small street.", de: "Eine kleine Straße." }] },
  { id: "v63", lemma: "красивый", en: "beautiful", de: "schön", pos: "adj", frequency: 1, domains: ["walk", "family"], sentences: [{ ru: "Какой красивый парк!", en: "What a beautiful park!", de: "Was für ein schöner Park!" }] },
  { id: "v64", lemma: "новый", en: "new", de: "neu", pos: "adj", frequency: 2, domains: ["shop"], sentences: [{ ru: "Это новый телефон.", en: "This is a new phone.", de: "Das ist ein neues Handy." }] },
  { id: "v65", lemma: "старый", en: "old", de: "alt", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Старая церковь.", en: "An old church.", de: "Eine alte Kirche." }] },
  { id: "v66", lemma: "зелёный", en: "green", de: "grün", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Зелёная стена.", en: "A green wall.", de: "Eine grüne Wand." }] },
  { id: "v67", lemma: "синий", en: "blue", de: "blau", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Синяя машина.", en: "A blue car.", de: "Ein blaues Auto." }] },
  { id: "v68", lemma: "красный", en: "red", de: "rot", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Красная площадь.", en: "Red Square.", de: "Roter Platz." }] },
  { id: "v69", lemma: "белый", en: "white", de: "weiß", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Белый снег.", en: "White snow.", de: "Weißer Schnee." }] },
  { id: "v70", lemma: "чёрный", en: "black", de: "schwarz", pos: "adj", frequency: 2, domains: ["walk"], sentences: [{ ru: "Чёрное пальто.", en: "A black coat.", de: "Ein schwarzer Mantel." }] },
  { id: "v71", lemma: "человек", en: "person / people", de: "Mensch", pos: "noun", gender: "m", frequency: 1, domains: ["core"], sentences: [{ ru: "Много людей.", en: "Many people.", de: "Viele Menschen." }] },
  { id: "v72", lemma: "время", en: "time", de: "Zeit", pos: "noun", gender: "n", frequency: 1, domains: ["time"], sentences: [{ ru: "У меня мало времени.", en: "I have little time.", de: "Ich habe wenig Zeit." }] },
  { id: "v73", lemma: "день", en: "day", de: "Tag", pos: "noun", gender: "m", frequency: 1, domains: ["time"], sentences: [{ ru: "Хорошего дня!", en: "Have a good day!", de: "Einen schönen Tag!" }] },
  { id: "v74", lemma: "ночь", en: "night", de: "Nacht", pos: "noun", gender: "f", frequency: 2, domains: ["time"], sentences: [{ ru: "Спокойной ночи.", en: "Good night.", de: "Gute Nacht." }] },
  { id: "v75", lemma: "утро", en: "morning", de: "Morgen", pos: "noun", gender: "n", frequency: 1, domains: ["time"], sentences: [{ ru: "Доброе утро.", en: "Good morning.", de: "Guten Morgen." }] },
  { id: "v76", lemma: "вечер", en: "evening", de: "Abend", pos: "noun", gender: "m", frequency: 1, domains: ["time"], sentences: [{ ru: "Сегодня вечером.", en: "This evening.", de: "Heute Abend." }] },
  { id: "v77", lemma: "телефон", en: "phone", de: "Telefon", pos: "noun", gender: "m", frequency: 1, domains: ["phone"], sentences: [{ ru: "Телефон сел.", en: "The phone died.", de: "Das Handy ist leer." }] },
  { id: "v78", lemma: "интернет", en: "internet", de: "Internet", pos: "noun", gender: "m", frequency: 1, domains: ["phone", "home"], sentences: [{ ru: "У меня нет интернета.", en: "I have no internet.", de: "Ich habe kein Internet." }] },
  { id: "v79", lemma: "проблема", en: "problem", de: "Problem", pos: "noun", gender: "f", frequency: 1, domains: ["problem"], sentences: [{ ru: "У меня проблема.", en: "I have a problem.", de: "Ich habe ein Problem." }] },
  { id: "v80", lemma: "помощь", en: "help", de: "Hilfe", pos: "noun", gender: "f", frequency: 1, domains: ["help"], sentences: [{ ru: "Мне нужна помощь.", en: "I need help.", de: "Ich brauche Hilfe." }] },
];

export const TARGET_CHUNKS = 350;
export const DAILY_NEW = 12;
export const RETRIEVAL_SITTINGS = 3;

export function daysUntil(landOn: string, now = new Date()): number {
  if (!landOn) return 14;
  const land = new Date(landOn + "T12:00:00");
  const diff = Math.ceil((land.getTime() - now.getTime()) / 86400000);
  return Math.max(0, diff);
}

export function currentDayIndex(startedOn: string, now = new Date()): number {
  const start = new Date(startedOn + "T12:00:00");
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
  return Math.min(14, Math.max(1, diff));
}
