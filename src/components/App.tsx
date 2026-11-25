"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { DrillMode } from "@/components/DrillMode";
import { HomeHero } from "@/components/HomeHero";
import { NotebookMode } from "@/components/NotebookMode";
import { PathMode } from "@/components/PathMode";
import { SpeakMode } from "@/components/SpeakMode";
import { WalkMode } from "@/components/WalkMode";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/store";
import type { AppMode, Profile } from "@/lib/types";

export function App() {
  const [mode, setMode] = useState<AppMode>("home");
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
      <div className="mx-auto flex min-h-dvh max-w-xl items-center justify-center px-5">
        <p className="font-display text-2xl tracking-widest text-[var(--ink)]">
          ВЖИВУЮ
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-4">
      {mode !== "home" && (
        <header className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMode("home")}
            className="font-display text-lg tracking-[0.18em] text-[var(--ink)]"
          >
            ВЖИВУЮ
          </button>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--faint)]">
            {mode}
          </p>
        </header>
      )}

      <main className="min-h-0 flex-1 pb-28">
        {mode === "home" && (
          <HomeHero
            profile={profile}
            onProfile={updateProfile}
            onGo={setMode}
          />
        )}
        {mode === "speak" && (
          <SpeakMode
            profile={profile}
            onProfile={updateProfile}
            lessonHint={lessonHint}
          />
        )}
        {mode === "walk" && <WalkMode profile={profile} />}
        {mode === "drill" && <DrillMode profile={profile} />}
        {mode === "notebook" && <NotebookMode />}
        {mode === "path" && (
          <PathMode
            profile={profile}
            onSpeakLesson={(hint) => {
              setLessonHint(hint);
              setMode("speak");
            }}
          />
        )}
      </main>

      <BottomNav
        mode={mode}
        onChange={(m) => {
          if (m !== "speak") setLessonHint(undefined);
          setMode(m);
        }}
      />
    </div>
  );
}
