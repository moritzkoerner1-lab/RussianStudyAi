"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DrillMode } from "@/components/DrillMode";
import { HomeHero } from "@/components/HomeHero";
import { NotebookMode } from "@/components/NotebookMode";
import { OverhearMode } from "@/components/OverhearMode";
import { PathMode } from "@/components/PathMode";
import { SpeakMode } from "@/components/SpeakMode";
import { WalkMode } from "@/components/WalkMode";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/store";
import type { AppMode, Profile } from "@/lib/types";

const PAGES: { id: AppMode; ru: string; en: string }[] = [
  { id: "home", ru: "Дом", en: "Home" },
  { id: "speak", ru: "Говор", en: "Speak" },
  { id: "overhear", ru: "Слух", en: "Hear" },
  { id: "walk", ru: "Шаг", en: "Walk" },
  { id: "drill", ru: "Строй", en: "Drill" },
  { id: "notebook", ru: "Тетр", en: "Keep" },
  { id: "path", ru: "Путь", en: "Path" },
];

export function App() {
  const [mode, setMode] = useState<AppMode>("home");
  const [profile, setProfile] = useState<Profile>(defaultProfile());
  const [lessonHint, setLessonHint] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  const goTo = useCallback((next: AppMode) => {
    const idx = PAGES.findIndex((p) => p.id === next);
    const deck = deckRef.current;
    if (!deck || idx < 0) return;
    setMode(next);
    scrolling.current = true;
    deck.scrollTo({ left: idx * deck.clientWidth, behavior: "smooth" });
    window.setTimeout(() => {
      scrolling.current = false;
    }, 420);
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onScroll = () => {
      if (scrolling.current) return;
      const idx = Math.round(deck.scrollLeft / Math.max(deck.clientWidth, 1));
      const page = PAGES[idx];
      if (page && page.id !== mode) {
        setMode(page.id);
        if (page.id !== "speak") setLessonHint(undefined);
      }
    };

    deck.addEventListener("scroll", onScroll, { passive: true });
    return () => deck.removeEventListener("scroll", onScroll);
  }, [mode]);

  function updateProfile(next: Profile) {
    setProfile(next);
    saveProfile(next);
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)]">
        <p className="font-display text-3xl tracking-[0.22em] text-[var(--fg)]">
          ВЖИВУЮ
        </p>
      </div>
    );
  }

  return (
    <div className="app-frame">
      <div ref={deckRef} className="deck" id="main-deck">
        <section className="deck-page" data-mode="home">
          <HomeHero
            profile={profile}
            onProfile={updateProfile}
            onGo={goTo}
          />
        </section>

        <section className="deck-page" data-mode="speak">
          <SpeakMode
            profile={profile}
            onProfile={updateProfile}
            lessonHint={lessonHint}
          />
        </section>

        <section className="deck-page" data-mode="overhear">
          <OverhearMode profile={profile} />
        </section>

        <section className="deck-page" data-mode="walk">
          <WalkMode profile={profile} />
        </section>

        <section className="deck-page" data-mode="drill">
          <DrillMode profile={profile} />
        </section>

        <section className="deck-page" data-mode="notebook">
          <NotebookMode />
        </section>

        <section className="deck-page" data-mode="path">
          <PathMode
            profile={profile}
            onSpeakLesson={(hint) => {
              setLessonHint(hint);
              goTo("speak");
            }}
          />
        </section>
      </div>

      <nav className="dock" aria-label="Modes">
        {PAGES.filter((p) => p.id !== "home").map((item) => (
          <button
            key={item.id}
            type="button"
            className="dock-item"
            data-active={mode === item.id || (mode === "home" && item.id === "speak")}
            onClick={() => {
              if (item.id !== "speak") setLessonHint(undefined);
              goTo(item.id);
            }}
          >
            <span>{item.ru}</span>
            <span>{item.en}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
