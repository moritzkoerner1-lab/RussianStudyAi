"use client";

import { classifyLocal } from "./classify";
import type { GrindProgress, NotebookEntry, Profile } from "./types";

export { classifyLocal };

const PROFILE_KEY = "vzhivuyu.profile.v1";
const NOTES_KEY = "vzhivuyu.notes.v1";
const GRIND_KEY = "vzhivuyu.grind.v2";
const DRILL_LEGACY = "vzhivuyu.drill.v1";
const PATH_KEY = "vzhivuyu.path.v1";

export const defaultProfile = (): Profile => {
  const today = new Date();
  const land = new Date(today);
  land.setDate(land.getDate() + 14);
  return {
    name: "",
    genderPast: "был",
    tutor: "ara",
    helpLang: "en",
    landOn: land.toISOString().slice(0, 10),
    startedOn: today.toISOString().slice(0, 10),
  };
};

function emptyGrind(): GrindProgress {
  return {
    seen: {},
    correct: {},
    lastSeen: {},
    mastered: {},
    sessionBest: 0,
    totalCorrect: 0,
  };
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...(fallback as object), ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadProfile(): Profile {
  return read(PROFILE_KEY, defaultProfile());
}

export function saveProfile(profile: Profile) {
  write(PROFILE_KEY, profile);
}

export function loadNotes(): NotebookEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveNotes(notes: NotebookEntry[]) {
  write(NOTES_KEY, notes);
}

export function addNote(
  partial: Omit<NotebookEntry, "id" | "createdAt">,
): NotebookEntry {
  const notes = loadNotes();
  const entry: NotebookEntry = {
    ...partial,
    id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  saveNotes([entry, ...notes]);
  return entry;
}

export function removeNote(id: string) {
  saveNotes(loadNotes().filter((n) => n.id !== id));
}

export function loadGrind(): GrindProgress {
  if (typeof window === "undefined") return emptyGrind();
  try {
    const raw = localStorage.getItem(GRIND_KEY);
    if (raw) return { ...emptyGrind(), ...JSON.parse(raw) };
    const legacy = localStorage.getItem(DRILL_LEGACY);
    if (legacy) {
      const old = JSON.parse(legacy) as {
        seen?: Record<string, number>;
        correct?: Record<string, number>;
        lastSeen?: Record<string, number>;
      };
      const migrated: GrindProgress = {
        ...emptyGrind(),
        seen: old.seen || {},
        correct: old.correct || {},
        lastSeen: old.lastSeen || {},
      };
      write(GRIND_KEY, migrated);
      return migrated;
    }
  } catch {
    /* fall through */
  }
  return emptyGrind();
}

export function saveGrind(progress: GrindProgress) {
  write(GRIND_KEY, progress);
}

/** @deprecated */
export function loadDrill(): GrindProgress {
  return loadGrind();
}

/** @deprecated */
export function saveDrill(progress: GrindProgress) {
  saveGrind(progress);
}

export function recordGrindResult(
  id: string,
  ok: boolean,
  sessionCount?: number,
): GrindProgress {
  const p = loadGrind();
  p.seen[id] = (p.seen[id] || 0) + 1;
  if (ok) {
    p.correct[id] = (p.correct[id] || 0) + 1;
    p.totalCorrect = (p.totalCorrect || 0) + 1;
    if ((p.correct[id] || 0) >= 3 && (p.correct[id] || 0) / (p.seen[id] || 1) >= 0.7) {
      p.mastered[id] = true;
    }
  }
  p.lastSeen[id] = Date.now();
  if (sessionCount && sessionCount > (p.sessionBest || 0)) {
    p.sessionBest = sessionCount;
  }
  saveGrind(p);
  return p;
}

export function weakLemmaIds(limit = 12): string[] {
  const p = loadGrind();
  const ids = Object.keys(p.seen);
  return ids
    .map((id) => {
      const seen = p.seen[id] || 0;
      const correct = p.correct[id] || 0;
      const mastery = seen === 0 ? 0 : correct / seen;
      return { id, mastery, mastered: Boolean(p.mastered[id]) };
    })
    .filter((x) => !x.mastered)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, limit)
    .map((x) => x.id);
}

export function grindStats() {
  const p = loadGrind();
  const seenIds = Object.keys(p.seen);
  const mastered = Object.values(p.mastered).filter(Boolean).length;
  return {
    seen: seenIds.length,
    mastered,
    totalCorrect: p.totalCorrect || 0,
    sessionBest: p.sessionBest || 0,
  };
}

export function loadPathDone(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PATH_KEY) || "[]");
  } catch {
    return [];
  }
}

export function markDayDone(day: number) {
  const done = new Set(loadPathDone());
  done.add(day);
  write(PATH_KEY, [...done].sort((a, b) => a - b));
}
