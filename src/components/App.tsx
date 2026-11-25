"use client";

import { useEffect, useState } from "react";
import { GrindSurface } from "@/components/GrindSurface";
import { LessonsSurface } from "@/components/LessonsSurface";
import { TalkSurface } from "@/components/TalkSurface";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/store";
import type { Profile, ShellTab } from "@/lib/types";

const TABS: { id: ShellTab; ru: string; en: string }[] = [
  { id: "talk", ru: "Говор", en: "Talk" },
  { id: "lessons", ru: "Урок", en: "Lessons" },
  { id: "grind", ru: "Grind", en: "Study" },
];

export function App() {
  const [tab, setTab] = useState<ShellTab>("talk");
  const [profile, setProfile] = useState<Profile>(defaultProfile());
  const [lessonHint, setLessonHint] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  function updateProfile(next: Profile) {
    setProfile(next);
    saveProfile(next);
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)]">
        <p className="ru text-3xl tracking-[0.18em]">ВЖИВУЮ</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <div className="shell-main">
        {tab === "talk" && (
          <TalkSurface
            profile={profile}
            onProfile={updateProfile}
            lessonHint={lessonHint}
          />
        )}
        {tab === "lessons" && (
          <LessonsSurface
            profile={profile}
            onSpeakLesson={(hint) => {
              setLessonHint(hint);
              setTab("talk");
            }}
          />
        )}
        {tab === "grind" && <GrindSurface profile={profile} />}
      </div>

      <nav className="dock" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            data-on={tab === t.id}
            onClick={() => {
              if (t.id !== "talk") setLessonHint(undefined);
              setTab(t.id);
            }}
          >
            <span className="dock-mark" />
            <span className="dock-label">{t.ru}</span>
            <span className="dock-sub">{t.en}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
