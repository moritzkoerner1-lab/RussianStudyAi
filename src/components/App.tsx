"use client";

import { useEffect, useState } from "react";
import { GrindSurface } from "@/components/GrindSurface";
import { LessonsSurface } from "@/components/LessonsSurface";
import { TalkSurface } from "@/components/TalkSurface";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/store";
import type { Profile, ShellTab } from "@/lib/types";

const TABS: { id: ShellTab; ru: string; en: string }[] = [
  { id: "talk", ru: "Ара", en: "Home" },
  { id: "lessons", ru: "Урок", en: "Lessons" },
  { id: "grind", ru: "Grind", en: "Study" },
];

export function App() {
  const [tab, setTab] = useState<ShellTab>("talk");
  const [profile, setProfile] = useState<Profile>(defaultProfile());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    const next = { ...p, tutor: "ara" as const };
    setProfile(next);
    saveProfile(next);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)]">
        <p className="ru text-3xl tracking-[0.18em]">Ара</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <div className="shell-main">
        {tab === "talk" && <TalkSurface profile={profile} />}
        {tab === "lessons" && (
          <LessonsSurface
            profile={profile}
            onSpeakLesson={() => setTab("talk")}
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
            onClick={() => setTab(t.id)}
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
